require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_REGION
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const saveGlobalState = async (globalState) => {
    const params = {
        TableName: process.env.GTABLE,
        Item: globalState
    };
    try {
        await dynamoDb.put(params).promise();
    } catch (error) {
        console.error('Error saving global state:', error);
    }
};

export const loadGlobalState = async () => {
    const params = {
        TableName: process.env.GTABLE,
        Key: { id: 'globalState' }
    };
    try {
        const result = await dynamoDb.get(params).promise();
        return result.Item;
    } catch (error) {
        console.error('Error loading global state:', error);
        return null;
    }
};
