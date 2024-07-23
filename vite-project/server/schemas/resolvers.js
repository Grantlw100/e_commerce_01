require('dotenv').config();
const { User, Product, Category, Keyword, Season, Promotion, Review, Order, Cart, Notification, UserAlert, Content } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const bcrypt = require('bcrypt');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const { GraphQLUpload } = require('graphql-upload');
const { s3, uploadFile, uploadMultipleFiles, uploadSingleFile, saveFile, loadFile, deleteFile } = require('../utils/State-Cart-Mgmt-Utils/s3.utility');
const { saveUserSession, loadUserSession, deleteUserSession } = require('../utils/State-Cart-Mgmt-Utils/user-manage');
const { saveGlobalState, loadGlobalState } = require('../utils/State-Cart-Mgmt-Utils/store-manage');
const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();



const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    getAllProducts: async () => {
      try {
        const products = await Product.find().populate('category').populate('season').populate('promotion').populate('keywords');
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
    getSingleUser: async (_, { id, email, phone, order }) => {
      try {
        let user = null;
        if (id) {
          user = await User.findById(id)
            .populate('orders')
            .populate('lovedProducts')
            .populate('recentlyViewed')
            .populate('cart');
        } else if (email) {
          user = await User.findOne({ email })
            .populate('orders')
            .populate('lovedProducts')
            .populate('recentlyViewed')
            .populate('cart');
        } else if (phone) {
          user = await User.findOne({ phone })
            .populate('orders')
            .populate('lovedProducts')
            .populate('recentlyViewed')
            .populate('cart');
        } else if (order) {
          user = await User.findOne({ 'orders._id': order.id })
            .populate('orders')
            .populate('lovedProducts')
            .populate('recentlyViewed')
            .populate('cart');
        }
    
        if (!user) {
          throw new Error('User not found');
        }
    
        return user;
      } catch (error) {
        console.error('Error retrieving user:', error);
        throw new Error('Failed to retrieve user');
      }
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
          
          // Save the user session to DynamoDB
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
    
        // Delete the user session from DynamoDB
        await deleteUserSession(id);
    
        // Delete the user from MongoDB
        await User.findByIdAndDelete(id);
    
        return true;
      } catch (error) {
        console.error('Error deleting user:', error);
        return false;
      }
    },
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
    saveGlobalState: async (parent, { input }) => {
      return saveGlobalState(input);
    },
    loadGlobalState: async () => {
      return loadGlobalState();
    },
  },
};

module.exports = resolvers;
