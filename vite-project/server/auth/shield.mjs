import { shield, rule, or, and, not, } from '../node_modules/graphql-shield/esm/index.js';

// INTGRRATE DYNAMIC RESOLVERS WITH GRAPHQL SHIELD



// profile has been authenticated or the users pin is verified 
    // guest access is allowed through this rule
const isAuthenticated = rule()(async (parent, args, ctx, info) => {
    return ctx.user.isAuthenticated === true || !! ctx.user
});



// Checks if the user is the owner of the entity
const isOwner = rule()(async (parent, args, context) => {
    const { entity, id } = args;
    const { user } = context;
  
    if (!user || !user.id) {
      return new Error("Unauthorized access");
    }
  
    // Dynamically load the correct model
    const Model = mongoose.model(entity);
    if (!Model) {
      return new Error(`Entity type '${entity}' is not recognized.`);
    }
  
    // Fetch the entity to verify ownership
    const item = await Model.findById(id).select("userId");
  
    if (!item) {
      return new Error("Item not found.");
    }
  
    // Check if the authenticated user owns the entity
    return item.userId.toString() === user.id.toString();
  });



// Checks if the user has 'user' role
    // user access is a necessity to perform these operations
const isUser = rule()(async (parent, args, ctx, info) => {
  return ctx.user && ctx.user.role === 'user';
});



// Checks if the user has 'admin' role
const isAdmin = rule()(async (parent, args, ctx, info) => {
  return ctx.user && ctx.user.role === 'admin' || ctx.user.role === 'superadmin';
});



// Checks if the user has 'superadmin' role
const isSuperAdmin = rule()(async (parent, args, ctx, info) => {
  return ctx.user && ctx.user.role === 'superadmin';
});



// Example permissions applying these rules
const permissions = shield({
  Query: {
    // Fields that require the user to be authenticated
    getPublicEntity: isAuthenticated,
    getPublicEntities: isAuthenticated,
    getEntitiesByLatest: isUser,
    getAdminEntity: isAdmin,
    getAdminEntities: isAdmin,
    getPersonalEntities: and(isAuthenticated, isOwner),
    getEntitiesByUpdates: isSuperAdmin,
    // recently added 
    getContent: isAuthenticated,
    getNotification: isAuthenticated, 
    getOrder: and(isAuthenticated, isOwner),
    getProduct: isAuthenticated,
    getKeyword: isAuthenticated,
    getSeason: isAuthenticated, 
    getCategory: isAuthenticated,
    getPromotion: isAuthenticated,
    getRecommendation: or(isOwner, isAdmin),
    getReview: isAuthenticated,
    getToken: and(isAuthenticated, isOwner),
    getUser: or(isOwner, isSuperAdmin),
    getUserAlert: isAuthenticated,
    getUserCart: or(isOwner, isAuthenticated),
    getWishlist: isAuthenticated
  },
  Mutation: {
    // You can apply similar rules for mutations
    createEntity: and(isAuthenticated, isUser),
    createContent: and(isAuthenticated, isUser),
    createNotification: and(isAuthenticated, isUser),
    createOrder: isAuthenticated, 
    createProduct: or(isUser, isAdmin),
    createSeason: isAdmin,
    createPromotion: isAdmin, 
    createCategory: isAdmin,
    createKeyword: isAdmin,
    createRecommendation: isAuthenticated,
    createReview: isUser,
    createToken: isAuthenticated,
    createUser: or(isAuthenticated, isUser),
    createUserAlert: or(isOwner, isAdmin),
    createUserCart: isAuthenticated,
    createWishlist: isUser,
    updateContent: or(isOwner, isAdmin),
    updateNotification: or(isOwner, isAdmin),
    updateOrder: or(isOwner, isAdmin),
    updateProduct: or(isOwner, isAdmin),
    updateKeyword: isAdmin,
    updatePromotion: isAdmin,
    updateSeason: isAdmin, 
    updateCategory: isAdmin,
    updateRecommendation: or(isOwner,isSuperAdmin),
    updateReview: isOwner,
    updateToken: and(isAuthenticated, isOwner),
    updateUser: or(isOwner, isSuperAdmin),
    updateUserAlert: or(isOwner, isAdmin),
    updateUserCart: or(isOwner, isSuperAdmin),
    updateWishlist: or(isOwner, isAdmin),
    deleteContent: or(isOwner, isAdmin),
    deleteNotification: or(isOwner, isAdmin),
    deleteorder: isOwner,
    deleteProduct: or(isAdmin, isOwner),
    deleteCategory: isAdmin,
    deleteKeyword: isAdmin, 
    deleteSeason: isAdmin, 
    deletePromotion: isAdmin, 
    deleteRecommendation: or(isSuperAdmin, isOwner),
    deleteReview: or(isOwner, isAdmin),
    deleteToken: or(isOwner, isSuperAdmin),
    deleteUser: or(isOwner, isSuperAdmin),
    deleteUserAlert: or(isOwner, isAdmin),
    deleteUserCart: or(isOwner, isSuperAdmin),
    deleteWishlist: or(isOwner, isSuperAdmin),
    batchCreateEntities: isAdmin,
    updateEntity: or(isAdmin, isOwner),
    batchUpdateEntities: isAdmin,
    deleteEntity: or(isUser, isOwner, isAdmin, isSuperAdmin),
    batchDeleteEntities: isSuperAdmin,
  },
});

export default permissions;


// Notes --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// no_cache - prevents rules from being cached.
// contextual - use when rule only relies on context parameter (useful for authentication).
// strict - use when rule relies on parent or args parameter as well (field specific modifications).