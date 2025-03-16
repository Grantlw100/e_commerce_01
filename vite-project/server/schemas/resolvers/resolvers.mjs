// import dotenv from 'dotenv';
// dotenv.config();
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
import models from '../../models/index.mjs';
const { User, Product, Category, Keyword, Season, Promotion, Review, Order, Cart, Notification, UserAlert, Content } = models;
import { signToken, AuthenticationError } from '../../utils/auth.mjs';
import pkgBcrypt from 'bcryptjs';
const { hash, compare } = pkgBcrypt;
import stripe from 'stripe';
import s3utils from '../../utils/State-Cart-Mgmt-Utils/s3.utility.mjs';
const { uploadFile, loadFile, deleteFile } = s3utils;
import { saveUserSession, loadUserSession, deleteUserSession } from '../routes/src/routeUtils/user-manage.mjs';
import { saveGlobalState, loadGlobalState } from '../routes/src/routeUtils/store-manage.mjs';
import DynamoDBClientDev from '../../config/connection.aws.mjs';
import { PutCommand, GetCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
                                    /*  GRAHQL RESOLVERS */
        /* All functions responsinle for querying and mutating data in the MongoDB */
        
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


const myStripe = new stripe(process.env.STRIPE_SECRET_KEY);

// defining resolvers 

// resolver(parents, args, context, info) => { return data }
// resolver functions are responsible for querying and mutating data in the MongoDB
    // resolvers include 4 standard arguments: parent, args, context, info
    // parent - the result of the previous resolver execution level
    // args - the arguments passed into the query or mutation
    // context - an object that is shared by all resolvers in a query
    // info - contains information about the execution state of the query, including the field name, path to the field from the root, and more

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    // products 
    // #region 
    getAllProducts: async () => {
      try {
        const products = await Product.find()
        .populate('category')
        .populate('season')
        .populate('promotion')
        .populate('keywords');
        for (const product of products) {
          if (product.image) {
            try {
              const imageKey = product.image.split('.s3.amazonaws.com/')[1];
              product.image = await loadFile(imageKey);
            } catch (imageError) {
              console.error(`Error loading image for product ${product._id}:`, imageError);
              product.image = product.image; // Keeping the original URL
            }
          }
    
          if (product.descriptionImages && product.descriptionImages.length > 0) {
            product.descriptionImages = await Promise.all(
              product.descriptionImages.map(async (imageUrl) => {
                try {
                  const imageKey = imageUrl.split('.s3.amazonaws.com/')[1];
                  return await loadFile(imageKey);
                } catch (imageError) {
                  console.error(`Error loading description image for product ${product._id}:`, imageError);
                  return imageUrl; // Keeping the original URL
                }
              })
            );
          }
        }
        return products;
      } catch (error) {
        console.error('Error loading products:', error);
        throw new Error('Failed to load products');
      }
    },
    getProductById: async (_, { id }) => {
      try {
        const product = await Product.findById(id).populate('category').populate('season').populate('promotion').populate('keywords');
        if (!product) {
          throw new Error('Product not found');
        }
    
        if (product.image) {
          try {
            const imageKey = product.image.split('.s3.amazonaws.com/')[1];
            product.image = await loadFile(imageKey);
          } catch (imageError) {
            console.error(`Error loading image for product ${product._id}:`, imageError);
            product.image = product.image; // Keeping the original URL
          }
        }
    
        if (product.descriptionImages && product.descriptionImages.length > 0) {
          product.descriptionImages = await Promise.all(
            product.descriptionImages.map(async (imageUrl) => {
              try {
                const imageKey = imageUrl.split('.s3.amazonaws.com/')[1];
                return await loadFile(imageKey);
              } catch (imageError) {
                console.error(`Error loading description image for product ${product._id}:`, imageError);
                return imageUrl; // Keeping the original URL
              }
            })
          );
        }
    
        return product;
      } catch (error) {
        console.error('Error loading product:', error);
        throw new Error('Failed to load product');
      }
    },
    getProductsByCategory: async (_, { categoryId, name }) => {
      try {
        let products = [];
        if (categoryId) {
          products = await Product.find({ category: categoryId });
        } else if (name) {
          const category = await Category.findOne({
            name: { $regex: new RegExp(name, 'i') },
          });
          if (category) {
            products = await Product.find({ category: category._id });
          } else {
            throw new Error('Category not found');
          }
        }
        return products;
      } catch (error) {
        console.error('Error loading products by category:', error);
        throw new Error('Failed to load products by category')
        }
    },
    getProductsByKeyword: async (_, { keywordId, name }) => {
      try {
        let products = [];
        if (keywordId) {
          products = await Product.find({ keywords: keywordId });
        } else if (name) {
          const keyword = await Keyword.findOne({
            name: { $regex: new RegExp(name, 'i') },
          });
          if (keyword) {
            products = await Product.find({ keywords: keyword._id });
          } else {
            throw new Error('Keyword not found');
          }
        }
        return products;
      } catch (error) {
        console.error('Error loading products by keyword:', error);
        throw new Error('Failed to load products by keyword');

      }
    },
    getProductsBySeason: async (_, { seasonId, name }) => {
      try {
        let products = [];
        if (seasonId) {
          products = await Product.find({ season: seasonId });
        } else if (name) {
          const season = await Season.findOne({
            name: { $regex: new RegExp(name, 'i') },
          });
          if (season) {
            products = await Product.find({ season: season._id });
          } else {
            throw new Error('Season not found');
          }
        }
        return products;
      } catch (error) {
        console.error('Error loading products by season:', error);
        throw new Error('Failed to load products by season')
      }
    },
    getProductsByPromotion: async (_, { promotionId, name }) => {
      try {
        let products = [];
        if (promotionId) {
          products = await Product.find({ promotion: promotionId });
        } else if (name) {
          const promotion = await Promotion.findOne({
            name: { $regex: new RegExp(name, 'i') },
          });
          if (promotion) {
            products = await Product.find({ promotion: promotion._id });
          } else {
            throw new Error('Promotion not found');
          }
        }
        return products;
      } catch (error) {
        console.error('Error loading products by promotion:', error);
        throw new Error('Failed to load products by promotion');
      }
    },
    // #endregion

    // product details 
    // #region
    getAllCategories: async () => {
      try {
        const categories = await Category.find();
        for (const category of categories) {
          if (category.image) {
            try {
              const imageKey = category.image.split('.s3.amazonaws.com/')[1];
              category.image = await loadFile(imageKey);
            } catch (imageError) {
              console.error(`Error loading image for category ${category.id}:`, imageError);
              // Optionally, you can set a default image or keep the original URL if image loading fails
              category.image = category.image; // Keeping the original URL
            }
          }
        }
        return categories;
      } catch (error) {
        console.error('Error loading categories:', error);
        throw new Error('Failed to load categories');
      }
    },
    getAllKeywords: async () => {
      try {
        const keywords = await Keyword.find();
        for (const keyword of keywords) {
          if (keyword.image) {
            try {
              const imageKey = keyword.image.split('.s3.amazonaws.com/')[1];
              keyword.image = await loadFile(imageKey);
            } catch (imageError) {
              console.error(`Error loading image for keyword ${keyword.id}:`, imageError);
              keyword.image = keyword.image; // Keeping the original URL
            }
          }
        }
        return keywords;
      } catch (error) {
        console.error('Error loading keywords:', error);
        throw new Error('Failed to load keywords');
      }
    },
    getAllSeasons: async () => {
      try {
        const seasons = await Season.find();
        for (const season of seasons) {
          if (season.image) {
            try {
              const imageKey = season.image.split('.s3.amazonaws.com/')[1];
              season.image = await loadFile(imageKey);
            } catch (imageError) {
              console.error(`Error loading image for season ${season.id}:`, imageError);
              season.image = season.image; // Keeping the original URL
            }
          }
        }
        return seasons;
      } catch (error) {
        console.error('Error loading seasons:', error);
        throw new Error('Failed to load seasons');
      }
    },
    getAllPromotions: async () => {
      try {
        const promotions = await Promotion.find();
        for (const promotion of promotions) {
          if (promotion.image) {
            try {
              const imageKey = promotion.image.split('.s3.amazonaws.com/')[1];
              promotion.image = await loadFile(imageKey);
            } catch (imageError) {
              console.error(`Error loading image for promotion ${promotion.id}:`, imageError);
              promotion.image = promotion.image; // Keeping the original URL
            }
          }
        }
        return promotions;
      } catch (error) {
        console.error('Error loading promotions:', error);
        throw new Error('Failed to load promotions');
      }
    },    
    // #endregion

    // user details
    // #region
    getSingleUser: async (_, { id, email, phone, order }) => {
      try {
        let user = null;
        if (id) {
          user = await User.findById(id)
            .populate('orders')
            .populate('lovedProducts')
            .populate('recentlyViewed')
            .populate('cart')
            .populate('notifications')
            .populate('userAlerts')
            .populate('reviews');
        } else if (email) {
          user = await User.findOne({ email })
            .populate('orders')
            .populate('lovedProducts')
            .populate('recentlyViewed')
            .populate('cart')
            .populate('notifications')
            .populate('userAlerts')
            .populate('reviews');
        } else if (phone) {
          user = await User.findOne({ phone })
            .populate('orders')
            .populate('lovedProducts')
            .populate('recentlyViewed')
            .populate('cart')
            .populate('notifications')
            .populate('userAlerts')
            .populate('reviews');
        } else if (order) {
          user = await User.findOne({ 'orders._id': order.id })
            .populate('orders')
            .populate('lovedProducts')
            .populate('recentlyViewed')
            .populate('cart')
            .populate('notifications')
            .populate('userAlerts')
            .populate('reviews');
        }

        if (user.profilePicture) {
          try {
            const imageKey = user.profilePicture.split('.s3.amazonaws.com/')[1];
            user.profilePicture = await loadFile(imageKey);
          } catch (imageError) {
            console.error(`Error loading profile picture for user ${user._id}:`, imageError);
            user.profilePicture = user.profilePicture; // Keeping the original URL
          }
        };
    
        if (!user) {
          throw new Error('User not found');
        };
    
        return user;
      } catch (error) {
        console.error('Error retrieving user:', error);
        throw new Error('Failed to retrieve user');
      }
    },
    getAllUsers: async () => {
      try {
        const users = await User.find()
        return users;
      } catch (error) {
        console.error('Error retrieving users:', error);
        throw new Error('Failed to retrieve users');
      }
    },
    // #endregion

    // cart details & order history
    // #region
    getUserCart: async (parent, { userId }) => {
      return Cart.findOne({ user: userId });
    },
    getAllOrders: async () => {
      return Order.find();
    },
    getOrderHistory: async (parent, { userId }) => {
      return Order.find({ user: userId });
    },
    getSingleOrder: async (parent, { orderId }) => {
      return Order.findOne({ _id: orderId });
    },
    // #endregion

    // content alerts & notifications
    // #region
    getAllContent: async () => {
      try {
        const content = await Content.find();
        for (const contentItem of content) {
          if (contentItem.contentImages && contentItem.contentImages.length > 0) {
            contentItem.contentImages = await Promise.all(
              contentItem.contentImages.map(async (imageUrl) => {
                try {
                  const imageKey = imageUrl.split('.s3.amazonaws.com/')[1];
                  return await loadFile(imageKey);
                } catch (imageError) {
                  console.error(`Error loading content image for content ${contentItem._id}:`, imageError);
                  return imageUrl; // Keeping the original URL
                }
              })
            );
          }
        }
        return content;
      } catch (error) {
        console.error('Error loading content:', error);
        throw new Error('Failed to load content');
      }
    },
    getAllUserAlerts: async () => {
      try {
        const userAlerts = await UserAlert.find();
        for (const userAlert of userAlerts) {
          if (userAlert.image) {
            try {
              const imageKey = userAlert.image.split('.s3.amazonaws.com/')[1];
              userAlert.image = await loadFile(imageKey);
            } catch (imageError) {
              console.error(`Error loading image for user alert ${userAlert._id}:`, imageError);
              // Keeping the original URL
            }
          }
        }
        return userAlerts;
      } catch (error) {
        console.error('Error loading user alerts:', error);
        throw new Error('Failed to load user alerts');
      }
    },
    getAllNotifications: async () => {
      try {
        const notifications = await Notification.aggregate([
          {
            $group: {
              _id: {
                notificationText: "$notificationText",
                notificationType: "$notificationType" // Include this if you want to group by notificationType as well
              },
              doc: { $first: "$$ROOT" }
            }
          },
          {
            $replaceRoot: { newRoot: "$doc" }
          }
        ]);
    
        return notifications;
      } catch (error) {
        console.error('Error loading notifications:', error);
        throw new Error('Failed to load notifications');
      }
    },    
    // #endregion

    getReviewsByProduct: async (parent, { productId }) => {
      try {
        const reviews = await Review.find({ product: productId });

        if (!reviews) {
          throw new Error('Reviews not found');
        }

        if (reviews.length > 0) {
          for (const review of reviews) {
            if (review.image) {
              try {
                const imageKey = review.image.split('.s3.amazonaws.com/')[1];
                review.image = await loadFile(imageKey);
              } catch (imageError) {
                console.error(`Error loading image for review ${review._id}:`, imageError);
                review.image = review.image; // Keeping the original URL
              }
            }
          }
        }
        return reviews;
      } catch (error) {
        console.error('Error loading reviews:', error);
        throw new Error('Failed to load reviews');
      }
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
    // user management
    // #region
    createUser: async (_, { input, file }) => {
      try {
          // Upload the file to S3 and get the file URL
          const fileUploadResult = await uploadFile(file);
          const profileImageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileUploadResult.Key}`;
          
          // Create a new user with the input data and profile image URL
          const newUser = new User({
              ...input,
              profilePicture: profileImageUrl, // Use 'profileImage' if that's the field name in your schema
          });
          const user = await newUser.save();
          
          // Generate a token for the new user
          const token = signToken(user);
          
          // Prepare session data
          const sessionData = {
              createdAt: Date.now(),
              lastActiveAt: Date.now(),
              userId: user._id.toString(),
              token,
          };
          
          // Save the user session to DynamoDb
          await saveUserSession(user._id.toString(), sessionData);
          
          // Return the user data and token
          return { token, user, profileImageUrl };
      } catch (error) {
          console.error('Error creating user:', error);
          throw new Error('Failed to create user');
      }
    },
    updateUser: async (_, { id, input, file }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error('User not found');
        }
    
        let profileImageUrl = user.profilePicture;
    
        // Check if a new file is being uploaded
        if (file) {
          // Delete the old profile picture from S3 if it exists
          if (user.profilePicture) {
            const oldKey = user.profilePicture.split('/').pop();
            await deleteFile(oldKey);
          }
    
          // Upload the new profile picture to S3
          const fileUploadResult = await uploadFile(file);
          profileImageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileUploadResult.Key}`;
        }
    
        // Update the user with new data and profile image URL if changed
        const updatedUser = await User.findByIdAndUpdate(
          id,
          { ...input, profilePicture: profileImageUrl },
          { new: true }
        );
    
        const token = signToken(updatedUser);
    
        return {
          token,
          user: updatedUser,
          profileImageUrl,
        };
      } catch (error) {
        console.error('Error updating user:', error);
        return error;
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error('User not found');
        }
    
        // Delete the profile picture from S3 if it exists
        if (user.profilePicture) {
          const oldKey = user.profilePicture.split('/').pop();
          await deleteFile(oldKey);
        }
    
        // Delete the user session from DynamoDb
        await deleteUserSession(id);
    
        // Delete the user from MongoDB
        await User.findByIdAndDelete(id);
    
        return true;
      } catch (error) {
        console.error('Error deleting user:', error);
        return false;
      }
    },
    changeDarkMode: async (_, { id, darkMode }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error('User not found');
        }

        const updatedUser = await User.findByIdAndUpdate(
          id,
          { darkMode: darkMode },
          { new: true }
        );

        return updatedUser;
      } catch (error) {
        console.error('Error updating user:', error);
        return error;
      }
    },
    changePassword: async (_, { id, oldPassword, newPassword }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error('User not found');
        }

        const isMatch = await compare(oldPassword, user.password);
        if (!isMatch) {
          throw new Error('Incorrect password');
        }

        const saltRounds = 10;
        const hashedPassword = await hash(newPassword, saltRounds);

        const updatedUser = await User.findByIdAndUpdate(
          id,
          { password: hashedPassword },
          { new: true }
        );

        return updatedUser;
      } catch (error) {
        console.error('Error updating user password:', error);
        return error;
      }
    },
    loginUser: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email })
          .populate('orders')
          .populate('lovedProducts')
          .populate('recentlyViewed')
          .populate('cart')
          .populate('notifications')
          .populate('userAlerts');

        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }

        if (user.profilePicture) {
          try {
            const imageKey = user.profilePicture.split('.s3.amazonaws.com/')[1];
            user.profilePicture = await loadFile(imageKey);
          } catch (imageError) {
            console.error(`Error loading profile picture for user ${user._id}:`, imageError);
            user.profilePicture = user.profilePicture; // Keeping the original URL
          }
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error('Error logging in user:', error);
        throw new Error('Failed to log in user');
      }
    },
    logoutUser: async (parent, { id }) => {
      return User.findOneAndUpdate({ _id: id }, { token: null });
    },
    // #endregion

    // product details management
    // #region
    createCategory: async (_, { input, file }) => {
      try {
        const fileUploadResult = await uploadFile(file);
        const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileUploadResult.Key}`;
    
        const newCategory = new Category({
          ...input,
          image: imageUrl,
        });
    
        const category = await newCategory.save();
    
        return category;
      } catch (error) {
        console.error('Error creating category:', error);
        throw new Error('Error creating category');
      }
    },
    updateCategory: async (_, { id, input, file }) => {
      try {
        const category = await Category.findById(id);
    
        if (!category) {
          throw new Error('Category not found');
        }
    
        if (file) {
          // Delete the old image if it exists
          if (category.image) {
            const oldImageKey = category.image.split('.s3.amazonaws.com/')[1];
            await deleteFile(oldImageKey);
          }
    
          // Upload the new image
          const fileUploadResult = await uploadFile(file);
          input.image = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileUploadResult.Key}`;
        }
    
        Object.assign(category, input);
        await category.save();
    
        return category;
      } catch (error) {
        console.error('Error updating category:', error);
        throw new Error('Error updating category');
      }
    },
    deleteCategory: async (_, { id }) => {
      try { 
        const category = await Category.findById(id);
    
        if (!category) {
          throw new Error('Category not found');
        }
    
        // Delete the category image from S3 if it exists
        if (category.image) {
          const imageKey = category.image.split('.s3.amazonaws.com/')[1];
          await deleteFile(imageKey);
        }
    
        await Category.findByIdAndDelete(id);
    
        return true;
      } catch (error) {
        console.error('Error deleting category:', error);
        throw new Error('Error deleting category');
      }
    },
    createKeyword: async (_, { input, file }) => {
      try {
        if (file) {
          const fileUploadResult = await uploadFile(file);
          input.image = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileUploadResult.Key}`;
        }
    
        const newKeyword = new Keyword({
          ...input,
        });
    
        const keyword = await newKeyword.save();
        return keyword;
      } catch (error) {
        console.error('Error creating keyword:', error);
        throw new Error('Error creating keyword');
      }
    },
    updateKeyword: async (_, { id, input, file }) => {
      try {
        const keyword = await Keyword.findById(id);

        if (!keyword) {
          throw new Error('Keyword not found');
        }

        if (file) {
          // Delete the old image if it exists
          if (keyword.image) {
            const oldImageKey = keyword.image.split('.s3.amazonaws.com/')[1];
            await deleteFile(oldImageKey);
          }

          // Upload the new image
          const fileUploadResult = await uploadFile(file);
          input.image = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileUploadResult.Key}`;
        }

        Object.assign(keyword, input);
        await keyword.save();

        return keyword;
      } catch (error) {
        console.error('Error updating keyword:', error);
        throw new Error('Error updating keyword');
      }
    },
    deleteKeyword: async (_, { id }) => {
      try {
        const keyword = await Keyword.findById(id);

        if (!keyword) {
          throw new Error('Keyword not found');
        }

        // Delete the keyword image from S3 if it exists
        if (keyword.image) {
          const imageKey = keyword.image.split('.s3.amazonaws.com/')[1];
          await deleteFile(imageKey);
        }

        await Keyword.findByIdAndDelete(id);

        return true;
      } catch (error) {
        console.error('Error deleting keyword:', error);
        throw new Error('Error deleting keyword');
      }
    },
    createSeason: async (_, { input, file }) => {
      try {
        if (file) {
          const fileUploadResult = await uploadFile(file);
          input.image = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileUploadResult.Key}`;
        }

        const newSeason = new Season({
          ...input,
        });

        const season = await newSeason.save();
        return season;
      } catch (error) {
        console.error('Error creating season:', error);
        throw new Error('Error creating season');
      }
    },
    updateSeason: async (_, { id, input, file }) => {
      try {
        const season = await Season.findById(id);

        if (!season) {
          throw new Error('Season not found');
        }

        if (file) {
          // Delete the old image if it exists
          if (season.image) {
            const oldImageKey = season.image.split('.s3.amazonaws.com/')[1];
            await deleteFile(oldImageKey);
          }

          // Upload the new image
          const fileUploadResult = await uploadFile(file);
          input.image = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileUploadResult.Key}`;
        }

        Object.assign(season, input);
        await season.save();

        return season;
      } catch (error) {
        console.error('Error updating season:', error);
        throw new Error('Error updating season');
      }
    },
    deleteSeason: async (_, { id }) => {
      try {
        const season = await Season.findById(id);

        if (!season) {
          throw new Error('Season not found');
        }

        // Delete the season image from S3 if it exists
        if (season.image) {
          const imageKey = season.image.split('.s3.amazonaws.com/')[1];
          await deleteFile(imageKey);
        }

        await Season.findByIdAndDelete(id);

        return true;
      } catch (error) {
        console.error('Error deleting season:', error);
        throw new Error('Error deleting season');
      }
    },
    createPromotion: async (_, { input, file }) => {
      try {
        if (file) {
          const fileUploadResult = await uploadFile(file);
          input.image = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileUploadResult.Key}`;
        }

        const newPromotion = new Promotion({
          ...input,
        });

        const promotion = await newPromotion.save();
        return promotion;
      } catch (error) {
        console.error('Error creating promotion:', error);
        throw new Error('Error creating promotion');
      }
    },
    updatePromotion: async (_, { id, input, file }) => {
      try {
        const promotion = await Promotion.findById(id);

        if (!promotion) {
          throw new Error('Promotion not found');
        }

        if (file) {
          // Delete the old image if it exists
          if (promotion.image) {
            const oldImageKey = promotion.image.split('.s3.amazonaws.com/')[1];
            await deleteFile(oldImageKey);
          }

          // Upload the new image
          const fileUploadResult = await uploadFile(file);
          input.image = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileUploadResult.Key}`;
        }

        Object.assign(promotion, input);
        await promotion.save();

        return promotion;
      } catch (error) {
        console.error('Error updating promotion:', error);
        throw new Error('Error updating promotion');
      }
    },
    deletePromotion: async (_, { id }) => {
      try {
        const promotion = await Promotion.findById(id);

        if (!promotion) {
          throw new Error('Promotion not found');
        } 

        // Delete the promotion image from S3 if it exists
        if (promotion.image) {
          const imageKey = promotion.image.split('.s3.amazonaws.com/')[1];
          await deleteFile(imageKey);
        } 

        await Promotion.findByIdAndDelete(id);

        return true;
      } catch (error) {
        console.error('Error deleting promotion:', error);
        throw new Error('Error deleting promotion');
      }
    },
    // #endregion

    // product management
    // #region
    createProduct: async (_, { input, productImage, descriptionImages }) => {
      try {
        // Upload the main product image
        const productImageUploadResult = await uploadFile(productImage);
        const productImageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${productImageUploadResult.Key}`;
    
        // Upload description images if any
        let descriptionImagesUrls = [];
        if (descriptionImages && descriptionImages.length > 0) {
          descriptionImagesUrls = await Promise.all(
            descriptionImages.map(async (file) => {
              const fileUploadResult = await uploadFile(file);
              return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileUploadResult.Key}`;
            })
          );
        }
    
        // Create a new product
        const newProduct = new Product({
          ...input,
          image: productImageUrl,
          descriptionImages: descriptionImagesUrls,
        });
    
        const product = await newProduct.save();
    
        // Save the product session if needed (optional, based on your requirements)
        const sessionData = {
          createdAt: Date.now(),
          lastActiveAt: Date.now(),
          product: product._id,
        };
        await saveProductSession(sessionData);
    
        return product;
      } catch (error) {
        console.error('Error creating product:', error);
        throw new Error('Error creating product');
      }
    },    
    updateProduct: async (_, { id, input, productImage, descriptionImages }) => {
      try {
        const product = await Product.findById(id);
    
        if (!product) {
          throw new Error('Product not found');
        }
    
        let productImageUrl = product.image;
        let descriptionImagesUrls = product.descriptionImages;
    
        // Check if a new product image is being uploaded
        if (productImage) {
          // Delete the old product image from S3 if it exists
          if (product.image) {
            const oldKey = product.image.split('/').pop();
            await deleteFile(oldKey);
          }
    
          // Upload the new product image to S3
          const productImageUploadResult = await uploadFile(productImage);
          productImageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${productImageUploadResult.Key}`;
        }
    
        // Check if new description images are being uploaded
        if (descriptionImages && descriptionImages.length > 0) {
          // Delete the old description images from S3 if they exist
          if (product.descriptionImages && product.descriptionImages.length > 0) {
            await Promise.all(
              product.descriptionImages.map(async (imageUrl) => {
                const oldKey = imageUrl.split('/').pop();
                await deleteFile(oldKey);
              })
            );
          }
    
          // Upload the new description images to S3
          descriptionImagesUrls = await Promise.all(
            descriptionImages.map(async (file) => {
              const fileUploadResult = await uploadFile(file);
              return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileUploadResult.Key}`;
            })
          );
        }
    
        // Update the product with new data and image URLs if changed
        const updatedProduct = await Product.findByIdAndUpdate(
          id,
          { ...input, image: productImageUrl, descriptionImages: descriptionImagesUrls },
          { new: true }
        );
    
        return updatedProduct;
      } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Error updating product');
      }
    },
    deleteProduct: async (_, { id }) => {
      try {
        const product = await Product.findById(id);

        if (!product) {
          throw new Error('Product not found');
        }

        // Delete the product image from S3 if it exists
        if (product.image) {
          const imageKey = product.image.split('.s3.amazonaws.com/')[1];
          await deleteFile(imageKey);
        }

        // Delete the description images from S3 if they exist
        if (product.descriptionImages && product.descriptionImages.length > 0) {
          await Promise.all(
            product.descriptionImages.map(async (imageUrl) => {
              const imageKey = imageUrl.split('.s3.amazonaws.com/')[1];
              await deleteFile(imageKey);
            })
          );
        }

        await Product.findByIdAndDelete(id);

        return true;
      } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error('Error deleting product');
      }
    }, 
    // #endregion

    // notification alert and content management
    // #region
    createNotification: async (_, { input }) => {
      try {
        if (input.user === 'all') {
            const users = await User.find();
            const notifications = users.map(user => ({
              ...input,
              user: user._id,
            }));
            return Notification.insertMany(notifications);
          
          } else {
            const notification = await Notification.create(input);
            return notification;
        }
      } catch {
        console.error('Error creating notification:', error);
        throw new Error('Error creating notification');
      }
    },
    updateNotification: async (_, { id, input }) => {
      try {
        const notification = await Notification.findById(id);
        if (!notification) {
          throw new Error('Notification not found');
        }

        Object.assign(notification, input);
        await notification.save();
      
        return notification;
      } catch {
        console.error('Error updating notification:', error);
        throw new Error('Error updating notification');
      }
    },
    deleteNotification: async (_, { id }) => {
      try {
        const notification = await Notification.findById(id);
        if (!notification) {
          throw new Error('Notification not found');
        }

        await Notification.findByIdAndDelete(id);
        return true;
      } catch {
        console.error('Error deleting notification:', error);
        throw new Error('Error deleting notification');
      }
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
    sendNotificationToUser: async (parent, { userId, input }) => {
      return Notification.create({ user: userId, ...input });
    },
    createAlert: async (_, { input, file }) => {
      try {
        if (file) {
          console.log('Uploading file...');
          const fileUploadResult = await uploadFile(file);
          input.alertImage = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileUploadResult.Key}`;
        }

        if (input.user === 'all') {
          const users = await User.find();
          const alerts = users.map(user => ({
            ...input,
            user: user._id,
          }));
          return UserAlert.insertMany(alerts);
        } else {
          const alert = await UserAlert.create(input);
          return alert;
        }

      } catch (error) {
        console.error('Error creating alert:', error);
        throw new Error('Error creating alert');
      }
    },
    updateAlert: async (_, { input, file }) => {
      try {
        if (file) {
          console.log('Uploading file...');
          const fileUploadResult = await uploadFile(file);
          input.alertImage = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileUploadResult.Key}`;
        }

        const alert = await UserAlert.findByIdAndUpdate(input.id, input, { new: true });
        if (!alert) {
          throw new Error('Alert not found');
        }

        return alert;
      } catch (error) {
        console.error('Error updating alert:', error);
        throw new Error('Error updating alert');
      }
    },
    deleteAlert: async (_, { id }) => {
      try {
        const alert = await UserAlert.findById(id);
        if (!alert) {
          throw new Error('Alert not found');
        } 
        if (alert.alertImage) {
          const imageKey = alert.alertImage.split('.s3.amazonaws.com/')[1];
          await deleteFile(imageKey);
        }

        await UserAlert.findByIdAndDelete(id);
        return true;
      } catch (error) {
        console.error('Error deleting alert:', error);
        throw new Error('Error deleting alert');
      }
    },
    clearAlerts: async (parent, { userId }) => {
      return UserAlert.deleteMany({ user: userId });
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
    sendUserAlertToUser: async (parent, { userId, alertText, type }) => {
      return UserAlert.create({ user: userId, alertText, type });
    },
    createContent: async (_, { input, files }) => {
      try {
        if (files && files.length > 0) {
          const fileUploadResults = await uploadMultipleFiles(files);
          input.contentImages = fileUploadResults.map(result => `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${result.Key}`);
        }
        
        if (input.user === 'all') {
          const users = await User.find();
          const contents = users.map(user => ({
            ...input,
            user: user._id,
          }));
          return Content.insertMany(contents);
        } else {
          const content = await Content.create(input);
          return content;
        }
      } catch (error) {
        console.error('Error creating content:', error);
        throw new Error('Error creating content');
      }
    },
    updateContent: async (_, { id, input, newFiles, deleteImages }) => {
      try {
        const content = await Content.findById(id);
    
        if (!content) {
          throw new Error('Content not found');
        }
    
        // Handle new files upload
        if (newFiles && newFiles.length > 0) {
          const newFileUploadResults = await Promise.all(newFiles.map(file => uploadFile(file)));
          const newFileUrls = newFileUploadResults.map(result => `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${result.Key}`);
          input.images = [...content.images, ...newFileUrls];
        } else {
          input.images = content.images;
        }
    
        // Handle image deletion
        if (deleteImages && deleteImages.length > 0) {
          const remainingImages = input.images.filter(image => !deleteImages.includes(image));
          for (const imageUrl of deleteImages) {
            const imageKey = imageUrl.split('.s3.amazonaws.com/')[1];
            await deleteFile(imageKey);
          }
          input.images = remainingImages;
        }
    
        Object.assign(content, input);
        await content.save();
    
        return content;
      } catch (error) {
        console.error('Error updating content:', error);
        throw new Error('Error updating content');
      }
    },    
    deleteContent: async (_, { id }) => {
      try {
        const content = await Content.findById(id);
    
        if (!content) {
          throw new Error('Content not found');
        }
    
        if (content.images && content.images.length > 0) {
          await Promise.all(content.images.map(async imageUrl => {
            const imageKey = imageUrl.split('.s3.amazonaws.com/')[1];
            await deleteFile(imageKey);
          }));
        }
    
        await Content.findByIdAndDelete(id);
        return true;
      } catch (error) {
        console.error('Error deleting content:', error);
        throw new Error('Error deleting content');
      }
    },    
    // #endregion

    // review and user feedback management 
    // #region
    createReview: async (_, { productId, userId, input, files }) => {
      try {
        const product = await Product.findById(productId);
        if (!product) throw new Error('Product not found');
    
        if (!userId) throw new Error('Please log in to leave a review');
    
        let reviewImagesUrls = [];
        if (files && files.length > 0) {
          reviewImagesUrls = await Promise.all(
            files.map(async (file) => {
              try {
                const uploadResult = await uploadFile(file);
                return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${uploadResult.Key}`;
              } catch (imageError) {
                console.error(`Error uploading review image:`, imageError);
                throw new Error('Error uploading review image');
              }
            })
          );
        }
    
        const review = await Review.create({
          ...input,
          reviewImages: reviewImagesUrls,
          reviewProduct: productId,
          reviewUser: userId,
        });
    
        product.reviews.push(review._id);
        await product.save();
    
        return review;
      } catch (error) {
        console.error('Error creating review:', error);
        throw new Error('Error creating review');
      }
    },
    updateReview: async (_, { id, input, newFiles, deleteFiles }) => {
      try {
        const review = await Review.findById(id);
        if (!review) throw new Error('Review not found');
    
        // Handle files to be deleted
        if (deleteFiles && deleteFiles.length > 0) {
          review.reviewImages = review.reviewImages.filter(imageUrl => {
            const shouldDelete = deleteFiles.includes(imageUrl);
            if (shouldDelete) {
              try {
                const imageKey = imageUrl.split('.s3.amazonaws.com/')[1];
                deleteFile(imageKey);
              } catch (imageError) {
                console.error(`Error deleting review image for review ${review._id}:`, imageError);
              }
            }
            return !shouldDelete;
          });
        }
    
        // Handle new files
        if (newFiles && newFiles.length > 0) {
          const newImageUrls = await Promise.all(
            newFiles.map(async (file) => {
              try {
                const uploadResult = await uploadFile(file);
                return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${uploadResult.Key}`;
              } catch (imageError) {
                console.error(`Error uploading review image:`, imageError);
                throw new Error('Error uploading review image');
              }
            })
          );
          review.reviewImages.push(...newImageUrls);
        }
    
        // Update review with new data
        Object.assign(review, input);
        await review.save();
    
        return review;
      } catch (error) {
        console.error('Error updating review:', error);
        throw new Error('Error updating review');
      }
    },
    deleteReview: async (_, { id }) => {
      try {
        const review = await Review.findById(id);
        if (!review) throw new Error('Review not found');
    
        // Delete review images from S3 if they exist
        if (review.reviewImages && review.reviewImages.length > 0) {
          await Promise.all(
            review.reviewImages.map(async (imageUrl) => {
              try {
                const imageKey = imageUrl.split('.s3.amazonaws.com/')[1];
                await deleteFile(imageKey);
              } catch (imageError) {
                console.error(`Error deleting review image for review ${review._id}:`, imageError);
              }
            })
          );
        }
    
        await Review.findByIdAndDelete(id);
    
        // Remove review reference from product
        const product = await Product.findById(review.reviewProduct);
        if (product) {
          product.reviews = product.reviews.filter((reviewId) => reviewId.toString() !== id);
          await product.save();
        }
    
        return true;
      } catch (error) {
        console.error('Error deleting review:', error);
        throw new Error('Error deleting review');
      }
    },
    addProductToLoved: async (_, { userId, productId }) => {
      try {
        const user = await User.findById(userId);
        user.lovedProducts.push(productId);

        await user.save();
        return user;
      } catch (error) {
        console.error('Error adding product to loved:', error);
        throw new Error('Failed to add product to loved');
      }
    },
    removeProductFromLoved: async (_, { userId, productId }) => {
      try {
        const user = await User.findById(userId);
        user.lovedProducts = user.lovedProducts.filter(product => product.toString() !== productId);

        await user.save();
        return user;
      } catch (error) {
        console.error('Error removing product from loved:', error);
        throw new Error('Failed to remove product from loved');
      }
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
    // #endregion

    // cart and order management
    // #region
    createCart: async (parent, { userId, products, cartTotal }) => {
      return Cart.create({ user: userId, products, cartTotal });
    },
    updateCart: async (parent, { userId, input }) => {
      return Cart.findOneAndUpdate({ user: userId }, input, { new: true });
    },
    deleteCart: async (parent, { userId }) => {
      return Cart.findOneAndDelete({ user: userId });
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
    createOrder: async (parent, { userId, products, total, status }) => {
      return Order.create({ user: userId, products, orderTotal: total, orderStatus: status });
    },
    updateOrder: async (parent, { id, status }) => {
      return Order.findOneAndUpdate({ _id: id }, { orderStatus: status }, { new: true });
    },
    deleteOrder: async (parent, { id }) => {
      return Order.findOneAndDelete({ _id: id });
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
    // #endregion

   
    saveGlobalState: async (parent, { input }) => {
      return saveGlobalState(input);
    },
    loadGlobalState: async () => {
      return loadGlobalState();
    },
    uploadSingleFile: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
  
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${Date.now()}-${filename}`,
        Body: stream,
        ContentType: mimetype,
        ACL: 'public-read',
      };
  
      const result = await s3.upload(uploadParams).promise();
      return {
        filename,
        mimetype,
        encoding,
        url: result.Location,
      };
    },
    uploadMultipleFiles: async (parent, { files }) => {
      const uploadedFiles = await Promise.all(
        files.map(async (file) => {
          const { createReadStream, filename, mimetype, encoding } = await file;
          const stream = createReadStream();
  
          const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${Date.now()}-${filename}`,
            Body: stream,
            ContentType: mimetype,
            ACL: 'public-read',
          };
  
          const result = await s3.upload(uploadParams).promise();
          return {
            filename,
            mimetype,
            encoding,
            url: result.Location,
          };
        })
      );
  
      return uploadedFiles;
    },
  },
};

export default resolvers;
