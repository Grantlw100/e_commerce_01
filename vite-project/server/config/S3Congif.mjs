import { S3Client } from '@aws-sdk/client-s3';



//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

                                    /*  CONNECTION FOR S3 */
        /* The configuration settings for Amazon Web Services S3 Bucket for image sources */

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


const s3 = new S3Client({ 
    region: process.env.AWS_REGION, // Specify region
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

export default s3;