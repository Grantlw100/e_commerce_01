// import dotenv from 'dotenv';



//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
                        
                        /*  CONNECTION FOR MONGODB */
        /* The configuration settings for Mongos Databases using Mongoose */

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


const PORT = process.env.PORT;

import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.once('open', () => {
        console.log(`API server running on port ${PORT}!`);
});

mongoose.connection.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
});

export default mongoose.connection;
