import DynamoDBClientDev from "../config/connection.aws.mjs";
import { paramsUTable, UTableName } from "./tablesNUtils/createUTable.mjs";
import { GTableName, paramsGTable } from "./tablesNUtils/createGTable.mjs";
import { ATableName, paramsATable } from "./tablesNUtils/createATable.mjs";
import { STableName, paramsSTable } from "./tablesNUtils/createSTable.mjs"; 
import checkAndCreate from "./tablesNUtils/checkAndCreate.mjs";




//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

                        /* CREATE ALL DYNAMODB TABLES */
        /* All DynamoDB parameters will be used to create tables unless already created */

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


console.log('Index.js');
const createTables = async () => {
    try {
        await checkAndCreate(DynamoDBClientDev, ATableName, paramsATable);
        await checkAndCreate(DynamoDBClientDev, UTableName, paramsUTable);
        await checkAndCreate(DynamoDBClientDev, GTableName, paramsGTable);
        await checkAndCreate(DynamoDBClientDev, STableName, paramsSTable);
    } catch (error) {
        console.error('Error creating tables:', error);
    }
}

export default createTables;

// Notes -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------`
                // add in query responses to prompt user if they want to create or destroy pre existing tables