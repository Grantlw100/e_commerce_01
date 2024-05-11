import { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import reducer from './store.reducers';
import { mockItems, categories, promotions, keywords } from '../../assets/items/index';
import { useNavigate } from 'react-router-dom';

export const StoreContext = createContext();
const { Provider } = StoreContext;

const highestPrice = mockItems.reduce((acc, item) => (item.price > acc ? item.price : acc), 0);
const lowestPrice = mockItems.reduce((acc, item) => (item.price < acc ? item.price : acc), highestPrice);

export const StoreProvider = ({ children }) => {
  const initialState = {
    items: [],
    cart: [],
    cartOpen: false,
    categories: categories,
    promotions: promotions,
    keywords: keywords,
    currentCategory: '',
    filters: {
      category: '',
      promotion: '',
      priceRange: [lowestPrice, highestPrice],
      featured: false,
      keywords: [],
      loved: false,
      ratings: null,
      discount: null
    }
  };
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);
  categories.push('All Items');

  useEffect(() => {
    dispatch({ type: 'UPDATE_ITEMS', items: mockItems });
    dispatch({ type: 'UPDATE_CATEGORIES', categories: categories });
    dispatch({ type: 'UPDATE_PROMOTIONS', promotions: promotions });
    dispatch({ type: 'UPDATE_KEYWORDS', keywords: keywords });
  }, []);

  const removeFromCart = useCallback((id) => {
    dispatch({ type: 'REMOVE_FROM_CART', _id: id });
    console.log(id);
  }, [dispatch]);
  

  const addToCart = useCallback((item) => {
    dispatch({ type: 'ADD_TO_CART', item: { ...item, purchaseQuantity: 1 } });
  }, [dispatch]);
  
  const addMultipleToCart = useCallback((items) => {
    // `items` should be an array of item objects, each containing an `_id` and `purchaseQuantity`
    dispatch({ type: 'ADD_MULTIPLE_TO_CART', items: items });
}, [dispatch]);


  const updateCartQuantity = useCallback((id, quantity) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', id, quantity });
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
      updateFilters,
      totalItems, 
      totalCost,
      openItemDetail,
      updateFilters
    }}>
      {children}
    </Provider>
  );
};

export const useGlobalState = () => useContext(StoreContext);
