import {Router} from 'express';
const router = Router();


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
 
            /* EXPRESS.JS ROUTE INDEX */
        /* Index for all Express.js routes */
        
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


import sessionRoutes from './src/storeRoutes.mjs';
import userRoutes from './src/userRoutes.mjs';
import s3Routes from './src/s3Routes.mjs';
import analyticsRoutes from './src/analyticsRoutes.mjs';

router.use('api/sessions', sessionRoutes);
router.use('api/users', userRoutes);
router.use('api/s3', s3Routes);
router.use('api/analytics', analyticsRoutes);

export default router;