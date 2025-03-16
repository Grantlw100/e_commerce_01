const tableName = process.env.STable
   
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
                
                /* STORE TABLE PARAMETERS AND SWITCH CASE */
    /* Creating the parameters for the store table global secondary indexes */

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

// IMPORTANT NOTES:
    // The parameters are used to query the DynamoDB database for store data.
        // Mutations cannot be made with gsis and multiple gsis would require multiple calls. 
        // GSI's cannot be used for batch operations. 


// return entire item 
    const stateIdIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'stateIdIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'ALL'
    })

// return ids to check for changes 
    const sessionRentryIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'sessionRentryIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'stateId, lastUpdated, filterId, formId, pageId, cartId, wishlistId, lovedItemsId, recentlyViewedId, recommendationsId'
    })

// return filters
    const filtersIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'filtersIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'filterId, filterCategories, filterPromotions, filterKeywords, filterPriceRange, filterRatings, filterSeasons, filterDiscounts, filterSortBy, filterViewMode, filterFeatured, filterLoved, filterRecentlyViewed, filterWishlist'
    })

// return form state for last form used 
    const formStateIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'formStateIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'formState'
    })

// return page state for last page used
    const pageStateIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'pageStateIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'pageState'
    })

// return cart state for last cart used
    const cartStateIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'cartStateIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'cartMeta'
    })

// return wishlist state for last wishlist used
    const wishlistStateIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'wishlistStateIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'wishlistMeta'
    })

// return loved items state for last loved items used
    const lovedItemsStateIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'lovedItemsStateIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'lovedItemsMeta'
    })

// return recommendations state for last recommendations used
    const recommendationsStateIndex = (userId) => ({
        TableName: tableName,
        IndexName: 'recommendationsStateIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId }
        },
        ProjectionExpression: 'recommendationsMeta'
    })


const storeParamSwitch = (params) => {
        switch (params) {
            case 'stateIdIndex':
                return stateIdIndex;
            case 'sessionRentryIndex':
                return sessionRentryIndex;
            case 'filtersIndex':
                return filtersIndex;
            case 'formStateIndex':
                return formStateIndex;
            case 'pageStateIndex':
                return pageStateIndex;
            case 'cartStateIndex':
                return cartStateIndex;
            case 'wishlistStateIndex':
                return wishlistStateIndex;
            case 'lovedItemsStateIndex':
                return lovedItemsStateIndex;
            case 'recommendationsStateIndex':
                return recommendationsStateIndex;
            default:
                return 'Invalid indexName';
        }
    }



export default { 
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