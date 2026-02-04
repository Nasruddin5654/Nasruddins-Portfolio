// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    const icon = mobileMenuBtn.querySelector('i');
    if (isOpen) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 80;
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight - 10,
                behavior: 'smooth'
            });

            // close mobile menu after navigation (if open)
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }

            // move focus to target for keyboard users
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus();
        }
    });
});

// Close mobile menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// Form submission handling via Formsubmit.co
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = this;
    const submitBtn = form.querySelector('.btn');
    const messageEl = document.getElementById('formMessage');

    // Clear previous messages
    messageEl.className = 'form-message';
    messageEl.textContent = '';

    // Disable submit to prevent duplicate sends
    submitBtn.disabled = true;

    // Build JSON payload
    const payload = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        message: form.querySelector('#message').value,
        _subject: 'New message from portfolio site'
    };

    try {
        const res = await fetch('https://formsubmit.co/ajax/nasruddinm337@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await res.json();

        if (res.ok) {
            messageEl.classList.add('success');
            messageEl.textContent = 'Message sent! Thank you — I will get back to you soon.';
            form.reset();
        } else {
            messageEl.classList.add('error');
            // Formsubmit returns an object with message on error
            messageEl.textContent = result.message || 'Oops! Something went wrong. Please try again later.';
        }
    } catch (err) {
        messageEl.classList.add('error');
        messageEl.textContent = 'Network error. Please check your connection and try again.';
    } finally {
        submitBtn.disabled = false;
    }
});