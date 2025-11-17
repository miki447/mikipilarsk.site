// --- 1. Efekt Pisania (Typing Effect) ---
function setupTypingEffect() {
    const roleElement = document.querySelector('.typing-effect');
    if (!roleElement) return;

    const roles = JSON.parse(roleElement.dataset.roles);
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Szybkość pisania
    let deleteSpeed = 50;  // Szybkość usuwania
    let delayBetweenRoles = 1500; // Opóźnienie przed rozpoczęciem usuwania/nowej roli

    function type() {
        // Obecna rola
        const currentRole = roles[roleIndex % roles.length];
        
        // Tekst do wyświetlenia
        let currentText = isDeleting 
            ? currentRole.substring(0, charIndex - 1)
            : currentRole.substring(0, charIndex + 1);

        roleElement.textContent = currentText;

        // Logika pisania
        if (!isDeleting && charIndex < currentRole.length) {
            charIndex++;
            typingSpeed = 100; // Normalna szybkość
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            typingSpeed = 50; // Szybkość usuwania
        } else if (!isDeleting && charIndex === currentRole.length) {
            // Skończono pisać, zacznij usuwać po opóźnieniu
            isDeleting = true;
            typingSpeed = delayBetweenRoles;
        } else if (isDeleting && charIndex === 0) {
            // Skończono usuwać, przejdź do następnej roli
            isDeleting = false;
            roleIndex++;
            typingSpeed = 150; // Krótki czas opóźnienia przed nową rolą
        }

        const nextTimeout = isDeleting && charIndex === 0 ? delayBetweenRoles : typingSpeed;
        setTimeout(type, nextTimeout);
    }

    type();
}

// --- 2. Nawigacja Mobilna (Hamburger Menu) ---
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('#main-header nav ul');

    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        
        // Zmiana ikony na 'X' po otwarciu
        if (navUl.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Zamknięcie menu po kliknięciu linku (tylko w widoku mobilnym)
    navUl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navUl.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-xmark');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });
}

// --- 3. Główna Funkcja Uruchamiająca ---
document.addEventListener('DOMContentLoaded', () => {
    setupTypingEffect();
    setupMobileMenu();
});
