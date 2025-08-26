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

    // Effets tactiles pour mobile (pas de hover)
    const socialButtons = document.querySelectorAll('.social-button');
    
    socialButtons.forEach(button => {
        // Effet de clic tactile simple
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Fallback pour clic souris
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
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
// addSocialNetwork('TikTok', 'https://tiktok.com/@aywerly007', 'fab fa-tiktok', '#ff0050');

// Fonction pour copier le code de parrainage dans le presse-papiers
function copyReferralCode() {
    const referralCode = 'AYWERLY291281';
    
    // Copier dans le presse-papiers
    if (navigator.clipboard && window.isSecureContext) {
        // Méthode moderne pour HTTPS
        navigator.clipboard.writeText(referralCode).then(() => {
            showCopySuccess();
        }).catch(() => {
            fallbackCopyTextToClipboard(referralCode);
        });
    } else {
        // Méthode de fallback pour HTTP
        fallbackCopyTextToClipboard(referralCode);
    }
}

// Méthode de fallback pour copier le texte
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        console.error('Erreur lors de la copie:', err);
        showCopyError();
    }
    
    document.body.removeChild(textArea);
}

// Afficher le succès de la copie
function showCopySuccess() {
    const button = document.querySelector('.social-button.voggt[onclick="copyReferralCode()"]');
    if (!button) return;
    
    const originalText = button.querySelector('span').textContent;
    
    // Changer l'apparence du bouton
    button.classList.add('copied');
    button.querySelector('span').textContent = 'Code copié ! ✓';
    
    // Remettre l'état original après 2 secondes
    setTimeout(() => {
        button.classList.remove('copied');
        button.querySelector('span').textContent = originalText;
    }, 2000);
}

// Afficher l'erreur de copie
function showCopyError() {
    const button = document.querySelector('.social-button.voggt[onclick="copyReferralCode()"]');
    if (!button) return;
    
    const originalText = button.querySelector('span').textContent;
    
    button.querySelector('span').textContent = 'Erreur de copie !';
    
    setTimeout(() => {
        button.querySelector('span').textContent = originalText;
    }, 2000);
}
