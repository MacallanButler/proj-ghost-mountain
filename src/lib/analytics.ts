export const trackEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", eventName, params);
        console.log(`[Analytics Event Fired] ${eventName}`, params);
    } else {
        console.log(`[Analytics Mock] Event: ${eventName}`, params);
    }
};
