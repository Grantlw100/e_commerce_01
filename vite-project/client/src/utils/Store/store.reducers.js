import {
  UPDATE_ITEMS,
  UPDATE_CATEGORIES,
  UPDATE_PROMOTIONS,
  UPDATE_KEYWORDS,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART,
  UPDATE_FILTERS
} from './store.actions';

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_ITEMS:
      return {
        ...state,
        items: [...action.items],
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_PROMOTIONS:
      return {
        ...state,
        promotions: [...action.promotions],
      };

    case UPDATE_KEYWORDS:
      return {
        ...state,
        keywords: [...action.keywords],
      };

    case UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.filterKey]: action.value
        }
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      };

      case ADD_TO_CART:
    // Check if the item already exists in the cart
    const existingCartItem = state.cart.find(item => item._id === action.item._id);

    if (existingCartItem) {
        // If the item exists, increase its quantity
        const updatedCart = state.cart.map(item => {
            if (item._id === action.item._id) {
                // Increment the purchase quantity of the existing item
                return { ...item, purchaseQuantity: item.purchaseQuantity + 1 };
            }
            return item; // Return all other items unchanged
        });
        return {
            ...state,
            cartOpen: true,
            cart: updatedCart // Updated cart with the incremented item quantity
        };
    } else {
        // If the item does not exist, add it with purchaseQuantity initialized to 1
        return {
            ...state,
            cartOpen: true,
            cart: [...state.cart, { ...action.item, purchaseQuantity: 1 }]
        };
    }

      
      case REMOVE_FROM_CART:
        const reducedCart = state.cart.reduce((newCart, item) => {
          if (item._id === action._id) {
            const newQuantity = item.purchaseQuantity - 1;
            if (newQuantity > 0) {
              newCart.push({...item, purchaseQuantity: newQuantity}); // Decrease quantity
            }
          } else {
            newCart.push(item); // Keep other items as is
          }
          return newCart;
        }, []);
      
        return {
          ...state,
          cartOpen: reducedCart.length > 0,
          cart: reducedCart
        };
      
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item._id === action._id ? {...item, purchaseQuantity: action.purchaseQuantity} : item
        ),
        cartOpen: state.cart.some(item => item.purchaseQuantity > 0)
      };
    
      case ADD_MULTIPLE_TO_CART:
    // Start by creating a copy of the current cart
    let newCart = [...state.cart];

    // Iterate over each item passed in the action
    action.items.forEach(actionItem => {
        // Check if the item already exists in the cart
        const existingCartItemIndex = newCart.findIndex(item => item._id === actionItem._id);

        if (existingCartItemIndex !== -1) {
            // If the item exists, update its quantity
            newCart[existingCartItemIndex] = {
                ...newCart[existingCartItemIndex],
                purchaseQuantity: newCart[existingCartItemIndex].purchaseQuantity + actionItem.purchaseQuantity
            };
        } else {
            // If the item does not exist, add it to the cart with the specified quantity
            newCart.push({
                ...actionItem,
                purchaseQuantity: actionItem.purchaseQuantity
            });
        }
    });

    return {
        ...state,
        cartOpen: newCart.length > 0,
        cart: newCart
    };

      
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };

    case OPEN_ITEM_DETAIL:
      return {
        ...state,
        itemDetail: action.itemDetails
      };

    default:
      return state;
  }
};

export default reducer;
