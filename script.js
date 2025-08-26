// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Animation d'apparition progressive des éléments
    const elements = document.querySelectorAll('.profile-section, .social-button, .coming-soon, .footer');
    
    // Fonction pour animer l'apparition des éléments
    function animateElements() {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('loaded');
            }, index * 200);
        });
    }

    // Démarrer l'animation après un court délai
    setTimeout(animateElements, 300);

    // Ajouter des effets de hover avancés
    const socialButtons = document.querySelectorAll('.social-button');
    
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Effet de clic
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-2px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
    });

    // Animation du logo au survol
    const logo = document.querySelector('.logo');
    logo.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // Effet de parallaxe léger sur le scroll
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        document.body.style.backgroundPosition = `center ${rate}px`;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    // Animation des boutons sociaux au clic
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Créer un effet de ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Ajouter une classe pour l'état de chargement
    document.body.classList.add('loaded');
});

// Fonction pour ajouter de nouveaux réseaux sociaux facilement
function addSocialNetwork(name, url, icon, color) {
    const socialLinks = document.querySelector('.social-links');
    const comingSoon = document.querySelector('.coming-soon');
    
    // Créer le nouveau bouton
    const newButton = document.createElement('a');
    newButton.href = url;
    newButton.target = '_blank';
    newButton.className = `social-button ${name.toLowerCase()}`;
    newButton.innerHTML = `
        <i class="${icon}"></i>
        <span>${name}</span>
    `;
    
    // Ajouter le style personnalisé
    newButton.style.setProperty('--hover-color', color);
    
    // Insérer avant le "coming soon"
    socialLinks.insertBefore(newButton, comingSoon);
    
    // Ajouter l'animation
    newButton.classList.add('loaded');
}

// Exemple d'utilisation pour ajouter un nouveau réseau :
// addSocialNetwork('TikTok', 'https://tiktok.com/@mysticartes', 'fab fa-tiktok', '#ff0050');
