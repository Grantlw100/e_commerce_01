# READ ME for the client folder

## States && Providers 
Reconfigure the use of states across the application 

EVERY TIME CONTEXT CHANGES IT MAY TRIGGER A RE_RENDER FOR ALL COMPONENTS USING THAT CONTEXT 

### Guiding principles of state and provider development 
1. each provider should be responsible for data and logic specific to its domain. minimize overlap and pass down data where necessary 
2. if data belongs to one provider pass whatever else is needed to the rest 
3. avoid over storing and over fetching. consider local component state or a custom hook. not all data must go into a context/provider
4. 

### Global state 
application wide config or environmental data 
data that is needed across multiple providers 

#### Current Global State
userid
stateid
lastUpdated
currency
filtration components
- filters for 
    - categories 
    - promotions
    - keywords 
    - price ranges
    - ratings 
    - seasons 
    - discounts 
    - sort by 
    - view mode
    - featured 
    - loved 
    - recently viewed 
    - wishlist 

form state components 
- formstate
- page state 

cart state components 
- product
    - name 
    - quantity 
    - cost 
    - id

loved items list
- product 
    - name
    - id 
    - cost

recently viewed lists 
- products 
    - name
    - id
    - cost

wishlist lists 
- id
- product 
    - name
    - id
    - cost 
    - quantity 


mostVisited 
- type 
    - can be a category, product, promotion, store, etc...

productRecommendations 
- recommendationId
- productId
- points
    - target 
    - name 
    - points 
    - timestamp 

userRecommendations 
- recommendationId
- productId
- points
    - target 
    - name 
    - points 
    - timestamp 


storeUpdated 
- products
- stock
    - product id 
    - name 
    - price
    - discount 
    - stock 
- keys for filtering  
    - seasons
    - categories 
    - promotions 
    - keywrds 
    - price range 
    - ratings 
    - discount
    - sortBy
    - viewMode
- coupons 
    - couponCode 
    - productsAffected
    - discouont 
    - expiration 
- store specific details 
    - keywords 
    - categories 
    - promotions 
    - seasons 
    - description 

comparison items 
- this is an array that holds objects and compares them based upon their relative dimensions like width, height, etc...

searchQuery for the search bar 

reviews 
- id
- rating 
- timestamp 
- review text
- author 
- id 

user address book 
- address id

payment methods 
    - method 
    - last four digits 

recommendations
- id
- type 
- recommended items  

#### Updated Global state 
```javascript
const initialGlobalState = {
  appId: null,
  currency: 'USD',
  globalFilters: {
    categories: [],
    promotions: [],
    // ...
  },
  pageState: {}, 
  // Possibly other truly global data...
};
```

### User state
data about the current user (auth, preferences, personal lists)
data about the user session, such as session creation time, cart, wishlist, notifications, etc

#### Updated User State 
```javascript
const initialUserState = {
  userInfo: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    // ...
  },
  preferences: {
    theme: 'light',
    darkMode: false,
    // ...
  },
  cart: [],
  lovedItems: [],
  wishlist: [],
  recentlyViewed: [],
  notifications: [],
  sessionInfo: {
    sessionId: '',
    createdAt: null,
    updatedAt: null,
    // ...
  },
};
```

#### Current user state 
user info
- first name 
- last name 
- email
- phone 
- role 
- token 
- isAuthenticated 
- demographics 

user preferences 
- colors
- darkmode
- theme
- store prefences 
- device info 
- location info 

interactivy 
- cart info 
- loved items list 
- wishlist 
- recently viewed 
- current page
- scroll depth 
- queries ran 
- page state 

session info 
- created at
- updated at 
- duration 
- timeout 
- destroy session at 

notification info 
- title 
- message
- type 
- isRead
- createdAt
- updatedAt
- points 
- actions

userPoints 
- recommendationId
- timestamp 
- points 
- actions 

sessionInfo 
- sessionId
- sessionDuration 
- sessionStartTime 
- totalEvents 
- sessionEndTime 
- sessionFlow 
- sessionRevisits 
- sessionWhiteSpaceEvents - how many times did user go awol 
- entryExitPoint 
    - entry page 
    - entry time 
    - exit page
    - exit time

queries 
- type 
- sent 
- received
- error 
- statuscode 
- queryresults 

complexity
- id 
- fieldname 
- basevalue 
- multipliers 
- allowedroles 
- updatedby 
- updatedAt



### Store state
data about specific store or current store the user is in 
manage store inventory, store-level filtering, coupons, store details, etc

#### Updated store state 
```javascript 
const initialStoreState = {
  storeId: null,
  products: [],
  stock: {},
  storeFilters: {
    categories: [],
    promotions: [],
    // ...
  },
  coupons: [],
  storeDetails: {},
};

// USER PROVIDER
const initialUserState = {
  userInfo: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    // ...
  },
  preferences: {
    theme: 'light',
    darkMode: false,
    // ...
  },
  cart: [],
  lovedItems: [],
  wishlist: [],
  recentlyViewed: [],
  notifications: [],
  sessionInfo: {
    sessionId: '',
    createdAt: null,
    updatedAt: null,
    // ...
  },
};
```


### Analytics state
Everything related to measuring user interactions, page visits, performance, instrumentation.

Logging, events, funnels, “re-creation” of a page’s user events.
#### Updated analytics state 
```javascript
const initialAnalyticsState = {
  pageInfo: {
    duration: 0,
    entryPoint: '',
    exitPoint: '',
    scrollDepthEvents: [],
    clickEvents: [],
    // ...
  },
  userDevice: {
    deviceType: '',
    location: {
      country: '',
      city: '',
      lat: null,
      lng: null,
    },
  },
  cartEvents: {
    added: [],
    removed: [],
    purchased: [],
    abandoned: [],
    refunded: [],
  },
  recommendationInteractions: [],
  // etc...
};
```
#### Current analytics state 
page information 
- page info is about 
- page duration 
- page entry point 
- page exit point 
- page exit tim e
- scroll depths 
- click events 
    - time stamp 
    - element 
    - custom events 
        - event 
        - timestamp 
    - page feedback 
        - item 
        - timestamp 
        - feedback 
    - form submissions 
        - timestamp 
        - form
    - search queries 
        - timestamp 
        - query 
    - pageWhiteSpave - period of inactivity 
        - timestamp 
        - length
    - pageErrors 
        - timestamp 
        - error

user info 
- device 
- location 
    - country 
    - city 
    - lat 
    - longitude 

cart information
- added
    - product id 
    - timestamp 
    - quantity 
    - add remove 
- removed 
    - product id 
    - timestamp 
    - quantity 
    - removal location - what page was the item removed from 
- purchased 
    - product id 
    - timestamp 
    - quantity 
- abandondened 
    - product id 
    - timestamp 
    - quantity 
- refunded 
    - product id 
    - timestamp 
    - quantity 
- purchasedAt - date.now()

recommendationInteractions 
- createdAt
- updated
- posted 

productPoints 
- recommendationId
- timestamp 
- points 
- actions 

detailPoints 
- type 
- name 
- timestamp 

## Data Caching tips 

### Fetch on demand with caching layer 
fetch data when needed, store it in local or global state
- rely on a caching mechanism like react query or a custom hook 

- store minimal references in provider (ids or short metadata)
- use a custom hook to fetch details on demand. cache this data in memory or localStorage
- access cached data anywhere using the same hook. will not refetch unless data is stale or forced 

### Thin providers are happy providers 
put only minimal shared data in provider 

- if data is only needed in a couple places consider storing it in a local component or state or a small custom hook 

- if certain data is needed globally but is large, store only essential fields in the provider then fetch the rest on demand 

### Use derived data instead of storing everything 
if data can be derived from existing state plus user actions there is no need to store it. 

filtered products could be derived from allProducts + filtered criteria inside a memorized selector or a custom hook rather than storing those filtered results as seperate context state 

### Organize states by scope and frequency of change 
- if a piece of data changes frequently, (analytic events, ephemeral form states) consider whether it should be in a local component state or a dedicated provider 

### partial caching and lazy loading 
put only the summary or lightweight snippets of large data sets in provider

when the user clicks on a product for more details, detch the detailed data in a dedicated query or custom hooks

### local storage or session storage for persisting 
If your goal is to reduce calls to the DB across page reloads (not just across renders or route changes), consider storing some data in localStorage or sessionStorage. Then your provider can do something like:

On provider mount, check if relevant data is in storage.

If found, hydrate your context from there.

If not, fetch from the server, then store in context and local/session storage.

- consider security (no tokens, user info regarding security left in local storage)

- make sure to handle this scenario where stored data is stale or out of date 

### Use dedicated data-fetching library 
Instead of manually implementing caching logic in each provider, libraries like React Query (TanStack Query), SWR, or Apollo Client (if using GraphQL) can handle caching and re-fetching automatically. Your providers then become simpler “shells” that provide a top-level config, while each component (or custom hook) manages specific queries.

### Regularly revisit && prune 
It is common for providers to accumulate states over time. Make it a habit to review each provider. 
- is every piece truly needed globally
- can some fields be moved
- is some state never user or overshadowed 