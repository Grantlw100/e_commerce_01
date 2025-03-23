import User from './user.mjs';
import Product from './product.mjs';
import Review from './review.mjs';
import Order from './order.mjs';
import Notification from './notification.mjs';
import UserAlert from './userAlert.mjs';
import UserCart from './userCart.mjs';
import Content from './content.mjs';
import productDetails from './productDetails.mjs';
import Recommendation from './recommendation.mjs';
import Token from './token.mjs';
import Store from './store.mjs';
import Settings from './settings.mjs';
import Message from './message.mjs';
import Subscription from './subscription.mjs';
import Wishlist from './wishlist.mjs';
import Layout from './layout.mjs';


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
                /*  MONGODB MODEL INDEX  */
        /* Index for all models within MongoDB & used by GraphQL */
        
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

const [Keyword, Season, Promotion, Category] = productDetails;

const models = {
    User,
    Product,
    Review,
    Order,
    Notification,
    Recommendation,
    Store,
    Settings,
    Message,
    Subscription,
    Wishlist,
    Layout,
    UserAlert,
    UserCart,
    Keyword,
    Season,
    Promotion,
    Category,
    Content,
    Token
};

export default models;