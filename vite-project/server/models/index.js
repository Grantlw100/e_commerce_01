const User = require('./user');
const Product = require('./product');
const Review = require('./review');
const Order = require('./order');
const Notification = require('./notification');
const UserAlert = require('./useralerts');
const UserCart = require('./userCart');
const [Keyword, Season, Promotion, Category] = require('./productDetails');

module.exports = {
    User,
    Product,
    Review,
    Order,
    Notification,
    UserAlert,
    UserCart,
    Keyword,
    Season,
    Promotion,
    Category,
};