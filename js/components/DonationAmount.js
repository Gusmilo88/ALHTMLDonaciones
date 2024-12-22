// js/components/DonationAmount.js
class DonationAmount {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.state = {
            amount: '',
            name: '',
            email: ''
        };
        this.onChangeCallbacks = [];
        this.render();
        this.setupIcons();
        this.addEventListeners();
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notifyChange();
    }

    addChangeListener(callback) {
        this.onChangeCallbacks.push(callback);
    }

    notifyChange() {
        this.onChangeCallbacks.forEach(callback => callback(this.state));
    }

    formatAmount(value) {
        if (!value) return '';
        return `$${Number(value).toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        })}`;
    }

    handleAmountChange(value) {
        const cleanValue = value.replace(/[^\d.]/g, '');
        const parts = cleanValue.split('.');
        if (parts.length > 2) return;
        if (parts[1]?.length > 2) return;
        
        this.setState({ amount: cleanValue });
    }

    setupIcons() {
        // Inicializar iconos de Lucide
        const icons = document.querySelectorAll('.lucide');
        icons.forEach(icon => {
            if (icon.classList.contains('lucide-user')) {
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
            } else if (icon.classList.contains('lucide-mail')) {
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;
            } else if (icon.classList.contains('lucide-dollar-sign')) {
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;
            }
        });
    }

    render() {
        const inputClasses = "w-full px-3 py-2 text-black border rounded-lg focus:outline-none border-input-lights";
        const labelClasses = "flex items-center gap-2 text-sm font-bold text-white mb-2 text-shadow-dark";

        this.container.innerHTML = `
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="${labelClasses}">
                            <i class="lucide lucide-user w-5 h-5 text-white"></i>
                            Ingresa tu nombre *
                        </label>
                        <input
                            type="text"
                            placeholder="Nombre"
                            class="${inputClasses}"
                            value="${this.state.name}"
                            id="nameInput"
                            required
                        />
                    </div>

                    <div>
                        <label class="${labelClasses}">
                            <i class="lucide lucide-mail w-5 h-5 text-white"></i>
                            Ingresa tu email *
                        </label>
                        <input
                            type="email"
                            placeholder="ejemplo@correo.com"
                            class="${inputClasses}"
                            value="${this.state.email}"
                            id="emailInput"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label class="${labelClasses}">
                        <i class="lucide lucide-dollar-sign w-5 h-5 text-white"></i>
                        Monto personalizado *
                    </label>
                    <input
                        type="text"
                        value="${this.formatAmount(this.state.amount)}"
                        placeholder="Ingresa el monto"
                        class="${inputClasses}"
                        id="amountInput"
                        required
                    />
                </div>
            </div>
        `;
    }

    addEventListeners() {
        const nameInput = this.container.querySelector('#nameInput');
        const emailInput = this.container.querySelector('#emailInput');
        const amountInput = this.container.querySelector('#amountInput');

        nameInput.addEventListener('input', (e) => {
            this.setState({ name: e.target.value });
        });

        emailInput.addEventListener('input', (e) => {
            this.setState({ email: e.target.value });
        });

        amountInput.addEventListener('input', (e) => {
            this.handleAmountChange(e.target.value.replace(/[$,]/g, ''));
        });
    }
}