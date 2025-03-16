import DynamoDBClientDev from '../../../config/connection.aws';
import { 
    PutCommand,
    GetCommand,
    DeleteCommand,
    BatchGetCommand,
    BatchWriteCommand,
    UpdateCommand,
    TransactWriteItemsCommand 
} from '@aws-sdk/lib-dynamodb'; // Import the specific commands we need
import {
    batchGetItemsParams,
    batchGetUsersParams,
    batchPutParams,
    batchPutWithTransaction,
    putParams,
    batchUpdateWithTransaction,
    batchUpdateParams,
    dynamicMutate,
    batchDeleteParams,
    deleteParams
} from './userBatchMutate.js'; 
import { 
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
    paramSwitch
 } from './userParams.js';

const UTable = process.env.UTable;

//---------------------------------------------------------------------------------

                /* USER TABLE REQUEST FUNCTIONS */
    /* Creating CRUD request functions for the user tables routes */

//---------------------------------------------------------------------------------



// #region GETTERS ----------------------------------------------------

// get user by userId
    // TODO 
    // adjust the params to enure an entire user is grabbed by sessionId in global secondary index (EntryIndex)
    export const getUser = async ( userId ) => {

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
    export const globalSecondaryData = async (userId, request) => {
        const updatedParams = paramSwitch(request)
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

// batch get users and items 
    const batchGetUsersItems = async (userSessions, items) => {
        const filledParams = batchGetItemsParams(userSessions, items)
        try {
            const command = new BatchGetCommand(filledParams);
            const result = await DynamoDBClientDev.send(command);
            return result.Responses[UTable];
        } catch (error) {
            console.error('Error in batch getting user sessions:', error);
            return null;
        }
    }

// batch get users by id
    const batchGetUsers = async (userIds) => {
        const filledParams = batchGetUsersParams(userIds)
        try {
            const command = new BatchGetCommand(filledParams);
            const result = await DynamoDBClientDev.send(command);
            return result.Responses[UTable];
        } catch (error) {
            console.error('Error in batch getting user sessions:', error);
            return null;
        }
    }

    // #endregion----------------------------------------------------------------S



// #region PUTTERS ----------------------------------------------------

// put user by userId
        //TODO
        // alter put function to ensure the sessionId is being used to create all the new fields for a user
        // partition and sort key are drectly used 
    export const putUser = async ( userId ) => {
        const filledParams = putParams(userId)
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
    const batchPutUsers = async ( items ) => {
        let filledParams = batchPutParams(items)
        try {
            const command = new BatchWriteCommand(filledParams);
            await DynamoDBClientDev.send(command);
            console.log('User sessions saved successfully');
        } catch (error) {
            console.error('Error saving user sessions:', error);
        }
    }

// batch put with transaction
    const batchPutUsersTransaction = async (items) => {
        const params = batchPutWithTransaction(items);
        try {
            const data = await client.send(new TransactWriteItemsCommand(params));
            console.log("Batch put with transaction succeeded:", data);
        } catch (error) {
            console.error("Batch put with transaction failed:", error);
        }
    };

                
    // #endregion----------------------------------------------------------------S



// #region UPDATERS ----------------------------------------------------

// dynamic udpate user by userId (multiple fields)
    // DO NOT DIRETLY PASS USER INPUTS FOR UPDATE KEY AND VALUE
    // Use strict variable keys to avoid injection attacks 
    export const mutateUser = async ( userId, updates ) => {
        const filledParams = dynamicMutate(userId, updates)
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
    const batchUpdateUsersTransaction = async (items) => {
        const params = batchUpdateWithTransaction(items);
        try {
            const data = await client.send(new TransactWriteItemsCommand(params));
            console.log("Batch update with transaction succeeded:", data);
        } catch (error) {
            console.error("Batch update with transaction failed:", error);
        }
    };

// batch update without transaction 
    const batchUpdateUsers = async (items) => {
        const filledParams = batchUpdateParams(items);
        try {
            const command = new BatchWriteCommand(filledParams);
            await DynamoDBClientDev.send(command);
            console.log('User sessions updated successfully');
        } catch (error) {
            console.error('Error updating user sessions:', error);
        }
    };

// #endregion----------------------------------------------------------------S



// #region DELETORS ----------------------------------------------------

// delete user by userId
    export const deleteUser = async ( userId ) => {
        const filledParams = deleteParams(userId)
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
    const batchDeleteUsers = async (userIds) => {
        const filledParams = batchDeleteParams(userIds);
        try {
            const command = new BatchWriteCommand(filledParams);
            await DynamoDBClientDev.send(command);
            console.log('User sessions deleted successfully');
        } catch (error) {
            console.error('Error deleting user sessions:', error);
        }
    };
// #endregion----------------------------------------------------------------S



export default { 
    getUser, 
    globalSecondaryData,
    batchGetUsersItems, 
    batchGetUsers,
    putUser, 
    batchPutUsers, 
    batchPutUsersTransaction,
    mutateUser, 
    batchUpdateUsersTransaction,
    batchUpdateUsers,
    deleteUser, 
    conditionalDeleteUser,
    batchDeleteUsers
};
    



//---------------------------------------------------------------------------------

    // update function for incremental changes 
        // rather than replacing the entire item, an updateUserField could allow 
        // you to incrementally update specific fields useing the update command 

