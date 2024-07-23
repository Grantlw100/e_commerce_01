require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_REGION
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const saveUserSession = async (userState) => {
    const params = {
        TableName: process.env.UTABLE,
        Item: userState
    };
    try {
        await dynamoDb.put(params).promise();
    } catch (error) {
        console.error('Error saving user session:', error);
    }
};

export const loadUserSession = async (userId) => {
    const params = {
        TableName: process.env.UTABLE,
        Key: { id: userId }
    };
    try {
        const result = await dynamoDb.get(params).promise();
        return result.Item;
    } catch (error) {
        console.error('Error loading user session:', error);
        return null;
    }
};

export const deleteUserSession = async (userId) => {
    const params = {
        TableName: process.env.UTABLE,
        Key: { id: userId }
    };
    try {
        await dynamoDb.delete(params).promise();
    } catch (error) {
        console.error('Error deleting user session:', error);
    }
};


module.exports = { createSession, getSession, deleteSession };