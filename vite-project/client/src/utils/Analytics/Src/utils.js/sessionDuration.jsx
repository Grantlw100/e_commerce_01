import { useEffect, useRef } from 'react';
import {useAnalytics} from '../Analytics.State.jsx';
// use the context hook tather than invoking the analytics provider directly 
// The wrong way to import the AnalyticsProvider component is shown below:
// import AnalyticsProvider from '../Analytics/Analytics.State.jsx';
// This accesses the values of the provider rather than invoking the entire provider component

const useSessionDuration = () => {
    const { trackSessionDuration } = useAnalytics();
    const startTimeRef = useRef(null);

    useEffect(() => {
        // Set the start time when the component mounts
        startTimeRef.current = Date.now();

        const handleBeforeUnload = () => {
            const endTime = Date.now();
            const duration = (endTime - startTimeRef.current) / 1000; // Duration in seconds
            trackSessionDuration(duration);
        };

        // Add event listener for when the user leaves the page
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            // Cleanup the event listener
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [trackSessionDuration]);
};

export default useSessionDuration;

// How to use this hook:
// create the ADD_SESSION_DURATION action type in the analytics.reducer.js file
// create the trackSessionDuration action in the AnalyticsProvider component
// import and use the useSessionDuration hook in the component where you want to track session duration
// The useSessionDuration hook will automatically track the session duration when the user leaves the page.