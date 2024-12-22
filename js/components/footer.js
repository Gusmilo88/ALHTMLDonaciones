class Footer {
    constructor() {
        this.menuItems = [
            { text: 'Inicio', href: 'https://animallibre.org/', icon: '<img src="/assets/ico.png" alt="Icono" class="w-6 h-6">', isExternal: false },            // { text: 'Cursos Veganos', href: 'https://cursosveganos.com/', icon: '🎁', isExternal: true },
            // { text: 'Investigaciones', href: 'https://traslacarne.com/', icon: '⭐', isExternal: true },
            // { text: 'Contacto', href: '/#', icon: '🔔', isExternal: false }
        ];

        this.socialLinks = [
            { icon: 'fa-facebook-f', href: 'https://www.facebook.com/AnimalLibre/' },
            { icon: 'fa-instagram', href: 'https://www.instagram.com/animallibre/' },
            { icon: 'fa-youtube', href: 'https://www.youtube.com/channel/UCWNN7mfiorgQQiF7KjXLCRA' },
            { icon: 'fa-regular fa-envelope', href: 'mailto:info@animallibre.org' }
        ];

        this.render();
        this.init();
    }

    render() {
        const footerContainer = document.getElementById('footer-container');
        footerContainer.innerHTML = `
            <footer class="w-full bg-white border-t border-gray-200 pt-8 pb-4 mt-8">
                <div class="max-w-7xl mx-auto px-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <!-- Logo -->
                        <div class="flex flex-col items-center md:items-start">
                            <a href="/">
                                <img src="../assets/logoALNavidad.png" alt="Logo" 
                                    class="object-contain w-full max-w-[200px] h-auto mb-4">
                            </a>
                        </div>

                        <!-- Enlaces -->
                        <div class="flex flex-col items-center md:items-start">
                            <h3 class="text-xl font-bold mb-4 text-black">Enlaces</h3>
                            <div class="flex flex-col space-y-2" id="footerMenuLinks"></div>
                        </div>

                        <!-- Redes Sociales -->
                        <div class="flex flex-col items-center md:items-start">
                            <h3 class="text-xl font-bold mb-4 text-black">Síguenos</h3>
                            <div class="flex space-x-8" id="footerSocialLinks"></div>
                        </div>
                    </div>

                    <!-- Copyright -->
                    <div class="mt-8 pt-4 border-t border-gray-200">
                        <p class="text-center text-gray-600" id="footerCopyright"></p>
                    </div>
                </div>

                <style>
                    .social-icon {
                        width: 3.5rem;
                        height: 3.5rem;
                        border-radius: 9999px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.3s;
                        background:rgba(144,11,31,1) 100%;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                    }

                    .social-icon:hover {
                        transform: scale(1.1);
                        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
                    }

                    .social-icon i {
                        color: white;
                        font-size: 1.5rem;
                    }
                </style>
            </footer>
        `;
    }

    createMenuLinks() {
        const menuContainer = document.getElementById('footerMenuLinks');
        this.menuItems.forEach(item => {
            const link = document.createElement('a');
            link.href = item.href;
            link.className = 'relative transition-all duration-300 group hover:scale-110 text-black';
            if (item.isExternal) {
                link.target = "_blank";
                link.rel = "noopener noreferrer";
            }
            link.innerHTML = `<span class="flex items-center gap-2">
                    ${item.icon} ${item.text}</span>`;
            menuContainer.appendChild(link);
        });
    }

    createSocialLinks() {
        const socialContainer = document.getElementById('footerSocialLinks');
        this.socialLinks.forEach(item => {
            const link = document.createElement('a');
            link.href = item.href;
            link.className = 'relative group pt-4';
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            
            const iconDiv = document.createElement('div');
            iconDiv.className = 'social-icon';
            iconDiv.innerHTML = `<i class="fa-brands ${item.icon}"></i>`;
            
            link.appendChild(iconDiv);
            socialContainer.appendChild(link);
        });
    }

    updateCopyright() {
        const copyrightElement = document.getElementById('footerCopyright');
        copyrightElement.textContent = `© ${new Date().getFullYear()} Todos los derechos reservados`;
    }

    init() {
        this.createMenuLinks();
        this.createSocialLinks();
        this.updateCopyright();
    }
}

// Inicializar el footer cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new Footer();
});