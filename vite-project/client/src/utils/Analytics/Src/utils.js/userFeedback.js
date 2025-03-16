import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAnalytics } from "../Analytics.State";
import { useUserContext } from "../../User/UserState";

const useUserFeedback = (product, feedbackType) => {
    const { trackUserFeedback } = useAnalytics();
    const location = useLocation();
    const { user } = useUserContext();

    if (!product) {
            product = { 
                name: feedbackType,
                id: 0,
                category: '',
                price: 0,
            };
    }

        

    useEffect(() => {
        let feedback = '';

        switch (feedbackType) {
            case "productLoved":
                feedback = `Product ${product?.name} loved`;
                break;
            case "productUnloved":
                feedback = `Product ${product?.name} unloved`;
                break;
            case 'productRecentlyViewed':
                feedback = `Product ${product?.name} recently viewed`;
                break;
            case 'recentlyViewedCleared':
                feedback = 'Recently viewed cleared';
                break;
            case 'addedToWishlist':
                feedback = `Product ${product?.name} added to wishlist`;
                break;
            case 'removedFromWishlist':
                feedback = `Product ${product?.name} removed from wishlist`;
                break;
            case 'newsletterSubscribed':
                feedback = `Newsletter subscribed`;
                break;
            case 'newsletterUnsubscribed':
                feedback = `Newsletter unsubscribed`;
                break;
            case 'reviewCreated':
                feedback = `Review created for ${product?.name}`;
                break;
            case 'reviewUpdated':
                feedback = `Review updated for ${product?.name}`;
                break;
            case 'reviewDeleted':
                feedback = `Review deleted for ${product?.name}`;
                break;
            default:
                feedback = 'unknown';
                break;
        }

        const page = location.pathname;

        const handleUserFeedback = () => {
            trackUserFeedback(feedback, feedbackType, page, user, product);
        };

        handleUserFeedback();

        // The dependencies array ensures this runs when any of these values change
    }, [product, feedbackType, location.pathname, trackUserFeedback, user]);
};

export default useUserFeedback;


// create global functions for adding item to loved, wishlist, recently viewed, etc.