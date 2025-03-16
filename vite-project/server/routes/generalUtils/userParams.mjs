const tableName = process.env.UTABLE;

   
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                
                /* USER TABLE PARAMETERS AND SWITCH CASE */
    /* Creating the parameters for the user table global secondary indexes */

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// IMPORTANT NOTES:
    // The parameters are used to query the DynamoDB database for user data.
        // Mutations cannot be made with gsis and multiple gsis would require multiple calls. 
        // GSI's cannot be used for batch operations. 



// #region PREFERENCES --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// All preference information by latest ID
    const preferencesIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'PreferencesIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'preferencesId, preferencesChangesMade'
    })
    const preferencesGeneralIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'PreferencesGeneralIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'preferencesId, preferencesChangesMade, colors, darkMode, language, user, deviceType, location'
    })

// All theme related preferences by latest ID 
    const preferencesThemeIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'PreferencesThemeIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'colors, darkMode, language, user'
    })

    //#endregion --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region LOCATION --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// All location related preferences by latest ID
    // does nothave to be seperated from the remainder of preferences since its all on the same row regardless 
        // think x and y plot rather than groupings on information 
    const LocationIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'PreferencesLocationIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'deviceType, location'
    })

    // #endregion LOCATION --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region INTERACTIVITY ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Interactivity ID
    const interactivityIdIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'InteractivityIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'interactivityId, interactivityChangeMade'
    })

// All Interactivity information by latest ID
    const interactivityGeneralIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'InteractivityGeneralIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'cart, wishlists, recentlyViewed, lovedItems, queries, errors, pageState, scrollDepth, currentPage'
    })

// All Interactivity Page History by latest ID
    const interactivityPageHistoryIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'InteractivityPageHistoryIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'interactivityId, interactivityChangeMade, scrollDepth, pageState, currentPage, queries, errors'
    })
    // user 

    // #endregion INTERACTIVITY ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region USER --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// User ID
    const userIdIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'UserIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'userInfoId, userChangeMade, email, phone'
    })

// All User information by latest ID
    const userGeneralIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'UserGeneralIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'userInfoId, userChangeMade, firstName, lastName, role, isAdmin, is Authenticated, token, email, phone'
    })

// All User Personal information by latest ID
    const userPersonalIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'UserPersonalIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'userInfoId, userChangeMade, firstName, lastName, email, phone'
    })

// All User Admin information by latest ID
    const userRoleIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'UserRoleIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'userInfoId, userChangeMade, role, isAdmin, isAuthenticated, token'
    })

    // #endregion USER --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region NOTIFICATION ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Notification ID
    const notificationIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'NotificationIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'notificationId, notificationType'
    })

// All Notification information by latest ID
    const notificationGeneralIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'NotificationGeneralIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'title, isRead, message, createdAt, updatedAt'
    })

// All Notification Mini information by latest ID
    const notificationMiniIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'NotificationMiniIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'title, isRead, message'
    })

    // #endregion NOTIFICATION ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region SESSION --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Session ID
    const sessionIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'SessionIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'sessionId, DestroyAt'
    })

// All Session Duration information by latest ID
    const sessionDurationIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'SessionDurationIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'sessionId, DestroyAt, sessionDuration, sessionUpdatedAt, sessionDuration, sessionDestroyAt'
    })

// All Session Activity information by latest ID
    const sessionActvityIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'SessionActivityIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'sessionId, sessionUdatedAt, sessionDestroyAt'
    })

// All Session Entry information by latest ID
    const sessionEntryIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'SessionEntryIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'ALL'
    })

// All Session Re-Entry information by latest ID
    const sessionReEntryIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'SessionReEntryIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'sessionDestroyAt, sessionId, userInfoId, userInfoChangeMade, userChangeMade, preferencesId, preferencesChangeMade, deviceType, location, interactivityId, interactivityChangeMade, notificationId'
    })

   
    // #endregion SESSION --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region SWITCH CASE ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // usage of the switch case to determine the proper indexName
    // const filledParams = paramsSwitch('preferencesIndex')
const userParamSwitch = (params) => {
        switch (params) {
            case 'preferencesIndex':
                return preferencesIndex;
            case 'preferencesGeneralIndex':
                return preferencesGeneralIndex;
            case 'preferencesThemeIndex':
                return preferencesThemeIndex;
            case 'preferencesLocationIndex':
                return preferencesLocationIndex;
            case 'interactivityIdIndex':
                return interactivityIdIndex;
            case 'interactivityGeneralIndex':
                return interactivityGeneralIndex;
            case 'interactivityPageHistoryIndex':
                return interactivityPageHistoryIndex;
            case 'userIdIndex':
                return userIdIndex;
            case 'userGeneralIndex':
                return userGeneralIndex;
            case 'userPersonalIndex':
                return userPersonalIndex;
            case 'userRoleIndex':
                return userRoleIndex;
            case 'notificationIndex':
                return notificationIndex;
            case 'notificationGeneralIndex':
                return notificationGeneralIndex;
            case 'notificationMiniIndex':
                return notificationMiniIndex;
            case 'sessionIndex':
                return sessionIndex;
            case 'sessionDurationIndex':
                return sessionDurationIndex;
            case 'sessionActvityIndex':
                return sessionActvityIndex;
            case 'sessionEntryIndex':
                return sessionEntryIndex;
            case 'sessionReEntryIndex':
                return sessionReEntryIndex;
            default:
                return null;
        }
    }
    // #endregion SWITCH CASE ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



export default { 
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
 };



//--------------------------------------------------------------------------------------------------------------------------------
// TO USE 
// Pass through paramsswitch case to determine proper indexName,
// pass the params through as params(userId) whenever used 

// This file contains the user parameters for the DynamoDB queries.

// The user parameters are used to query the DynamoDB database for user data.
// The user parameters include the index name, key condition expression, projected expression, and expression attribute values.

// need index name, key condition expression, projected expression, and expression attribute values

// example import:
// import { preferencesIndex, preferencesId, preferencesGeneral, preferences... } from './userParams.js';