import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from './Analytics.State';

const usePageVisitDuration = () => {
    const { trackPageVisitDuration } = useAnalytics();
    const location = useLocation();
    const startTimeRef = useRef(null);

    useEffect(() => {
        // Set the start time when the component mounts or the location changes
        startTimeRef.current = Date.now();

        // Function to calculate and track the page visit duration
        const handlePageVisit = () => {
            const endTime = Date.now();
            const duration = (endTime - startTimeRef.current) / 1000; // Duration in seconds
            trackPageVisitDuration(location.pathname, duration);
        };

        // Return a cleanup function to handle the page visit duration
        return () => {
            handlePageVisit();
        };
    }, [location.pathname, trackPageVisitDuration]); // Dependencies ensure the effect runs on location change
};

export default usePageVisitDuration;
