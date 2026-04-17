document.addEventListener('DOMContentLoaded', () => {
    // ========== Intersection Observer for Scroll Animations ==========
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Track all elements with the 'reveal' class
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // ========== Smooth Scroll for Nav Links ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========== Form Handling ==========
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // ========== Dynamic Navigation Background ==========
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 15, 30, 0.98)';
            nav.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.5)';
        } else {
            nav.style.background = 'rgba(10, 15, 30, 0.95)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        }
    });

    // ========== Hover Effects for Interactive Elements ==========
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ========== Parallax Effect for Hero ==========
    const heroGraphic = document.querySelector('.hero-graphic');
    if (heroGraphic) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroTop = document.querySelector('.hero')?.offsetTop || 0;
            
            if (scrollY < heroTop + 500) {
                heroGraphic.style.transform = `translateY(${scrollY * 0.3}px)`;
            }
        });
    }

    // ========== Counter Animation for Stats ==========
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                stats.forEach(stat => {
                    const text = stat.innerText;
                    const isPercentage = text.includes('%');
                    const numberStr = text.replace(/[^0-9]/g, '');
                    const finalNumber = parseInt(numberStr);
                    
                    let current = 0;
                    const increment = Math.ceil(finalNumber / 50);
                    
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= finalNumber) {
                            stat.innerText = text;
                            clearInterval(counter);
                        } else {
                            const format = isPercentage ? current + '%' : current;
                            stat.innerText = format;
                        }
                    }, 20);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// ========== Email & Modal Functions ==========
function findEstimate() {
    const email = document.getElementById('estimateEmail').value;
    const businessEmail = 'saswin506@gmail.com';
    if (email) {
        const subject = 'Estimate Request from Evolve Digital';
        const body = `Hello,\n\nI would like to receive a personalized estimate for your AI solutions.\n\nMy Email: ${email}\n\nPlease send the estimate details to the above email address.\n\nThank you!`;
        window.location.href = `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        alert(`Thank you! Opening email to send your estimate request to ${businessEmail}`);
        document.getElementById('estimateEmail').value = '';
    } else {
        alert('Please enter your email address');
    }
}

function openEmailModal() {
    document.getElementById('emailModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeEmailModal() {
    document.getElementById('emailModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function submitAutomationEmail() {
    const email = document.getElementById('automationEmail').value;
    const businessEmail = 'saswin506@gmail.com';
    if (email) {
        const subject = 'Automation Request from Evolve Digital';
        const body = `Hello,\n\nI'm interested in automating my business processes using your AI solutions.\n\nMy Email: ${email}\n\nPlease send me automation details and pricing information.\n\nThank you!`;
        window.location.href = `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        alert(`Excellent! Opening email to send your automation request to ${businessEmail}`);
        document.getElementById('automationEmail').value = '';
        closeEmailModal();
    } else {
        alert('Please enter your email address');
    }
}

// ========== Navigation Functions ==========
function scrollToAppointment() {
    const appointmentSection = document.querySelector('#appointment');
    if (appointmentSection) {
        appointmentSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========== Contact Form Handling ==========
function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('input[placeholder="Your Name"]')?.value;
    const email = form.querySelector('input[placeholder="Your Email"]')?.value;
    const phone = form.querySelector('input[placeholder="Your Phone Number"]')?.value;
    const message = form.querySelector('textarea')?.value;
    const businessEmail = 'saswin506@gmail.com';
    
    if (name && email && phone && message) {
        const subject = `New Inquiry from ${name} - Evolve Digital`;
        const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
        window.location.href = `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        alert(`Thank you, ${name}! Opening email to send your inquiry to ${businessEmail}`);
        form.reset();
    } else {
        alert('Please fill in all fields');
    }
}

// ========== Modal Close on Outside Click ==========
window.addEventListener('click', (event) => {
    const modal = document.getElementById('emailModal');
    if (event.target === modal) {
        closeEmailModal();
    }
});

// ========== Performance: Lazy Loading for Images ==========
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}
