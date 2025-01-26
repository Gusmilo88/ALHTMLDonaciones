import { Captcha } from './components/Captcha.js';

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbyQwk1Wor0mS2ck2U-dYZz8GpQBkuN0QbouRpTMCFYv7SbvUzDt43fw5Od6xzqPoNHxRg/exec';

document.addEventListener('DOMContentLoaded', function() {
   const nameInput = document.getElementById('nameInput');
   const emailInput = document.getElementById('emailInput');
   const amountInput = document.getElementById('amountInput');
   const paymentMethods = document.querySelectorAll('.payment-method');
   const errorMessage = document.getElementById('errorMessage');
   const loadingOverlay = document.getElementById('loadingOverlay');
   const captcha = new Captcha('captchaSection');
   let isCaptchaVerified = false;

   function validateInputs() {
       const name = nameInput.value.trim();
       nameInput.value = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
       
       const isNameValid = name !== '';
       const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
       const isAmountValid = amountInput.value > 0;

       if (isNameValid && isEmailValid && isAmountValid && isCaptchaVerified) {
           paymentMethods.forEach(method => {
               method.classList.add('active');
           });
           errorMessage.style.display = 'none';
           return true;
       } else {
           paymentMethods.forEach(method => {
               method.classList.remove('active');
           });
           errorMessage.style.display = 'block';
           if (!isCaptchaVerified) {
               errorMessage.textContent = "Por favor verifique el captcha antes de continuar";
           } else {
               errorMessage.textContent = "Por favor, complete todos los campos requeridos antes de seleccionar un método de pago";
           }
           return false;
       }
   }

   document.addEventListener('captchaVerified', function() {
       isCaptchaVerified = true;
       validateInputs();
   });

   [nameInput, emailInput, amountInput].forEach(input => {
       input.addEventListener('input', validateInputs);
   });

   paymentMethods.forEach(method => {
       method.addEventListener('click', async function(e) {
           e.preventDefault();
           if (!this.classList.contains('active')) return;

           try {
               loadingOverlay.classList.remove('hidden');
               
               const emailData = {
                   to_name: nameInput.value,
                   to_email: emailInput.value,
                   amount: `$${parseFloat(amountInput.value).toFixed(2)}`,
                   reply_to: "contacto@animallibre.org"
               };

               await Promise.all([
                   fetch(SHEET_URL, {
                       method: 'POST',
                       body: JSON.stringify({
                           name: nameInput.value,
                           email: emailInput.value,
                           amount: amountInput.value,
                           paymentMethod: this.getAttribute('data-payment-type')
                       })
                   }),
                   emailjs.send("service_s7uykeg", "template_40nhglj", emailData),
                   emailjs.send("service_s7uykeg", "template_q68ttph", {
                       ...emailData,
                       to_email: "contacto@animallibre.org"
                   })
               ]);

               const paymentType = this.getAttribute('data-payment-type');
               if (paymentType === 'webpay') {
                   window.open('https://www.darcontarjeta.cl/portalpagodirecto/pages/institucion.jsf?idEstablecimiento=27434105', '_blank');
               } else if (paymentType === 'bank-transfer') {
                   window.location.href = 'pages/bankTransfer.html?amount=' + amountInput.value;
               } else {
                   window.location.href = 'pages/' + paymentType + '.html?amount=' + amountInput.value;
               }
           } catch (error) {
               console.error("Error detallado:", error);
               alert('Hubo un error al procesar tu donación');
           } finally {
               loadingOverlay.classList.add('hidden');
           }
       });
   });
});