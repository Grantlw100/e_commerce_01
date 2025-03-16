




export const initialState = {
// partiotionKey
eventType: "",
// sortKey
timestampSessionId: "",

// #region keyType - page interactions --------------------------------------------------------------------------------------------------------
// pageInteractions
    // sort key duration and eventType
        // duration and category allow me to query data by time frams and events 
    // partition key is the Session ID and beginning timeStamp
    // composite sort key include 
        //event type
            // for event type 
                // ofw: page, yawe: user, xer: cart, oeisy: product, auib: session
        // start time 16 character uuid and end time 16 character uuid
        // user ID at end of the sort key
    page: "",
    pageDuration: 0,
    pageEntryPoint: "",
    pageEntryTime: 0,
    pageExitPoint: "",
    pageExitTime: 0,
    scrollDepths: [],
    clickEvents: [
        {
            timestamp: Date.now(),
            element: "",
        },
    ],
    customEvents: [
        {
            timestamp: Date.now(),
            event: "",
        },
    ],
    pageFeedback: [
        {
            item: "",
            timestamp: Date.now(),
            feedback: "",
        },
    ],
    formSubmissions: [
        {
            timestamp: Date.now(),
            form: "",
        },
    ],
    searchQueries: [
        {
            timestamp: Date.now(),
            query: "",
        },
    ],
    pageWhiteSpace: [
        {
            timestamp: Date.now(),
            length: 0,
        },
    ],
    pageErrors: [
        {
            timestamp: Date.now(),
            error: "",
        },
    ],
    // #endregion keyType - page interactions --------------------------------------------------------------------------------------------------------



// #region keyType - user interactions --------------------------------------------------------------------------------------------------------
// userInteractions 
    userInfoId: "",
    // a user change has been made 
    device: "",
    location: {
        country: "",
        city: "",
        lat: "",
        long: "",
    },
    userDemographics: {
        age: 100000,
        language: "",
        interests: [],
    },
    // #endregion keyType - user interactions --------------------------------------------------------------------------------------------------------



// #region keyType - cart interactions --------------------------------------------------------------------------------------------------------
// cartInteractions
        // a cart change has been made      
    // viewed the product, searched for the product, purchased, add/remove to cart
        // revisited the product, add/remove wishlist and loved,
        //abandoned cart
        // will need to use sessionInteractions.sessionId if sent to the server
        // or if stored in a database
        // alternative is sending data by taking all values out of the object
        // and sending them to the server
        // alternative 2 is to remove the sessionId and other values from the object
        // now and leave all values in the same block within the initialState object
    cartId: "",
    added: [
        {
            productId: "",
            timestamp: Date.now(),
            quantity: 0,
            addRemove: 'added',

        },
    ],
    removed: [
        {
            productId: "",
            timestamp: Date.now(),
            quantity: 0,
            removeLocation: "",
        },
    ],
    purchased: [
        {
            productId: "",
            timestamp: Date.now(),
            quantity: 0,
        },
    ],
    abandoned: [
        {
            productId: "",
            timestamp: Date.now(),
            quantity: 0,
        },
    ],
    refunded: [
        {
            productId: "",
            timestamp: Date.now(),
            quantity: 0,
        },
    ],
    purchasedAt: Date.now(),
    // #endregion keyType - cart interactions --------------------------------------------------------------------------------------------------------



// #region keyType - product interactions --------------------------------------------------------------------------------------------------------
// productInteractions
    recommendationInteractions: [
        {
            createdAt: "",
            updatedAt: "",
            postedAt: "",
        },
    ],
    productPoints: [
        {
            recommendationId: "",
            timestamp: Date.now(),
            points: 0,
            actions: [],
        },
    ],
    detailPoints: [
        {
            type: "",
            name: "",
            timestamp: Date.now(),
            points: 0,
            actions: [],
        },
    ],
    userPoints: [
        {
            recommendationId: "",
            timestamp: Date.now(),
            points: 0,
            actions: [],
        },
    ],
        // #endregion keyType - product interactions --------------------------------------------------------------------------------------------------------



// #region keyType - session interactions --------------------------------------------------------------------------------------------------------

// sessionInteractions
    sessionId: "",
    sessionDuration: 0,
    sessionStartTime: Date.now(),
    // number that will save the amount of times the user has updated there session limit
    totalEvents: 0,
    sessionEndTime: null,
    // maybe change null due to a different value?
    sessionFlow: [],
    sessionRevisits: [],
    sessionWhiteSpaceEvents: 0,
    entryExitPoint: {
        entry: "",
        entryTime: Date.now(),
        exit: "",
        exitTime: Date.now(),
    },

    // #endregion keyType - session interactions --------------------------------------------------------------------------------------------------------



// #region keyType - query interactions --------------------------------------------------------------------------------------------------------
    queries: [
        {
            queryType: "",
            // probably change all the date.nows to actually contain an object 
            // reduce the failure of the state itself and hard code before the call is sent
            sent: Date.now(),
            received: '',
            error: false,
            statusCode: 0,
            queryResult: "",
            
        },
    ],

    // #endregion keyType - query interactions --------------------------------------------------------------------------------------------------------



// #region keyType - complexity interactions --------------------------------------------------------------------------------------------------------
    // NEW ADDITION FOR COMPLEXITY
    complexity: [
        {
            id: "",
            fieldName: 0,
            baseValue: 0,
            multipliers: "",
            allowedRoles: [],
            updatedBy: "",
            updatedAt: Date.now(),
        },
    ]
    // #endregion keyType - complexity interactions --------------------------------------------------------------------------------------------------------
};




// notes 
    // event type and timestamp for partition and sort keys
    // organize similar to the user iitial state grouping writes by events changed
    // organize reads similar to the user initial state grouping reads by events changed
