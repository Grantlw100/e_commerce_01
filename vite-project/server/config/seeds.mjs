import { once } from './connection.mongo.mjs';
import { User, Product, Category, Keyword, Season, Promotion, Cart, Orders, Notification } from '../models/index.mjs';
import { signToken } from '../utils/auth.mjs';



//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
                            /*  MONGODB SEED SOURCES */
        /* Seed sources for all faux data imported into server during development */
        
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


once('open', async () => {
    await User.deleteMany();

    const users = await User.insertMany([
        { name: 'admin1', email: 'admin@email.com', password: 'password1234' },
        { name: 'user1', email: 'user1@email.com', password: 'password1234' },
        { name: 'user2', email: 'user2@email.com', password: 'password1234' },

    ]);

    console.log('users seeded');

    await Category.deleteMany();

    const categories = await Category.insertMany([
        { name: 'On Sale'},
        { name: 'Bundles - Destash'},
        { name: 'Bundles - Napkins'},
        { name: 'Rice Papers'},
        { name: 'Nail - Jewelry WaterSlides'},
        { name: 'Cake Toppers'},
        { name: 'Tiered Tray'},
        { name: 'Craft DIY Supplies'},
        { name: 'DIY - Craft Kits'}
    ]);

    console.log('categories seeded');

    await Keyword.deleteMany();

    const keywords = await Keyword.insertMany([
        {name: "decoupage"}, 
        {name: "napkin"}, 
        {name: "bundle"}, 
        {name: "rice paper"}, 
        {name: "nail art"}, 
        {name: "jewelry"}, 
        {name: "waterslide"}, 
        {name: "cake topper"},
        {name: "tiered tray"}, 
        {name: "craft"}, 
        {name: "DIY"}, 
        {name: "supplies"}, 
        {name: "kits"}, 
        {name: "destash"}, 
        {name: "clearance"}, 
        {name: "limited time"}, 
        {name: "seasonal"},
        {name: "fun"},
        {name: "creative"}, 
        {name: "unique"}, 
        {name: "colorful"}, 
        {name: "beautiful"}, 
        {name: "artistic"}, 
        {name: "handmade"}, 
        {name: "handcrafted"}, 
        {name: "crafty"}, 
        {name: "crafting"}
    ]);

    console.log('keywords seeded');

    await Season.deleteMany();

    const seasons = await Season.insertMany([
        { name: 'Spring'},
        { name: 'Summer'},
        { name: 'Fall'},
        { name: 'Winter'},
        { name: 'Christmas'},
        { name: 'Halloween'},
        { name: 'Valentine\'s Day'},
        { name: 'Easter'},
        { name: 'Mother\'s Day'},
        { name: 'Father\'s Day'},
        { name: '4th of July'},
        { name: 'Thanksgiving'},
        { name: 'New Year\'s Day'},
        { name: 'Birthday'},
        { name: 'Anniversary'},
        { name: 'Wedding'},
        { name: 'Baby Shower'},
        { name: 'Graduation'},
        { name: 'Retirement'},
        { name: 'Congratulations'},
        { name: 'Get Well Soon'},
    ]);

    console.log('seasons seeded');

    await Promotion.deleteMany();

    const promotions = await Promotion.insertMany([
        {name: "Free-Shipping"},
        {name: "Buy-One-Get-One"},
        {name: "Bundle-Discount"},
        {name: "Clearance"},
        {name: "Limited-Time"},
        {name: "Seasonal"}
    ]);

    console.log('promotions seeded');

    await Product.deleteMany();

});
