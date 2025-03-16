function useRateLimit(options) {
    const { 
        maxRequests = 60,
        timeWindow = 60 * 1000,
        message = "You have exceeded the 60 requests in 60 seconds limit!",
        getId = (context) => context.user?.id
    } = options;

    // In memory store for requests made 
    const requestCounts = new Map();

    return {
        onContextBuilding({ context, extendContext }) {
          // Reset or increment counters, based on user ID
          const id = getId(context);
          if (!id) return;
    
          const now = Date.now();
          const data = requestCounts.get(id) || { count: 0, resetTime: now + windowMs };
          
          // Reset if the window has passed
          if (data.resetTime < now) {
            data.count = 0;
            data.resetTime = now + windowMs;
          }
          
          data.count++;
          requestCounts.set(id, data);
    
          // Check if we exceeded maxRequests
          if (data.count > maxRequests) {
            throw new Error('Rate limit exceeded. Please slow down.');
          }
        },
      };
    }

export default useRateLimit;