class PaymentMethod {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.selectedMethod = '';
        this.formData = {
            name: '',
            email: '',
            amount: ''
        };
        this.paymentMethods = [
            { 
                id: 'mercadopago', 
                label: `<div class="h-10 relative">
                    <img src="/assets/mercadoPagoLogo.svg" alt="MercadoPago" class="object-contain w-full h-full" />
                </div>` 
            },
            { 
                id: 'paypal', 
                label: `<div class="h-10 relative">
                    <img src="/assets/paypal.png" alt="PayPal" class="object-contain w-full h-full" />
                </div>` 
            },
            { 
                id: 'transferencia', 
                label: `<div class="h-10 relative">
                    <img src="/assets/transferenciaBancaria.png" alt="Transferencia Bancaria" class="object-contain w-full h-full" />
                </div>` 
            },
            { 
                id: 'webpay', 
                label: `<div class="h-10 relative">
                    <img src="/assets/webPay.png" alt="WebPay" class="object-contain w-full h-full" />
                </div>` 
            }
        ];
        this.render();
        this.setupIcons();
        this.addEventListeners();
    }

    updateFormData(data) {
        this.formData = { ...this.formData, ...data };
        this.render();
    }

    setupIcons() {
        const icons = document.querySelectorAll('.lucide');
        icons.forEach(icon => {
            if (icon.classList.contains('lucide-credit-card')) {
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`;
            }
        });
    }

    isFormValid() {
        return this.formData.name.trim() !== '' && 
               this.formData.email.trim() !== '' && 
               this.formData.amount.trim() !== '';
    }

    handleMethodChange(methodId) {
        if (!this.isFormValid()) {
            return;
        }

        const numericAmount = this.formData.amount.replace(/[^0-9.]/g, '');
        const cleanAmount = parseFloat(numericAmount);

        if (!cleanAmount || cleanAmount <= 0) {
            alert('Por favor ingresa un monto válido mayor a 0');
            return;
        }

        this.selectedMethod = methodId;

        switch(methodId) {
            case 'paypal':
                window.location.href = `/donations/paypal?amount=${cleanAmount.toFixed(2)}`;
                break;
            case 'transferencia':
                window.location.href = '/donations/bank-transfer';
                break;
            case 'mercadopago':
                window.location.href = '/donations/mercado-pago';
                break;
            case 'webpay':
                window.open('https://www.darcontarjeta.cl/portalpagodirecto/pages/institucion.jsf?idEstablecimiento=27434105', '_blank');
                break;
        }
    }

    render() {
        const isValid = this.isFormValid();

        this.container.innerHTML = `
            <div class="space-y-4">
                <label class="flex items-center gap-2 text-sm font-bold text-white mb-2 text-shadow-dark">
                    <i class="lucide lucide-credit-card w-5 h-5 text-white"></i>
                    Método de pago
                </label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    ${this.paymentMethods.map(method => `
                        <button
                            type="button"
                            data-method="${method.id}"
                            class="flex items-center justify-center px-4 py-2 rounded-lg border transition-colors h-12
                                ${!isValid 
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300' 
                                    : this.selectedMethod === method.id 
                                        ? 'bg-gradient-to-r from-[#f40028] to-[#900b1f] text-white border-[#f40028]' 
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#f40028]'}"
                            ${!isValid ? 'disabled' : ''}
                        >
                            ${method.label}
                        </button>
                    `).join('')}
                </div>

                ${!isValid ? `
                    <p class="text-red-500 text-sm font-bold text-shadow-dark">
                        Por favor, complete todos los campos requeridos antes de seleccionar un método de pago
                    </p>
                ` : ''}
            </div>
        `;
    }

    addEventListeners() {
        this.container.addEventListener('click', (e) => {
            const button = e.target.closest('button[data-method]');
            if (button) {
                this.handleMethodChange(button.dataset.method);
            }
        });
    }
}