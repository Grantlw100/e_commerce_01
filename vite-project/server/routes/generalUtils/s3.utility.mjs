// import dotenv from 'dotenv';
// dotenv.config({ path: '../../.env' });
import s3 from '../../config/S3Congif.mjs';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
                    /* S3 IMAGE MANAGEMENT UTILITY FUNCTIONS */
        /* Utility functions that handle how data in the cart is managed */
        
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


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

    // Return the uploaded file information
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

export default {
    upload,
    saveFile,
    loadFile,
    deleteFile,
    uploadFile,
    uploadSingleFile,
    uploadMultipleFiles
};
