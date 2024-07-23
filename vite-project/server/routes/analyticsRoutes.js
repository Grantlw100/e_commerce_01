const express = require('express');
const analyticsRouter = express.Router();
const { saveAnalyticsData } = require('../../utils/State-Cart-Mgmt-Utils/analytics');

analyticsRouter.post('/', async (req, res) => {
    const analyticsData = {
        userId: req.body.userId,
        event: req.body.event,
        timestamp: Date.now(),
        additionalData: req.body.additionalData || {}
    };
    try {
        await saveAnalyticsData(analyticsData);
        res.status(200).json('Analytics data saved!');
    } catch (error) {
        console.error('Error saving analytics data:', error);
        res.status(500).json('Error saving analytics data');
    }
});

module.exports = analyticsRouter;


// EXAMPLE OF ANALYTICS UTILS IN CLIENT SIDE 
// // In your React components, call the analytics endpoint to track events
// import axios from 'axios';

// const trackEvent = async (event, additionalData = {}) => {
//     const userId = /* get userId from your auth context or state */;
//     await axios.post('/api/analytics', {
//         userId,
//         event,
//         additionalData
//     });
// };

// // Example usage in a React component
// const ExampleComponent = () => {
//     useEffect(() => {
//         trackEvent('page_view', { page: 'Example Page' });
//     }, []);

//     return (
//         <div>
//             <button onClick={() => trackEvent('button_click', { buttonName: 'Example Button' })}>
//                 Click Me
//             </button>
//         </div>
//     );
// };