import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useAnalytics } from '../Analytics.State';

const useProductInteraction = (interactionType, productId) => {
    const { trackProductInteraction } = useAnalytics();

    useEffect(() => {
        if (!productId) return; // Ensure product is valid

        switch (interactionType) {
            case 'addToCart':
                trackProductInteraction('product added to cart', productId);
                break;
            case 'removeFromCart':
                trackProductInteraction('product removed from cart', productId);
                break;
            case 'openItemDetail':
                trackProductInteraction('productPageOpened', productId);
                break;
            case 'addMultipleToCart':
                trackProductInteraction('multiple products added to cart', productId);
                break;
            case 'updateCartQuantity':
                trackProductInteraction('cart quantity updated', productId);
                break;
            case 'handleAddIncludeToCart':
                trackProductInteraction('include added to cart', productId);
                break;
            default:
                console.warn(`Unhandled product interactionType: ${interactionType}`);
                break;
        }
    }, [interactionType, productId, trackProductInteraction]);
}

export default useProductInteraction;

// Performance Consideration: Since useProductInteraction is a hook, 
// it's typically best to use it in the top-level component logic. 
// If the analytics tracking involves side effects, you may need to 
// adjust the implementation to avoid potential React warnings. This 
// approach assumes that the hook is not causing side effects directly 
// in its definition but rather in a useEffect within the hook itself.

