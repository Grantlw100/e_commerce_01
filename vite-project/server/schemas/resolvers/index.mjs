import dynamicResolvers from "./dynamicRes.mjs";
import ContentResolvers from "./resContent.mjs";
import NotificationResolvers from "./resNotification.mjs";
import UserResolvers from "./resUser.mjs";
import RecommendationResolvers from "./resRecommendation.mjs";
import ProductDetailsResolvers from "./resProductDetails.mjs";
const {KeywordResolvers, CategoryResolvers, SeasonResolvers, PromotionResolvers} = ProductDetailsResolvers
import ProductResolvers from "./resProduct.mjs";
import OrderResolvers from "./resOrder.mjs";
import UserCartResolvers from "./resUserCart.mjs";
import ReviewResolvers from "./resReview.mjs";
import TokenResolvers from "./resToken.mjs";
import UserAlertResolvers from "./resUserAlert.mjs";
import WishListResolvers from "./resWishlist.mjs";

const resolvers = {
    Query: {
        ...dynamicResolvers.Query,
        ...ContentResolvers.Query,
        ...NotificationResolvers.Query,
        ...UserResolvers.Query,
        ...RecommendationResolvers.Query,
        ...KeywordResolvers.Query,
        ...SeasonResolvers.Query,
        ...PromotionResolvers.Query,
        ...CategoryResolvers.Query,
        ...ProductDetailsResolvers.Query,
        ...ProductResolvers.Query,
        ...OrderResolvers.Query,
        ...UserCartResolvers.Query,
        ...ReviewResolvers.Query,
        ...TokenResolvers.Query,
        ...UserAlertResolvers.Query,
        ...WishListResolvers.Query,
    },
    Mutation: {
        ...dynamicResolvers.Mutation,
        ...ContentResolvers.Mutation,
        ...NotificationResolvers.Mutation,
        ...UserResolvers.Mutation,
        ...RecommendationResolvers.Mutation,
        ...KeywordResolvers.Mutation,
        ...SeasonResolvers.Mutation,
        ...PromotionResolvers.Mutation,
        ...CategoryResolvers.Mutation,
        ...ProductDetailsResolvers.Mutation,
        ...ProductResolvers.Mutation,
        ...OrderResolvers.Mutation,
        ...UserCartResolvers.Mutation,
        ...ReviewResolvers.Mutation,
        ...TokenResolvers.Mutation,
        ...UserAlertResolvers.Mutation,
        ...WishListResolvers.Mutation,
    }
};

export default resolvers;