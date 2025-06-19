/**
 * Example: Advanced Analytics Tracking
 *
 * This file provides conceptual examples for more advanced analytics tracking
 * beyond basic page views and clicks. This could involve tracking user segments,
 * specific element visibility, form interactions, or video playback.
 *
 * It assumes a global `trackEvent` function (like the one in `analytics.js`) exists.
 */

// 1. Tracking Element Visibility (e.g., when a section comes into view)
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            trackEvent('Element Viewed', { elementId: entry.target.id, viewportRatio: entry.intersectionRatio });
            // Optionally, unobserve after first view
            // observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% of the element is visible

// Example: Observe the feature grids
document.addEventListener('DOMContentLoaded', () => {
    const featureGrids = document.querySelectorAll('.feature-grid');
    featureGrids.forEach(grid => {
        if (grid.id) { // Only observe if it has an ID for tracking
            observer.observe(grid);
        }
    });
});

// 2. Tracking Form Interactions (e.g., field focus, submission success/failure)
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('focusin', (event) => {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            trackEvent('Form Field Focus', {
                formId: form.id || 'unnamed-form',
                fieldName: event.target.name || event.target.id || 'unnamed-field',
                fieldType: event.target.type
            });
        }
    });

    form.addEventListener('submit', (event) => {
        // Prevent default submission for demo purposes, or if using AJAX
        // event.preventDefault();
        trackEvent('Form Submission Attempt', { formId: form.id || 'unnamed-form' });

        // Simulate success/failure for tracking (in real app, this would be from backend response)
        setTimeout(() => {
            const success = Math.random() > 0.3; // 70% success rate
            if (success) {
                trackEvent('Form Submission Success', { formId: form.id || 'unnamed-form' });
            } else {
                trackEvent('Form Submission Failure', { formId: form.id || 'unnamed-form', error: 'Validation failed' });
            }
        }, 500);
    });
});

// 3. Tracking outbound link clicks (if any were added)
document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('Outbound Link Click', { url: link.href, text: link.textContent.trim() });
    });
});

// 4. Tracking custom events (e.g., specific button presses beyond CTA)
document.querySelectorAll('.secondary-action-button').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('Secondary Action Click', { buttonText: button.textContent.trim() });
    });
});

console.log("Advanced analytics listeners initialized.");
