import { useExtendContext } from '@envelop/core';
import jwt from 'jsonwebtoken';
import isAuthorized from '../../auth/middleware.mjs';

/**
 * Extend the context for each request.
 */
const extendContextPlugin = useExtendContext(({ request }) => {
  isAuthorized(request);

  const user = {
    id: request.user.id,
    role: request.user.role,
    permissions: request.user.permissions,
    rateLimit: request.user.rateLimit,
    rateReset: request.user.rateReset,
    };

  // 2. Database references or other services
    // reference to models, doocuments, or services available in the database
  const db = {
    // e.g., userModel, productModel, etc.
    // For demonstration only
    // users: { /* ...mock or real DB calls... */ },
    // orders: { /* ... */ },
  };

  // 3. Application config or environment variables or app level constants
  const config = {
    // appName: process.env.APP_NAME || 'MyApp',
    // Could also store a dynamic max complexity if you want
    // e.g. user?.role === 'ADMIN' ? 500 : 100
  };

  // 4. Logger (simple console or a real logging library)
    // reference to a logging library
  const logger = {
    info: (...args) => console.log('[INFO]', ...args),
    error: (...args) => console.error('[ERROR]', ...args),
  };

  // 5. Return the context object
  return {
    user,
    db,
    config,
    logger,
    // Add anything else you might need
  };
});


export default extendContextPlugin;