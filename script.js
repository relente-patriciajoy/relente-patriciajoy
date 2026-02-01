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
            openChatModal();
        });
    }
}

function openChatModal() {
    // Check if modal already exists
    if (document.getElementById('chatModal')) {
        return;
    }

    // Create chat modal
    const modal = document.createElement('div');
    modal.id = 'chatModal';

    modal.innerHTML = `
        <div class="chat-header">
            <div>
                <h3 class="chat-title">Chat with Patricia</h3>
                <p class="chat-subtitle">Usually replies instantly</p>
            </div>
            <button class="close-chat" onclick="closeChatModal()">×</button>
        </div>

        <div class="chat-messages" id="chatMessages">
            <div class="message bot-message">
                <p>👋 Hi! I'm Patricia's virtual assistant. How can I help you today?</p>
            </div>
        </div>

        <div class="question-buttons" id="questionButtons">
            <button class="question-btn" onclick="sendMessage('What services do you offer?')">
                💼 What services do you offer?
            </button>
            <button class="question-btn" onclick="sendMessage('Tell me about your projects')">
                🚀 Tell me about your projects
            </button>
            <button class="question-btn" onclick="sendMessage('What are your skills?')">
                ⚡ What are your skills?
            </button>
            <button class="question-btn" onclick="sendMessage('How can I contact you?')">
                📧 How can I contact you?
            </button>
        </div>
    `;

    document.body.appendChild(modal);
}

function closeChatModal() {
    const modal = document.getElementById('chatModal');
    if (modal) {
        modal.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function sendMessage(question) {
    const chatMessages = document.getElementById('chatMessages');

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user-message';
    userMsg.innerHTML = `<p>${question}</p>`;
    chatMessages.appendChild(userMsg);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message bot-message typing-indicator';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    typingIndicator.id = 'typingIndicator';
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Bot responses
    const responses = {
        'What services do you offer?': '💼 I offer the following services:\n\n• Technical Project Management\n• Frontend Development\n• UI/UX Design\n• IT Operations Support\n• Hardware Troubleshooting\n• Technical Documentation\n\nI specialize in building user-friendly systems and leading development teams!',

        'Tell me about your projects': '🚀 I\'ve worked on several exciting projects:\n\n• <strong>CEFRS</strong> - Campus Equipment & Facility Reservation System (Springboot & Angular)\n• <strong>Heybleepi</strong> - Social media platform with dynamic posts and real-time interactions\n• <strong>Eventix</strong> - Event Scheduling System for CCF\n• <strong>EMS</strong> - Enrollment Management System\n\nCheck out the Projects section on my portfolio for more details and live demos!',

        'What are your skills?': '⚡ My tech stack includes:\n\n<strong>Frontend:</strong> HTML, CSS, JavaScript, Angular, Tailwind CSS, Figma\n\n<strong>Backend:</strong> PHP, Python, Node.js, Springboot, MySQL\n\n<strong>Tools:</strong> Git & GitHub, Canva & Adobe Suite, Automation Testing\n\n<strong>Other:</strong> Project Management, Hardware Troubleshooting, Technical Documentation',

        'How can I contact you?': '📧 I\'d love to hear from you! Here are the best ways to reach me:\n\n• <strong>Email:</strong> relente.patriciajoy@gmail.com\n• <strong>Schedule a Call:</strong> Book a time on my Calendly\n• <strong>LinkedIn:</strong> Connect with me professionally\n• <strong>GitHub:</strong> Check out my code\n\nI typically respond within 24 hours!'
    };

    // Remove typing indicator and add bot response after delay
    setTimeout(() => {
        document.getElementById('typingIndicator')?.remove();

        const botMsg = document.createElement('div');
        botMsg.className = 'message bot-message';
        botMsg.innerHTML = `<p>${responses[question]}</p>`;
        chatMessages.appendChild(botMsg);

        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Show follow-up questions
        showFollowUpQuestions(question);
    }, 1500);
}

function showFollowUpQuestions(lastQuestion) {
    const questionButtons = document.getElementById('questionButtons');

    // Define follow-up questions based on what was just asked
    const followUps = {
        'What services do you offer?': [
            { text: '💰 What are your rates?', response: 'rates' },
            { text: '📅 Are you available for projects?', response: 'availability' },
            { text: '🚀 Tell me about your projects', action: () => sendMessage('Tell me about your projects') }
        ],
        'Tell me about your projects': [
            { text: '⚡ What are your skills?', action: () => sendMessage('What are your skills?') },
            { text: '📧 How can I contact you?', action: () => sendMessage('How can I contact you?') },
            { text: '💼 What services do you offer?', action: () => sendMessage('What services do you offer?') }
        ],
        'What are your skills?': [
            { text: '🚀 Show me your projects', action: () => sendMessage('Tell me about your projects') },
            { text: '📧 Let\'s work together!', action: () => sendMessage('How can I contact you?') },
            { text: '💼 What services do you offer?', action: () => sendMessage('What services do you offer?') }
        ],
        'How can I contact you?': [
            { text: '📧 Open my email', action: () => window.location.href = 'mailto:relente.patriciajoy@gmail.com' },
            { text: '📅 Schedule a call', action: () => window.open('https://calendly.com/relente-patriciajoy/30min', '_blank') },
            { text: '💼 Learn about my services', action: () => sendMessage('What services do you offer?') }
        ]
    };

    // Custom responses for special follow-ups
    const specialResponses = {
        'rates': '💰 My rates vary depending on the project scope and requirements. I offer competitive pricing for:\n\n• Hourly consulting\n• Fixed-price projects\n• Retainer agreements\n\nLet\'s discuss your specific needs! Feel free to email me or schedule a call to get a customized quote.',
        'availability': '📅 Yes, I\'m currently accepting new projects! My availability depends on the project timeline and scope.\n\nI\'m a student at PUP-Taguig, so I\'m most available for:\n• Part-time projects\n• Weekend work\n• Remote collaboration\n\nLet\'s schedule a call to discuss how I can help with your project!'
    };

    const buttons = followUps[lastQuestion] || [];

    questionButtons.innerHTML = '';
    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.className = 'question-btn';
        button.textContent = btn.text;
        button.onclick = () => {
            if (btn.response && specialResponses[btn.response]) {
                // Handle special responses
                const chatMessages = document.getElementById('chatMessages');

                // Add user message
                const userMsg = document.createElement('div');
                userMsg.className = 'message user-message';
                userMsg.innerHTML = `<p>${btn.text}</p>`;
                chatMessages.appendChild(userMsg);
                chatMessages.scrollTop = chatMessages.scrollHeight;

                // Show typing
                const typingIndicator = document.createElement('div');
                typingIndicator.className = 'message bot-message typing-indicator';
                typingIndicator.innerHTML = '<span></span><span></span><span></span>';
                typingIndicator.id = 'typingIndicator';
                chatMessages.appendChild(typingIndicator);
                chatMessages.scrollTop = chatMessages.scrollHeight;

                // Add response
                setTimeout(() => {
                    document.getElementById('typingIndicator')?.remove();
                    const botMsg = document.createElement('div');
                    botMsg.className = 'message bot-message';
                    botMsg.innerHTML = `<p>${specialResponses[btn.response]}</p>`;
                    chatMessages.appendChild(botMsg);
                    chatMessages.scrollTop = chatMessages.scrollHeight;

                    // Show contact options
                    questionButtons.innerHTML = `
                        <button class="question-btn" onclick="window.location.href='mailto:relente.patriciajoy@gmail.com'">
                            📧 Send me an email
                        </button>
                        <button class="question-btn" onclick="window.open('https://calendly.com/relente-patriciajoy/30min', '_blank')">
                            📅 Schedule a call
                        </button>
                    `;
                }, 1500);
            } else if (btn.action) {
                btn.action();
            }
        };
        questionButtons.appendChild(button);
    });
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