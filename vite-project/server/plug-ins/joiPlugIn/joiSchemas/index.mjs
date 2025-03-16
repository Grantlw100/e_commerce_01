import {contentValidation} from './joiContent.mjs';
import {tokenValidation} from './joiToken.mjs';
import {notificationValidation} from './joiNotification.mjs';
import {orderValidation} from './joiOrder.mjs';
import {productValidation} from './joiProduct.mjs';
import {productDetailValidation} from './joiProductDetail.mjs';
import {recommendationValidation} from './joiRecommendation.mjs';
import {reviewValidation} from './joiReviews.mjs';
import {userValidation} from './joiUser.mjs';
import {userAlertValidation} from './joiUserAlert.mjs';
import {userCartValidation} from './joiUserCart.mjs';
import {userWishlistValidation} from './joiWishlist.mjs';

const validationSchemas = {
    content: contentValidation,
    notification: notificationValidation,
    order: orderValidation,
    product: productValidation,
    productDetail: productDetailValidation,
    recommendation: recommendationValidation,
    review: reviewValidation,
    user: userValidation,
    userAlert: userAlertValidation,
    userCart: userCartValidation,
    wishlist: wishlistValidation,
};

export default validationSchemas;
