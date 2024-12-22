// js/app.js
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    const donationAmount = new DonationAmount('donationAmountSection');
    const paymentMethod = new PaymentMethod('paymentMethodSection');
    const bankInfo = new BankTransferInfo('bankTransferInfoSection');
    const securityInfo = new SecurityInfo('securityInfoSection');

    // Conectar los componentes
    donationAmount.addChangeListener((formData) => {
        paymentMethod.updateFormData(formData);
    });
});