const { User, Product, Category, Keyword, Season, Promotion, Review, Order, Cart, Notification, UserAlert } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const bcrypt = require('bcrypt');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    getAllProducts: async () => {
      return Product.find();
    },
    getProductById: async (parent, { id }) => {
      return Product.findOne({ _id: id });
    },
    getProductsByCategory: async (parent, { categoryId }) => {
      return Product.find({ category: categoryId });
    },
    getProductsByKeyword: async (parent, { keywordId }) => {
      return Product.find({ keywords: keywordId });
    },
    getProductsBySeason: async (parent, { seasonId }) => {
      return Product.find({ season: seasonId });
    },
    getProductsByPromotion: async (parent, { promotionId }) => {
      return Product.find({ promotion: promotionId });
    },
    getAllCategories: async () => {
      return Category.find();
    },
    getAllKeywords: async () => {
      return Keyword.find();
    },
    getAllSeasons: async () => {
      return Season.find();
    },
    getAllPromotions: async () => {
      return Promotion.find();
    },
    getUserById: async (parent, { id }) => {
      return User.findOne({ _id: id });
    },
    getUserCart: async (parent, { userId }) => {
      return Cart.findOne({ user: userId });
    },
    getAllOrders: async () => {
      return Order.find();
    },
    getOrdersByUser: async (parent, { userId }) => {
      return Order.find({ user: userId });
    },
    getOrderHistory: async (parent, { userId }) => {
      return Order.find({ user: userId });
    },
    getOrderDetails: async (parent, { orderId }) => {
      return Order.findOne({ _id: orderId });
    },
    getCart: async (parent, { userId }) => {
      return Cart.findOne({ user: userId });
    },
    getNotifications: async (parent, { userId }) => {
      return Notification.find({ user: userId });
    },
    getReviews: async (parent, { productId }) => {
      return Review.find({ reviewProduct: productId });
    },
    getUserAlerts: async (parent, { userId }) => {
      return UserAlert.find({ user: userId });
    },
    getLovedProducts: async (parent, { userId }) => {
      const user = await User.findById(userId).populate('lovedProducts');
      return user.lovedProducts;
    },
    getRecentlyViewed: async (parent, { userId }) => {
      const user = await User.findById(userId).populate('recentlyViewed');
      return user.recentlyViewed;
    },
  },
  Mutation: {
    createProduct: async (parent, args) => {
      return Product.create(args);
    },
    updateProduct: async (parent, { id, input }) => {
      return Product.findOneAndUpdate({ _id: id }, input, { new: true });
    },
    deleteProduct: async (parent, { id }) => {
      return Product.findOneAndDelete({ _id: id });
    },
    createCategory: async (parent, { name }) => {
      return Category.create({ name });
    },
    updateCategory: async (parent, { id, name }) => {
      return Category.findOneAndUpdate({ _id: id }, { name }, { new: true });
    },
    deleteCategory: async (parent, { id }) => {
      return Category.findOneAndDelete({ _id: id });
    },
    createKeyword: async (parent, { name }) => {
      return Keyword.create({ name });
    },
    updateKeyword: async (parent, { id, name }) => {
      return Keyword.findOneAndUpdate({ _id: id }, { name }, { new: true });
    },
    deleteKeyword: async (parent, { id }) => {
      return Keyword.findOneAndDelete({ _id: id });
    },
    createSeason: async (parent, { name }) => {
      return Season.create({ name });
    },
    updateSeason: async (parent, { id, name }) => {
      return Season.findOneAndUpdate({ _id: id }, { name }, { new: true });
    },
    deleteSeason: async (parent, { id }) => {
      return Season.findOneAndDelete({ _id: id });
    },
    createPromotion: async (parent, { name, discount, startDate, endDate }) => {
      return Promotion.create({ name, discount, startDate, endDate });
    },
    updatePromotion: async (parent, { id, name, discount, startDate, endDate }) => {
      return Promotion.findOneAndUpdate({ _id: id }, { name, discount, startDate, endDate }, { new: true });
    },
    deletePromotion: async (parent, { id }) => {
      return Promotion.findOneAndDelete({ _id: id });
    },
    createUser: async (parent, { input }) => {
      const user = await User.create(input);
      const token = signToken(user._id);
      return { token, user };
    },
    updateUser: async (parent, { id, input }) => {
      return User.findOneAndUpdate({ _id: id }, input, { new: true });
    },
    deleteUser: async (parent, { id }) => {
      return User.findOneAndDelete({ _id: id });
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user._id);
      return { token, user };
    },
    logoutUser: async (parent, { id }) => {
      return User.findOneAndUpdate({ _id: id }, { token: null });
    },
    createOrder: async (parent, { userId, products, total, status }) => {
      return Order.create({ user: userId, products, orderTotal: total, orderStatus: status });
    },
    updateOrder: async (parent, { id, status }) => {
      return Order.findOneAndUpdate({ _id: id }, { orderStatus: status }, { new: true });
    },
    deleteOrder: async (parent, { id }) => {
      return Order.findOneAndDelete({ _id: id });
    },
    createNotification: async (parent, { input }) => {
      return Notification.create(input);
    },
    updateNotification: async (parent, { id, input }) => {
      return Notification.findOneAndUpdate({ _id: id }, input, { new: true });
    },
    deleteNotification: async (parent, { id }) => {
      return Notification.findOneAndDelete({ _id: id });
    },
    createReview: async (parent, { productId, input }) => {
      const product = await Product.findById(productId);
      const review = await Review.create(input);
      product.reviews.push(review._id);
      await product.save();
      return review;
    },
    updateReview: async (parent, { id, input }) => {
      return Review.findOneAndUpdate({ _id: id }, input, { new: true });
    },
    deleteReview: async (parent, { id }) => {
      return Review.findOneAndDelete({ _id: id });
    },
    createCart: async (parent, { userId, products, cartTotal }) => {
      return Cart.create({ user: userId, products, cartTotal });
    },
    updateCart: async (parent, { userId, input }) => {
      return Cart.findOneAndUpdate({ user: userId }, input, { new: true });
    },
    deleteCart: async (parent, { userId }) => {
      return Cart.findOneAndDelete({ user: userId });
    },
    chargeOrder: async (parent, { userId, orderId, source }) => {
      const order = await Order.findById(orderId);
      const user = await User.findById(userId);
      const stripeTotal = Math.round(order.orderTotal * 100);
      const charge = await stripe.charges.create({
        amount: stripeTotal,
        currency: 'usd',
        source: source,
        description: `Order ${order._id} for ${user.email}`
      });

      if (!charge) throw new Error('Payment failed');

      return order;
    },
    addItemToCart: async (parent, { userId, productId, quantity }) => {
      const cart = await Cart.findOne({ user: userId });
      const itemIndex = cart.products.findIndex(item => item.toString() === productId);

      if (itemIndex > -1) {
        cart.products[itemIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
      return cart;
    },
    removeItemFromCart: async (parent, { userId, productId }) => {
      const cart = await Cart.findOne({ user: userId });
      cart.products = cart.products.filter(item => item.toString() !== productId);

      await cart.save();
      return cart;
    },
    updateCartItemQuantity: async (parent, { userId, productId, quantity }) => {
      const cart = await Cart.findOne({ user: userId });
      const itemIndex = cart.products.findIndex(item => item.toString() === productId);

      if (itemIndex > -1) {
        cart.products[itemIndex].quantity = quantity;
      }

      await cart.save();
      return cart;
    },
    clearCart: async (parent, { userId }) => {
      const cart = await Cart.findOne({ user: userId });
      cart.products = [];

      await cart.save();
      return cart;
    },
    addProductToLoved: async (parent, { userId, productId }) => {
      const user = await User.findById(userId);
      user.lovedProducts.push(productId);

      await user.save();
      return user;
    },
    removeProductFromLoved: async (parent, { userId, productId }) => {
      const user = await User.findById(userId);
      user.lovedProducts = user.lovedProducts.filter(product => product.toString() !== productId);

      await user.save();
      return user;
    },
    addProductToRecentlyViewed: async (parent, { userId, productId }) => {
      const user = await User.findById(userId);
      user.recentlyViewed.push(productId);

      await user.save();
      return user;
    },
    clearRecentlyViewed: async (parent, { userId }) => {
      const user = await User.findById(userId);
      user.recentlyViewed = [];

      await user.save();
      return user;
    },
    addAlert: async (parent, { userId, alertText, type }) => {
      return UserAlert.create({ user: userId, alertText, type });
    },
    updateAlertViewed: async (parent, { id, viewed }) => {
      return UserAlert.findOneAndUpdate({ _id: id }, { viewed }, { new: true });
    },
    clearAlerts: async (parent, { userId }) => {
      return UserAlert.deleteMany({ user: userId });
    },
    sendNotificationToAll: async (parent, { input }) => {
      try {
        const users = await User.find();
        const notifications = users.map(user => ({
          ...input,
          user: user._id,
        }));
        await Notification.insertMany(notifications);
        return true;
      } catch (error) {
        console.error('Error sending notifications:', error);
        return false;
      }
    },
    sendUserAlertToAll: async (parent, { input }) => {
      try {
        const users = await User.find();
        const alerts = users.map(user => ({
          ...input,
          user: user._id,
        }));
        await UserAlert.insertMany(alerts);
        return true;
      } catch (error) {
        console.error('Error sending user alerts:', error);
        return false;
      }
    },
    sendNotificationToUser: async (parent, { userId, input }) => {
      return Notification.create({ user: userId, ...input });
    },
    sendUserAlertToUser: async (parent, { userId, alertText, type }) => {
      return UserAlert.create({ user: userId, alertText, type });
    },
    addProductToLoved: async (parent, { userId, productId }) => {
      const user = await User.findById(userId);
        user.lovedProducts.push(productId);
        await user.save();
        return user;
    },
    removeProductFromLoved: async (parent, { userId, productId }) => {
      const user = await User.findById(userId);
        user.lovedProducts = user.lovedProducts.filter(product => product.toString() !== productId);
        await user.save();
        return user;
    },
    addProductToRecentlyViewed: async (parent, { userId, productId }) => {
      const user = await User.findById(userId);
        user.recentlyViewed.push(productId);
        await user.save();
        return user;
    },
    removeProductFromRecentlyViewed: async (parent, { userId, productId }) => {
      const user = await User.findById(userId);
        user.recentlyViewed = user.recentlyViewed.filter(product => product.toString() !== productId);
        await user.save();
        return user;
    },
    clearRecentlyViewed: async (parent, { userId }) => {
      const user = await User.findById(userId);
        user.recentlyViewed = [];
        await user.save();
        return user;
    },

  },
};

module.exports = resolvers;
