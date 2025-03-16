import { DynamoDBClient } from '@aws-sdk/client-dynamodb';




//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

                        /*  CONNECTION FOR DYNAMODB */
        /* The configuration settings for Amazon Web Services DynamoDB */

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



const DynamoDBClientDev = new DynamoDBClient ({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});


export default DynamoDBClientDev;