    class DonationProgress {
    constructor(options = {}) {
        this.currentAmount = options.currentAmount || 15;
        this.goalAmount = options.goalAmount || 1000;
        this.currency = options.currency || 'ARS';
        this.containerId = options.containerId || 'donationProgressContainer';
        this.init();
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: this.currency
        }).format(amount);
    }

    calculateProgress() {
        return Math.min((this.currentAmount / this.goalAmount) * 100, 100);
    }

    render() {
        const progressPercentage = this.calculateProgress();
        const container = document.getElementById(this.containerId);
        
        if (!container) return;

        container.innerHTML = `
            <div class="w-full bg-black/30 rounded-lg shadow p-6">
                <div class="text-center">
                    <div class="mb-6 flex justify-center"></div>

                    <h2 class="text-2xl font-bold mb-4 text-white text-shadow-dark">Meta de Donaciones</h2>
                    <p class="text-4xl font-bold mb-2 text-600" style="color:rgb(255, 204, 0);">
                        ${this.formatCurrency(this.currentAmount)}
                    </p>
                    <p class="text-white text-shadow-dark mb-4">
                        recaudado de <span class="font-semibold text-600" style="color:rgb(255, 204, 0);">${this.formatCurrency(this.goalAmount)}</span>
                    </p>

                    <div class="relative flex items-center gap-4">
                        <div class="flex-grow h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                class="h-full rounded-full transition-all duration-500 ease-out"
                                style="width: ${progressPercentage}%; background: linear-gradient(90deg, rgba(244,0,40,1) 0%, rgba(144,11,31,1) 100%);"
                            ></div>
                        </div>
                        <div class="animate-gift">
                            <img 
                                src="assets/regalo.png" 
                                alt="Regalo de Navidad" 
                                class="w-24 h-24 object-contain"
                            />
                        </div>
                    </div>
                    <p class="text-sm text-white text-shadow-dark mt-2">
                        ${progressPercentage.toFixed(1)}% completado
                    </p>
                </div>
            </div>
        `;

        // Agregar estilos
        if (!document.getElementById('donation-progress-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'donation-progress-styles';
            styleSheet.textContent = `
                .text-shadow-dark {
                    text-shadow: 
                        1px 1px 0 #000,
                        -1px -1px 0 #000,
                        1px -1px 0 #000,
                        -1px 1px 0 #000,
                        0 1px 0 #000,
                        1px 0 0 #000,
                        0 -1px 0 #000,
                        -1px 0 0 #000;
                }

                @keyframes christmas-lights {
                    0% { color: red; }
                    25% { color: green; }
                    50% { color: gold; }
                    75% { color: blue; }
                    100% { color: red; }
                }

                @keyframes twinkle {
                    0% { opacity: 0.8; }
                    100% { opacity: 1; }
                }

                @keyframes rotate-stripes {
                    0% { background-position: 0 0; }
                    100% { background-position: 56.57px 0; }
                }

                @keyframes gift-bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }

                .animate-gift {
                    animation: gift-bounce 1.5s ease-in-out infinite;
                }

                .font-semibold {
                    font-weight: 600;
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }

    update(options = {}) {
        if (options.currentAmount !== undefined) this.currentAmount = options.currentAmount;
        if (options.goalAmount !== undefined) this.goalAmount = options.goalAmount;
        if (options.currency !== undefined) this.currency = options.currency;
        this.render();
    }

    init() {
        this.render();
    }
}