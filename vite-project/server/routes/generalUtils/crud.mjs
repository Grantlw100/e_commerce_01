import DynamoDBClientDev from '../../config/connection.aws.mjs';
import pkg from 'aws-sdk';
const { 
    PutCommand,
    GetCommand,
    DeleteCommand,
    BatchGetCommand,
    BatchWriteCommand,
    UpdateCommand,
    TransactWriteItemsCommand,
    QueryCommand
} = pkg; // Import the specific commands we need
import userParameters from './userParams.mjs';
const { 
    preferencesIndex, 
    preferencesGeneralIndex, 
    preferencesThemeIndex, 
    LocationIndex, 
    interactivityIdIndex, 
    interactivityGeneralIndex, 
    interactivityPageHistoryIndex, 
    userIdIndex, 
    userGeneralIndex, 
    userPersonalIndex, 
    userRoleIndex, 
    notificationIndex, 
    notificationGeneralIndex, 
    notificationMiniIndex, 
    sessionIndex, 
    sessionDurationIndex, 
    sessionActvityIndex, 
    sessionEntryIndex, 
    sessionReEntryIndex, 
    userParamSwitch
 } = userParameters;
import StoreParameters from './storeParams.mjs';
const {
    storeParamSwitch,
    stateIdIndex,
    sessionRentryIndex,
    filtersIndex,
    formStateIndex,
    pageStateIndex,
    cartStateIndex,
    wishlistStateIndex,
    lovedItemsStateIndex,
    recommendationsStateIndex
 } = StoreParameters;
import GeneralParameters from './BatchMutate.mjs';
const { 
    getItemParams, 
    batchGetFieldsParams, 
    dynamicBatchGetPartitionParams, 
    dynamicBatchGetPartitionSortParams, 
    batchPutParams, 
    batchPutWithTransaction, 
    putParams, 
    dynamicMutate, 
    batchUpdateWithTransaction, 
    batchUpdateParams, 
    batchDeleteParams, 
    deleteParams, 
    deleteItemParams, 
    dynamicBatchGetTimeRangeParams
} = GeneralParameters;

const UTable = process.env.UTable;



//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                
                /*  TABLE FETCH REQUEST FUNCTIONS */
    /* Creating CRUD request functions for the user tables routes */

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region GETTERS --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// get user by userId
    // TODO 
    // adjust the params to enure an entire user is grabbed by sessionId in global secondary index (EntryIndex)
    const getUser = async ( userId ) => {

            // hardcode params for simple get request
            const filledParams = { 
                TableName: process.env.UTable, 
                Key: { id:{ userId } }
                }

            try {
                const command = new GetCommand(filledParams);
                const result = await DynamoDBClientDev.send(command);
                return result.Item;
            } catch (error) {
                console.error('Error loading user session:', error);
                return null;
            }
        };  

// GSI Query for specific user data
        // TODO make a dynamic GSI query function that can be used for all GSI queries  
    const globalSecondaryData = async (userId, request, table) => {
        let updatedParams        
        table === 'UserTable' ? updatedParams = userParamSwitch(request) : updatedParams = storeParamSwitch(request)
        const filledParams = updatedParams(userId)
        try {
            const command = new GetCommand(filledParams);
            const result = await DynamoDBClientDev.send(command);
            return result.Item;
        } catch (error) {
            console.error('Error loading user session:', error);
            return null;
        }
    };
    
    
// finding the sessionId for the timestamp to grab specific analytics data from a or multiple users
    const fetchSessionTimestamps = async (eventType, startTime, endTime) => {
        const params = {
            TableName: 'AnalyticsTable',
            KeyConditionExpression: 'eventType = :eventType AND #timestampSessionId BETWEEN :start AND :end',
            ExpressionAttributeNames: {
                '#timestampSessionId': 'timestamp#sessionId'
            },
            ExpressionAttributeValues: {
                ':eventType': { S: eventType },
                ':start': { S: `${startTime}#0000` },  // Adjust for your start timestamp range
                ':end': { S: `${endTime}#9999` }       // Adjust for your end timestamp range
            },
            ProjectionExpression: '#timestampSessionId'
        };

        try {
            const command = new QueryCommand(params);
            const result = await DynamoDBClient.send(command);
            return result.Items.map(item => item['timestamp#sessionId']); // Array of timestamp#sessionId
        } catch (error) {
            console.error("Error fetching session timestamps:", error);
            return [];
        }
    };

// get Item by id   // 
    export const getItem = async ( partitionKeyValue, sortKeyValue, table ) => {
        const filledParams = getItem(partitionKeyValue, sortKeyValue, table)
        try {
            const command = new GetCommand(filledParams);
            const result = await DynamoDBClientDev.send(command);
            return result.Item;
        } catch (error) {
            console.error('Error loading user session:', error);
            return null;
        }
    };


// batch get items and specific fields 
    const batchGetItemFields = async (table, keys, fields) => {
        const filledParams = batchGetFieldsParams(table, keys, fields)
        try {
            const command = new BatchGetCommand(filledParams);
            const result = await DynamoDBClientDev.send(command);
            return result.Responses[UTable];
        } catch (error) {
            console.error('Error in batch getting user sessions:', error);
            return null;
        }
    }

// batch get items and ALL fields
    const batchGetPartition = async (PKeys, table) => {
        const filledParams = dynamicBatchGetPartitionParams(PKeys, table)
        try {
            const command = new BatchGetCommand(filledParams);
            const result = await DynamoDBClientDev.send(command);
            return result.Responses[UTable];
        } catch (error) {
            console.error('Error in batch getting user sessions:', error);
            return null;
        }
    }

// batch get for specific items 
    const batchGetPartitionSort = async (keys, table) => {
        const filledParams = dynamicBatchGetPartitionSortParams(keys, table)
        try {
            const command = new BatchGetCommand(filledParams);
            const result = await DynamoDBClientDev.send(command);
            return result.Responses[UTable];
        } catch (error) {
            console.error('Error in batch getting user sessions:', error);
            return null;
        }
    }

// batch get with time range
    const batchGetTimeRange = async (partitionKey, table, timeStampRange, maxItems) => {
        const filledParams = dynamicBatchGetTimeRangeParams(partitionKey, table, timeStampRange, maxItems)
        try {
            const command = new BatchGetCommand(filledParams);
            const result = await DynamoDBClientDev.send(command);
            return result.Responses[UTable];
        } catch (error) {
            console.error('Error in batch getting user sessions:', error);
            return null;
        }
    }

        // #endregion------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------S



// #region POSTERS --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// put user by userId
        //TODO
        // alter put function to ensure the sessionId is being used to create all the new fields for a user
        // partition and sort key are drectly used 
    export const putItem = async ( item, table ) => {
        const filledParams = putParams(item, table)
        try {
            // use the put command form lib-dynamodb for SDK v3
            const command = new PutCommand(filledParams);
            await DynamoDBClientDev.send(command);
            console.log('User session saved successfully');
        } catch (error) {
            console.error('Error saving user session:', error);
        }
    };
    
// (batch) put functions and params on batch file 
    const batchPutItems = async (items, table) => {
        let filledParams = batchPutParams(items, table)
        try {
            const command = new BatchWriteCommand( filledParams );
            await DynamoDBClientDev.send(command);
            console.log('User sessions saved successfully');
        } catch (error) {
            console.error('Error saving user sessions:', error);
        }
    }

// batch put with transaction
    const batchPutItemsTransaction = async (items, table) => {
        const params = batchPutWithTransaction(items, table);
        try {
            const data = await client.send(new TransactWriteItemsCommand(params));
            console.log("Batch put with transaction succeeded:", data);
        } catch (error) {
            console.error("Batch put with transaction failed:", error);
        }
    };

                
        // #endregion------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------S



// #region UPDATERS --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// dynamic udpate items by partition and sortkey (if requested) (multiple fields)
    // DO NOT DIRETLY PASS USER INPUTS FOR UPDATE KEY AND VALUE
    // Use strict variable keys to avoid injection attacks 
    export const mutateItem = async (table,  partitionKeyValue, sortKeyNeeded, fields, sortKeyValue) => {
        const filledParams = dynamicMutate(table,  partitionKeyValue, sortKeyNeeded, fields, sortKeyValue)
        try {
            // use the put command form lib-dynamodb for SDK v3
            const command = new UpdateCommand(filledParams);
            await DynamoDBClientDev.send(command);
            console.log('User session saved successfully');
        } catch (error) {
            console.error('Error saving user session:', error);
        }
    };

// batch update users by id with transaction 
    const batchUpdateTransactions = async (updates, table) => {
        const params = batchUpdateWithTransaction(updates, table);
        try {
            const data = await client.send(new TransactWriteItemsCommand(params));
            console.log("Batch update with transaction succeeded:", data);
        } catch (error) {
            console.error("Batch update with transaction failed:", error);
        }
    };

// batch update without transaction 
    const batchUpdates = async (updates, table) => {
        const filledParams = batchUpdateParams(updates, table);
        try {
            const command = new BatchWriteCommand(filledParams);
            await DynamoDBClientDev.send(command);
            console.log('User sessions updated successfully');
        } catch (error) {
            console.error('Error updating user sessions:', error);
        }
    };

        // #endregion------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------S



// #region DELETORS -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// DELETE item by partitionKey
    export const deleteItemPartition = async ( partitionKeyValue, table ) => {
        const filledParams = deleteItemParams( partitionKeyValue, table )
        try {
            // Use the DeleteCommand from lib-dynamodb for SDK v3
            const command = new DeleteCommand(filledParams);
            await DynamoDBClientDev.send(command);
            console.log('User session deleted successfully.');
        } catch (error) {
            console.error('Error deleting user session:', error);
        }
    }

// delete user by userId
    export const deleteItemPartitionSort = async ( partitionKeyValue, sortKeyValue, table ) => {
        const filledParams = deleteParams( partitionKeyValue, sortKeyValue, table )
        try {
            // Use the DeleteCommand from lib-dynamodb for SDK v3
            const command = new DeleteCommand(filledParams);
            await DynamoDBClientDev.send(command);
            console.log('User session deleted successfully.');
        } catch (error) {
            console.error('Error deleting user session:', error);
        }
    }

// Conditional Delete 
    // To safeguard against accidental deletions, a conditionalDeleteUser
    // function could delete an item only if certain conditions are met (e.g., a particular status or timestamp).
    export const conditionalDeleteUser = async (userId, params, conditionKey, conditionValue) => {
        const filledParams = {
            // consider not hardcoding the table name
            TableName: UTable,
            Key: { userId },
            ConditionExpression: `${conditionKey} = :conditionValue`,
            ExpressionAttributeValues: {
                ':conditionValue': conditionValue
            }
        };
        try {
            const command = new DeleteCommand(filledParams);
            await DynamoDBClientDev.send(command);
            console.log('User session conditionally deleted.');
        } catch (error) {
            console.error('Error in conditional delete:', error);
        }
    };

// batch delete users by id
    const batchDeleteItems = async (PKeys, table) => {
        const filledParams = batchDeleteParams(PKeys, table);
        try {
            const command = new BatchWriteCommand(filledParams);
            await DynamoDBClientDev.send(command);
            console.log('User sessions deleted successfully');
        } catch (error) {
            console.error('Error deleting user sessions:', error);
        }
    };

        // #endregion------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------S



export default {
    getUser,
    globalSecondaryData,
    fetchSessionTimestamps,
    getItem,
    batchGetItemFields,
    batchGetPartition,
    batchGetPartitionSort,
    batchGetTimeRange,
    putItem,
    batchPutItems,
    batchPutItemsTransaction,
    mutateItem,
    batchUpdateTransactions,
    batchUpdates,
    deleteItemPartition,
    deleteItemPartitionSort,
    conditionalDeleteUser,
    batchDeleteItems
};




//---------------------------------------------------------------------------------

    // update function for incremental changes 
        // rather than replacing the entire item, an updateUserField could allow 
        // you to incrementally update specific fields useing the update command 

