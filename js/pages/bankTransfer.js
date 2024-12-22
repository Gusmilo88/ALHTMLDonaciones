class BankTransferPage {
    constructor() {
        this.bankInfo = [
            { icon: "🏦", label: "Banco", value: "Banco Santander", copyable: false },
            { icon: "🔢", label: "Número de Cuenta", value: "000069708625", copyable: true },
            { icon: "👤", label: "Titular de la Cuenta", value: "ONG Animal Libre", copyable: false },
            { icon: "✉️", label: "SWIFT", value: "BSCHCLRM", copyable: true }
        ];
        this.init();
    }

    handleCopy(value) {
        navigator.clipboard.writeText(value);
        this.showNotification('¡Copiado al portapapeles!✅');
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 2000);
    }

    displayAmount() {
        const params = new URLSearchParams(window.location.search);
        const amount = params.get('amount');
        
        if (amount) {
            const amountDisplay = document.getElementById('amount-display');
            amountDisplay.innerHTML = `
                <div class="text-center mb-8">
                    <div class="inline-block bg-white rounded-xl shadow-sm border border-gray-200">
                    </div>
                </div>
            `;
        }
    }

    createInfoItems() {
        const container = document.querySelector('.max-w-2xl .p-8');
        this.bankInfo.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'group transition-all duration-200 ease-in-out hover:bg-gray-50 p-4 rounded-lg';
            
            div.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <span class="text-xl">${item.icon}</span>
                        <p class="font-medium text-gray-900">${item.label}</p>
                    </div>
                    ${item.copyable ? `
                        <button class="transition-colors p-2 rounded-lg hover:bg-gray-100">
                            📋
                        </button>
                    ` : ''}
                </div>
                <p class="mt-2 text-lg font-mono pl-8 text-gray-700 hover:text-blue-700 transition-colors">
                    ${item.value}
                </p>
            `;

            if (item.copyable) {
                const copyButton = div.querySelector('button');
                copyButton.addEventListener('click', () => this.handleCopy(item.value));
            }

            container.appendChild(div);
            
            // Agregar separador si no es el último elemento
            if (index < this.bankInfo.length - 1) {
                const separator = document.createElement('div');
                separator.className = 'h-px bg-gray-100';
                container.appendChild(separator);
            }
        });
    }

    init() {
        this.displayAmount();
        this.createInfoItems();
    }
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    new BankTransferPage();
});