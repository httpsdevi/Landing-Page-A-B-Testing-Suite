// Global variables for metrics
let currentVersion = 'a'; // Default to version A
let sessionStartTime = Date.now();
let interactions = 0;
let pageViews = 1; // Start with 1 for the initial page load

// Simulated data for A/B testing
// These values will be updated over time to simulate a live test
const visits = {
    a: 1000,
    b: 1000
};
const conversions = {
    a: 25, // 2.5% conversion rate for A
    b: 30  // 3.0% conversion rate for B
};
const bounces = {
    a: 680, // 68% bounce rate for A
    b: 620  // 62% bounce rate for B
};

/**
 * Calculates and updates the displayed metrics based on simulated data.
 * This function is designed to be accessible globally for `ab-test.js` and `analytics.js`.
 */
function updateMetrics() {
    const sessionTime = Math.floor((Date.now() - sessionStartTime) / 1000);

    // Calculate conversion rates for each variant
    const conversionRateA = visits.a > 0 ? (conversions.a / visits.a) * 100 : 0;
    const conversionRateB = visits.b > 0 ? (conversions.b / visits.b) * 100 : 0;

    // Determine the conversion rate for the currently displayed version
    const conversionRate = currentVersion === 'a' ? conversionRateA : conversionRateB;

    // Calculate bounce rates for each variant
    const bounceRateA = visits.a > 0 ? (bounces.a / visits.a) * 100 : 0;
    const bounceRateB = visits.b > 0 ? (bounces.b / visits.b) * 100 : 0;

    // Determine the bounce rate for the currently displayed version
    const bounceRate = currentVersion === 'a' ? bounceRateA : bounceRateB;

    // Update the HTML elements with the new metric values
    document.getElementById('current-version').textContent = currentVersion.toUpperCase();
    document.getElementById('session-time').textContent = `${sessionTime}s`;
    document.getElementById('page-views').textContent = pageViews;
    // Display the bounce rate for the current version
    document.getElementById('bounce-rate').textContent = `${bounceRate.toFixed(1)}%`;
    // Display the conversion rate for the current version
    document.getElementById('conversion-rate').textContent = `${conversionRate.toFixed(1)}%`;
}

// Update session time every second
setInterval(updateMetrics, 1000);

// Simulate realistic test data after 3 seconds to show dynamic updates
// This makes the metrics change as if a real test is running over time
setTimeout(() => {
    // Add more visits for both versions
    visits.a += Math.floor(Math.random() * 50) + 25;
    visits.b += Math.floor(Math.random() * 50) + 25;

    // Add conversions, with Version B getting slightly more to show potential lift
    conversions.a += Math.floor(Math.random() * 8) + 2;
    conversions.b += Math.floor(Math.random() * 12) + 5;

    // Simulate some interactions
    interactions += Math.floor(Math.random() * 20) + 10;

    // Update the metrics display with the new simulated data
    updateMetrics();
}, 3000); // Run this simulation after 3 seconds
