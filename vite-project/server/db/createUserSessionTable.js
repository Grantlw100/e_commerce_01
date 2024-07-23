const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const dynamo = new AWS.DynamoDB();

const tableName = process.env.UTABLE;

const params = {
    TableName: tableName,
    KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
};

dynamo.createTable(params, (err, data) => {
    if (err) {
        console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
    }
});