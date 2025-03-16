import dotenv from 'dotenv/config.js';
import express, { urlencoded, json } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';


import mongooseConnection from './config/connection.mongo.mjs';
import api from './routes/index.mjs';
import createTables from './db/index.mjs';
import isAuthorized, { limiter } from './auth/middleware.mjs';

import { createEnvelopInstance } from './plug-ins/index.mjs';

// define and import permissions variable from auth/permissions.js
// check on whether will use graphqlMiddleware as may be deprecated 
    // alternatively, use envelope or graphql-yoga

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
                            /* SERVER */
        // NOTES :
            // configure CORS on your Envelop-based server or configure Vite’s dev server proxying to avoid cross-origin issues in development
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

const PORT = process.env.PORT || 4000;
const imagePath = process.env.IMAGE_URL || 'client/images';
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

// Connect to Mongo
await mongooseConnection();

// Create DynamoDB tables
await createTables();
// If needed, testDynamoDBConnection();

// Set up Express to parse requests
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(limiter)

// Use your REST API routes
app.use('/api', api);

// Static assets
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticMiddleware = express.static;
app.use('/images', staticMiddleware(join(__dirname, imagePath)));

// If in production, serve client build
if (NODE_ENV === 'production') {
  app.use(staticMiddleware(join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../client/dist/index.html'));
  });
}

//----------------------------------------------------------------//
// Initialize Envelop and Apollo
//----------------------------------------------------------------//
const getEnveloped = createEnvelopInstance();

// The final schema is available on `getEnveloped().schema`
const { schema, execute, subscribe } = getEnveloped();

// Create Apollo Server with the Envelop-transformed schema
const server = new ApolloServer({
  schema, // Our final schema from Envelop
  // If you want to rely on the Envelop context fully, you can skip this:
  // but if you want to add or override context from isAuthorized, do it here:
  // context: isAuthorized 
  // or a combined function:
  context: async (ctx) => {
    // Possibly run `isAuthorized(ctx)` or do something custom
    const baseContext = await isAuthorized(ctx);
    // Return a merged object
    return {
      ...baseContext,
    };
  },
});

// Start Apollo
await server.start();

// Mount the Apollo middleware on Express
app.use(
  '/graphql',
  expressMiddleware(server, {
    // If you prefer a separate approach to context, do it here
    context: async (req) => {
      // For example, call isAuthorized or rely on what Envelop set up
      return isAuthorized(req);
    },
  })
);

// Finally, start the HTTP server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
  console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
});
