const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_REGION
});

const dynamoDb = new AWS.DynamoDB();

const params = {
    TableName: process.env.ATABLE,
    KeySchema: [
        { AttributeName: 'userId', KeyType: 'HASH' },
        { AttributeName: 'timestamp', KeyType: 'RANGE' }
    ],
    AttributeDefinitions: [
        { AttributeName: 'userId', AttributeType: 'S' },
        { AttributeName: 'timestamp', AttributeType: 'N' }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

dynamoDb.createTable(params, (err, data) => {
    if (err) {
        console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
    }
});
