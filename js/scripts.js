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
                navbar.classList.add('bg-primary');
            }
        }

        // On scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
                    navbar.classList.add('bg-primary');
                }
            } else {
                navbar.classList.remove('scrolled');
                // Only remove if we're on the home page, contact page always has it
                if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
                    navbar.classList.remove('bg-primary');
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
            
            // EmailJS Integration
            const templateParams = {
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            emailjs.send('service_u0vyt8o', 'template_p6y2d6c', templateParams)
            .then(function() {
                // Restore Button State
                btn.innerHTML = originalText;
                btn.disabled = false;
                
                // Show Stylish Popup
                Swal.fire({
                    title: 'Message Sent Successfully!',
                    text: 'Thank you for reaching out. A professional from our team will get back to you shortly.',
                    icon: 'success',
                    iconColor: '#3DB54A', // Green Accent
                    confirmButtonColor: '#F47A20', // Orange Accent
                    confirmButtonText: 'Great!',
                    background: '#ffffff',
                    color: '#1F5A7A', // Primary Deep Blue
                    customClass: {
                        popup: 'shadow-lg border-0',
                        title: 'brand-font'
                    }
                });

                document.getElementById('contactForm').reset();
                if(charCountDisplay) charCountDisplay.textContent = '0 / 180';
                
            }, function(error) {
                console.error('FAILED...', error);
                
                // Restore Button State
                btn.innerHTML = originalText;
                btn.disabled = false;
                
                Swal.fire({
                    title: 'Oops!',
                    text: 'Something went wrong and we couldn\'t send your message. Please try again later.',
                    icon: 'error',
                    confirmButtonColor: '#1F5A7A',
                    confirmButtonText: 'Close'
                });
            });
        });
    }
});
