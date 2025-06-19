// This file handles general analytics tracking like interactions.
// It relies on global variables and functions from metrics.js.

/**
 * A simple function to simulate sending an analytics event.
 * In a real application, this would send data to a service like Google Analytics or Mixpanel.
 * @param {string} eventName - The name of the event.
 * @param {object} [eventData={}] - Optional data associated with the event.
 */
function trackEvent(eventName, eventData = {}) {
    console.log(`Analytics Event: ${eventName}`, eventData);
    // In a real app, you might do:
    // gtag('event', eventName, eventData);
    // mixpanel.track(eventName, eventData);
}

// Track page interactions (simulated engagement)
// Using 'once: true' for scroll to count initial scroll only once per session if not clicked
document.addEventListener('scroll', () => {
    // Assuming 'interactions' and 'updateMetrics' are global from metrics.js
    if (typeof interactions !== 'undefined') {
        interactions++;
    }
    if (typeof updateMetrics === 'function') {
        updateMetrics();
    }
    trackEvent('Scroll Interaction');
}, { once: true });

// Listen for clicks on the document body to count general interactions,
// but exclude clicks on control buttons or CTA buttons as they have specific tracking.
document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn-control') && !e.target.classList.contains('cta-button')) {
        // Assuming 'interactions' and 'updateMetrics' are global from metrics.js
        if (typeof interactions !== 'undefined') {
            interactions++;
        }
        if (typeof updateMetrics === 'function') {
            updateMetrics();
        }
        trackEvent('General Click Interaction', { elementTag: e.target.tagName, elementClass: e.target.className });
    }
});
