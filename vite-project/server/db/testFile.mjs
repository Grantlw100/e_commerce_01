import DynamoDBClientDev from "../config/connection.aws.mjs";
import {ListTablesCommand } from "@aws-sdk/client-dynamodb";

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
                /*  DYNAMODB LIST TABLE TEST */
        /* List all available tables from DynamoDB */
        
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


const dynamo = DynamoDBClientDev;

async function testDynamoDBConnection() {
    try {
        const data = await dynamo.send(new ListTablesCommand({}));
        console.log("Tables:", data.TableNames);
    } catch (error) {
        console.error("Connection Test Error:", error);
    }
}

export default testDynamoDBConnection();
