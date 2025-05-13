document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');
    const declineButton = document.getElementById('decline-cookies');
    const cookieName = 'amuj_cookies_accepted';

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    if (!getCookie(cookieName)) {
        // Show the banner with a slight delay to ensure the CSS is loaded
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 100);
    }

    acceptButton.addEventListener('click', function() {
        setCookie(cookieName, 'true', 365);
        cookieBanner.classList.remove('show'); // Slide down
    });

    declineButton.addEventListener('click', function() {
        setCookie(cookieName, 'false', 30);
        cookieBanner.classList.remove('show'); // Slide down
        // Implement logic to disable non-essential cookies
    });
});