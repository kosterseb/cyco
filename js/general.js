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

    // Keep track of placed images to prevent overlap
    const placedImages = [];

    function isOverlapping(newRect) {
        return placedImages.some(existingImg => {
            const existingRect = existingImg.getBoundingClientRect();
            return !(
                newRect.right < existingRect.left || 
                newRect.left > existingRect.right || 
                newRect.bottom < existingRect.top || 
                newRect.top > existingRect.bottom
            );
        });
    }

    function placeImage(imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.position = 'absolute';
        img.style.width = `${Math.random() * 300 + 100}px`; // Random width between 100-300px
        img.style.opacity = '0.3';

        // Try to place image without overlap (max 100 attempts)
        for (let attempts = 0; attempts < 100; attempts++) {
            img.style.top = `${Math.random() * 100}%`;
            img.style.left = `${Math.random() * 100}%`;
            // img.style.transform = `rotate(${Math.random() * 360}deg)`;

            // Wait for image to load to get accurate dimensions
            img.onload = () => {
                const rect = img.getBoundingClientRect();
                
                // If no overlap, add the image
                if (!isOverlapping(rect)) {
                    placedImages.push(img);
                    backgroundContainer.appendChild(img);
                    return;
                }
            };
        }
    }

    // Place images
    backgroundImages.forEach(placeImage);

    // Add to body
    document.body.appendChild(backgroundContainer);
}

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', placeRandomBackgroundImages);