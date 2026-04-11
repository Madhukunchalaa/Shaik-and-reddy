// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        // Initial check
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
                navbar.classList.add('bg-dark-blue');
            }
        }

        // On scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
                    navbar.classList.add('bg-dark-blue');
                }
            } else {
                navbar.classList.remove('scrolled');
                // Only remove bg-dark-blue if we're on the home page, contact page should always have it
                if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
                    navbar.classList.remove('bg-dark-blue');
                }
            }
        });
    }

    // Contact Form Character Count
    const messageInput = document.getElementById('message');
    const charCountDisplay = document.getElementById('charCount');

    if (messageInput && charCountDisplay) {
        messageInput.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = this.getAttribute('maxlength') || 180;
            charCountDisplay.textContent = `${currentLength} / ${maxLength}`;
            
            if (currentLength >= maxLength) {
                charCountDisplay.classList.add('text-danger');
            } else {
                charCountDisplay.classList.remove('text-danger');
            }
        });
    }

    // Smooth Scroll for Hash Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Contact Form submission mockup
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            btn.disabled = true;
            
            // Mock API call
            setTimeout(() => {
                btn.innerHTML = '<i class="bi bi-check-circle me-2"></i> Message Sent!';
                btn.classList.remove('btn-gold');
                btn.classList.add('btn-success', 'text-white');
                this.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.add('btn-gold');
                    btn.classList.remove('btn-success', 'text-white');
                    btn.disabled = false;
                    if(charCountDisplay) charCountDisplay.textContent = '0 / 180';
                }, 3000);
            }, 1500);
        });
    }
});
