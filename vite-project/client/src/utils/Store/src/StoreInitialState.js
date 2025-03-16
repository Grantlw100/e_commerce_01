const initialState = {
    // CREATE A SEPERATION OF CONCERNS FOR THE STORE STATE AND WHAT IS STORED IN DYNAMODB. JUST BECAUSE IT IS PART OF THE INITIAL STATE DOES NOT MEAN IT IS STORED IN DYNAMODB
    // #region metadata - DynamoDB storage --------------------------------------------------------------------------------------------------------
    userId: '',       // Unique identifier for the user
    stateId: '',     // Unique identifier for store session (useful for tracking actions in the store)
    lastUpdated: Date.now(), // Timestamp for when the stateId was last updated
    currency: {
        selected: 'USD', // Selected currency
    },    
    filterId: '', // Unique identifier for the filter
    filterCategories: [], // Array of categories for filtering
    filterPromotions: [], // Array of promotions for filtering
    filterKeywords: [], // Array of search keywords
    filterPriceRange: [0, 0], // Min/Max price range
    filterRatings: [0, 0], // Min/Max ratings
    filterSeasons: [], // Array of seasons for filtering
    filterDiscounts: [], // Array of discounts for filtering
    filterSortBy: 'popularity', // Sort items by criteria (popularity, price, ratings, etc.)
    filterViewMode: 'grid', // Viewing mode for products (grid/list)
    filterFeatured: false, // Filter for featured items
    filterLoved: false, // Filter for loved (favorited) items
    filterRecentlyViewed: false, // Filter for recently viewed items
    filterWishlist: false, // Filter for wishlist items
    formId: '',
    formState: [],          // State for form inputs (e.g., checkout form)
    page: '/',             // Unique identifier for the current page
    pageState: [],          // State for page events. 
    // If a users system reboots during checkout re login will return to success or failure,
    // if a user is on a page and the system reboots, the user will return to the page they were on with all data intact
    cartId: '',             // Unique identifier for the user's cart
    cartMeta: [
        {
            productName: '', // Name of the product
            productId: '', // Unique identifier for the product
            cost: 0, // Price of the product
            quantity: 0, // Quantity of the product in the cart
        }
    ], // productName, id, cost, quantity
    lovedItemId: '',        // Unique identifier for the loved item
    lovedItemMeta: [
        {
            productName: '', // Name of the product
            productId: '', // Unique identifier for the product
            cost: 0, // Price of the product
        }
    ], // productName, id, cost
    recentlyViewedId: '',   // Unique identifier for the recently viewed item
    recentlyViewedMeta: [
        {
            productName: '', // Name of the product
            productId: '', // Unique identifier for the product
            cost: 0, // Price of the product
        }
    ], // productName, id, cost
    wishlistId: '',         // Unique identifier for the wishlist
    wishlistMeta: [
        {
            wishlistId: '', // Unique identifier for the wishlist
            productName: '', // Name of the product
            productId: '', // Unique identifier for the product
            cost: 0, // Price of the product
            quantity: 0, // Quantity of the product in the wishlist
        }
    ], // productName, id, cost, wishlistId


            // #endregion metadata - DynamoDB storage --------------------------------------------------------------------------------------------------------



    // #region recommendations --------------------------------------------------------------------------------------------------------
    mostVisited: [
        {
            type: '', // Type of favorite (e.g., product, category, promotion)
            name: '', // Name of the favorite item
            id: '', // Unique identifier for the favorite item
            frequency: 0, // Frequency of interaction with the favorite
        }
    ],     
    productRecommendations: [
        {
            recommendationId: 0, // Index of the recommendation
            productId: '', // Unique identifier for the product
            points:[
                {
                    Target: "", // Unique identifier for the point
                    // keyword, category, promotion, price, rating, discount, season, popularity
                    Name: "", // X-coordinate of the point
                    // if from a model, use the model name as the target and the ID of the item as the name 
                    Points: 0, // Y-coordinate of the point
                    timestamp: Date.now(), // Timestamp for when the point was added
                }
            ]
        },
    ], // Array of recommended products for each product

    userRecommendations: [
        {
            recommendationId: 0, // Index of the recommendation
            userId: '', // Unique identifier for the user
            points:[
                {
                    Target: "", // Unique identifier for the point
                    // keyword, category, promotion, price, rating, discount, season, popularity
                    Name: "", // X-coordinate of the point
                    // if from a model, use the model name as the target and the ID of the item as the name
                    Points: 0, // Y-coordinate of the point
                    timestamp: Date.now(), // Timestamp for when the point was added
                }
            ]
        },
    ], // Array of recommended products for each user


            // #endregion metadata - session interactions --------------------------------------------------------------------------------------------------------
    


    // #region storeData --------------------------------------------------------------------------------------------------------
    storetUpdated: Date.now(), // Timestamp for when the store session was last updated
    items: [],              // Array of products or store items
    store: { 
        stock: [
            {
                productId: '', // Unique identifier for the product
                productName: '', // Name of the product
                price: 0,       // Price of the product
                discount: 0,    // Discount for the product
                stock: 0,      // Number of items in stock
            },
        ],              // Array of products or store items
        keys: [{
            seasons: seasons,       // List of seasons for filtering
            categories: categories, // List of categories for filtering
            promotions: promotions, // List of promotions
            keywords: keywords,     // List of search keywords
            priceRange: [lowestPrice, highestPrice], // Min/Max price 
            ratings: [lowestRating, highestRating],  // Min/Max ratings
        }],  // Array of store keys or identifiers
        coupons: [
            {
                couponCode: '', // Unique identifier for the coupon
                productsAffected: [], // Array of products affected by the coupon
                discount: 0,    // Discount amount
                expiration: Date.now(), // Expiration date for the coupon
            },
        ], // Array of store couponsitems: [],              // Array of products or store items
        seasons: seasons,       // List of seasons for filtering
        categories: categories, // List of categories for filtering
        promotions: promotions, // List of promotions
        keywords: keywords,     // List of search keywords
        currentCategory: '',    // Selected category for filtering
        filters: {              // Filtering options
            category: '',         // Current selected category
            promotion: '',        // Active promotion filter
            priceRange: [lowestPrice, highestPrice], // Min/Max price range
            featured: false,      // Filter for featured items
            keywords: [],         // Applied keyword filters
            loved: false,         // Filter for loved (favorited) items
            ratings: null,        // Filter by product rating
            discount: null,       // Filter for discounted items
            sortBy: 'popularity',   // Sort items by criteria (popularity, price, ratings, etc.)
            viewMode: 'grid',       // Viewing mode for products (grid/list)
            },
    }, // Array of store coupons    
    comparisonItems: [],    // Array of items to compare (e.g., selected products for comparison)
    searchQuery: '',        // Current search query (if using a search bar)
    

            // #endregion storeData --------------------------------------------------------------------------------------------------------



    // #endregion userLists --------------------------------------------------------------------------------------------------------
    //     // if making digital mall, possibly move filters to user provider to transfer between stores
    userFilters: {              // Filtering options
        category: '',         // Current selected category
        promotion: '',        // Active promotion filter
        featured: false,      // Filter for featured items
        keywords: [],         // Applied keyword filters
        loved: false,         // Filter for loved (favorited) items
        ratings: null,        // Filter by product rating
        discount: null,       // Filter for discounted items
        sortBy: 'popularity',   // Sort items by criteria (popularity, price, ratings, etc.)
        viewMode: 'grid',       // Viewing mode for products (grid/list)
        priceRange: [0, 0],     // Price range filter
    },
    lovedItems: [
        {
            productId: '', // Unique identifier for the product
            productName: '', // Name of the product
            cost: 0,       // Price of the product
            discount: 0,    // Discount for the product
            timestamp: Date.now(), // Timestamp for when the item was loved
            foundBy: '', // Source of the item (e.g., search, category, promotion)
        },
    ],         // Items marked as loved/favorited
    recentlyViewed: [
        {
            productId: '', // Unique identifier for the product
            productName: '', // Name of the product
            cost: 0,       // Price of the product
            discount: 0,    // Discount for the product
            timestamp: Date.now(), // Timestamp for when the item was viewed
            foundBy: '', // Source of the item (e.g., search, category, promotion)
        },
    ],     // Recently viewed products
    wishlist: [
        {
            id: '', // Id of the wishlist
            name: '', // Name of the wishlist
            products: [
                {
                    productId: '', // Unique identifier for the product
                    timestamp: Date.now(), // Timestamp for when the item was added to the wishlist
                    foundBy: '', // Source of the item (e.g., search, category, promotion)
                },
            ],
        }
    ], // Array of wishlist items or wishlists (if structured as multiple lists)
    reviews: [
        {
            reviewId: '',            
            rating: 0, // User's rating for the product
            timestamp: Date.now(), // Timestamp of the review
            reviewText: '', // User's review of the product
            reviewerName: '', // Name of the reviewer
            reviewerId: '', // Unique identifier for the reviewer
        }
    ], // Array of user reviews for products
    addressBook: [
        {
            addressId: '', // Unique identifier for the address
        }
    ],
    paymentMethods: [
        {
            method: 'credit_card', // Type of payment method
            lastFourDigits: '1234', // Last four digits of the card (if applicable)
            expirationDate: '', // Expiry date of the card (if applicable)
        }
    ],
    recommendaions: [
        {
            recommendationId: '', // Unique identifier for the recommendation
            recommendationType: '', // Type of recommendation (e.g., product, category, promotion)
            recommendedItems: [], // Array of recommended items
        }
    ], // Array of recommended items
            // #endregion userLists --------------------------------------------------------------------------------------------------------    
    


    // #region cartData --------------------------------------------------------------------------------------------------------
    cart: {    
            cartId: 0,             // Unique identifier for the user's cart
            cartOpen: false,        // Boolean for cart open/closed state
            cartAbandoned: false,   // Boolean for cart abandoned state
            cartItems: [
                {
                    productId: '', // Unique identifier for the product
                    quantity: 0,    // Quantity of the product in the cart
                    discount: 0,    // Discount amount for the product
                    price: 0,       // Price of the product
                }
            ],               // Array of items added to the cart
            subtotal: 0, // Total price before discounts
            shippingCost: 0, // Shipping cost for the cart
            estimatedTax: 0, // Estimated tax for the cart
            cartTotal: 0,         // Total amount in the cart
            cartItemCount: 0,       // Total number of items in the cart
            checkoutStatus: null,   // Status of the current checkout process (e.g., 'pending', 'completed', 'failed')
            appliedCoupons: [],     // Array to store applied coupon codes
        }
  };
  

export default initialState;



























// const initialState = {
//     userId: '',       // Unique identifier for the user
//     storeName: '',   // Name of the store.
//     storeID: '',     // Unique identifier for the store. storeID-userStateId
//     stateID: '',     // Unique identifier for store session (useful for tracking actions in the store) userStateId


//     wishlist: [],           // Array of wishlist items or wishlists (if structured as multiple lists)
//     lovedItems: [],         // Items marked as loved/favorited
//     recentlyViewed: [],     // Recently viewed products
//     userCart: [
//         {
//             productId: '', // Unique identifier for the product
//             productName: '', // Name of the product
//             price: 0,       // Price of the product
//             quantity: 0,    // Quantity of the product in the cart
//         },
//     ],               // Array of items added to the cart
//     cartTotal: 0,         // Total amount in the cart
//     cartCount: 0,           // Total number of items in the cart
//     cartOpen: false,        // Boolean for cart open/closed state
//     cartCheckoutStatus: null,   // Status of the current checkout process (e.g., 'pending', 'completed', 'failed')
//     cartAppliedCoupons: [],     // Array to store applied coupon codes

//   };
  

// export default initialState;