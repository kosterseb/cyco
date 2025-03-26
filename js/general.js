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

// Function to create and place random background images
function placeRandomBackgroundImages() {
    // Array of placeholder image URLs (you can replace these with your actual PNG paths)
    const backgroundImages = [
        'https://lh3.googleusercontent.com/d/1Rlmq8-Qd9ES7x2MyrxqfLbimy37hgGTY',
        'https://lh3.googleusercontent.com/d/1y-1Wtu7MwPtqAc87i6bPMN1pLOH0dxiW',
        'https://lh3.googleusercontent.com/d/1__WGilIjhID5xj6Musq6CJSlMWjby4GD',
        'https://lh3.googleusercontent.com/d/1efoNOz5Hjo_wjDHjTHR8wx17xh94Wh7L',
        'https://lh3.googleusercontent.com/d/1H9O8AFUcvn0kn1RTbnwcnzGyTbXZo_Po',
        'https://lh3.googleusercontent.com/d/1Fusgxp4rH7yMipqDx2vo2EqByQQPZj2D',
        'https://lh3.googleusercontent.com/d/1UECMEEENAgJraWVo_HbcNOeG7kSk9N2z',
        'https://lh3.googleusercontent.com/d/1kjNH6rrQWjOsUMALRIOelGuMfoj1E7Xh',
        'https://lh3.googleusercontent.com/d/1dVLVsjoSSb7jNyFkuozpnOfYLWncrU4M',
        
    ];

    // Create a container for background images
    const backgroundContainer = document.createElement('div');
    backgroundContainer.id = 'background-images';
    backgroundContainer.style.position = 'fixed';
    backgroundContainer.style.top = '0';
    backgroundContainer.style.left = '0';
    backgroundContainer.style.width = '100%';
    backgroundContainer.style.height = '100%';
    backgroundContainer.style.pointerEvents = 'none';
    backgroundContainer.style.zIndex = '-2';
    backgroundContainer.style.overflow = 'hidden';

    // Create a grid to place images without overlap
    const gridColumns = 4;
    const gridRows = 3;
    const gridPositions = [];

    // Shuffle images to randomize placement
    for (let i = backgroundImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [backgroundImages[i], backgroundImages[j]] = [backgroundImages[j], backgroundImages[i]];
    }

    // Create grid positions
    for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridColumns; col++) {
            gridPositions.push({
                top: `${(row / gridRows) * 100}%`,
                left: `${(col / gridColumns) * 100}%`
            });
        }
    }

    // Randomly select grid positions
    const selectedPositions = gridPositions.sort(() => 0.5 - Math.random()).slice(0, backgroundImages.length);

    // Place images in grid positions
    backgroundImages.forEach((imageUrl, index) => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.position = 'absolute';
        img.style.width = `${Math.random() * 200 + 100}px`; // Random width between 100-300px
        img.style.opacity = '0.3';
        
        // Use predetermined grid position
        const position = selectedPositions[index];
        img.style.top = position.top;
        img.style.left = position.left;
        
        // Random rotation
        img.style.transform = `rotate(${Math.random() * 360}deg)`;

        backgroundContainer.appendChild(img);
    });
    
    // Add to body
    document.body.appendChild(backgroundContainer);
}

function setupMarquees() {
    const marquees = document.querySelectorAll('.marquee');
    
    marquees.forEach(marquee => {
        const originalContent = marquee.querySelector('.marquee-text');
        const contentText = originalContent.textContent.trim();
        
        // Create a container for the marquee content
        const marqueeContent = document.createElement('div');
        marqueeContent.className = 'marquee-content';
        
        // Create two identical text spans
        for (let i = 0; i < 2; i++) {
            const textSpan = document.createElement('div');
            textSpan.className = 'marquee-text';
            textSpan.textContent = contentText;
            marqueeContent.appendChild(textSpan);
        }
        
        // Replace original content with new marquee content
        marquee.innerHTML = '';
        marquee.appendChild(marqueeContent);
    });
}


// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', setupMarquees);
document.addEventListener('DOMContentLoaded', placeRandomBackgroundImages);