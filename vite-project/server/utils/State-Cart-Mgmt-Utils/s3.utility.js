require('dotenv').config();
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, file.originalname);
        }
    })
});

const uploadSingleFile = async (file) => {
    const { createReadStream, filename, mimetype, encoding } = await file;
    const stream = createReadStream();

    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${Date.now()}-${filename}`,
        Body: stream,
        ContentType: mimetype,
        ACL: 'public-read'
    };

    const command = new PutObjectCommand(uploadParams);
    const result = await s3.send(command);
    return {
        filename,
        mimetype,
        encoding,
        url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`
    };
};

const uploadFile = async (file) => {
    const { createReadStream, filename, mimetype } = await file;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${Date.now()}-${filename}`,
        Body: createReadStream(),
        ContentType: mimetype,
        ACL: 'public-read',
    };

    const result = await s3.send(new PutObjectCommand(params));
    return result;
};

const uploadMultipleFiles = async (files) => {
    const uploadedFiles = await Promise.all(
        files.map(async (file) => uploadSingleFile(file))
    );
    return uploadedFiles;
};

const saveFile = async (file) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.filename,
        Body: file.createReadStream(),
        ContentType: file.mimetype,
        ACL: 'public-read'
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);
};

const loadFile = async (key) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    };

    const command = new GetObjectCommand(params);
    const data = await s3.send(command);
    return data.Body;
};

const deleteFile = async (key) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);
};

module.exports = {
    upload,
    saveFile,
    loadFile,
    deleteFile,
    uploadFile,
    uploadSingleFile,
    uploadMultipleFiles
};
