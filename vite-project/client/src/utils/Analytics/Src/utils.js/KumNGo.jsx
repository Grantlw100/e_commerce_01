import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from '../../Analytics/Analytics.State';

const useEnterExit = () => {
    const { trackEntryExitPoint } = useAnalytics();
    const location = useLocation();
    const entryRef = useRef(null);

    useEffect(() => {
       const entryPoint = location.pathname;
        entryRef.current = entryPoint

        const handleBeforeUnload = () => {
            const exitPoint = location.pathname;
            trackEntryExitPoint(entryRef.current, exitPoint);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            const exitPoint = location.pathname;
            trackEntryExitPoint(entryRef.current, exitPoint);
        };
    }, [location.pathname, trackEntryExitPoint]);
};


export default useEnterExit;

// How to use this hook:
// create the ADD_ENTRY_EXIT_POINT action type in the analytics.reducer.js file
// create the trackEntryExitPoint action in the AnalyticsProvider component
// import and use the useEnterExit hook in the component where you want to track entry and exit points
// The useEnterExit hook will automatically track the entry and exit points when the user leaves the page.