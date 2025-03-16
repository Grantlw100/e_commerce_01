const UTable = process.env.UTable
const GTable = process.env.GTable
const ATable = process.env.ATable
let partitionKey, sortKey, tableName



//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                /* TABLE FETCH REQUEST PARAMS */
    /* Creating params for all table  fetch request functions */

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region switch cases for different tables --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // usage 
    const keySchema = (table) => {
        switch (table) {
            case "user":
                partitionKey = "userId";
                sortKey = "sessionId";
                tableName = UTable;
                break;
            case "analytics":
                partitionKey = "eventType";
                sortKey = "timestamp#sessionId";
                tableName = ATable;
            case "store":
                partitionKey = "storeId";
                sortKey = "productId";
                tableName = GTable;
            default:
                throw new Error(`Table name "${table}" is not recognized.`);
        };

    return { partitionKey, sortKey };

    };

        // #endregion switch cases for different tables --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// #region GETTERs --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Get Command 
    const getItemParams = async (partitionKeyValue, sortKeyValue, table) => {
        const { partitionKey, sortKey, tableName } = keySchema(table);
        // Validate inputs
        if (!partitionKeyValue || typeof partitionKeyValue !== "string") {
            throw new Error("Invalid partition key value.");
        }
        if (!sortKeyValue || typeof sortKeyValue !== "string") {
            throw new Error("Invalid sort key value.");
        }
        if (!table || typeof table !== "string") {
            throw new Error("Invalid table name.");
        }
        if (!partitionKey || typeof partitionKey !== "string") {
            throw new Error("Invalid partition key.");
        }
        if (!sortKey || typeof sortKey !== "string") {
            throw new Error("Invalid sort key.");
        }

        const params = {
            TableName: tableName,
            Key: {
                [partitionKey]: partitionKeyValue,
                [sortKey]: sortKeyValue
            }
        };

        return params;
    };

// Batch Get Command
        // usage 
        // const tableName = "AnalyticsTable";
        // const keys = [
        //     { userId: "1", "sessionId": "202311021200#abc123" },
        //     { userId: "2", "sessionId": "202311021230#def456" }
        // ];
        // const fields = ["eventType", "timestamp#sessionId", "pageInteractions", "userInteractions"];
        
        // const params = batchGetFieldsParams(tableName, keys, fields);
        // console.log("Generated Params:", params);
    const batchGetItemFieldsParams = (table, keys, fields) => {
        // Create an array of key objects for each item
        const { partitionKey, sortKey, tableName } = keySchema(table);

        const keyChain = keys.map(key => ({
            [partitionKey]: { S: `${key.partitionValue}` },
            [sortKey]: { S: `${key.sortValue}` }
        }));
    
        // Define parameters for BatchGetItem
        const params = {
            RequestItems: {
                [tableName]: {
                    Keys: keyChain,
                    ProjectionExpression: fields.length > 0 ? fields.join(", ") : undefined // Include fields if provided
                }
            }
        };
    
        return params;
    };
            
// Batch Get Command with dynamic partition keys
    // usage
        // const PKeys = ["user1", "user2"];
        // const tableName = "user";
        
        // const params = await dynamicBatchGetByPartitionParams(PKeys, tableName);
        // console.log("Partition Key Params:", params);
    const dynamicBatchGetPartitionParams = async (PKeys, table) => {
        // Use keySchema to dynamically set the partition and sort keys
        const { partitionKey, tableName } = keySchema(table);

        if (!partitionKey) {
            throw new Error(`Partition key for table ${table} is not defined.`);
        }

        const filledParams = {
            RequestItems: {
                [tableName]: {
                    Keys: PKeys.map(PKey => ({
                        [partitionKey]: { S: PKey }
                    }))
                }
            }
        };

        return filledParams;
    };

// Batch Get command with dynamic partition and sort keys 
    // usage 
        // const keys = [
        //     { partitionValue: "eventTypeA", sortValue: "timestamp#sessionId1" },
        //     { partitionValue: "eventTypeB", sortValue: "timestamp#sessionId2" }
        // ];
        // const tableNameAnalytics = "analytics";
        
        // const paramsWithSortKeys = await dynamicBatchGetByKeysParams(keys, tableNameAnalytics);
        // console.log("Partition and Sort Key Params:", paramsWithSortKeys);
    const dynamicBatchGetPartitionSortParams = async (keys, table) => {
        const { partitionKey, sortKey, tableName } = keySchema(table);

        if (!partitionKey || !sortKey) {
            throw new Error(`Keys for table ${table} are not properly defined.`);
        }

        const filledParams = {
            RequestItems: {
                [tableName]: {
                    Keys: keys.map(key => ({
                        [partitionKey]: { S: key.partitionKeyValue },
                        [sortKey]: { S: key.sortKeyValue }
                    }))
                }
            }
        };

        return filledParams;
    };

// Batch get retrieves multiple items in a single request without knowing the sessionIds in advance
    //dynamicBatchGetTimeRange
    // usage
        // try {
        //     const partitionKey = "eventType";
        //     const table = "AnalyticsTable";
        //     const timestampRange = {
        //         startTimestamp: "2024-01-01T00:00:00Z",
        //         endTimestamp: "2024-01-07T23:59:59Z"
        //     };
        
        //     const params = dynamicBatchGetParams(partitionKey, table, timestampRange);
        //     console.log("Batch Get Params:", params);
        
        //     // Use the params in a BatchGetItemCommand
        //     const command = new BatchGetItemCommand(params);
        //     const result = await dynamoClient.send(command);
        //     console.log("Batch Get Result:", result.Responses);
        // } catch (error) {
        //     console.error("Error:", error.message);
        // }
    // 
        // notes on timeStampRange = {} at bottom of file
    const dynamicBatchGetTimeRangeParams = (partitionKey, table, timestampRange = {}, maxItems = 100) => {
        // Validate inputs
        if (!partitionKey || typeof partitionKey !== "string") {
            throw new Error("Partition key must be a valid string.");
        }
        if (!table || typeof table !== "string") {
            throw new Error("Table name must be a valid string.");
        }

        const { startTimestamp, endTimestamp } = timestampRange;

        // Validate timestamp range
        if (!startTimestamp || !endTimestamp) {
            throw new Error("Timestamp range must include both 'startTimestamp' and 'endTimestamp'.");
        }
        if (new Date(startTimestamp) > new Date(endTimestamp)) {
            throw new Error("'startTimestamp' cannot be after 'endTimestamp'.");
        }

        // Generate session IDs or placeholders (e.g., from a query or batch source)
        // generate or fetch these separately
                // array notes at bottom of file
        const sessionIds = Array.from({ length: maxItems }, (_, i) => `session-${i}`);
        // Create keys for BatchGetItem request
        const keys = sessionIds.map((sessionId) => ({
            [partitionKey]: partitionKey,
            timestampSessionId: `${startTimestamp}#${sessionId}`
        }));

        // Build batch get parameters
        const params = {
            RequestItems: {
                [table]: {
                    Keys: keys,
                    ProjectionExpression: "eventType, timestamp, sessionId, otherAttributes", // Adjust fields
                    FilterExpression: "#timestamp BETWEEN :start AND :end",
                    ExpressionAttributeNames: {
                        "#timestamp": "timestamp"
                    },
                    ExpressionAttributeValues: {
                        ":start": startTimestamp,
                        ":end": endTimestamp
                    }
                }
            }
        };

        return params;
    };


        // #endregion GETTERs --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        

// #region POSTERs --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
    const putParams = async (item, table) => {
        const { tableName } = keySchema(table)
        const params = {
            TableName: tableName,
            Item: item
        };
    
        return params;
    };                   
                
// Batch Put Command (BATCH WRITE can handle 25 items per call)
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
    const batchPutParams = (items, table) => {
        const { tableName } = keySchema(table)
        // Validate inputs
        if (!Array.isArray(items)) {
            throw new Error("Invalid input: 'items' must be an array.");
        }

        if (typeof table !== 'string' || !table) {
            throw new Error("Invalid input: 'table' must be a non-empty string.");
        }

        // Transform each item into a PutRequest format for BatchWriteItem
        const putRequests = items.map(item => {
            if (typeof item !== 'object' || item === null) {
                throw new Error("Invalid item: Each item must be a non-null object.");
            }
            return {
                PutRequest: {
                    Item: item
                }
            };
        });

        // Define parameters for BatchWriteItem
        const params = {
            RequestItems: {
                [tableName]: putRequests
            }
        };

        return params;
    };

// Batch PUT with transaction
    // creating new users 
           // each item is added only if every item in the batch is added 
            // adjust condition expression as needed 
    // usage
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
    // ];
    
    // const tableName = "YourTableName";
    // const partitionKey = "userId";
    
    // try {
    //     const params = await batchPutWithTransaction(items, tableName, partitionKey);
    //     console.log("Transaction Params:", params);
    //     // Call the DynamoDB transaction API with these params
    // } catch (error) {
    //     console.error("Error preparing transaction params:", error);
    // }
    const batchPutWithTransactionParams = async (items, table) => {
        const {partitionKey, tableName } = keySchema(table)

        // Validate inputs
        if (!Array.isArray(items) || items.length === 0) {
            throw new Error("Invalid input: 'items' must be a non-empty array.");
        }
    
        if (typeof table !== 'string' || table.trim() === "") {
            throw new Error("Invalid input: 'table' must be a non-empty string.");
        }
    
        if (typeof partitionKey !== 'string' || partitionKey.trim() === "") {
            throw new Error("Invalid input: 'partitionKey' must be a non-empty string.");
        }
    
        // Create transaction items
        const transactItems = items.map((item) => ({
            Put: {
                TableName: tableName,
                Item: item,
                ConditionExpression: `attribute_not_exists(${partitionKey})`, // Ensures item is only added if it doesn’t already exist
            }
        }));
    
        const params = {
            TransactItems: transactItems,
        };
    
        try {
            console.log("Transaction Parameters:", JSON.stringify(params, null, 2));
            return params;
        } catch (error) {
            console.error("Error generating batch put transaction params:", error);
            throw error;
        }
    };      

    // #endregion --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region DYNAMIC MUTATE --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Dynamic Mutate for all updates between 1 and any number of updates for a single session item 
        // Usage
            // 1. single key table 
                // const params = dynamicMutate(
                //     "UserTable",
                //     "userId",
                //     "user123",
                //     { sessionDuration: 45, lastLogin: '2024-01-01T12:00:00Z' }
                // );
            // 2. composite key table
                // const params = dynamicMutate(
                //     "AnalyticsTable",
                //     "eventType",
                //     "sessionOnAt02",
                //     { duration: 3600, updatedAt: '2024-01-01T12:00:00Z' },
                //     "timestamp#sessionId",
                //     "20231114T130000Z#session123"
                // );
            
            // const params = dynamicMutate('user123', { sessionDuration: 45, lastLogin: '2024-01-01T12:00:00Z' });
            // 100 items per request limit
    const dynamicMutate = (table,  partitionKeyValue, sortKeyNeeded, fields, sortKeyValue = null) => {
        // Validate inputs
        const { partitionKey, sortKey, tableName } = keySchema(table);
        if (!table || typeof table !== 'string') {
            throw new Error("Invalid table name.");
        }
        if (!partitionKey || typeof partitionKey !== 'string') {
            throw new Error("Invalid partition key.");
        }
        if (!partitionKeyValue) {
            throw new Error("Partition key value is required.");
        }
        if (!fields || typeof fields !== 'object' || Object.keys(fields).length === 0) {
            throw new Error("Fields to update must be a non-empty object.");
        }
    
        // Generate UpdateExpression and ExpressionAttributeValues
        const updateKeys = Object.keys(fields);
        const UpdateExpression = 'set ' + updateKeys.map((key, i) => `${key} = :value${i}`).join(', ');
        const ExpressionAttributeValues = updateKeys.reduce((acc, key, i) => {
            acc[`:value${i}`] = fields[key];
            return acc;
        }, {});
    
        // Define key structure
        const Key = sortKeyNeeded === true ? { [partitionKey]: partitionKeyValue, [sortKey]: sortKeyValue } : { [partitionKey]: partitionKeyValue };
    
        // Construct parameters
        const params = {
            TableName: tableName,
            Key,
            UpdateExpression,
            ExpressionAttributeValues,
            ReturnValues: 'ALL_NEW',
        };
    
        console.log("Generated Parameters:", JSON.stringify(params, null, 2));
    
        return params;
    };
                            
        // #endregion----------------------------------------------------------------S DYNAMIC MUTATE --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region PUTTERS --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// batch update with transactioin
    // usage
        // const updates = [
        //     {
        //         partitionKeyValue: "user1",
        //         sortKeyValue: "session1",
        //         updateKey: "cartItems",
        //         updateValue: { S: JSON.stringify(["newItem1", "newItem2"]) }
        //     },
        //     {
        //         partitionKeyValue: "user2",
        //         sortKeyValue: "session2",
        //         updateKey: "cartItems",
        //         updateValue: { S: JSON.stringify(["newItem3", "newItem4"]) }
        //     }
        // ];
        
        // const table = "UserAnalytics";
        // const params = await batchUpdateWithTransaction("userId", "sessionId", updates, table);
        // console.log(params);
    //Each Update operation in the transaction ensures the item exists (using ConditionExpression).
        // This setup allows you to increment or change values on multiple items in an atomic way.
    const batchUpdateWithTransaction = async (updates, table) => {
        const { partitionKey, sortKey, tableName } = keySchema(table);
        // Validate inputs
        if (!Array.isArray(updates) || updates.length === 0) {
            throw new Error("Updates must be a non-empty array.");
        }
        if (!table || typeof table !== "string") {
            throw new Error("Table name must be a valid string.");
        }
        if (!partitionKey || typeof partitionKey !== "string") {
            throw new Error("Partition key must be a valid string.");
        }
        if (!sortKey || typeof sortKey !== "string") {
            throw new Error("Sort key must be a valid string.");
        }
    
        // Map updates to transaction items
        const transactItems = updates.map((update) => {
            // Validate required fields in each update object
            if (!update.partitionKey || !update.sortKey || !update.updateKey || update.updateValue === undefined) {
                throw new Error("Each update must include partitionKey, sortKey, updateKey, and updateValue.");
            }
    
            return {
                Update: {
                    TableName: tableName,
                    Key: { 
                        [partitionKey]: { S: update.partitionKeyValue }, 
                        [sortKey]: { S: update.sortKeyValue } 
                    },
                    UpdateExpression: `SET ${update.updateKey} = :value`,
                    ExpressionAttributeValues: {
                        ":value": update.updateValue
                    },
                    ConditionExpression: `attribute_exists(${partitionKey})` // Ensures the item exists before updating
                }
            };
        });
    
        const params = {
            TransactItems: transactItems
        };
    
        console.log("Generated Transaction Parameters:", JSON.stringify(params, null, 2));
    
        return params;
    };
        
    
// batch update without transaction
        // usage 
            // const updates = [
            //     {
            //         partitionKeyValue: "user123",
            //         sortKeyValue: "session456",
            //         updateKey: "cartItems",
            //         updateValue: JSON.stringify(["item1", "item2"])
            //     },
            //     {
            //         partitionKey: "user789",
            //         sortKey: "session987",
            //         updateKey: "sessionDuration",
            //         updateValue: 120
            //     }
            // ];
            
            // try {
            //     const params = batchUpdateParams(updates, "UserTable", "userId", "sessionId");
            //     console.log(params);
            // } catch (error) {
            //     console.error("Error creating batch update params:", error.message);
            // }
    const batchUpdateParams = (updates, table) => {
        const { partitionKey, sortKey, tableName } = keySchema(table);
        // Validate inputs
        if (!Array.isArray(updates) || updates.length === 0) {
            throw new Error("Updates must be a non-empty array.");
        }
        if (!table || typeof table !== "string") {
            throw new Error("Table name must be a valid string.");
        }
        if (!partitionKey || typeof partitionKey !== "string") {
            throw new Error("Partition key must be a valid string.");
        }
        if (!sortKey || typeof sortKey !== "string") {
            throw new Error("Sort key must be a valid string.");
        }
    
        // Validate each update
        updates.forEach(update => {
            if (
                !update ||
                typeof update !== "object" ||
                !update.partitionKeyValue ||
                !update.sortKey ||
                !update.updateKeyValue ||
                update.updateValue === undefined
            ) {
                throw new Error(
                    "Each update must be an object containing valid partitionKey, sortKey, updateKey, and updateValue."
                );
            }
        });
    
        // Transform updates into individual Update operations
        const updateRequests = updates.map(update => ({
            Update: {
                TableName: tableName,
                Key: { [partitionKey]: update.partitionKeyValue, [sortKey]: update.sortKeyValue },
                UpdateExpression: `SET ${update.updateKey} = :value`,
                ExpressionAttributeValues: {
                    ":value": update.updateValue
                },
                ConditionExpression: `attribute_exists(${partitionKey})` // Ensure the item exists before updating
            }
        }));
    
        // Define parameters for the transaction
        const params = {
            TransactItems: updateRequests
        };
    
        return params;
    };
    
        // #endregion --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    

        
// #region DELETORs --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// DELETE PARAMS PARTITION KEY
    // usage 
        // const partitionKeyValue = "user123";
    const deleteItemPartitionParams = (partitionKeyValue, table) => {
        const { tableName } = keySchema(table)

        const params = {
            TableName: tableName,
            Key: { partitionKeyValue }
        };
        return params;
    };

// DELETE PARAMS PARTITION AND SORT KEY
    // usage 
        // const partitionKeyValue = "userId";
        // const sortKeyValue = "sessionId";
        // const table = "UserTable";
        
        // try {
        //     const params = deleteItemParams(partitionKey, sortKey, table);
        //     console.log("Delete Item Params:", params);
        // } catch (error) {
        //     console.error("Error creating delete item params:", error.message);
        // }
    const deleteItemPartitionSortParams = ( partitionKeyValue, sortKeyValue, table) => {
        const { partitionKey, sortKey, tableName } = keySchema(table);
        // Validate inputs
        if (!table || typeof table !== "string") {
            throw new Error("Table name must be a valid string.");
        }
        if (!partitionKey || typeof partitionKey !== "string") {
            throw new Error("Partition key must be a valid string.");
        }
        if (!sortKey || typeof sortKey !== "string") {
            throw new Error("Sort key must be a valid string.");
        }

        const params = {
            TableName: tableName,
            Key: {
                [partitionKey]: partitionKeyValue,
                [sortKey]: sortKeyValue
            }
        };

        return params;
    };

// Batch Delete Command
    // usage
    // const PKeys = ["user123", "user456", "user789"];
    // const table = "UserTable";
    
    // try {
    //     const params = batchDeleteParams(partitionKey, PKeys, table);
    //     console.log("Batch Delete Params:", params);
    // } catch (error) {
    //     console.error("Error creating batch delete params:", error.message);
    // }
    const batchDeleteParams = (PKeys, table) => {
        const { partitionKey, tableName } = keySchema(table);
        // Validate inputs
        if (!Array.isArray(PKeys) || PKeys.length === 0) {
            throw new Error("PKeys must be a non-empty array.");
        }
        if (!table || typeof table !== "string") {
            throw new Error("Table name must be a valid string.");
        }
        if (!partitionKey || typeof partitionKey !== "string") {
            throw new Error("Partition key must be a valid string.");
        }
    
        // Transform each item into a DeleteRequest format for BatchWriteItem
        const deleteRequests = PKeys.map((key) => ({
            DeleteRequest: {
                Key: { [partitionKey]: key }
            }
        }));
    
        // Define parameters for BatchWriteItem
        const params = {
            RequestItems: {
                [tableName]: deleteRequests
            }
        };
    
        return params;
    };


        // #endregion --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



export default { 
    getItemParams, 
    batchGetItemFieldsParams, 
    dynamicBatchGetPartitionParams, 
    dynamicBatchGetPartitionSortParams, 
    dynamicBatchGetTimeRangeParams,
    batchPutParams, 
    batchPutWithTransactionParams, 
    putParams, 
    dynamicMutate, 
    batchUpdateWithTransaction, 
    batchUpdateParams, 
    batchDeleteParams, 
    deleteItemPartitionSortParams,
    deleteItemPartitionParams
}



// NOTES -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// array notes
    // Array.from(arrayLike[, mapFn[, thisArg]]);
        // The Array.from() method in JavaScript is used to create a new array from an array-like 
        // or iterable object. It can also include a mapping function to process elements during 
        // creation.
                // example: 
                    // // Convert a string into an array
                        // const strArray = Array.from("hello");
                        // console.log(strArray); // Output: ['h', 'e', 'l', 'l', 'o']

                        // // Convert a Set into an array
                        // const set = new Set([1, 2, 3]);
                        // const setArray = Array.from(set);
                        // console.log(setArray); // Output: [1, 2, 3]

                        // // Convert an object with a `length` property
                        // const obj = { 0: "a", 1: "b", length: 2 };
                        // const objArray = Array.from(obj);
                        // console.log(objArray); // Output: ['a', 'b']
            // arrayLike = length: maxItems - the number of items to retrieve up to 100 (DynamoDB limit)
                // An array-like or iterable object to convert into an array.
                    // Example 
                        // const squares = Array.from([1, 2, 3, 4], x => x * x);
                        // console.log(squares); // Output: [1, 4, 9, 16]
                        
                        // // Add index to elements
                        // const indexed = Array.from([10, 20, 30], (value, index) => `${index}: ${value}`);
                        // console.log(indexed); // Output: ['0: 10', '1: 20', '2: 30']
            // mapFn = (_, i) => `session-${i}` - the session ID format (e.g., 'session-1', 'session-2', etc.)
                // A mapping function that is called on each element of the array-like or iterable object
                // before it is added to the new array.
                // Example
                        // const multiplier = {
                        //     factor: 2,
                        //   };
                        
                        //   const doubled = Array.from([1, 2, 3], function (num) {
                        //     return num * this.factor;
                        //   }, multiplier);
                        
                        //   console.log(doubled); // Output: [2, 4, 6]    
            //(optional and unused) thisArg - the value to use as this when executing the map function 
                // A value to use as this when executing the mapFn.
                    // Example
                        // const multiplier = {
                        //     factor: 2,
                        //   };
                        
                        //   const doubled = Array.from([1, 2, 3], function (num) {
                        //     return num * this.factor;
                        //   }, multiplier);
                        
                        //   console.log(doubled); // Output: [2, 4, 6]
    


// time stamp range argument 
    // The timestampRange argument in the dynamicBatchGetParams function is set to an 
    // empty object ({}) by default for the following reasons:
        // 1. Optional Argument Handling
            // By setting timestampRange = {}, the parameter is optional. If the caller does 
            // not provide a timestampRange, the function can still run with default behavior.
            // For instance, without a timestamp range, you might fetch all items that match 
            // the partitionKey.
        // 2. Flexible Query Logic
            // The empty object allows you to dynamically construct the query based on the 
            // presence or absence of timestampRange. Inside the function, you can check 
            // whether a start or end timestamp exists and build the KeyConditionExpression or 
            // FilterExpression accordingly.
        // 3. Default Behavior for Missing Timestamps
            // If no timestampRange is provided, the function can behave as though the timestamp range is not 
            // constrained. For instance: The query might fetch all items for the given partitionKey.
            // A batch request could still retrieve items, but without filtering by timestamps.
            // This avoids errors and ensures the function is flexible enough to handle different scenarios.
        // 4. Enables Dynamic Use
            // By initializing timestampRange to an empty object, you allow the function to be used
            // for various queries:
                // Fetch all items for a partitionKey.
                // Fetch items within a specific timestamp range.
                // Fetch items starting from or ending at a certain timestamp.
                // This ensures the function is versatile and can adapt to different use cases.
        // 5. Example Usage
            // With a timestampRange:
                // const params = dynamicBatchGetParams(
                //     'user123', 
                //     'AnalyticsTable', 
                //     { start: '2024-01-01T00:00:00Z', end: '2024-01-02T00:00:00Z' }
                // );
                    // Fetches items within the specified timestamp range.
            // Without a timestampRange:
                // const params = dynamicBatchGetParams('user123', 'AnalyticsTable');
                // Fetches all items for 'user123' without filtering by timestamp.