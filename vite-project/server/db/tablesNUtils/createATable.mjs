import dotenv from '../../node_modules/dotenv/config.js';



//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

                    /* ANALYTICS TABLE PARAMETERS */
        /* The parameter settings the DynamoDB Analytics Table */

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



export const ATableName = process.env.ATABLE || 1234;

console.log('ATableName');

export const paramsATable = {
    TableName: ATableName,
    KeySchema: [
        { AttributeName: 'eventType', KeyType: 'HASH' },
        // sessionId is composed of 16 digit uuid userID followed by a letter and the current session number out of millions
            // example 1234567890123456a1234567
        { AttributeName: 'timestamp#sessionId', KeyType: 'RANGE' }
    ],
    AttributeDefinitions: [
        { AttributeName: 'eventType', AttributeType: 'S' }, // String
        { AttributeName: 'timestamp#sessionId', AttributeType: 'S' }, // String for session ID and timestamp combined
        { AttributeName: 'userID', AttributeType: 'S' }, // Optional index for user-based queries
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};


// NOTES -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------`
// export default { paramsATable, ATableName };

// when using exports, the ATableName and paramstable should be exported as
        // export const ATableName;
        // export const paramstable;
    // and imported as 
        // import { ATableName, Paramstable };
    // alternatively exported as default
        // export default { paramsATable, ATableName };
    //and imported as 
        // import tables from '../filepath/file';
        // { paramsATable, ATableName } = tables