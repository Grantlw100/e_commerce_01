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
import {wishlistValidation} from './joiWishlist.mjs';
import SubInputValidation from './joiSubInputs.mjs';
import { storeValidation } from './joiStore.mjs';
import { settingsValidation } from './joiSettings.mjs';
import {layoutValidation} from './joiLayout.mjs';
import {messageValidation} from './joiMessage.mjs';
import {subscriptionValidation} from './joiSubscription.mjs';


const validationSchemas = {
    contentValidation,
    tokenValidation,
    notificationValidation,
    orderValidation,
    productValidation,
    productDetailValidation,
    recommendationValidation,
    reviewValidation,
    userValidation,
    userAlertValidation,
    userCartValidation,
    wishlistValidation,
    SubInputValidation,
    layoutValidation,
    messageValidation,
    subscriptionValidation,
    storeValidation,
    settingsValidation
};

export default validationSchemas;
