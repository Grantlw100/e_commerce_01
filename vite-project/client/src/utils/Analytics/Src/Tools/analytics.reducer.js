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
    ADD_PAGE_ANALYTICS,
  } from './analytics.Tools/analytics.actions.js';
  import { initialState } from './analytics.Tools/analytics.initialState.js';
  
  const analyticsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_PAGE_VIEW:
        return {
          ...state,
          pageViews: [...state.pageViews, action.payload],
        };

      case ADD_PAGE_ANALYTICS:
        return {
            ...state,
            pageAnalytics: {
                ...state.pageAnalytics,
                [action.payload.path] : {
                    duration: action.payload.duration,
                    scrollDepth: action.payload.scrollDepth,
                    entryPoint: action.payload.entryPoint,
                    exitPoint: action.payload.exitPoint,
                }
            }
        };
  
        case ADD_USER_FEEDBACK:
            return {
                ...state,
                userFeedback: [
                    ...state.userFeedback,
                    {
                        timestamp: action.payload.timestamp,
                        feedback: action.payload.feedback,
                        feedbackType: action.payload.feedbackType,
                        page: action.payload.page,
                        user: {
                            id: action.payload.userId,
                            name: action.payload.userName,
                            email: action.payload.userEmail,
                            isAdmin: action.payload.isAdmin,
                        },
                        product: {
                            id: action.payload.productId,
                            name: action.payload.productName,
                            category: action.payload.productCategory,
                            price: action.payload.productPrice,
                        }
                    }
                ]
            };

      case ADD_CLICK_EVENT:
        return {
          ...state,
          clickEvents: [...state.clickEvents, action.payload],
        };
  
      case ADD_FORM_SUBMISSION:
        return {
          ...state,
          formSubmissions: [...state.formSubmissions, action.payload],
        };
  
      case ADD_CUSTOM_EVENT:
        return {
          ...state,
          customEvents: [...state.customEvents, action.payload],
        };
  
      case ADD_USER_FLOW:
        return {
          ...state,
          userFlows: [...state.userFlows, action.payload],
        };
  
      case ADD_SEARCH_QUERY:
        return {
          ...state,
          searchQueries: [...state.searchQueries, action.payload],
        };
  
  
      case ADD_USER_DEMOGRAPHIC:
        return {
          ...state,
          userDemographics: [...state.userDemographics, action.payload],
        };
  
      case ADD_PRODUCT_INTERACTION:
        return {
          ...state,
          productInteractions: [
            ...state.productInteractions, 
            {
                 
                interactionType: action.payload.interactionType,
                timestamp: Date.now(), 
                productId: action.payload.productId,
            }
        ],
        };
  
      case ADD_PURCHASE_BEHAVIOR:
        return {
          ...state,
          purchaseBehaviors: [...state.purchaseBehaviors, action.payload],
        };
  
      case ADD_USER_ENGAGEMENT:
        return {
          ...state,
          userEngagements: [...state.userEngagements, action.payload],
        };
  
      case ADD_SEARCH_BEHAVIOR:
        return {
          ...state,
          searchBehaviors: [...state.searchBehaviors, action.payload],
        };
  
      case ADD_SCROLL_DEPTH:
        return {
          ...state,
          scrollDepths: [...state.scrollDepths, action.payload],
        };
  
      case ADD_ENTRY_EXIT_POINT:
        return {
          ...state,
          entryExitPoints: [
            ...state.entryExitPoints, 
            {entry: action.payload.entry, exit: action.payload.exit}
            ],
        };

      case ADD_USER_BEHAVIOR:
        return {
          ...state,
          userBehaviors: [...state.userBehaviors, action.payload],
        };
  
      case ADD_SESSION_DURATION:
        return {
          ...state,
          sessionDurations: [...state.sessionDurations, action.payload],
        };
  
      case ADD_CART_INTERACTION:
        return {
          ...state,
          cartInteractions: [...state.cartInteractions, action.payload],
        };
  
      case ADD_CHECKOUT_INTERACTION:
        return {
          ...state,
          checkoutInteractions: [...state.checkoutInteractions, action.payload],
        };
  
      case ADD_PRODUCT_VIEW:
        return {
          ...state,
          productViews: [...state.productViews, action.payload],
        };
  
      default:
        return state;
    }
  };
  
  export default analyticsReducer;
  