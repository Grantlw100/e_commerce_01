import { ADD_TO_CART, REMOVE_FROM_CART } from "./Store/store.actions";
import { useGlobalState } from "./Store/GlobalState";

const { dispatch } = useGlobalState();
const { cart } = state;

const addToCart = (item) => {
    dispatch({ type: ADD_TO_CART, item: { ...item, purchaseQuantity: 1 } });
};

const removeFromCart = (id) => {
    const itemId = cart.find(item => item.id === id)._id;
    dispatch({ type: REMOVE_FROM_CART, _id: itemId });
};

export { addToCart, removeFromCart };