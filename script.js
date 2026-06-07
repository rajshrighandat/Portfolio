// Create Particle System
const createParticles = () => {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        
        particlesContainer.appendChild(particle);
    }
};

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
});

// Navigation functionality
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animate skill bars on scroll
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.getElementById('skills');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const percentage = bar.getAttribute('data-percentage');
                    bar.style.width = `${percentage}%`;
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
};

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-item, .contact-item, .detail-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Resume download and view functionality
const downloadResume = document.getElementById('downloadResume');
const viewResume = document.getElementById('viewResume');

// Resume file path - Place your resume PDF in the assets/resume folder
const resumePath = 'assets/resume/Rajshri_Resume_v2.pdf';

downloadResume.addEventListener('click', (e) => {
    e.preventDefault();
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'Rajshri_Resume_v2.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

viewResume.addEventListener('click', (e) => {
    e.preventDefault();
    // Open resume in a new tab
    window.open(resumePath, '_blank');
});

// Enhanced scroll animations with stagger
const enhanceScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const elements = document.querySelectorAll('.detail-item, .skill-category, .contact-item, .project-card-link');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
};

// Mouse move parallax effect for home section
let mouseParallaxEnabled = true;
document.addEventListener('mousemove', (e) => {
    if (!mouseParallaxEnabled) return;
    
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const intensity = (index + 1) * 15;
        const moveX = mouseX * intensity;
        const moveY = mouseY * intensity;
        shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    // Parallax for gradient orbs
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, index) => {
        const intensity = (index + 1) * 10;
        const moveX = mouseX * intensity;
        const moveY = mouseY * intensity;
        orb.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    animateOnScroll();
    enhanceScrollAnimations();
});

// Add fade-in animation to sections
const observeSections = () => {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
};

// Initialize section animations
observeSections();

// Add typing effect to animated text (optional enhancement)
const typingEffect = () => {
    const textLines = document.querySelectorAll('.text-line');
    textLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';
        
        setTimeout(() => {
            let charIndex = 0;
            const typeChar = () => {
                if (charIndex < text.length) {
                    line.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, 50);
                }
            };
            typeChar();
        }, index * 800);
    });
};

// Uncomment the line below if you want to enable typing effect
// typingEffect();

// Prevent default behavior for anchor links with #
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add parallax effect to elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for floating shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        if (scrolled < window.innerHeight) {
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });
    
    // Parallax for gradient orbs
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.05;
        if (scrolled < window.innerHeight * 2) {
            orb.style.transform = `translate(${scrolled * speed * 0.5}px, ${scrolled * speed}px)`;
        }
    });
});

// Add scroll to top button (optional enhancement)
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2563eb, #3b82f6);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.5)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)';
    });
};

// Initialize scroll to top button
createScrollToTopButton();

// Add ripple effect to buttons
const addRippleEffect = () => {
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-resume, .btn-secondary-home, .btn-download, .btn-view').forEach(button => {
        // Ensure button is positioned relative
        if (getComputedStyle(button).position === 'static') {
            button.style.position = 'relative';
        }
        
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
};

// Initialize ripple effect after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addRippleEffect, 100);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Handle form submissions and interactions
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Add a subtle animation when clicking contact links
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = 'scale(1)';
        }, 150);
    });
});

// Add intersection observer for project cards
const observeProjectCards = () => {
    const projectCardLinks = document.querySelectorAll('.project-card-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    projectCardLinks.forEach(link => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(30px)';
        link.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(link);
    });
};

// Initialize project card animations
observeProjectCards();

