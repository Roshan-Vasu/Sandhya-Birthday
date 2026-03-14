// ========== Confetti Animation ==========
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF8ED4', '#95E1D3'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animation = `confettiFall ${2 + Math.random() * 1}s linear forwards`;
        confetti.style.setProperty('--delay', Math.random() * 0.5 + 's');

        confettiContainer.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}

// Add confetti fall animation
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== Cartoon Characters Animation ==========
const characters = ['🐭', '🐻', '😺', '🦁', '🐰', '🎉', '🎊', '🎈', '🎁', '🎀'];

function createCharacter() {
    const char = document.createElement('div');
    char.className = 'character';
    char.textContent = characters[Math.floor(Math.random() * characters.length)];
    char.style.left = Math.random() * window.innerWidth + 'px';
    char.style.top = Math.random() * window.innerHeight + 'px';

    document.getElementById('characters-container').appendChild(char);

    setTimeout(() => char.remove(), 3000);
}

// Create multiple characters
function createMultipleCharacters() {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createCharacter(), i * 80);
    }
}

// ========== Hide Website Content ==========
function hideWebsite() {
    document.querySelector('.header').style.display = 'none';
    document.querySelector('.balloons').style.display = 'none';
    document.querySelector('.message-section').style.display = 'none';
    document.querySelector('.gallery-section').style.display = 'none';
    document.querySelector('.cake-section').style.display = 'none';
    document.querySelector('.fireworks-section').style.display = 'none';
    document.querySelector('.footer').style.display = 'none';
}

// ========== Show Website Content ==========
function showWebsite() {
    document.querySelector('.header').style.display = 'block';
    document.querySelector('.balloons').style.display = 'block';
    document.querySelector('.message-section').style.display = 'block';
    document.querySelector('.gallery-section').style.display = 'block';
    document.querySelector('.cake-section').style.display = 'block';
    document.querySelector('.fireworks-section').style.display = 'block';
    document.querySelector('.footer').style.display = 'block';
}

// ========== Birthday Countdown Timer ==========
let countdownActive = true;
let celebrationStarted = false;

function startCountdown() {
    // Hide everything except countdown initially
    hideWebsite();

    // Create date object for March 16, 2026 at 12:00 AM (midnight)
    const birthdayDate = new Date(2026, 2, 16, 0, 0, 0, 0).getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = birthdayDate - now;

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update display with proper padding
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        // Check if countdown has reached zero (00:00:00)
        if (distance <= 0 && !celebrationStarted) {
            celebrationStarted = true;
            clearInterval(interval);
            countdownActive = false;
            
            console.log('🎉 COUNTDOWN REACHED 00:00:00! CELEBRATION STARTING! 🎉');
            
            // Hide counter section and show website
            document.querySelector('.counter-section').style.display = 'none';
            showWebsite();
            
            // Start celebration
            triggerCelebration();
        }
    }, 1000);
}

// ========== Celebration Trigger ==========
function triggerCelebration() {
    console.log('🎉 HAPPY BIRTHDAY! CELEBRATION STARTED! 🎉');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Flash background
    flashBackground();

    // Create continuous celebrations
    createConfetti();
    createMultipleCharacters();
    
    // Trigger multiple celebrations
    const celebrationInterval = setInterval(() => {
        createConfetti();
        createMultipleCharacters();
    }, 2000);

    // Play celebration sound
    playBirthdayAudio();

    // Stop celebrations after 15 seconds
    setTimeout(() => {
        clearInterval(celebrationInterval);
    }, 15000);
}

// ========== Flash Background Animation ==========
function flashBackground() {
    const body = document.body;
    const originalBackground = body.style.background;
    let flashCount = 0;

    const flashInterval = setInterval(() => {
        if (flashCount % 2 === 0) {
            body.style.background = 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)';
        } else {
            body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
        flashCount++;

        if (flashCount > 12) {
            clearInterval(flashInterval);
            body.style.background = originalBackground;
        }
    }, 200);
}

// ========== Birthday Audio ==========
function playBirthdayAudio() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioContext.currentTime;

        // Play a happy chime sequence
        const notes = [523.25, 587.33, 659.25]; // C5, D5, E5

        notes.forEach((freq, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = freq;
            oscillator.type = 'sine';

            const startTime = now + (index * 0.3);
            gainNode.gain.setValueAtTime(0.3, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

            oscillator.start(startTime);
            oscillator.stop(startTime + 0.4);
        });
    } catch (e) {
        console.log('Audio context not available');
    }
}

// ========== Message Box Functionality ==========
function setupMessageBox() {
    const messageInput = document.getElementById('messageInput');
    const charCount = document.getElementById('charCount');
    const sendBtn = document.getElementById('sendBtn');
    const messagesContainer = document.getElementById('messagesContainer');
    const messagesList = JSON.parse(localStorage.getItem('birthdayMessages')) || [];

    // Update character count
    messageInput.addEventListener('input', function() {
        charCount.textContent = this.value.length;
    });

    // Send message
    sendBtn.addEventListener('click', function() {
        const messageText = messageInput.value.trim();

        if (messageText.length === 0) {
            alert('Please write a message!');
            return;
        }

        // Create message object
        const message = {
            text: messageText,
            timestamp: new Date().toLocaleString()
        };

        // Add to list
        messagesList.push(message);

        // Save to localStorage
        localStorage.setItem('birthdayMessages', JSON.stringify(messagesList));

        // Display message
        displayMessage(message);

        // Clear input
        messageInput.value = '';
        charCount.textContent = '0';

        // Show small celebration
        createConfetti();
        createCharacter();

        // Success feedback
        sendBtn.textContent = '✅ Message Sent!';
        setTimeout(() => {
            sendBtn.textContent = '📤 Send Message';
        }, 2000);
    });

    // Display all saved messages on page load
    messagesList.forEach(msg => displayMessage(msg));

    // Allow Ctrl+Enter key to send message
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            sendBtn.click();
        }
    });
}

function displayMessage(message) {
    const messagesContainer = document.getElementById('messagesContainer');
    const messageItem = document.createElement('div');
    messageItem.className = 'message-item';
    messageItem.innerHTML = `
        <p class="message-text">${escapeHtml(message.text)}</p>
        <small style="color: rgba(0,0,0,0.5); margin-top: 10px; display: block;">${message.timestamp}</small>
    `;
    messagesContainer.appendChild(messageItem);

    // Scroll to latest message
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ========== Fireworks Animation ==========
function setupFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let particles = [];

    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF8ED4', '#95E1D3'];

        for (let i = 0; i < 30; i++) {
            const angle = (Math.PI * 2 * i) / 30;
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * (3 + Math.random() * 2),
                vy: Math.sin(angle) * (3 + Math.random() * 2),
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 1,
                decay: Math.random() * 0.015 + 0.015
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles = particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // Gravity
            p.life -= p.decay;

            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.fillRect(p.x, p.y, 3, 3);

            return p.life > 0;
        });

        ctx.globalAlpha = 1;

        if (particles.length > 0) {
            requestAnimationFrame(animate);
        }
    }

    // Create fireworks on click
    canvas.addEventListener('click', () => {
        createFirework();
        animate();
    });

    // Auto create fireworks
    setInterval(() => {
        createFirework();
        animate();
    }, 800);
}

// ========== Celebrate Button ==========
function setupCelebrateButton() {
    const celebrateBtn = document.getElementById('celebrateBtn');
    if (!celebrateBtn) return;

    celebrateBtn.addEventListener('click', function() {
        createConfetti();
        createMultipleCharacters();
        this.style.animation = 'bounce 0.5s';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
}

// ========== Lightbox Gallery Slideshow ==========
let currentImageIndex = 0;
const galleryImages = [
    { src: 'images/20250303_092729.jpg', caption: 'Happy Moments' },
    { src: 'images/20250303_104806.jpg', caption: 'Fun Times' },
    { src: 'images/20250303_224234.jpg', caption: 'Birthday Celebration' },
    { src: 'images/20250316_163356.jpg', caption: 'Friends & Family' },
    { src: 'images/20250318_221619.jpg', caption: 'Party Time' },
    { src: 'images/DSC00510.jpg', caption: 'Sweet Memories' },
    { src: 'images/IMG-20210909-WA0011.jpg', caption: 'Good Times' },
    { src: 'images/IMG-20210909-WA0012.jpg', caption: 'Cherished Moments' },
    { src: 'images/IMG-20210918-WA0001.jpg', caption: 'Laughs & Smiles' },
    { src: 'images/IMG-20210918-WA0003.jpg', caption: 'Happy Days' },
    { src: 'images/IMG-20210918-WA0005.jpg', caption: 'Special Moments' },
    { src: 'images/IMG-20210918-WA0008.jpg', caption: 'Together Forever' },
    { src: 'images/IMG-20230818-WA0011.jpg', caption: 'Beautiful Memories' },
    { src: 'images/IMG-20231011-WA0005.jpg', caption: 'Joy & Celebration' },
    { src: 'images/IMG-20231011-WA0007.jpg', caption: 'Precious Moments' },
    { src: 'images/IMG-20231114-WA0002.jpg', caption: 'Treasured Times' },
    { src: 'images/IMG-20231114-WA0003.jpg', caption: 'Amazing Days' },
    { src: 'images/IMG-20240707-WA0000.jpg', caption: 'Summer Vibes' },
    { src: 'images/IMG-20240826-WA0037.jpg', caption: 'Unforgettable' },
    { src: 'images/IMG-20240826-WA0041.jpg', caption: 'The Good Life' },
    { src: 'images/IMG-20241024-WA0001.jpg', caption: 'Adventures' },
    { src: 'images/IMG-20250318-WA0011.jpg', caption: 'Celebrations' },
    { src: 'images/IMG-20250914-WA0008.jpg', caption: 'Golden Moments' },
    { src: 'images/IMG-20260202-WA0000%20(1).jpg', caption: 'Happiness' },
    { src: 'images/IMG-20260216-WA0000.jpg', caption: 'Birthday Joy' },
    { src: 'images/IMG-20260216-WA0001.jpg', caption: 'Special Day' },
    { src: 'images/IMG20230115175941.jpg', caption: 'Wonderful Times' },
    { src: 'images/Screenshot_20250909_224028_Call.jpg', caption: 'Connected Hearts' },
    { src: 'images/Screenshot_20251001_123808_Snapchat.jpg', caption: 'Instagram Moments' },
    { src: 'images/Screenshot_20251001_170551_Snapchat.jpg', caption: 'Social Times' },
    { src: 'images/Screenshot_20251016_124103_Snapchat.jpg', caption: 'Fun Captures' },
    { src: 'images/Screenshot_20251019_125606_Snapchat.jpg', caption: 'Snap Memories' },
    { src: 'images/Screenshot_20251020_200129_Snapchat.jpg', caption: 'Digital Memories' },
    { src: 'images/Screenshot_20251024_130721_Snapchat.jpg', caption: 'Last but Never Least' }
];

function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const imageCounter = document.getElementById('imageCounter');
    const imageCaption = document.getElementById('imageCaption');
    const closeLightbox = document.getElementById('closeLightbox');
    const prevImage = document.getElementById('prevImage');
    const nextImage = document.getElementById('nextImage');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    // Open lightbox when clicking on gallery images
    galleryItems.forEach((img, index) => {
        img.addEventListener('click', function() {
            currentImageIndex = index;
            openLightbox();
        });
    });

    // Close lightbox
    closeLightbox.addEventListener('click', closeLightboxModal);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxModal();
        }
    });

    // Navigation buttons
    prevImage.addEventListener('click', showPreviousImage);
    nextImage.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'ArrowLeft') {
            showPreviousImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'Escape') {
            closeLightboxModal();
        }
    });

    function openLightbox() {
        lightbox.classList.add('active');
        updateLightboxImage();
        document.body.style.overflow = 'hidden';
    }

    function closeLightboxModal() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function updateLightboxImage() {
        const image = galleryImages[currentImageIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.caption;
        imageCaption.textContent = image.caption;
        imageCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    }

    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    }
}

// ========== Double-click for celebration ==========
document.addEventListener('dblclick', function(e) {
    if (!celebrationStarted && (e.target.tagName === 'IMG' || e.target.className.includes('gallery-item'))) {
        createConfetti();
        createMultipleCharacters();
    }
});

// ========== Initialize on Page Load ==========
window.addEventListener('load', function() {
    startCountdown();
    setupMessageBox();
    setupFireworks();
    setupCelebrateButton();
    setupLightbox();
    console.log('🎉 Birthday Celebration Website Loaded! 🎂');
    console.log('⏰ Countdown starting for March 16, 2026 at 12:00 AM!');
});

// Handle canvas resize
window.addEventListener('resize', function() {
    const canvas = document.getElementById('fireworksCanvas');
    if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
});