document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptButton = document.getElementById('acceptCookies');
    const denyButton = document.getElementById('denyCookies');
    const cookieName = 'cookieConsent'; // Name of the cookie to store consent
    const cookieExpiryDays = 365; // How long the cookie should last (in days)

    // Function to set a cookie
    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/';
    }

    // Function to get a cookie
    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Function to delete a cookie (by setting its expiry to a past date)
    function eraseCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999; path=/';
    }

    // Function to show the cookie banner
    function showCookieBanner() {
        // Use a slight delay to ensure CSS transitions apply correctly on load
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 100);
    }

    // Function to hide the cookie banner with animation
    function hideCookieBanner() {
        cookieBanner.classList.remove('show');
        // Optional: Remove banner from DOM after animation completes
        cookieBanner.addEventListener('transitionend', () => {
            if (!cookieBanner.classList.contains('show')) {
                cookieBanner.style.display = 'none';
            }
        }, { once: true }); // Ensure this listener runs only once
    }

    // Check if the user has already given consent
    const userConsent = getCookie(cookieName);

    if (!userConsent) {
        // If no consent, show the banner
        showCookieBanner();
    } else {
        // If consent exists, hide the banner immediately (or ensure it's not shown)
        cookieBanner.style.display = 'none';
    }

    // Event listener for "Accept" button
    acceptButton.addEventListener('click', () => {
        setCookie(cookieName, 'accepted', cookieExpiryDays);
        hideCookieBanner();
        console.log('Cookies accepted.');
        // You might want to load analytics scripts or other cookie-dependent features here
    });

    // Event listener for "Deny" button
    denyButton.addEventListener('click', () => {
        setCookie(cookieName, 'denied', cookieExpiryDays);
        hideCookieBanner();
        console.log('Cookies denied.');
        // You might want to disable certain features or analytics here
    });

    // Optional: If you want a way to reset consent for testing purposes
    // Add a button or console command: eraseCookie(cookieName);
});

    // JavaScript for intro text letter drop animation
    document.addEventListener('DOMContentLoaded', () => {
        const animatedTexts = document.querySelectorAll('.animated-text');

        animatedTexts.forEach(textElement => {
            const textContent = textElement.textContent;
            textElement.innerHTML = ''; // Clear original content

            textContent.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.animationDelay = `${index * 0.05}s`; // Stagger animation
                textElement.appendChild(span);
            });
        });
    });
    // JavaScript for Online Chat Widget
        const chatToggleButton = document.getElementById('chatToggleButton');
        const chatWindow = document.getElementById('chatWindow');
        const closeChatButton = document.getElementById('closeChatButton');
        const chatMessages = document.getElementById('chatMessages');
        const chatInput = document.getElementById('chatInput');
        const sendMessageButton = document.getElementById('sendMessageButton');

        chatToggleButton.addEventListener('click', () => {
            chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
            if (chatWindow.style.display === 'flex') {
                chatInput.focus(); // Focus input when chat opens
                chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
            }
        });

        closeChatButton.addEventListener('click', () => {
            chatWindow.style.display = 'none';
        });

        function sendMessage() {
            const messageText = chatInput.value.trim();
            if (messageText !== '') {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('chat-message', 'user');
                messageDiv.textContent = messageText;
                chatMessages.appendChild(messageDiv);
                chatInput.value = ''; // Clear input
                chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom

                // Simulate a reply after a short delay (in a real app, this would be a backend call)
                setTimeout(() => {
                    const replyDiv = document.createElement('div');
                    replyDiv.classList.add('chat-message');
                    replyDiv.textContent = "Thank you for your message! Our team will get back to you shortly.";
                    chatMessages.appendChild(replyDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
                }, 1500);
            }
        }

        sendMessageButton.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });
        document.addEventListener('DOMContentLoaded', () => {
    // ... (Your existing Cookie Banner, Intro Text, Chat Widget JS code) ...

    // --- Gufram-Inspired Section JavaScript ---
    const guframItemsContainer = document.querySelector('.gufram-items-container');
    const guframItems = document.querySelectorAll('.gufram-item');
    const spaceButton = document.querySelector('.space-button');
    const gridButton = document.querySelector('.grid-button'); // This will currently just re-randomize

    if (guframItemsContainer && guframItems.length > 0) {

        // Function to generate a random number within a range
        function getRandom(min, max) {
            return Math.random() * (max - min) + min;
        }

        // Function to position and animate items
        function setupGuframItems(randomizeOnly = false) {
            const containerRect = guframItemsContainer.getBoundingClientRect();
            const containerWidth = containerRect.width;
            const containerHeight = containerRect.height;

            guframItems.forEach(item => {
                // Ensure item is not selected before re-randomizing/animating
                item.classList.remove('selected');
                item.style.zIndex = '1'; // Reset z-index

                // Random position within container boundaries
                // Account for item size to prevent overflow
                const itemWidth = item.offsetWidth;
                const itemHeight = item.offsetHeight;

                const randomX = getRandom(0, containerWidth - itemWidth);
                const randomY = getRandom(0, containerHeight - itemHeight);
                const randomScale = getRandom(0.8, 1.1); // Slightly varied scales

                item.style.left = `${randomX}px`;
                item.style.top = `${randomY}px`;
                item.style.transform = `scale(${randomScale})`;
                item.style.opacity = getRandom(0.8, 1); // Slightly varied opacities

                if (!randomizeOnly) {
                    // Apply random animation direction and duration
                    const animationName = Math.random() > 0.5 ? 'itemFloat' : 'itemFloatReverse';
                    const animationDelay = getRandom(0, 2); // 0-2 seconds delay
                    const animationDuration = getRandom(7, 12); // 7-12 seconds duration

                    item.style.animationName = animationName;
                    item.style.animationDelay = `${animationDelay}s`;
                    item.style.animationDuration = `${animationDuration}s`;
                    item.classList.add('animate'); // Re-add animate class
                    item.style.animationPlayState = 'running'; // Ensure it's running
                }
            });
        }

        // Initialize items on page load
        setupGuframItems();

        // Event listener for item clicks
        guframItems.forEach(item => {
            item.addEventListener('click', () => {
                const isSelected = item.classList.contains('selected');

                // Deselect any currently selected item
                const currentSelected = guframItemsContainer.querySelector('.gufram-item.selected');
                if (currentSelected && currentSelected !== item) {
                    currentSelected.classList.remove('selected');
                    currentSelected.style.zIndex = '1'; // Reset z-index
                    currentSelected.style.animationPlayState = 'running'; // Restart animation
                    currentSelected.classList.add('animate'); // Ensure animate class is there
                }

                if (!isSelected) {
                    // Select the clicked item
                    item.classList.add('selected');
                    item.style.animationPlayState = 'paused'; // Pause its animation
                    item.style.zIndex = '100'; // Bring to front (CSS also handles this via .selected)
                    item.classList.remove('animate'); // Remove animate class so it doesn't try to override paused state
                } else {
                    // If it was already selected, deselect it and restart animation
                    item.classList.remove('selected');
                    item.style.animationPlayState = 'running'; // Restart animation
                    item.style.zIndex = '1'; // Reset z-index
                    item.classList.add('animate'); // Re-add animate class
                }
            });
        });

        // Event listener for SPACE button
        if (spaceButton) {
            spaceButton.addEventListener('click', () => {
                setupGuframItems(); // Re-randomize positions and restart animations
            });
        }

        // Event listener for GRID button (currently just re-randomizes)
        // For a true grid, you'd need more complex CSS class toggling and positioning logic.
        // This is a placeholder for future enhancement.
        if (gridButton) {
            gridButton.addEventListener('click', () => {
                setupGuframItems(); // For now, just re-randomize like SPACE
                console.log("GRID button clicked. (Future enhancement: implement a true grid layout)");
            });
        }
    } else {
        console.warn("Gufram showcase elements not found. Gufram JS not initialized.");
    }
});
