// js/components/BankTransferInfo.js
class BankTransferInfo {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
                <h2 class="text-2xl font-bold mb-4">Información de Transferencia Bancaria</h2>
                <div class="space-y-4">
                    <div>
                        <p class="font-semibold">Banco:</p>
                        <p>Nombre del Banco</p>
                    </div>
                    <div>
                        <p class="font-semibold">Número de Cuenta:</p>
                        <p>XXXX-XXXX-XXXX-XXXX</p>
                    </div>
                    <div>
                        <p class="font-semibold">Titular de la Cuenta:</p>
                        <p>Nombre del Titular</p>
                    </div>
                    <div>
                        <p class="font-semibold">CBU:</p>
                        <p>XXXXXXXXXXXXXXXXXX</p>
                    </div>
                    <div>
                        <p class="font-semibold">Alias:</p>
                        <p>ALIAS.DE.LA.CUENTA</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// js/components/SecurityInfo.js
class SecurityInfo {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
        this.setupIcons();
    }

    setupIcons() {
        const icons = this.container.querySelectorAll('.lucide');
        icons.forEach(icon => {
            if (icon.classList.contains('lucide-lock')) {
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
            }
        });
    }

    render() {
        this.container.innerHTML = `
            <div class="bg-blue-50 p-4 rounded-lg flex items-center justify-center space-x-3">
                <i class="lucide lucide-lock h-5 w-5 text-blue-700 flex-shrink-0"></i>
                <div class="text-sm text-blue-700 text-center">
                    Todas las transacciones son procesadas de forma segura y encriptada.
                </div>
            </div>
        `;
    }
}