document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initChatBubble();
    initScrollAnimations();
    initTestimonialsSlider();
    initProjectsViewAll();
    initCertsViewAll();
});

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');

    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }

    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', function () {
        // Toggle theme
        body.classList.toggle('light-theme');

        // Update icon
        if (body.classList.contains('light-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }

        // Visual feedback
        this.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            this.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

// Chat Bubble
function initChatBubble() {
    const chatBubble = document.getElementById('chatBubble');

    if (chatBubble) {
        chatBubble.addEventListener('click', function () {
            alert('Chat functionality - Connect this to your chat system');
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Testimonials Auto-Slider
function initTestimonialsSlider() {
    const recommendations = document.querySelectorAll('.recommendation');
    const dots = document.querySelectorAll('.pagination-dots .dot');
    let currentIndex = 0;

    function showTestimonial(index) {
        recommendations.forEach(rec => rec.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        recommendations[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % recommendations.length;
        showTestimonial(currentIndex);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showTestimonial(currentIndex);
            clearInterval(autoRotate);
            autoRotate = setInterval(nextTestimonial, 5000);
        });
    });

    let autoRotate = setInterval(nextTestimonial, 5000);
}

// Projects View All Toggle
function initProjectsViewAll() {
    const viewAllBtn = document.getElementById('viewAllProjects');
    const projectsGrid = document.getElementById('projectsGrid');
    let isExpanded = false;

    if (viewAllBtn && projectsGrid) {
        viewAllBtn.addEventListener('click', function (e) {
            e.preventDefault();
            isExpanded = !isExpanded;

            if (isExpanded) {
                projectsGrid.classList.add('show-all');
                viewAllBtn.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
                viewAllBtn.classList.add('active');
            } else {
                projectsGrid.classList.remove('show-all');
                viewAllBtn.innerHTML = 'View All <i class="fas fa-chevron-right"></i>';
                viewAllBtn.classList.remove('active');

                document.querySelector('#projectsGrid').scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        });
    }
}

// Certifications View All Toggle
function initCertsViewAll() {
    const viewAllBtn = document.getElementById('viewAllCerts');
    const certsContainer = document.getElementById('certsContainer');
    let isExpanded = false;

    if (viewAllBtn && certsContainer) {
        viewAllBtn.addEventListener('click', function (e) {
            e.preventDefault();
            isExpanded = !isExpanded;

            if (isExpanded) {
                certsContainer.classList.add('show-all');
                viewAllBtn.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
                viewAllBtn.classList.add('active');
            } else {
                certsContainer.classList.remove('show-all');
                viewAllBtn.innerHTML = 'View All <i class="fas fa-chevron-right"></i>';
                viewAllBtn.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effects to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-6px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Add click handlers to contact items
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(item => {
    item.addEventListener('click', function () {
        const label = this.querySelector('.label').textContent;

        switch (label) {
            case 'EMAIL':
                window.location.href = 'mailto:relente.patriciajoy@gmail.com';
                break;
            case "LET'S TALK":
                window.open('#', '_blank');
                break;
            case 'COMMUNITY':
                window.open('#', '_blank');
                break;
        }
    });
});