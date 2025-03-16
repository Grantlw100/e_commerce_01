import {
    ADD_PAGE_VIEW,
    ADD_CLICK_EVENT,
    ADD_FORM_SUBMISSION,
    ADD_CUSTOM_EVENT,
    ADD_USER_FLOW,
    ADD_SEARCH_QUERY,
    ADD_USER_FEEDBACK,
    ADD_USER_DEMOGRAPHIC,
    ADD_PRODUCT_INTERACTION,
    ADD_PURCHASE_BEHAVIOR,
    ADD_USER_ENGAGEMENT,
    ADD_SEARCH_BEHAVIOR,
    ADD_SCROLL_DEPTH,
    ADD_ENTRY_EXIT_POINT,
    ADD_USER_BEHAVIOR,
    ADD_SESSION_DURATION,
    ADD_CART_INTERACTION,
    ADD_CHECKOUT_INTERACTION,
    ADD_PRODUCT_VIEW,
    ADD_PAGE_ANALYTICS
} from './analytics.actions.js';

export const addPageView = (page) => ({
    type: ADD_PAGE_VIEW,
    payload: (page),
});

export const addPageAnalytics = (duration, scrollDepth, entryPoint, exitPoint, path) => ({
    type: ADD_PAGE_ANALYTICS,
    payload: {duration, scrollDepth, entryPoint, exitPoint, path},
});

export const addClickEvent = (element, pageLocation) => ({
    type: ADD_CLICK_EVENT,
    payload: {element, pageLocation, timestamp: new Date() },
});

export const addFormSubmission = (form) => ({
    type: ADD_FORM_SUBMISSION,
    payload: {form},
});

export const addCustomEvent = (event) => ({
    type: ADD_CUSTOM_EVENT,
    payload: {category, event},
});

export const addUserFlow = (flow) => ({
    type: ADD_USER_FLOW,
    payload: {flow},
});

export const addSearchQuery = (query) => ({
    type: ADD_SEARCH_QUERY,
    payload: {query},
});

export const addUserFeedback = (feedback, feedbackType, page, user, product) => ({
    type: ADD_USER_FEEDBACK,
    payload: {
        timestamp: new Date().toISOString(),
        feedback,
        feedbackType,
        page,
        ...user,
        ...product
    }
});

export const addUserDemographic = (demographic) => ({
    type: ADD_USER_DEMOGRAPHIC,
    payload: {demographic},
});

export const addProductInteraction = (interactionType, productId) => ({
    type: ADD_PRODUCT_INTERACTION,
    payload: {interactionType, productId},
}); 

export const addPurchaseBehavior = (behavior) => ({
    type: ADD_PURCHASE_BEHAVIOR,
    payload: {behavior},
});

export const addUserEngagement = (engagement) => ({
    type: ADD_USER_ENGAGEMENT,
    payload: {engagement},
});

export const addSearchBehavior = (behavior) => ({
    type: ADD_SEARCH_BEHAVIOR,
    payload: {behavior},
});

export const addScrollDepth = (depth) => ({
    type: ADD_SCROLL_DEPTH,
    payload: {depth},
});

export const addEntryExitPoint = (entry, exit) => ({
    type: ADD_ENTRY_EXIT_POINT,
    payload: {entry, exit},
});

export const addUserBehavior = (behavior) => ({
    type: ADD_USER_BEHAVIOR,
    payload: {behavior},
});

export const addSessionDuration = (duration) => ({
    type: ADD_SESSION_DURATION,
    payload: {duration},
});

export const addCartInteraction = (interaction) => ({
    type: ADD_CART_INTERACTION,
    payload: {interaction},
});

export const addCheckoutInteraction = (interaction) => ({
    type: ADD_CHECKOUT_INTERACTION,
    payload: {interaction, product},
});

export const addProductView = (product) => ({
    type: ADD_PRODUCT_VIEW,
    payload: {product},
});

