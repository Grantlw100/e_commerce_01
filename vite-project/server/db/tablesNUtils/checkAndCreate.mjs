import {CreateTableCommand, ListTablesCommand } from '@aws-sdk/client-dynamodb';



//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

                        /* DYNAMODB TABLE CREATION */
        /* The function responsible for the creation of tables within Amazon Web Services DynamoDB */

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



const checkAndCreate = async (dynamo, tableName, params) => {
    console.log('Running checkAndCreate for table:', tableName);
    try {
        const existingTables = await dynamo.send(new ListTablesCommand({}));
        console.log('Existing tables:', existingTables.TableNames);

        if (!existingTables.TableNames.includes(tableName)) {
            console.log(`Table ${tableName} does not exist. Creating now...`);
            const command = new CreateTableCommand(params);
            const data = await dynamo.send(command);
            console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
        } else {
            console.log(`Table ${tableName} already exists.`);
        }
    } catch (err) {
        console.error('Unable to check/create table. Error JSON:', JSON.stringify(err, null, 2));
    }
};

// Call the function to check and create the table if necessary
export default checkAndCreate;