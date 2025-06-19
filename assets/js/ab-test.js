// This file contains the core A/B test logic for switching versions and tracking conversions.
// It relies on global variables and functions defined in metrics.js.

/**
 * Updates the display to show the specified version of the landing page.
 * @param {string} version - The version to display ('a' or 'b').
 */
function showVersion(version) {
    // Hide all landing page sections
    document.querySelectorAll('.landing-page-section').forEach(section => {
        section.classList.remove('active');
        // Reset scroll position when switching versions to ensure a fresh view
        section.scrollTop = 0;
    });

    // Show the requested version
    const activeSection = document.getElementById(`version-${version}`);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Update the control panel's active button
    document.querySelectorAll('.btn-control').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(`btn-${version}`).classList.add('active');

    // Update the global currentVersion variable from metrics.js
    // Assuming currentVersion is declared globally in metrics.js or a shared scope.
    if (typeof currentVersion !== 'undefined') {
        currentVersion = version;
    }

    // Increment page views each time a version is shown
    // Assuming pageViews is declared globally in metrics.js
    if (typeof pageViews !== 'undefined') {
        pageViews++;
    }

    // Refresh metrics display using the function from metrics.js
    // Assuming updateMetrics is declared globally in metrics.js
    if (typeof updateMetrics === 'function') {
        updateMetrics();
    }
}

/**
 * Simulates a conversion event for the current active version.
 * This function is called when a CTA button is clicked.
 */
function trackConversion() {
    // Assuming conversions and currentVersion are declared globally in metrics.js
    if (typeof conversions !== 'undefined' && typeof currentVersion !== 'undefined') {
        if (currentVersion === 'a') {
            conversions.a++;
        } else {
            conversions.b++;
        }
    }
    // Refresh metrics display using the function from metrics.js
    if (typeof updateMetrics === 'function') {
        updateMetrics();
    }
}

// Event Listeners for version switching and CTA clicks

// Initialize the control panel buttons to switch versions
document.getElementById('btn-a').addEventListener('click', () => showVersion('a'));
document.getElementById('btn-b').addEventListener('click', () => showVersion('b'));

// Add event listeners to all CTA buttons to track conversions
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', trackConversion);
});

// Initial setup when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Ensure metrics.js has loaded and its globals are available before initial setup
    if (typeof showVersion === 'function' && typeof updateMetrics === 'function') {
        showVersion('a'); // Display version A on initial load
        updateMetrics(); // Initialize metrics display
    } else {
        console.error("Dependencies (metrics.js functions/variables) not loaded for ab-test.js initial setup.");
    }
});
