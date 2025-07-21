// JavaScript for Astraeus Cooper Poetry Website

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links (only for same-page links)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Debug logging
            console.log('Navigation clicked:', href);
            
            // Only apply smooth scrolling to anchor links (starting with #)
            if (href.startsWith('#')) {
                console.log('Same-page navigation to:', href);
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                } else {
                    console.log('Target section not found:', href);
                }
            } else {
                // For external links (like poems.html), let the browser handle normally
                console.log('External navigation to:', href);
                // Don't prevent default - let browser navigate normally
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(12, 12, 12, 0.98)';
        } else {
            navbar.style.background = 'rgba(12, 12, 12, 0.95)';
        }
    });

    // Poem filtering functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const poemCards = document.querySelectorAll('.poem-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            poemCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.poem-card, .about-content, .contact-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation and feedback
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }
            });

            if (isValid) {
                // Show success message
                showNotification('Message sent successfully! ✨', 'success');
                this.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    }

    // Poem card click interactions
    const allPoemCards = document.querySelectorAll('.poem-card');
    allPoemCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle pulse animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // You could expand this to show a modal with the full poem
            openPoemModal(this);
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Dynamic typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        setTimeout(() => {
            typeWriter(heroSubtitle, text, 50);
        }, 1000);
    }
});

// Utility Functions

function typeWriter(element, text, speed = 100) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#00b894' : type === 'error' ? '#e74c3c' : '#6c5ce7'};
        color: white;
        border-radius: 10px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function openPoemModal(card) {
    const poemTitle = card.querySelector('.poem-title').textContent;
    const poemExcerpt = card.querySelector('.poem-excerpt')?.textContent;
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
        animation: fadeIn 0.3s ease;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: rgba(12, 12, 12, 0.95);
        padding: 3rem;
        border-radius: 20px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        border: 1px solid rgba(162, 155, 254, 0.3);
        position: relative;
    `;

    modalContent.innerHTML = `
        <button onclick="this.closest('.modal-overlay').remove()" style="
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            color: #fd79a8;
            font-size: 24px;
            cursor: pointer;
        ">×</button>
        <h2 style="color: #a29bfe; font-family: 'Playfair Display', serif; margin-bottom: 1.5rem;">${poemTitle}</h2>
        <p style="color: #b2bec3; line-height: 2; font-style: italic;">${poemExcerpt || 'Click to read the full poem...'}</p>
        <div style="margin-top: 2rem; text-align: center;">
            <p style="color: #636e72; font-size: 0.9rem;">This is a preview. Full poem content would be loaded here.</p>
        </div>
    `;

    modal.className = 'modal-overlay';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Close modal on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.querySelector('.modal-overlay')) {
            document.querySelector('.modal-overlay').remove();
        }
    });
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Contact form functionality
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
                this.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            // Error
            showFormMessage('Sorry, there was an error sending your message. Please try again or email me directly at officialanujnandal@gmail.com', 'error');
        }
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

function showFormMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message--${type}`;
    messageEl.textContent = message;
    
    // Insert after the form
    const form = document.querySelector('.contact-form');
    form.insertAdjacentElement('afterend', messageEl);
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }
}

// Add CSS for form messages
const formMessageStyle = document.createElement('style');
formMessageStyle.textContent = `
    .form-message {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 8px;
        font-size: 0.9rem;
        text-align: center;
        animation: slideIn 0.3s ease;
    }
    
    .form-message--success {
        background-color: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.3);
        color: #22c55e;
    }
    
    .form-message--error {
        background-color: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #ef4444;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(formMessageStyle);

// Music Player Functionality
class MusicPlayer {
    constructor() {
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.isShuffling = false;
        this.isMinimized = false;
        this.playlist = [];
        this.video = null;
        this.currentErrorHandler = null;
        
        this.initializePlayer();
        this.loadPlaylist();
    }
    
    initializePlayer() {
        // Get DOM elements
        this.player = document.getElementById('musicPlayer');
        this.video = document.getElementById('musicVideo');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.minimizeBtn = document.getElementById('minimizeBtn');
        this.expandBtn = document.getElementById('expandBtn');
        this.progressBar = document.getElementById('progressBar');
        this.progressFill = document.getElementById('progressFill');
        this.currentTimeSpan = document.getElementById('currentTime');
        this.totalTimeSpan = document.getElementById('totalTime');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.currentSongSpan = document.getElementById('currentSong');
        this.currentArtistSpan = document.getElementById('currentArtist');
        
        // Add event listeners
        if (this.playPauseBtn) this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.previousTrack());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextTrack());
        if (this.shuffleBtn) this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        if (this.minimizeBtn) this.minimizeBtn.addEventListener('click', () => this.minimize());
        if (this.expandBtn) this.expandBtn.addEventListener('click', () => this.expand());
        
        // Progress bar interaction
        if (this.progressBar) {
            this.progressBar.addEventListener('click', (e) => this.setProgress(e));
        }
        
        // Volume control
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', () => this.setVolume());
        }
        
        // Video event listeners
        if (this.video) {
            this.video.addEventListener('timeupdate', () => this.updateProgress());
            this.video.addEventListener('ended', () => this.nextTrack());
            this.video.addEventListener('loadedmetadata', () => this.updateDuration());
            this.video.addEventListener('canplay', () => this.onTrackReady());
            this.video.volume = 0.5; // Set default volume
        }
    }
    
    async loadPlaylist() {
        // External music collection - hosted on Google Drive/external services
        // TODO: Replace these placeholder URLs with your actual Google Drive direct download links
        const externalTracks = [
            // INSTRUCTIONS TO UPDATE:
            // 1. Upload each music file to Google Drive
            // 2. Get shareable link for each file
            // 3. Convert Google Drive share link to direct download link
            // 4. Replace the placeholder URLs below with actual direct links
            
            // Current collection - Popular hits (ADD YOUR GOOGLE DRIVE LINKS HERE)
            { title: "Ordinary", artist: "Alex Warren", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048067/Alex_Warren_Ordinary_Official_Video_cvkqik.mp4" },
            { title: "Carry You Home", artist: "Unknown Artist", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048094/Carry_you_Home_vxcmwx.mp4" },
            { title: "Left And Right", artist: "Charlie Puth", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048044/Charlie_Puth_Left_And_Right_zfc8oq.mp4" },
            { title: "We Don't Talk Anymore", artist: "Charlie Puth feat. Selena Gomez", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048054/Charlie_Puth_-_We_Don_t_Talk_Anymore_feat._Selena_Gomez_g333fy.mp4" },
            { title: "Crush (Before Sunset)", artist: "Cigarettes After Sex", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048146/Cigarettes_After_Sex_-_Crush_Before_Sunset_cr3fnn.mp4" },
            { title: "Despacito", artist: "Various Artists", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048215/despacito_sx4yfa.mp4" },
            { title: "Perfect", artist: "Ed Sheeran", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048152/Ed_Sheeran_-_Perfect_emobjc.mp4" },
            { title: "Thinking Out Loud", artist: "Ed Sheeran", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753084658/Thinking_out_Loud_f5goiy.mp4" },
            
            // Romantic & Emotional
            { title: "Fall In Love Again", artist: "Unknown Artist", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048152/fall_in_love_again_eanuhz.mp4" },
            { title: "Follow You", artist: "Unknown Artist", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048055/follow_you_nlimor.mp4" },
            { title: "Forever", artist: "Unknown Artist", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048094/forever_aivyrr.mp4" },
            { title: "Hawaii", artist: "Unknown Artist", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048066/hawaii_vzsefj.mp4" },
            { title: "Little Bit More", artist: "Unknown Artist", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048171/little_bit_more_vqguho.mp4" },
            { title: "Little Do You Know", artist: "Unknown Artist", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048171/Little_Do_You_Know_Beat_Cry_w0uguw.mp4" },
            { title: "Love Story", artist: "Unknown Artist", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048166/love_story_kxybuy.mp4" },
            { title: "Those Eyes (Sped Up)", artist: "Unknown Artist", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048197/Those_Eyes_Sped_Up_jsdptl.mp4" },
            
            // Contemporary hits
            { title: "Mirrors", artist: "Justin Timberlake", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048152/Justin_Timberlake_-_Mirrors_fli2l6.mp4" },
            { title: "Kid In A Suit", artist: "Unknown Artist", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048154/Kid_In_A_Suit_tq7ytt.mp4" },
            { title: "Video Games", artist: "Lana Del Rey", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048202/Lana_Del_Rey_-_Video_Games_z6vo5j.mp4" },
            { title: "One Of The Girls", artist: "Unknown Artist", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048194/One_Of_The_Girls_vsgjgq.mp4" },
            { title: "Señorita", artist: "Shawn Mendes, Camila Cabello", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048205/Shawn_Mendes_Camila_Cabello_-_Se%C3%B1orita_jiud3j.mp4" },
            { title: "Smooth", artist: "Unknown Artist", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048187/Smooth_wzgrcs.mp4" },
            { title: "Talkin To You", artist: "Unknown Artist", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048198/Talkin_to_you_fgbuth.mp4" },
            { title: "Something Just Like This", artist: "The Chainsmokers & Coldplay", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048220/The_Chainsmokers_Coldplay_-_Something_Just_Like_This_Official_Lyric_Video_q5tvrr.mp4" },
            
            // Special tracks
            { title: "Hymn to the Sea (Rose's Theme)", artist: "Titanic Soundtrack", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048093/Hymn_to_the_Sea_Rose_s_Theme_dypclh.mp4" },
            { title: "The Night We Met", artist: "Lord Huron", src: "https://res.cloudinary.com/dqatdcj2u/video/upload/v1753048211/y2mate.gg_-_Lord_Huron_The_Night_We_Met_Official_Audio_720pHF_unuxtx.mp4" }
        ];

        // Filter out placeholder tracks (only include tracks with real URLs)
        this.playlist = externalTracks.filter(track => !track.src.includes('YOUR_FILE_ID'));
        
        console.log(`🎵 External playlist loaded with ${this.playlist.length} tracks`);
        
        if (this.playlist.length === 0) {
            console.log('❌ No music URLs configured. Please update Google Drive links in script.js');
            if (this.currentSongSpan) {
                this.currentSongSpan.textContent = 'Music links need to be configured';
            }
            if (this.currentArtistSpan) {
                this.currentArtistSpan.textContent = 'Upload music to Google Drive and update URLs';
            }
        } else {
            console.log(`🎶 Your external playlist contains:`);
            this.playlist.forEach((track, index) => {
                console.log(`  ${index + 1}. "${track.title}" by ${track.artist}`);
            });
            // Load the first available track
            this.loadCurrentTrack();
        }
    }
    
    testFileExists(src) {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            video.preload = 'metadata';
            
            // Set a timeout to avoid hanging
            const timeoutId = setTimeout(() => {
                resolve(false);
            }, 1000);
            
            video.onloadedmetadata = () => {
                clearTimeout(timeoutId);
                resolve(true);
            };
            
            video.onerror = () => {
                clearTimeout(timeoutId);
                resolve(false);
            };
            
            video.src = src;
        });
    }
    
    loadCurrentTrack() {
        if (this.playlist.length === 0) return;
        
        const track = this.playlist[this.currentTrackIndex];
        if (this.video && track) {
            this.video.src = track.src;
            this.updateTrackInfo();
            console.log(`Loading: ${track.src}`);
            
            // Handle file not found - remove previous error listeners first
            const errorHandler = () => {
                console.log(`Could not load: ${track.src}`);
                if (this.currentSongSpan) {
                    this.currentSongSpan.textContent = `File not found: ${track.title}`;
                }
            };
            
            // Remove existing error listener and add new one
            this.video.removeEventListener('error', this.currentErrorHandler);
            this.currentErrorHandler = errorHandler;
            this.video.addEventListener('error', errorHandler);
        }
    }
    
    updateTrackInfo() {
        const track = this.playlist[this.currentTrackIndex];
        if (track) {
            if (this.currentSongSpan) this.currentSongSpan.textContent = track.title;
            if (this.currentArtistSpan) this.currentArtistSpan.textContent = track.artist;
        }
    }
    
    togglePlayPause() {
        if (!this.video) return;
        
        if (this.isPlaying) {
            this.video.pause();
            if (this.playPauseBtn) this.playPauseBtn.textContent = '▶';
            this.isPlaying = false;
        } else {
            this.video.play().catch(e => {
                console.log('Playback failed:', e);
                if (this.currentSongSpan) {
                    this.currentSongSpan.textContent = 'Please add music files to /music folder';
                }
            });
            if (this.playPauseBtn) this.playPauseBtn.textContent = '⏸';
            this.isPlaying = true;
        }
    }
    
    nextTrack() {
        if (this.playlist.length === 0) return;
        
        if (this.isShuffling) {
            this.currentTrackIndex = Math.floor(Math.random() * this.playlist.length);
        } else {
            this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        }
        
        this.loadCurrentTrack();
        if (this.isPlaying) {
            setTimeout(() => this.togglePlayPause(), 100);
        }
    }
    
    previousTrack() {
        if (this.playlist.length === 0) return;
        
        this.currentTrackIndex = this.currentTrackIndex === 0 
            ? this.playlist.length - 1 
            : this.currentTrackIndex - 1;
            
        this.loadCurrentTrack();
        if (this.isPlaying) {
            setTimeout(() => this.togglePlayPause(), 100);
        }
    }
    
    toggleShuffle() {
        this.isShuffling = !this.isShuffling;
        if (this.shuffleBtn) {
            this.shuffleBtn.style.color = this.isShuffling ? '#fd79a8' : '';
        }
    }
    
    minimize() {
        this.isMinimized = true;
        if (this.player) this.player.classList.add('minimized');
        if (this.minimizeBtn) this.minimizeBtn.style.display = 'none';
        if (this.expandBtn) this.expandBtn.style.display = 'block';
    }
    
    expand() {
        this.isMinimized = false;
        if (this.player) this.player.classList.remove('minimized');
        if (this.minimizeBtn) this.minimizeBtn.style.display = 'block';
        if (this.expandBtn) this.expandBtn.style.display = 'none';
    }
    
    updateProgress() {
        if (!this.video || !this.progressFill) return;
        
        const progress = (this.video.currentTime / this.video.duration) * 100;
        this.progressFill.style.width = `${progress}%`;
        
        if (this.currentTimeSpan) {
            this.currentTimeSpan.textContent = this.formatTime(this.video.currentTime);
        }
    }
    
    updateDuration() {
        if (!this.video || !this.totalTimeSpan) return;
        this.totalTimeSpan.textContent = this.formatTime(this.video.duration);
    }
    
    setProgress(e) {
        if (!this.video || !this.progressBar) return;
        
        const rect = this.progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const clickRatio = clickX / width;
        
        this.video.currentTime = clickRatio * this.video.duration;
    }
    
    setVolume() {
        if (!this.video || !this.volumeSlider) return;
        this.video.volume = this.volumeSlider.value / 100;
    }
    
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    onTrackReady() {
        // Track is ready to play
        this.updateDuration();
    }
}

// Initialize music player
let musicPlayer;
if (document.getElementById('musicPlayer')) {
    musicPlayer = new MusicPlayer();
}