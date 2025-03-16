import { createContext, useContext, useReducer, useEffect, useCallback, useMemo, useState } from 'react';
import reducer from './store.reducers.js';
import { mockItems, categories, promotions, keywords, loved } from '../../assets/items/index.js';
import storeInitialState from './StoreInitialState.js';
import { useNavigate } from 'react-router-dom';
import useProductInteraction from '../Analytics/analytics.utils.js/productInteraction.js';
// import { saveGlobalState, loadGlobalState } from '../../../../server/utils/State-Cart-Mgmt-Utils/sessionManagement';
import { GET_LOVED_PRODUCTS, GET_RECENTLY_VIEWED } from '../toolsNimports/queries.js';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PRODUCT_TO_LOVED, REMOVE_PRODUCT_FROM_LOVED, ADD_PRODUCT_TO_RECENTLY_VIEWED, REMOVE_PRODUCT_FROM_RECENTLY_VIEWED } from '../toolsNimports/mutations.js';
// import models from '../../../../server/models/index.js';
// const { User } = models;
import useUserFeedback from '../Analytics/analytics.utils.js/userFeedback.js';
// import { User as UserModel } from '../../../../server/models/index.js';
import { set } from 'mongoose';

export const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ children }) => {
 const [User, setUser] = useState(null);
  
// const [getLovedProducts] = useQuery(GET_LOVED_PRODUCTS);
const [addProductToLoved] = useMutation(ADD_PRODUCT_TO_LOVED);
const [removeProductFromLoved] = useMutation(REMOVE_PRODUCT_FROM_LOVED);

// const [getRecentlyViewed] = useQuery(GET_RECENTLY_VIEWED);
const [addProductToRecentlyViewed] = useMutation(ADD_PRODUCT_TO_RECENTLY_VIEWED);
const [removeProductFromRecentlyViewed] = useMutation(REMOVE_PRODUCT_FROM_RECENTLY_VIEWED);

const [highestPrice, sethighestPrice] = useState(0);

const [lowestPrice, setLowestPrice] = useState(0);



const initialState = storeInitialState

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);
  categories.push('All Items');

  const [lovedItems, setLovedItems] = useState([null]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  
  // if a user is logged in fetch the user loved items list, the recently viewed items list, and the wishlist object 
  useEffect(() => {
    if (!User || User === null) {
      return;
    }

    const lovedItems = getLovedProducts(User._id);
    setLovedItems(lovedItems);

    const recentlyViewed = getRecentlyViewed(User._id);
    setRecentlyViewed(recentlyViewed);
  }, [User]);

    // compare the smallests prices and largest prices of the items available in the digital catalog 
  useEffect(() => {
    const largestPrice = mockItems.reduce((acc, item) => (item.price > acc ? item.price : acc), 0);
    sethighestPrice(largestPrice);
    const smallestPrice = mockItems.reduce((acc, item) => (item.price < acc ? item.price : acc), highestPrice);
    setLowestPrice(smallestPrice);
  }, [mockItems]);

  // const toggleLoved = useCallback((item) => {
  //   if (!User || User === null) {
  //     return;
  //   }

  //   if (lovedItems.includes(item._id)) {
  //     removeProductFromLoved({ variables: { userId: User._id, productId: item._id } });
  //     setLovedItems(lovedItems.filter((id) => id !== item._id));
  //     useUserFeedback('removeFromLoved', item);
  //   } else {
  //     addProductToLoved({ variables: { userId: User._id, productId: item._id } });
  //     setLovedItems([...lovedItems, item._id]);
  //     useUserFeedback('addToLoved', item);
  //   }
  // }, [lovedItems]);

  // const toggleRecentlyViewed = useCallback((item) => {
  //   if (!User || User === null) {
  //     return;
  //   }

  //   if (recentlyViewed.includes(item._id)) {
  //     removeProductFromRecentlyViewed({ variables: { userId: User._id, productId: item._id } });
  //     setRecentlyViewed(recentlyViewed.filter((id) => id !== item._id));
  //     useUserFeedback('removeFromRecentlyViewed', item._id);
  //   } else {
  //     addProductToRecentlyViewed({ variables: { userId: User._id, productId: item._id } });
  //     setRecentlyViewed([...recentlyViewed, item._id]);
  //     useUserFeedback('addToRecentlyViewed', item._id);
  //   }
  // }, [recentlyViewed]);

// grab the updated items, categories, promotions, and keywords from the mock data and update the global state
  useEffect(() => {
    dispatch({ type: 'UPDATE_ITEMS', items: mockItems });
    dispatch({ type: 'UPDATE_CATEGORIES', categories: categories });
    dispatch({ type: 'UPDATE_PROMOTIONS', promotions: promotions });
    dispatch({ type: 'UPDATE_KEYWORDS', keywords: keywords });
  }, []);

  // useEffect(() => {
  //   if (!User) {
  //     return;
  //   }
  //   const fetchGlobalState = async () => {
  //     const globalSessionData = await loadGlobalState();
  //     if (globalSessionData) {
  //       dispatch({ type: 'LOAD_GLOBAL_STATE', globalSessionData });
  //     }
  //   }
  //   fetchGlobalState();
  // }, []);

  // useEffect(() => {
  //   if (!User) {
  //     return;
  //   }
  //   if (state.cart.length > 0 || Object.keys(state.preferences).length > 0) {
  //     saveGlobalState(state);
  //   }
  // }, [state]);

  // useEffect(() => {
  //   if (!User) {
  //     return;
  //   }
  //   saveGlobalState(state);
  // }, [state]);

  const removeFromCart = useCallback((id) => {
    dispatch({ type: 'REMOVE_FROM_CART', _id: id });
    useProductInteraction('removeFromCart', id);
    console.log(id);
  }, [dispatch]);
  

  const addToCart = useCallback((item) => {
    dispatch({ type: 'ADD_TO_CART', item: { ...item, purchaseQuantity: 1 } });
    useProductInteraction('addToCart', item._id);
  }, [dispatch]);
  
  const addMultipleToCart = useCallback((items) => {
    // `items` should be an array of item objects, each containing an `_id` and `purchaseQuantity`
    dispatch({ type: 'ADD_MULTIPLE_TO_CART', items: items });
    useProductInteraction('addMultipleToCart', items.map(item => item._id));
  }, [dispatch]);


  const updateCartQuantity = useCallback((id, quantity) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', id, quantity });
    useProductInteraction('updateCartQuantity', id);
  }, [dispatch]);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, [dispatch]);

  const toggleCart = useCallback(() => {
    dispatch({ type: 'TOGGLE_CART' });
  }, [dispatch]);

  const updateFilters = useCallback((filterKey, value) => {
    dispatch({ type: 'UPDATE_FILTERS', filterKey, value });
  }, [dispatch]);

  const totalItems = useMemo(() => state.cart.reduce((total, item) => total + item.purchaseQuantity, 0), [state.cart]);
  const totalCost = useMemo(() => {
    return state.cart.reduce((total, item) => {
      return total + (item.price * item.purchaseQuantity);
    }, 0); // The '0' here is the initial value for 'total'
  }, [state.cart]);  // Recalculate when 'state.cart' changes



//   // Simulating fetchItemDetails function
// const fetchItemDetails = async (itemId) => {
//   // Simulate fetching data by finding the item in your mock data
//   return new Promise(resolve => {
//     setTimeout(() => {
//       const item = mockItems.find(item => item._id.toString() === itemId);
//       resolve(item);
//     }, 1000); // Simulate network delay
//   });
// }
  
//   const openItemDetail = useCallback((item) => {
//     fetchItemDetails(item._id).then(itemDetails => {
//         dispatch({ type: 'OPEN_ITEM_DETAIL', itemDetails });
//     }).catch(error => {
//         console.error("Failed to fetch item details:", error);
//         // Optionally update state to show an error message
//     });
//     globalRouter.push(`/itemDetail/${item._id}`);
// }, [dispatch, globalRouter]);


const openItemDetail = useCallback((item, navigate) => {
  // Simulate fetching data by finding the item in your mock data 
  // const item = mockItems.find(item => item._id.toString() === itemId);
  // dispatch({ type: 'OPEN_ITEM_DETAIL', itemDetails: item });

  // Navigate to the item detail page with item ID
  // useProductInteraction('openItemDetail', item._id);
  navigate(`/itemDetail/${item._id}`);

}, []); // No dependencies if fetchItemDetails and navigate are not used directly


  return (
    <Provider value={{ 
      state, 
      removeFromCart, 
      addToCart, 
      addMultipleToCart, 
      updateCartQuantity, 
      clearCart, 
      toggleCart, 
      totalItems, 
      totalCost,
      openItemDetail,
      updateFilters,
      // toggleLoved,
      // toggleRecentlyViewed,
    }}>
      {children}
    </Provider>
  );
};

export const useGlobalState = () => useContext(StoreContext);

export default StoreProvider;