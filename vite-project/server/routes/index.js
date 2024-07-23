const router = require('express').Router();

const sessionRoutes = require('./sessionRoutes');
const userRoutes = require('./userRoutes');
const s3Routes = require('./s3Routes');
const analyticsRoutes = require('./analyticsRoutes');

router.use('api/sessions', sessionRoutes);
router.use('api/users', userRoutes);
router.use('api/s3', s3Routes);
router.use('api/analytics', analyticsRoutes);

module.exports = router;