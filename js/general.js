document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.createElement('div');
    hamburgerMenu.classList.add('hamburger-menu');
    hamburgerMenu.innerHTML = `
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
    `;

    const navOverlay = document.createElement('div');
    navOverlay.classList.add('nav-overlay');
    
    // Clone the existing navigation
    const originalNav = document.querySelector('header nav');
    const navClone = originalNav.cloneNode(true);
    navOverlay.appendChild(navClone);

    // Insert hamburger menu and overlay
    document.body.insertBefore(hamburgerMenu, document.body.firstChild);
    document.body.insertBefore(navOverlay, document.body.firstChild);

    // Initially hide the overlay
    navOverlay.style.display = 'none';

    // Hamburger menu functionality
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navOverlay.style.display = hamburgerMenu.classList.contains('active') ? 'flex' : 'none';
    });

    // Close menu when a nav link is clicked
    navOverlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            navOverlay.style.display = 'none';
        });
    });

    // Dynamic Text
    const dynamicText = document.getElementById('dynamic-text');
    const phrases = [
        '.. ride with purpose',
        'coffee & cycling community ..',
        'design meets passion ..',
        '.. urban cycling & brewing'
    ];
    let currentPhrase = 0;
    let currentLetter = 0;
    let isDeleting = false;

    function typeWriter() {
        const phrase = phrases[currentPhrase];
        
        if (!isDeleting) {
            dynamicText.textContent += phrase.charAt(currentLetter);
            currentLetter++;

            if (currentLetter === phrase.length) {
                isDeleting = true;
                setTimeout(typeWriter, 2000);
            } else {
                setTimeout(typeWriter, 100);
            }
        } else {
            dynamicText.textContent = phrase.substring(0, currentLetter - 1);
            currentLetter--;

            if (currentLetter === 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
                setTimeout(typeWriter, 500);
            } else {
                setTimeout(typeWriter, 50);
            }
        }
    }

    typeWriter();
});