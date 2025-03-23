
// MAY NEED TO FLATTEN THE STATE

// add cp;prs. add subscriptions, add subsribers, add user settings

const initialState = {
        
useerId: 0,
sessionId: 0,
// #region user --------------------------------------------------------------------------------------------------------
    UserInfoId: 0, // Unique identifier for the user
    UserChangeMade: "", // Track if the user has made any changes
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    isAdmin: false,
    role: "", // User's role (e.g., admin, user, guest)
    // Keep the role attribute. This enables flexibility if you expand user roles beyond admin or non-admin in the future (e.g., moderator, premium member).
    // included for granular access without constantly having to check isAdmin
    // use in tandem with is authneticated
    // isAuthenticated should be cheked if
    // the user is attempting to perform admin actions within 30 minute timespans from last action to latest action
    //if the user is making nonstop changes every 20 changes
    // if the user is making changes every >2 minutes
    token: "", // Secure token for authentication
    isAuthenticated: false,
    userDemographics: {
        age: 100000,
        language: "",
        interests: [],
    },

        // #endregion user --------------------------------------------------------------------------------------------------------



// #region preferences
    // run read to check for changes upon login not for sessions
    // changes, saves, updates when location changes, logins, or user changes
    // for notification, can be loaded on each session start and updated at regular intervals
    // changes when a user needs to send a notification and when notifications are available to the user        interactivityId: 0, // Unique identifier for the user's interactivity
    PreferencesId: 0, // Unique identifier for the user's preferences
    preferencesChangeMade: "", // Track if the user has made any changes
    colors: "", // Store user's theme preference
    darkMode: false, // Store user's dark mode preference
    user: [], // Store user's preferences
    language: "", // Store user's language preference
    // add currency in the future
    deviceType: "", // Store user's device type (e.g., mobile, desktop)
    location: {
        // Store user's location details
        country: "",
        timezone: "",
    },

        // #endregion preferences --------------------------------------------------------------------------------------------------------



// #region interactivity --------------------------------------------------------------------------------------------------------
    interactivityId: 0,
    interactivityChangeMade: "", // Track if the user has made any changes
    cart: [
        {
            productId: "",
            quantity: 0,
            timestamp: Date.now(),
                },
    ], // Store user's cart items
    lovedItems: [
        {
            productId: "",
            timestamp: Date.now(),
        },
    ], // Store user's favorite items
    wishlist: [
        {
            id: "",
            products: [
                    {
                    productId: "",
                    timestamp: Date.now(),
                    quantity: 0,
                }
            ],
        },
    ], // Store user's wishlists
    recentlyViewed: [
        {
            products: [
                    {
                    productId: "",
                    timestamp: Date.now(),
                }
            ],
        },
    ],
    currentPage: "/", // Track the current page the user is on
    scrollDepth: [], // Track the scroll depth on the last visited page
    // saves and updates when the user adds, removes, or updates items
    // saves scroll depth on page change
    queries: [
        {
            query: "",
            timestamp: Date.now(),
        },
    ],
    errors: [
        {
            error: "",
            timestamp: Date.now(),
        },
    ],
    pageState: {},

        // #endregion interactivity --------------------------------------------------------------------------------------------------------



// #region session --------------------------------------------------------------------------------------------------------
    sessionId: "",
    // Unique identifier for the current session
    // unique identifier for the session will be userid and session start time / UUID / i.p. address and timestamp
    sessionCreatedAt: "",
    sessionUpdatedAt: "",
    sessionDuration: 0,
    sessionTimeout: 0,
    sessionDestroyAt: "",
    // saves and updates when user logs in, logs out, or session expires

        // #endregion session --------------------------------------------------------------------------------------------------------



// #region notifications --------------------------------------------------------------------------------------------------------
    notificationId: 0,
    title: "",
    message: "",
    type: "", // e.g., info, warning, error
    isRead: false,
    createdAt: "",
    updatedAt: "",

        // #endregion notifications --------------------------------------------------------------------------------------------------------

// notes
    // saves and updates when user logs in, logs out, or session expires
    // saves and updates session duration and timeout
};

export default initialState;
