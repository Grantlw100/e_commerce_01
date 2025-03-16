// Initiate the DynamoDB table for user sessions
export const UTableName = process.env.UTABLE;




//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

                    /* USER TABLE PARAMETERS */
        /* The parameter settings the DynamoDB User Table */

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


export const paramsUTable = {
    TableName: UTableName,
    KeySchema: [
        { AttributeName: "userId", KeyType: "HASH" },  // Partition key
        { AttributeName: "sessionId", KeyType: "RANGE" },  // Sort key],
    ],
    AttributeDefinitions: [
        { AttributeName: "userId", AttributeType: "S" },
        { AttributeName: "sessionId", AttributeType: "N" },
        // all
        { AttributeName: "sessionEntry", AttributeType: "S" },
        // run check for changes 
        { AttributeName: 'sessionReEntry', AttributeType: 'S' },  // For session index

        // preferences
        { AttributeName: 'preferencesId', AttributeType: 'S' },  // For preferences index
        { AttributeName: 'preferencesGeneral', AttributeType: 'S' },  // For preferences index
        { AttributeName: 'preferencesTheme', AttributeType: 'S' },     // For interactivity index
        { AttributeName: 'preferencesLocation', AttributeType: 'S' },  // For notifications index
        // interactivity
        { AttributeName: 'interactivityId', AttributeType: 'S' },  // For interactivity index
        { AttributeName: 'interactivityGeneral', AttributeType: 'S' },  // For preferences
        { AttributeName: "interactivityPageHistory", AttributeType: "S" },  // For interactivity index
        // notification
        { AttributeName: 'notificationMini', AttributeType: 'S' },  // For brief notification information. notification previews 
        { AttrbiuteName: "notificationId", AttributeType: "S" },  // For notifications index
        { AttributeName: 'notificationGeneral', AttributeType: 'S' },  // For notifications index
        // User Related Indexes 
        { AttributeName: 'userGeneral', AttributeType: 'S' },  // For user index
        { AttributeName: 'userInfoId', AttributeType: 'S' },  // For user index
        { AttributeName: 'userPersonal', AttributeType: 'S' },  // For user index
        { AttributeName: 'userRole', AttributeType: 'S' },  // For user index
        // Session Indexes
        { AttributeName: 'sessionId', AttributeType: 'S' },  // For session index
        { AttributeName: 'sessionGeneral', AttributeType: 'S' },  // For session index
        { AttributeName: 'sessionDuration', AttributeType: 'S' },  // For session index
        { AttributeName: 'sessionLocation', AttributeType: 'S' },  // For session index
        { AttributeName: 'sessionUpdate', AttributeType: 'S' },  // For session index
    ],    //     { AttributeName: 'titlesTypesRead', AttributeType: 'S' },  // For notifications index    
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    },
    GlobalSecondaryIndexes: [
            // Preferences Indexes
        {
            IndexName: 'PreferencesIndex',
            KeySchema: [
                { AttributeName: 'userId', KeyType: 'HASH' },
                { AttributeName: 'preferencesId', KeyType: 'RANGE' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'preferencesId', // id of the preference
                    'preferencesChangeMade', // changes made by the user
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
            IndexName: 'PreferencesGeneralIndex',
            KeySchema: [
                { AttributeName: 'userId', KeyType: 'HASH' },
                { AttributeName: 'preferencesGeneral', KeyType: 'RANGE' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'theme', // theme of the user
                    'darkMode', // dark mode preference of the user
                    'language', // language preference of the user
                    'user', // user preference
                    'deviceType', // device type of the user
                    'location' // location of the user
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
            IndexName: 'PreferencesThemeIndex',
            KeySchema: [
                { AttributeName: 'userId', KeyType: 'HASH' },
                { AttributeName: 'preferencesTheme', KeyType: 'RANGE' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'theme', 
                    'darkMode', 
                    'language', 
                    'user' 
                ]
            },
        },
        {
            IndexName: 'PreferencesLocationIndex',
            KeySchema: [
                { AttributeName: 'userId', KeyType: 'HASH' },
                { AttributeName: 'preferencesLocation', KeyType: 'RANGE' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'location', // location for the user
                    'deviceType' // device for the user
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        // Interactivity Indexes
        {
            IndexName: 'InterctivityIndex',
            KeySchema: [
                { AttributeName: 'userId', KeyType: 'HASH' },
                { AttributeName: 'interactivityId', KeyType: 'RANGE' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'interactivityId', // id of the interactivity
                    'interactivityChangeMade', // changes made by the user
                ]
                // more at bottom 
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
            IndexName: 'InteractivityGeneralIndex',
            KeySchema: [
                { AttributeName: 'userId', KeyType: 'HASH' },
                { AttributeName: 'interactivityGeneral', KeyType: 'RANGE' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'cart', // cart of the user
                    'wishlists', // wishlist of the user
                    'recentlyViewed', // recently viewed items by the user
                    'lovedItems', // loved items by the user
                    'queries', // queries made by the user
                    'errors', // errors made by the user
                    'pageState', // state of the page
                    'scrollDepth', // scroll depth of the page
                    'recentlyViewed', // recently viewed items by the user
                    'currentPage' // current page of the user
                ]
            },
        },
        {
            IndexName: 'InteractivityPageHistoryIndex',
            KeySchema: [
                { AttributeName: 'userId', KeyType: 'HASH' },
                { AttributeName: 'interactivityPageHistory', KeyType: 'RANGE' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'scrollDepth', // scrollDepth of the page
                    'pageState', // state of the page
                    'currentPage', // current page
                    'queries', // queries made on the page
                    'errors', // errors on the page
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        // User related indexes
        {
            IndexName: 'UserIndex',
            KeySchema: [
                { AttributeName: 'userId', KeyType: 'HASH' },
                { AttributeName: 'userInfoId', KeyType: 'RANGE' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'userInfoId', // id of the user
                    'userChangeMade', // changes made by the user
                    'isAuthenticated', // if the user is authenticated
                    'isAdmin', // if the user is an admin
                    'sessionDestroyAt' // time the session will destroy
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        { 
            IndexName: 'UserGeneralIndex',
            KeySchema: [
                { AttributeName: 'userId', KeyType: 'HASH' },
                { AttributeName: 'userGeneral', KeyType: 'RANGE' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'firstname', // username of the user
                    'lastname', // last name of the user
                    'email', // email of the user
                    'phone', // phone number of the user
                    'role', // role of the user
                    'isAdmin', // if the user is an admin
                    'isAuthenticated', // if the user is authenticated
                    'token' // token for the user
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
            IndexName: 'UserPersonalIndex',
            KeySchema: [
                { AttributeName: 'userId', KeyType: 'HASH' },
                { AttributeName: 'userPersonal', KeyType: 'RANGE' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'firstName', // name of the user
                    'lastName', // last name of the user
                    'email', // email of the user
                    'phone' // phone number of the user
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
            IndexName: 'UserRoleIndex',
            KeySchema: [
                { AttributeName: 'userId', KeyType: 'HASH' },
                { AttributeName: 'userRole', KeyType: 'RANGE' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'role', // role of the user
                    'isAdmin', // if the user is an admin
                    'isAuthenticated', // if the user is authenticated
                    'token' // token for the user
                ],
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        // Notification Indexes
        {
            IndexName: 'NotificationIndex',
            KeySchema: [
                { AttributeName: 'userId', KeyType: 'HASH' },
                { AttributeName: 'notificationId', KeyType: 'RANGE' }
            ],
            Projection: {
                ProjectionType: 'Include',
                NonKeyAttributes: [
                    'notificationId' // id of the latest notification
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
            IndexName: 'NotificationGeneralIndex',
            KeySchema: [
                { AttributeName: 'userId', KeyType: 'HASH' },
                { AttributeName: 'notificationGeneral', KeyType: 'RANGE' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'title', // title of the notification
                    'type', // type of the notification
                    'isRead', // if the notification has been read
                    'message', // message of the notification
                    'createdAt', // time the notification was created
                    'updatedAt' // time the notification was updated
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
            indexName: 'NotificationMiniIndex',
            KeySchema: [
                { AttributeName: 'userId', KeyType: 'HASH' },
                { AttributeName: 'notificationMini', KeyType: 'RANGE' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'title', // title of the notification
                    'type', // type of the notification
                    'isRead' // if the notification has been read
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        // Session Indexes
        {
            IndexName: 'SessionIndex',
            KeySchema: [
                { AttributeName: 'userId', KeyType: 'HASH' },
                { AttributeName: 'sessionId', KeyType: 'RANGE' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'sessionId', // id of the session
                    'sessionDestroyAt'
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
            IndexName: 'SessionDurationIndex',
            KeySchema: [
                { AttributeName: 'userId', KeyType: 'HASH' },
                { AttributeName: 'sessionDuration', KeyType: 'RANGE' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'sessionCreatedAt', // time the session was created
                    'sessionUpdatedAt', // time the session was updated
                    'sessionDuration', // duration of the session
                    'sessionDestroyAt' // time the session will destroy
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
            IndexName: 'SessionActivityIndex',
            KeySchema: [
                { AttributeName: 'userId', KeyType: 'HASH' },
                { AttributeName: 'sessionUpdate', KeyType: 'RANGE' }    
            ],
            projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'sessionUpdatedAt', // duration of the session
                    'sessionDestroyAt' // time the session will destroy
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
        IndexName: 'SessionEntryIndex',
        KeySchema: [
            { AttributeName: 'userId', KeyType: 'HASH' },
            { AttributeName: 'sessionEntry', KeyType: 'RANGE' }
        ],
        Projection: {
            ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        },
        },
        {
            IndexName: 'SessionReEntryIndex',
            KeySchema: [
                { AttributeName: 'userId', KeyType: 'HASH' },
                { AttributeName: 'sessionReEntry', KeyType: 'RANGE' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'sessionDestroyAt', // time the session will destroy
                    'userInfoId', // id of the user
                    'userChangeMade', // changes made by the user
                    'preferencesId', // id of the preference
                    'preferencesChangeMade', // changes made by the user
                    'deviceType', // device type of the user
                    'location', // location of the user
                    'notificationId', // id of the notification
                    'sessionId', // id of the session
                    'interactivityId', // type of interactivity
                    'interactivityChangeMade', // changes made by the user
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            },
        }
    ],
}


// export default {paramsUTable, UTableName};
// Benefits of This Structure:
// Session-based sorting: By using sessionId or timestamp as the sort key, you can store entire
// sessions in DynamoDB, allowing you to query not only by user but also by session.

// provisioned throughput defined
    // the provisioned throughput defines the read and write capacity units for the table
    // the read capacity units are the number of reads per second that the table can handle
        // for example, if the read capacity units are set to 5, the table can handle 5 reads per second
        // within 1 read capacity unit, you can read up to 4 KB of data per second
    // the write capacity units are the number of writes per second that the table can handle
        // for example, if the write capacity units are set to 5, the table can handle 5 writes per second  
        // within 1 write capacity unit, you can write up to 1 KB of data per second

// projection:  property in a DynamoDB index specifies which attributes from the main table are visible in that index
    // Controls the amount of data stored and retrieved by that index
    // ProjectionType: 'ALL' includes all attributes from the main table
    // ProjectionType: 'KEYS_ONLY' includes only the key attributes from the main table
    // ProjectionType: 'INCLUDE' includes only specific attributes from the main table
        // Projection: {
        //     ProjectionType: 'INCLUDE',
        //     NonKeyAttributes: ['attribute1', 'attribute2']
        // }
        // Use case for Projections 
            // **Reduced Storage**: By including only necessary attributes in the index, you can reduce storage costs and improve query performance.
            // **Data Privacy**: Exclude sensitive or unnecessary attributes from the index to maintain data privacy and security.
            // **Query Optimization**: Including frequently queried attributes in the index can speed up query performance by reducing the need to access the main table.
            // **Index Size**: Smaller indexes with fewer attributes can improve read and write performance, especially for large tables with high throughput.
            // **Cost Optimization**: By optimizing the index size and attributes, you can reduce DynamoDB costs associated with storage and read/write capacity units.
            // **Data Access**: Ensure that the index includes all necessary attributes for the queries you plan to run, balancing performance and storage requirements.
            // **Security**: Exclude sensitive or confidential attributes from the index to prevent unauthorized access to certain data fields.
            // **Performance**: Including frequently accessed attributes in the index can speed up query execution by reducing the need to access the main table.

// Global Secondary Indexes:
    // **Benefits of Global Secondary Indexes (GSIs)**:
        // **Query Flexibility**: GSIs allow you to query the table using different partition and sort keys, providing more flexibility in data access patterns.
        // **Performance Optimization**: By creating GSIs on frequently queried attributes, you can improve query performance and reduce the need for full table scans.
        // **Data Distribution**: GSIs enable data distribution across multiple partitions, improving scalability and parallel processing of queries.
        // **Index Size**: Smaller indexes with fewer attributes can improve read and write performance, especially for large tables with high throughput.
        // **Cost Optimization**: By optimizing the index size and attributes, you can reduce DynamoDB costs associated with storage and read/write capacity units.
        // **Data Access**: Ensure that the index includes all necessary attributes for the queries you plan to run, balancing performance and storage requirements.
        // **Security**: Exclude sensitive or confidential attributes from the index to prevent unauthorized access to certain data fields.
        // **Performance**: Including frequently accessed attributes in the index can speed up query execution by reducing the need to access the main table.
    // **Use Cases for Global Secondary Indexes**:
        // **User Queries**: Create GSIs on user-specific attributes like userId or email for efficient user-based queries.
        // **Role-Based Access**: Indexes on role or permission attributes can optimize queries for specific user roles or access levels.
        // **Time-Based Queries**: GSIs on timestamp or date attributes can improve performance for time-based queries or historical data analysis.
        // **Location-Based Queries**: Indexes on location or geospatial attributes can enhance queries related to user location or proximity.
        // **Category or Tag Queries**: GSIs on category or tag attributes can optimize queries for specific product categories or tags.
        // **Custom Queries**: Create GSIs based on custom attributes or data fields that are frequently queried in your application.
        // **Performance Optimization**: By creating GSIs on frequently queried attributes, you can improve query performance and reduce the need for full table scans.
        // **Data Distribution**: GSIs enable data distribution across multiple partitions, improving scalability and parallel processing of queries.
        // **Index Size**: Smaller indexes with fewer attributes can improve read and write performance, especially for large tables with high throughput.
        // **Cost Optimization**: By optimizing the index size and attributes, you can reduce DynamoDB costs associated with storage and read/write capacity units.

// ** Considerations after initial review**:
    // Ensure all attribute definitions used as hash or range keys in the indexes are declated in AttributeDefinitions
        // currently the preferences (secondary indexes) are not defined in the attribute defintions
        // added to reduce issues when table creation is ran 

    // Attribute naming convention 
        // consider renaming attributes sucha s preferncesgerneral to preferencesGeneral to reduce querying comlications
            //  in AttributeDefinitions, KeySchema, and NonKeyAttributes if using reserved characters (, @, etc.) in attribute names could complicate querying.
    // ProvisionedThroughput
        // consider adjusting the ReadCapacityUnits and WriteCapacityUnits based on expected traffic and usage patterns to optimize cost and performance.
    // Double check for Syntax error
        // ensure all syntax is correct and all required fields are provided to avoid errors during table creation.
    // Index Projection
        // ensure that the projection settings for each index are optimized for query performance and storage efficiency.


// TODO 
    // 1. **Session-based Sorting**: By using `sessionId` or `timestamp` as the sort key, you can store entire sessions in DynamoDB, allowing you to query not only by user but also by session.
    // 2. secondary indexes for based on fields like sessionId and ROle to improve performance for user specifc session queries and role based queries
