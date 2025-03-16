import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from './Analytics.State';

const useScrollDepth = () => {
    const { trackScrollDepth } = useAnalytics();
    const scrollDepth = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            const scrollTop = document.documentElement.scrollTop;
            const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
            if (scrollPercentage > scrollDepth.current) {
                scrollDepth.current = scrollPercentage;
                trackScrollDepth(scrollDepth.current);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [trackScrollDepth]);
}

export default useScrollDepth;