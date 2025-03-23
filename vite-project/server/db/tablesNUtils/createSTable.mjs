export const STableName = process.env.STableName || 'STableName';

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

                /*  STORE TABLE PARA<ETERRS */
        /* The parameter settings for the DynamoDB Store Tqable */

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

export const paramsSTable = {
    TableName: "STableName",
  KeySchema: [
    { AttributeName: "storeId", KeyType: "HASH" }, // Partition key
    { AttributeName: "stateId", KeyType: "RANGE" } // Sort key (optional)
  ],
  AttributeDefinitions: [
    { AttributeName: "storeId", AttributeType: "S" }, // Ensure it matches KeySchema
    { AttributeName: "stateId", AttributeType: "S" } // Ensure it matches KeySchema
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

