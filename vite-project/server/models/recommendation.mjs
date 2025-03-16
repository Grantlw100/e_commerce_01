import {Schema, model} from 'mongoose';



//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
                    /*  MONGODB RECOMMENDATION MODEL */
        /* Model creation for the Recommendation model within MongoDB & used by GraphQL */
        
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


const recommendationSchema = ({
    // meta
    metadata: {
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        updatedAt:{ 
            type: Date,
            default: Date.now()
        },
        version: {
            type: Number,
            default: 1,
        },
        recommendationFor: {
            type: String,
            enum: ['User', 'Product'],
        }, // User or product
        recommendationId: { type: String },
    },
    Keyword: [
        {
            keyword: {
                type: Schema.Types.ObjectId,
                ref: 'Keyword',
            },
            points: {
                type: Number,
                default: 0,
            },
        }
    ],
    Category: [
        {
            category: {
                type: Schema.Types.ObjectId,
                ref: 'Category',
            },
            points: {
                type: Number,
                default: 0,
            },
        }
    ],
    Season: [
        {
            season: {
                type: Schema.Types.ObjectId,
                ref: 'Season',
            },
            points: {
                type: Number,
                default: 0,
            },
        }
    ],
    Promotion: [
        {
            promotion: {
                type: Schema.Types.ObjectId,
                ref: 'Promotion',
            },
            points: {
                type: Number,
                default: 0,
            },
        }
    ],
    direct: [
        { 
            productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
            }, 
            points: {
                type: Number,
                default: 0,
            }
        },
    ], // direct associtaion built off of adding multiple items to the same list (loved items, cart, etc)
    indirect: [
        { // bundle, size, makeYourOwn, etc
            characteristicName: {
                type: String,
                required: true,
                enum: ['size', 'bundled', 'makeYourOwn', 'featured', 'primaryColors', 'secondaryColors', 'reviewsRating', 'price', 'discount', 'dimensions', 'lovedCount', 'cartCount', 'wishlistCount', 'viewedCount'],
            }, 
            points: {
                type: Number,
                default: 0,
            }
        },
    ], // indirect assocation built off of a products characteristics ( size, bundled, makeYourOwn, etc)
    RecommendedProducts: [
        { 
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            }, 
            points: {
                type: Number,
                default: 0,
            }
        },
    ],
}); // direct associations account for 50% of the recommendation, indirect associations account for 50% of the recommendation

export default model('Recommendation', recommendationSchema);