const UTable = process.env.UTable; // Table name from environment variables

//---------------------------------------------------------------------------------
                /* USER BATCH FUNCTIONS AND PARAMS */
    /* Creating CRUD batch requests and dynamic mutation parameters for CRUD requests */
//---------------------------------------------------------------------------------



/* #region SWITCHCASES ------------------------------------------------------ */

// switch cases for different tables
    // usage 
        // let partitionKeyName
        // let sortKey
        const keySchema = (tableName) => {
            switch (tableName) {
                case "user":
                    partitionKeyName = "userId";
                    sortKeyName = "sessionId";
                    break;
                case "analytics":
                    partitionKeyName = "eventType";
                    sortKeyName = "timestamp#sessionId";
                case "store":
                    partitionKeyName = "storeId";
                    sortKeyName = "productId";
                default:
                     if (tableName !== "user" || tableName !== "analytics" || tableName !== "store") {
                        return console.log("Table name not recognized");
                    } else {
                        return console.log("Tabble name recognized");
                    }
            };

        return { partitionKeyName, sortKeyName };

        };

// #region GETTERs ------------------------------------------------------

// Batch Get Command
        // usage 

            // const userSessions = [
            //     { partitionKeyName: "user1", sortKeyName: "session1" },
            //     { partitionKeyName: "user2", sortKeyName: "session2" },
            //     // Add more user sessions as needed
            // ];

            // const items = ["userId", "sessionId", "cartItems", "updateTimestamp"];

            // const params = batchGetParams(userSessions, items);
            // console.log(params);

        // All other getter functionality uses secondary global indexes to grab specific data from specific users 
    const batchGetItemsParams = (keys, items) => {
        // Array to store key objects for each user session
        const keyChain = keys.map(key => ({
            [partitionKeyName] : { S: `${key.partitionKey}` },
            [sortKeyName] : { S: `${key.sortKey}` }
        }));

        // Format ProjectionExpression as a comma-separated string of item names
        const projectionExpression = items.join(", ");

        // Define parameters for BatchGetItem
        const params = {
            RequestItems: {
                [tableName]: {
                    Keys: keyChain,
                    ProjectionExpression: projectionExpression
                }
            }
        };

        return params;
    };
        

// (batch) get users by userId (multiple users)
export const batchGetUsersParams = async (userIds) => {
    const filledParams = {
        // items from the table to be requested 
        RequestItems: {
            // table name and keys to be requested
            [UTable]: {
                // mapping the userIds to the keys
                Keys: userIds.map(id => ({ userId: id })),
            }
        }
    };
    return filledParams;
};

    // #endregion ------------------------------------------------



// #region PUTTERs ------------------------------------------------------

// Batch Put Command
//usage 
            // const items = [
            //     {
            //         userId: { S: "user1" },
            //         sessionId: { S: "session1" },
            //         cartItems: { S: JSON.stringify(["item1", "item2"]) },
            //         updateTimestamp: { N: `${Date.now()}` }
            //     },
            //     {
            //         userId: { S: "user2" },
            //         sessionId: { S: "session2" },
            //         cartItems: { S: JSON.stringify(["item3", "item4"]) },
            //         updateTimestamp: { N: `${Date.now()}` }
            //     }
            //     // Add more items as needed
            // ];

            // const params = batchPutParams("YourTableName", items);
            // console.log(params);
    const batchPutParams = (items) => {
        // Transform each item into a PutRequest format for BatchWriteItem
        const putRequests = items.map(item => ({
            PutRequest: {
                Item: item
            }
        }));

        // Define parameters for BatchWriteItem
        const params = {
            RequestItems: {
                [UTable]: putRequests
            }
        };

        return params;
    };

// Batch PUT with transaction
    // creating new users 
           // each item is added only if every item in the batch is added 
            // adjust condition expression as needed 
    const batchPutWithTransaction = async (items) => {
        const transactItems = items.map((item) => ({
            Put: {
            TableName: tableName,
            Item: item,
            ConditionExpression: "attribute_not_exists(userId)" // Ensures item is only added if it doesn’t already exist
            }
    }));

    const params = {
        TransactItems: transactItems
    };

    return params;
    };
    

// Put command 
        // usage
                // const item = {
                //     userId: { S: "user1" },
                //     sessionId: { S: "session1" },
                //     cartItems: { S: JSON.stringify(["item1", "item2"]) },
                //     updateTimestamp: { N: `${Date.now()}` }
                // };

                // const params = putParams(item);
                // console.log(params);
    const putParams = async (item) => {
        const params = {
            TableName: tableName,
            Item: item
        };
    
        return params;
    };                   
    

    // #endregion ------------------------------------------------



// #region DYNAMIC MUTATE ----------------------------------------------------


// Dynamic Mutate for all updates 1 - any number of updates for a single session item 
        // Usage
            // const params = dynamicMutate('user123', { sessionDuration: 45, lastLogin: '2024-01-01T12:00:00Z' });
            // 100 items per request limit
    const dynamicMutate = (userId, updates) => {
        // taking the updates object and splitting it into keys and values
        const updateKeys = Object.keys(updates);
        // setting the update expression to the keys and values
            // example of result = 'set sessionDuration = :value0, lastLogin = :value1'
        const UpdateExpression = 'set ' + updateKeys.map((key, i) => `${key} = :value${i}`).join(', ');
        // setting the expression attribute values to the values
            // expression attribute values are the values that are being updated
                // example of result = { ':value0': 45, ':value1': '2024-01-01T12:00:00Z' }
        const ExpressionAttributeValues = updateKeys.reduce((acc, key, i) => {
            // setting the value to the key
            acc[`:value${i}`] = updates[key];
            // returning the accumulator
                // the accumulator is the object that is being updated
            return acc;
        }, {});

        return {
            TableName: tableName,
            Key: { userId: userId },
            UpdateExpression,
            ExpressionAttributeValues,
            ReturnValues: 'ALL_NEW'
        };
    };
        
        // #endregion----------------------------------------------------------------S DYNAMIC MUTATE ----------------------------------------------------
 


// #region UPDATERs ------------------------------------------------------

// batch update with transactioin
    // usage
        // const updates = [
        //     {
        //         userId: "user1",
        //         sessionId: "session1",
        //         updateKey: "cartItems",
        //         updateValue: { S: JSON.stringify(["newItem1", "newItem2"]) }
        //     },
        //     {
        //         userId: "user2",
        //         sessionId: "session2",
        //         updateKey: "cartItems",
        //         updateValue: { S: JSON.stringify(["newItem3", "newItem4"]) }
        //     }
        //     // Add more updates as needed
        // ];
        //Each Update operation in the transaction ensures the item exists (using ConditionExpression).
        // This setup allows you to increment or change values on multiple items in an atomic way.
    const batchUpdateWithTransaction = async (updates) => {
        const transactItems = updates.map((update) => ({
        Update: {
            TableName: "YourTableName",
            Key: { userId: { S: update.userId }, sessionId: { S: update.sessionId } },
            UpdateExpression: `SET ${update.updateKey} = :value`,
            ExpressionAttributeValues: {
            ":value": update.updateValue
            },
            ConditionExpression: "attribute_exists(userId)" // Ensures the item exists before updating
        }
        }));
    
        const params = {
        TransactItems: transactItems
        };

        return params;
    }

// batch update without transaction

            // usage 
                // const items = [
                //     {
                //         userId: { S: "user1" },
                //         sessionId: { S: "session1" },
                //         cartItems: { S: JSON.stringify(["newItem1", "newItem2"]) },
                //         updateTimestamp: { N: `${Date.now()}` }
                //     },
                //     {
                //         userId: { S: "user2" },
                //         sessionId: { S: "session2" },
                //         cartItems: { S: JSON.stringify(["newItem3", "newItem4"]) },
                //         updateTimestamp: { N: `${Date.now()}` }
                //     }
                //     // Add more items as needed
                // ];

                // const updateParams = batchUpdateParams("YourTableName", items);
                // console.log(updateParams);
    const batchUpdateParams = (items) => {
        // Transform each item into a PutRequest format for BatchWriteItem
        const putRequests = items.map(item => ({
            PutRequest: {
                Item: item
            }
        }));

        const params = {
            RequestItems: {
                [UTable]: putRequests
            }
        };

        return params;
    };

    // #endregion ------------------------------------------------



// #region DELETERs ------------------------------------------------------

// Batch Delete Command

    // usage
        // const items = [
        //     {
        //         userId: { S: "user1" },
        //         sessionId: { S: "session1" }
        //     },
        //     {
        //         userId: { S: "user2"
        //         sessionId: { S: "session2" }
        //     }
        //     // Add more items as needed
        // ];

    // const deleteParams = batchDeleteParams("YourTableName", items);
    // console.log(deleteParams);
    const batchDeleteParams = (userIds) => {
        // Transform each item into a DeleteRequest format for BatchWriteItem
        const deleteRequests = userIds.map(userId => ({
            DeleteRequest: {
                Key: { userId: { S: userId } }
            }
        }));

        // Define parameters for BatchWriteItem
        const params = {
            RequestItems: {
                [UTable]: deleteRequests
            }
        };

        return params;
    };

// DELETE PARAMS
const deleteParams = (userId) => {
    const params = {
        TableName: UTable,
        Key: { userId }
    };
    return params;
};

    // #endregion ------------------------------------------------

export default {
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
};