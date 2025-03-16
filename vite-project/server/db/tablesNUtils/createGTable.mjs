// Initialize the DynamoDB client
const GTableName = process.env.GTABLE;


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

                        /* STORE TABLE PARAMETERS */
        /* The parameter settings the DynamoDB Store Table */

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


const paramsGTable = {
    TableName: GTableName,
    KeySchema: [
        { AttributeName: 'userId', KeyType: 'HASH' },      // Partition key: userId
        { AttributeName: 'stateId', KeyType: 'RANGE' }     // Sort key: stateId
    ],
    AttributeDefinitions: [
        { AttributeName: 'userId', AttributeType: 'S' },   // String type for userId
        { AttributeName: 'stateId', AttributeType: 'S' },  // String type for stateId (unique for each persistent state)
        // make one for all indexes
        { AttributeName: 'sessionRentry', AttributeType: 'S' },  // 
        // all filters 
        { AttributeName: 'filters', AttributeType: 'S' },
        // form state
        { AttributeName: 'formState', AttributeType: 'S' },
        // page state
        { AttributeName: 'pageState', AttributeType: 'S' },
        // cart state
        { AttributeName: 'cartState', AttributeType: 'S' },
        // wishlist state
        { AttributeName: 'wishlistState', AttributeType: 'S' },
        // lovedItems state
        { AttributeName: 'lovedItemsState', AttributeType: 'S' },
        // recentlyViewed state
        { AttributeName: 'recentlyViewedState', AttributeType: 'S' },
        // recommendedItems state
        { AttributeName: 'recommendationsState', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,   // Adjust for traffic
        WriteCapacityUnits: 5
    },
    GlobalSecondaryIndexes: [
        {
            IndexName: 'stateIdIndex',  // Index for stateId
            KeySchema: [
                { AttributeName: 'stateId', KeyType: 'HASH' }
            ],
            Projection: {
                ProjectionType: 'ALL'
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
            IndexName: 'sessionRentryIndex',  // Index for sessionRentry
            KeySchema: [
                { AttributeName: 'sessionRentry', KeyType: 'HASH' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'stateId', 
                    'lastUpdated', 
                    'filterId', 
                    'formId', 
                    'pageId', 
                    'cartId', 
                    'wishlistId', 
                    'lovedItemsId', 
                    'recentlyViewedId', 
                    'recommendationsId'
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
            IndexName: 'filtersIndex',  // Index for filters
            KeySchema: [
                { AttributeName: 'filters', KeyType: 'HASH' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'filterId',
                    'filterCategories',
                    'filterPromotions',
                    'filterKeywords',
                    'filterPriceRange',
                    'filterRatings',
                    'filterSeasons',
                    'filterDiscounts',
                    'filterSortBy',
                    'filterViewMode',
                    'filterFeatured',
                    'filterLoved',
                    'filterRecentlyViewed',
                    'filterWishlist'
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
            IndexName: 'formStateIndex',  // Index for formState
            KeySchema: [
                { AttributeName: 'formState', KeyType: 'HASH' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'formState'
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
            IndexName: 'pageStateIndex',  // Index for pageState
            KeySchema: [
                { AttributeName: 'pageState', KeyType: 'HASH' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'pageState'
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
            IndexName: 'cartStateIndex',  // Index for cartState
            KeySchema: [
                { AttributeName: 'cartState', KeyType: 'HASH' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'cartMeta'
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
            IndexName: 'wishlistStateIndex',  // Index for wishlistState
            KeySchema: [
                { AttributeName: 'wishlistState', KeyType: 'HASH' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'wishlistMeta'
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
            IndexName: 'lovedItemsStateIndex',  // Index for lovedItemsState
            KeySchema: [
                { AttributeName: 'lovedItemsState', KeyType: 'HASH' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'lovedItemsMeta'
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
            IndexName: 'recentlyViewedStateIndex',  // Index for recentlyViewedState
            KeySchema: [
                { AttributeName: 'recentlyViewedState', KeyType: 'HASH' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'recentlyViewedMeta'
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
            IndexName: 'recommendationsStateIndex',  // Index for recommendationsState
            KeySchema: [
                { AttributeName: 'recommendationsState', KeyType: 'HASH' }
            ],
            Projection: {
                ProjectionType: 'INCLUDE',
                NonKeyAttributes: [
                    'recommendationsMeta'
                ]
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        }
    ]
};


export default { paramsGTable, GTableName };

// Benefits of This Structure:
// 1. **Persistent State with `stateId`**: With `stateId` as the sort key, user data within `stateId` can be retrieved even if the session changes, allowing continuous access to the state.
// 2. **Detailed Tracking**: Additional metadata like `productId` and `timestamp` enable fine-grained tracking of product interactions and chronological events within a state.
// 3. **Scalable Configuration**: You can adjust the throughput values based on real usage needs, ensuring the table can handle expected read and write traffic.

// export default { paramsSTable, GTableName };

// the state id is the unique identifier for each persistent state, allowing you to store and retrieve user data even if the session changes. 
// This structure enables detailed tracking of product interactions and chronological events within a state, and it can be scaled based on real usage needs.


// the primary uses of the store table 
    // Cart Contents: Items in the user’s cart or wishlist can be stored using stateId.
    // Filters: Any filtering or sorting preferences the user applied.
    // Promotions and Keywords: User-specific promotions, applied discounts, or keywords they’re interested in.
    // Page and UI State: UI preferences, such as dark mode settings or last viewed items.