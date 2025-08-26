// ===== ZOHO FLOW CONFIGURATION =====
const ZOHO_FLOW_WEBHOOK = "https://flow.zoho.eu/20108451502/flow/webhook/incoming?zapikey=1001.eb9b404861107089ba667a27ac5308c4.fa4699e069b31dc6b0a723fbb962567a&isdebug=true";

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== INITIALIZATION =====
function initializeApp() {
    setupMobileMenu();
    setupSmoothScrolling();
    setupRevealAnimations();
    setupFormHandling();
    setupHeaderScroll();
}

// ===== MOBILE MENU =====
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!mobileToggle || !nav) return;
    
    mobileToggle.addEventListener('click', function() {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        
        // Toggle menu state
        mobileToggle.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('nav-open');
        
        // Toggle hamburger animation
        const spans = mobileToggle.querySelectorAll('span');
        if (!isExpanded) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
        
        // Trap focus when menu is open
        if (!isExpanded) {
            trapFocus(nav);
        }
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const spans = mobileToggle?.querySelectorAll('span');
    
    if (mobileToggle && nav) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('nav-open');
        
        if (spans) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
}

function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (firstElement) {
        firstElement.focus();
    }
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Global scroll functions for onclick handlers
function scrollToContact() {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = contactSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function scrollToResults() {
    const resultsSection = document.querySelector('#results');
    if (resultsSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = resultsSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ===== REVEAL ANIMATIONS =====
function setupRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with reveal class
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== HEADER SCROLL EFFECT =====
function setupHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// ===== ZOHO FLOW HELPER =====
function forwardToZoho(formData) {
    const payload = {
        name: formData.get("name") || "",
        email: formData.get("email") || "",
        company: formData.get("company") || "",
        phone: formData.get("phone") || "",
        message: formData.get("message") || "",
        source: "AIAnchor Website",
        submittedAt: new Date().toISOString()
    };
    
    fetch(ZOHO_FLOW_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).catch(() => {});
}

// ===== FORM HANDLING =====
function setupFormHandling() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    const successMessage = document.getElementById('form-success');
    
    // Check honeypot
    const honeypot = form.querySelector('#website');
    if (honeypot && honeypot.value.trim() !== '') {
        showAlert('Spam detected. Please try again.', 'error');
        return;
    }
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    try {
        // Prepare form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Forward to Zoho Flow (non-blocking)
        forwardToZoho(formData);
        
        // Forward to n8n Production Webhook (non-blocking)
        fetch('https://aianchor.app.n8n.cloud/webhook/4d0fe820-6feb-4aeb-96b6-1b980dcf7b83', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                company: formData.get('company'),
                phone: formData.get('phone'),
                message: formData.get('message'),
                source: 'AIAnchor Website'
            })
        }).catch(() => {});
        
        // Send to Formspree
        const response = await fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            showAlert('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
            form.reset();
            
            // Scroll to alert
            setTimeout(() => {
                const alertContainer = document.getElementById('alertContainer');
                if (alertContainer) {
                    alertContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        } else {
            throw new Error('Form submission failed');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showAlert('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
    }
}

// ===== ALERT SYSTEM =====
function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.setAttribute('role', type === 'success' ? 'status' : 'alert');
    alert.textContent = message;
    
    // Add to container
    alertContainer.appendChild(alert);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.opacity = '0';
            alert.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.parentNode.removeChild(alert);
                }
            }, 300);
        }
    }, 5000);
    
    // Remove on click
    alert.addEventListener('click', function() {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events
const throttledScrollHandler = throttle(function() {
    // Any scroll-based functionality can be added here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Debounce resize events
const debouncedResizeHandler = debounce(function() {
    // Any resize-based functionality can be added here
}, 250);

window.addEventListener('resize', debouncedResizeHandler);

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Add skip link functionality
function setupSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--brand);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize skip links
setupSkipLinks();

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You can add error reporting here
});

// ===== PWA SUPPORT (BASIC) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker registration can be added here
        // navigator.serviceWorker.register('/sw.js');
    });
}

// ===== ANALYTICS READY =====
// Google Analytics or other tracking can be added here
function trackEvent(eventName, eventData = {}) {
    // Example: trackEvent('button_click', { button: 'cta', section: 'hero' });
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    // Add other analytics providers as needed
}

// ===== EXPORT FOR GLOBAL USE =====
window.AIAnchor = {
    scrollToContact,
    scrollToResults,
    showAlert,
    trackEvent
};

