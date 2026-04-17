// Contact Form Handler

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value.trim()
    };
    
    // Validate form
    if (!validateContactForm(formData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Send to WhatsApp
        sendContactToWhatsApp(formData);
        
        // Show success message
        showFormMessage('success', 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // Restore button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        // Track event
        trackEvent('Contact', 'Submit', formData.subject);
        
    }, 1500);
}

function validateContactForm(data) {
    // Name validation
    if (data.name.length < 2) {
        showFormMessage('error', 'Please enter a valid name.');
        return false;
    }
    
    // Email validation
    if (!validateEmail(data.email)) {
        showFormMessage('error', 'Please enter a valid email address.');
        return false;
    }
    
    // Phone validation (optional but should be valid if provided)
    if (data.phone && !validatePhone(data.phone)) {
        showFormMessage('error', 'Please enter a valid 10-digit phone number.');
        return false;
    }
    
    // Subject validation
    if (!data.subject) {
        showFormMessage('error', 'Please select a subject.');
        return false;
    }
    
    // Message validation
    if (data.message.length < 10) {
        showFormMessage('error', 'Please enter a message (at least 10 characters).');
        return false;
    }
    
    return true;
}

function sendContactToWhatsApp(data) {
    let message = '*New Contact Form Submission*%0A%0A';
    message += `*Name:* ${data.name}%0A`;
    message += `*Email:* ${data.email}%0A`;
    if (data.phone) {
        message += `*Phone:* ${data.phone}%0A`;
    }
    message += `*Subject:* ${data.subject}%0A`;
    message += `*Message:*%0A${data.message}`;
    
    const phoneNumber = '918319143976'; // Replace with actual WhatsApp number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappURL, '_blank');
}

function showFormMessage(type, message) {
    const messageDiv = document.getElementById('formMessage');
    if (!messageDiv) return;
    
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    messageDiv.classList.remove('hidden');
    
    // Hide after 5 seconds for success, 8 seconds for error
    const hideAfter = type === 'success' ? 5000 : 8000;
    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, hideAfter);
}

// Newsletter Subscription (if you add it later)
function subscribeNewsletter(email) {
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Add newsletter subscription logic here
    console.log('Newsletter subscription:', email);
    alert('Thank you for subscribing to our newsletter!');
}

// FAQ Accordion (if needed)
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const icon = question.querySelector('i');
            
            answer.classList.toggle('hidden');
            icon.classList.toggle('fa-plus');
            icon.classList.toggle('fa-minus');
        });
    }
});
