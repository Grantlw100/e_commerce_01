import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import analyticsReducer from './analytics.reducer.js';
import { initialState } from './Src/analytics.initialState.js';

// Need to create analytics container which will embody the functionality
// necessary to get all analytics up and faRunning. Once this is complete
// Add that component below the analytics provider in App.jsx





// Create the analytics context
const AnalyticsContext = createContext();
const { Provider } = AnalyticsContext;

const AnalyticsProvider = ({ children = null }) => {
    console.log(children)
    // fallback value for children prop ensures that the Provider will not throw an error if no children are passed to it
    const [state, dispatch] = useReducer(analyticsReducer, initialState);
    const [analytics, setAnalytics] = useState(initialState);

// context provider named variables for utility & redux
    const location = useLocation();
    const entryRef = useRef(null);
    const startTimeRef = useRef(null);
    const scrollDepthRef = useRef(0);


// User Interaction Tracking
    const trackPageView = (page) => {
        dispatch({ type: 'ADD_PAGE_VIEW', payload: page });
    }

    const trackClickEvent = (element, pageLocation) => {
        dispatch({ type: 'ADD_CLICK_EVENT', payload: { element, pageLocation } });
    }

    const trackFormSubmission = (form) => {
        dispatch({ type: 'ADD_FORM_SUBMISSION', payload: { form } });
    }

    const trackSessionDuration = (startTime, endTime, sessionNumber, duration) => {
        dispatch({ type: 'ADD_SESSION_DURATION', payload: { startTime, endTime, sessionNumber, duration } });
    }


    // User Behavior Tracking
    const trackEntryExitPoint = (entry, exit) => {
        dispatch({ type: actions.ADD_ENTRY_EXIT_POINT, payload: { entry, exit } });
    };

    const trackScrollDepth = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.scrollY;
        const scrollDepth = ( scrollTop / totalHeight ) * 100;

        dispatch({ type: 'ADD_SCROLL_DEPTH', payload: { scrollDepth } });
    }


// Product Interaction Tracking
    const trackProductInteraction = (dispatch, interactionType, productId ) => {
        dispatch({ 
            type: 'ADD_PRODUCT_INTERACTION', 
            payload: { 
                interactionType, 
                timeStamp: Date.now(),
                productId, 
            } });
    } // product clicks, views, shares, etc.
    // link into itemDetail click events + 
    // productDetail page view events
    // productDetail
    // add to cart, 
    //remove from cart, etc...
    // ALL IN GLOBAL STATE

    const trackPageAnalytics = (duration, scrollDepth, entryPoint, exitPoint, path) => {
        dispatch({ type: 'ADD_PAGE_ANALYTICS', payload: { duration, scrollDepth, entryPoint, exitPoint, path } });
    } // time spent on page, scroll depth, entry and exit points, etc.

    const trackProductView = (product) => {
        dispatch({ type: 'ADD_PRODUCT_VIEW', payload: { product
        } });
    } // time spent on product page, etc.

    const trackUserFeedback = (feedback, feedbackType, page, user, product) => {
        dispatch({ type: 'ADD_USER_FEEDBACK', payload: { feedback, feedbackType, page, user, product } });
    } // loved items, reviews, etc.
    // link into review form submission
    // link into loved items list
    // link into recently viewed items list
    // link into wishlist items list
    // link into newsletter signups



// Search Behavior Tracking
    const trackSearchQuery = (query) => {
        dispatch({ type: 'ADD_SEARCH_QUERY', payload: { query } });
    } // products searched for, filters applied, etc.
    // link into search bar and search results page
    // link into filters applied


    const trackSearchBehavior = (behavior) => {
        dispatch({ type: 'ADD_SEARCH_BEHAVIOR', payload: { behavior } });
    } // search frequency, search results clicked, etc.



// User Engagement Tracking
    const trackUserEngagement = (engagement) => {
        dispatch({ type: 'ADD_USER_ENGAGEMENT', payload: { engagement } });
    } // account creations, login frequency, newsletter signups, etc.
    // link into user creation form submission,
    // login form submission,
    // delete account form submission,

    const trackCustomEvent = (event) => {
        dispatch({ type: 'ADD_CUSTOM_EVENT', payload: { event } });
    }

    const trackUserFlow = (flow) => {
        dispatch({ type: 'ADD_USER_FLOW', payload: { flow } });
    } // user journey, etc.


// User Demographic Tracking
    const trackUserDemographic = (demographic) => {
        dispatch({ type: 'ADD_USER_DEMOGRAPHIC', payload: { demographic } });
    } // where users are from, device and browser, user preferences, etc.
    // use location api to track user location
    // use navigator api to track device and browser info
    

// Purchase Behavior Tracking
    const trackPurchaseBehavior = (behavior) => {
        dispatch({ type: 'ADD_PURCHASE_BEHAVIOR', payload: { behavior } });
    }
    // link into checkout form submission,
    // stripe submissions,
    // paypal submissions,
    // etc.

    const trackCheckoutInteraction = (interaction) => {
        dispatch({ type: 'ADD_CHECKOUT_INTERACTION', payload: { interaction } });
    }

    const trackCartInteraction = (interaction) => {
        dispatch({ type: 'ADD_CART_INTERACTION', payload: { interaction } });
    } // add to cart, remove from cart, etc.



// Utility functions for page to page analytics 
    const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.scrollY;
        const scrollDepth = ( scrollTop / totalHeight ) * 100;

        scrollDepthRef.current = Math.max(scrollDepthRef.current, scrollDepth)
    }

    const handlePageMount = () => {
        const entryPoint = location.pathname;
        entryRef.current = entryPoint;
        startTimeRef.current = Date.now();

        window.addEventListener('scroll', handleScroll);

        return { entryPoint, entryRef, startTimeRef}
    }

    const handlePageUnmount = () => {
        const exitPoint = location.pathname;
        const endTime = Date.now();
        const duration = endTime - startTimeRef.current / 1000;

        window.removeEventListener('scroll', handleScroll);

        trackPageAnalytics(duration, scrollDepthRef.current, entryRef.current, exitPoint, entryRef.current);
    }



// useEffect for page mount and unmount
    // useEffect(() => {
    //     handlePageMount();

    //     return () => {
    //         handlePageUnmount();
    //     }
    // }, [location.pathname]);



// useEffect for session duration
    // useEffect(() => {
    //     const location = useLocation();
    //     trackPageView(location.pathname);

    //     const session = initialState.sessionDurations.find(session => session.path === location.pathname);
    //     if (session) {
    //         trackSessionDuration(session.duration);
    //     }
    // }, [location.pathname]);


// useEffect for scroll depth
    // useEffect(() => {
    //     const handleScroll = () => {
    //         trackScrollDepth();
    //     }

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     }
    // }, [trackScrollDepth]);


  return (
    <Provider value={{ 
        state, 
        trackPageView, 
        trackClickEvent, 
        trackFormSubmission, 
        trackSessionDuration, 
        trackEntryExitPoint, 
        trackScrollDepth,
        trackProductInteraction 
    }}>
      {children}
    </Provider>
  );
};



export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    console.log("useAnalytics context", context)
return context ;
}

export default AnalyticsProvider;
