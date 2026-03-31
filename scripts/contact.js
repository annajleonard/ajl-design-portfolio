document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const statusDiv = document.getElementById('status');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const websiteField = document.getElementById('websiteField');
    const minimumSubmitDelayMs = 5000;
    const formLoadedAt = Date.now();

    if (!contactForm || !statusDiv || !nameInput || !emailInput || !messageInput || !websiteField) {
        console.warn('Contact form elements were not found on this page.');
        return;
    }

    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission

        if (websiteField.value.trim() !== '') {
            statusDiv.textContent = 'Unable to submit. Please refresh and try again.';
            return;
        }

        if (Date.now() - formLoadedAt < minimumSubmitDelayMs) {
            statusDiv.textContent = 'Please wait a few seconds before submitting.';
            return;
        }

        const formURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdEm2d_I7VbXeDNriIlbm4M75-gtGCrbQQ1nDlvETLJOQJX3g/formResponse';
        const formData = new FormData();

        // Append form data using the Google Form entry IDs
        formData.append('entry.752426201', nameInput.value);
        formData.append('entry.129322932', emailInput.value);
        formData.append('entry.1582880340', messageInput.value);

        statusDiv.textContent = 'Sending...';

        try {
            await fetch(formURL, {
                method: 'POST',
                mode: 'no-cors', // Important for Google Forms submission
                body: formData
            });
            statusDiv.textContent = 'Message sent successfully!';
            contactForm.reset(); // Clear form on success
        } catch (error) {
            console.error('Error submitting form:', error);
            statusDiv.textContent = 'An error occurred. Please try again later.';
        }
    });
});
