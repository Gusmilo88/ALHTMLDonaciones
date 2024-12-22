class Nav {
    constructor() {
        this.menuItems = [
            { text: 'Inicio', href: '/', icon: '🎄', isExternal: false },
            { text: 'Cursos Veganos', href: 'https://cursosveganos.com/', icon: '🎁', isExternal: true },
            { text: 'Investigaciones', href: 'https://traslacarne.com/', icon: '⭐', isExternal: true },
            { text: 'Contacto', href: '/#', icon: '🔔', isExternal: false }
        ];
        this.isOpen = false;
        this.render();
        this.init();
    }

    render() {
        const navContainer = document.getElementById('nav-container');
        navContainer.innerHTML = `
            <nav class="w-full bg-white border-b border-gray-200">
                <div class="max-w-7xl mx-auto">
                    <div class="flex items-center h-32"> 
                        <div class="flex-shrink-0"> 
                            <a href="/">
                                <img src="/assets/logoALNavidad.png" alt="Logo" class="object-contain w-full max-w-[350px] h-auto"/>
                            </a>
                        </div>
                        
                        <!-- Menú Desktop -->
                        <div class="hidden md:block pr-4 ml-auto">
                            <div class="flex items-center space-x-3" id="desktopMenu"></div>
                        </div>

                        <!-- Botón Hamburguesa -->
                        <button id="menuButton" class="md:hidden ml-auto mr-4 relative z-50">
                            <div class="w-8 h-8 relative santa-hat">
                                <div class="absolute inset-0">
                                    <div class="w-full h-0.5 bg-red-600 transform transition-all duration-300 hamburger-line-1"></div>
                                    <div class="w-full h-0.5 bg-red-600 transform transition-all duration-300 mt-2 hamburger-line-2"></div>
                                    <div class="w-full h-0.5 bg-red-600 transform transition-all duration-300 mt-2 hamburger-line-3"></div>
                                </div>
                            </div>
                        </button>
                    </div>

                    <!-- Menú Mobile -->
                    <div id="mobileMenu" class="
                        fixed inset-0 
                        backdrop-blur-sm
                        transform transition-transform duration-300 ease-in-out z-40
                        translate-x-full
                        md:hidden
                        flex flex-col items-center justify-center
                    ">
                        <div class="absolute top-0 w-full h-8 overflow-hidden">
                            <div class="christmas-lights-top"></div>
                        </div>
                        
                        <div class="flex flex-col items-center space-y-6" id="mobileMenuItems"></div>
                    </div>
                </div>

                <style>
                    @keyframes christmasGlow1 {
                        0%, 100% { 
                            background: radial-gradient(circle at center, rgba(255, 0, 0, 0.5), rgba(0, 255, 0, 0) 70%);
                            box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
                        }
                        33% { 
                            background: radial-gradient(circle at center, rgba(0, 255, 0, 0.5), rgba(0, 0, 255, 0) 70%);
                            box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
                        }
                        66% { 
                            background: radial-gradient(circle at center, rgba(0, 0, 255, 0.5), rgba(255, 0, 0, 0) 70%);
                            box-shadow: 0 0 20px rgba(0, 0, 255, 0.5);
                        }
                    }

                    @keyframes christmasGlow2 {
                        0%, 100% { 
                            background: radial-gradient(circle at center, rgba(0, 255, 0, 0.5), rgba(0, 0, 255, 0) 70%);
                            box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
                        }
                        33% { 
                            background: radial-gradient(circle at center, rgba(0, 0, 255, 0.5), rgba(255, 0, 0, 0) 70%);
                            box-shadow: 0 0 20px rgba(0, 0, 255, 0.5);
                        }
                        66% { 
                            background: radial-gradient(circle at center, rgba(255, 0, 0, 0.5), rgba(0, 255, 0, 0) 70%);
                            box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
                        }
                    }

                    .garland-lights {
                        position: relative;
                        width: 100%;
                        height: 100%;
                    }

                    .garland-light {
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        animation: lightTwinkle 0.8s ease-in-out infinite;
                    }

                    @keyframes lightTwinkle {
                        0%, 100% { 
                            opacity: 1; 
                            transform: scale(1.2);
                            filter: brightness(1.2);
                        }
                        50% { 
                            opacity: 0.7; 
                            transform: scale(0.8);
                            filter: brightness(0.8);
                        }
                    }

                    .santa-hat::before {
                        content: '';
                        position: absolute;
                        top: -10px;
                        right: -5px;
                        width: 15px;
                        height: 15px;
                        background-color: white;
                        border-radius: 50%;
                        box-shadow: 0 0 5px rgba(255,255,255,0.8);
                        transition: all 0.3s;
                    }

                    .santa-hat-open::before {
                        top: -5px;
                        right: -8px;
                    }

                    .hamburger-line-1.active { transform: rotate(45deg) translate(5px, 5px); }
                    .hamburger-line-2.active { opacity: 0; }
                    .hamburger-line-3.active { transform: rotate(-45deg) translate(5px, -5px); }

                    .christmas-lights-top {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 4px;
                        background: linear-gradient(90deg,
                            #ff0000 0%,
                            #00ff00 20%,
                            #0000ff 40%,
                            #ffff00 60%,
                            #ff00ff 80%,
                            #ff0000 100%
                        );
                        background-size: 200% 100%;
                        animation: lightsMovement 2s linear infinite;
                        box-shadow: 0 0 10px rgba(255,255,255,0.8);
                    }

                    @keyframes lightsMovement {
                        0% { background-position: 0% 50%; }
                        100% { background-position: 100% 50%; }
                    }
                </style>
            </nav>
        `;
    }

    createDesktopMenu() {
        const desktopMenu = document.getElementById('desktopMenu');
        this.menuItems.forEach((item, index) => {
            const link = document.createElement('a');
            link.href = item.href;
            link.className = `
                px-2 py-2 rounded-md text-base font-medium text-black
                relative transition-all duration-300 group
                hover:scale-110
                before:content-['']
                before:absolute before:-inset-2
                before:bg-gradient-to-r
                ${index % 2 === 0 ? 'animate-christmas-glow-1' : 'animate-christmas-glow-2'}
                before:blur-xl before:opacity-0
                before:transition-all before:duration-300 before:ease-out
            `;

            if (item.isExternal) {
                link.target = "_blank";
                link.rel = "noopener noreferrer";
            }

            link.innerHTML = `
                ${item.text}
                <div class="garland-container absolute -bottom-4 left-0 w-full h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="garland-lights">
                        ${[...Array(8)].map((_, i) => `
                            <span 
                                class="garland-light light-${i % 5}"
                                style="left: ${i * 14.285}%; animation-delay: ${i * 0.1}s"
                            ></span>
                        `).join('')}
                    </div>
                </div>
            `;

            desktopMenu.appendChild(link);
        });
    }

    createMobileMenu() {
        const mobileMenuItems = document.getElementById('mobileMenuItems');
        this.menuItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'relative flex items-center space-x-4 bg-black/30 rounded-xl px-6 py-4 w-80';
            
            div.innerHTML = `
                <span class="text-2xl">${item.icon}</span>
                <a
                    href="${item.href}"
                    class="mobile-nav-link w-full"
                    ${item.isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}
                >
                    <div class="text-3xl font-bold text-white w-full">
                        ${item.text}
                    </div>
                </a>
            `;

            mobileMenuItems.appendChild(div);
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        const mobileMenu = document.getElementById('mobileMenu');
        const menuButton = document.getElementById('menuButton').firstElementChild;
        const lines = [
            document.querySelector('.hamburger-line-1'),
            document.querySelector('.hamburger-line-2'),
            document.querySelector('.hamburger-line-3')
        ];

        if (this.isOpen) {
            mobileMenu.classList.remove('translate-x-full');
            menuButton.classList.replace('santa-hat', 'santa-hat-open');
            lines.forEach(line => line.classList.add('active'));
        } else {
            mobileMenu.classList.add('translate-x-full');
            menuButton.classList.replace('santa-hat-open', 'santa-hat');
            lines.forEach(line => line.classList.remove('active'));
        }
    }

    init() {
        this.createDesktopMenu();
        this.createMobileMenu();

        document.getElementById('menuButton').addEventListener('click', () => this.toggleMenu());
        
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (this.isOpen) this.toggleMenu();
            });
        });
    }
}

// Inicializar el nav cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new Nav();
});