const AWS = require('aws-sdk');
AWS.config.update({
    region: process.env.AWS_REGION
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const saveAnalyticsData = async (analyticsData) => {
    const params = {
        TableName: process.env.ATABLE,
        Item: analyticsData
    };
    try {
        await dynamoDb.put(params).promise();
    } catch (error) {
        console.error('Error saving analytics data:', error);
    }
};

module.exports = {
    saveAnalyticsData
};
