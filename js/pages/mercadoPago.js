class MercadoPagoPage {
    constructor() {
        this.donations = [
            { amount: 2000, label: "🎁 $2000 CLP", link: "https://mpago.la/2tFVwVC" },
            { amount: 5000, label: "💵 $5000 CLP", link: "https://mpago.la/1RaTVRC" },
            { amount: 10000, label: "❤️ $10.000 CLP", popular: true, link: "https://mpago.la/2mJNUB3" },
            { amount: 20000, label: "💰 $20.000 CLP", link: "https://mpago.la/2xz7sdi" },
            { amount: 50000, label: "⭐ $50.000 CLP", link: "https://mpago.la/2ZnLFU9" },
            { amount: 100000, label: "💎 $100.000 CLP", link: "https://mpago.la/2P3z8W3" }
        ];
        this.init();
    }

    showThanksMessage() {
        const thanksMsg = document.getElementById('thank-you-message');
        thanksMsg.style.opacity = '1';
        setTimeout(() => {
            thanksMsg.style.opacity = '0';
        }, 3000);
    }

    createDonationButtons() {
        const container = document.getElementById('donations-container');
        this.donations.forEach(donation => {
            const link = document.createElement('a');
            link.href = donation.link;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.className = `
                relative group flex items-center justify-center gap-3 py-4 px-6 rounded-xl
                ${donation.popular 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                    : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white'}
                font-semibold shadow-md hover:shadow-lg transition-all duration-300
                hover:scale-105 hover:from-blue-600 hover:to-blue-700
            `;
            
            link.innerHTML = `
                <span class="flex items-center gap-2">
                    ${donation.label}
                </span>
                ${donation.popular ? `
                    <span class="absolute sm:-top-6 -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-blue-900 text-xs py-1 px-2 rounded-full">
                        Opción recomendada
                    </span>
                ` : ''}
            `;

            link.addEventListener('click', () => this.showThanksMessage());
            container.appendChild(link);
        });
    }

    init() {
        this.createDonationButtons();
    }
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    new MercadoPagoPage();
});