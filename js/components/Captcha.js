// export class Captcha {
//     constructor(containerId) {
//         this.container = document.getElementById(containerId);
//         this.setup();
//         this.generateCaptcha();
//     }
 
//     setup() {
//         this.container.innerHTML = `
//             <div class="captcha-container">
//                 <div class="captcha-wrapper">
//                     <canvas id="captcha-canvas" width="200" height="70"></canvas>
//                     <input type="text" class="captcha-input" placeholder="Ingresa el código">
//                     <button type="button" class="verify-button">Verificar</button>
//                 </div>
//                 <div class="error-message">Código CAPTCHA incorrecto</div>
//             </div>
//         `;
 
//         this.canvas = this.container.querySelector('#captcha-canvas');
//         this.input = this.container.querySelector('.captcha-input');
//         this.errorMessage = this.container.querySelector('.error-message');
//         this.verifyButton = this.container.querySelector('.verify-button');
 
//         this.verifyButton.addEventListener('click', () => {
//             const isValid = this.validate();
//             if (isValid) {
//                 this.verifyButton.textContent = '✓ Verificado';
//                 this.verifyButton.style.backgroundColor = '#28a745';
//                 this.input.style.borderColor = '#28a745';
//                 const event = new Event('captchaVerified');
//                 document.dispatchEvent(event);
//             } else {
//                 this.verifyButton.textContent = 'Verificar';
//                 this.verifyButton.style.background = 'linear-gradient(135deg, #900b1f 0%, #5d0914 100%)';
//                 this.input.style.borderColor = '#dc3545';
//                 this.generateCaptcha();
//             }
//         });
        
//         const style = document.createElement('style');
//         style.textContent = `
//             .captcha-container {
//                 margin: 20px 0;
//                 text-align: center;
//             }
//             .captcha-wrapper {
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 gap: 1rem;
//             }
//             #captcha-canvas {
//                 background: #f0f0f0;
//                 border: 1px solid #ccc;
//                 border-radius: 5px;
//             }
//             .captcha-input {
//                 padding: 5px 10px;
//                 width: 150px;
//                 border: 1px solid #ccc;
//                 border-radius: 5px;
//                 background: white;
//                 height: 40px;
//                 font-size: 16px;
//                 transition: border-color 0.3s;
//             }
//             .verify-button {
//                 padding: 8px 16px;
//                 border-radius: 5px;
//                 border: none;
//                 color: white;
//                 cursor: pointer;
//                 background: linear-gradient(135deg, #900b1f 0%, #5d0914 100%);
//                 height: 40px;
//                 transition: all 0.3s;
//                 font-weight: 500;
//                 min-width: 100px;
//             }
//             .verify-button:hover {
//                 transform: scale(1.05);
//             }
//             .error-message {
//                 color: red;
//                 display: none;
//                 margin-top: 5px;
//             }
//             @media (max-width: 768px) {
//                 .captcha-wrapper {
//                     flex-direction: column;
//                     gap: 1rem;
//                 }
//                 .captcha-input {
//                     width: 200px;
//                 }
//                 .verify-button {
//                     width: 200px;
//                 }
//             }
//         `;
//         document.head.appendChild(style);
//     }
 
//     generateCaptcha() {
//         const ctx = this.canvas.getContext('2d');
//         ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
//         const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
//         this.captchaText = '';
//         for (let i = 0; i < 6; i++) {
//             this.captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
//         }
        
//         for (let i = 0; i < 100; i++) {
//             ctx.beginPath();
//             ctx.arc(
//                 Math.random() * this.canvas.width,
//                 Math.random() * this.canvas.height,
//                 1,
//                 0,
//                 2 * Math.PI
//             );
//             ctx.fillStyle = '#ccc';
//             ctx.fill();
//         }
        
//         ctx.font = 'bold 35px Arial';
//         ctx.fillStyle = '#333';
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'middle';
        
//         for (let i = 0; i < this.captchaText.length; i++) {
//             const x = (this.canvas.width / 6) * (i + 0.5);
//             const y = this.canvas.height / 2 + Math.random() * 10 - 5;
//             const rotation = (Math.random() - 0.5) * 0.4;
            
//             ctx.save();
//             ctx.translate(x, y);
//             ctx.rotate(rotation);
//             ctx.fillText(this.captchaText[i], 0, 0);
//             ctx.restore();
//         }
        
//         this.input.value = '';
//         this.errorMessage.style.display = 'none';
//         this.verifyButton.textContent = 'Verificar';
//         this.verifyButton.style.background = 'linear-gradient(135deg, #900b1f 0%, #5d0914 100%)';
//         this.input.style.borderColor = '#ccc';
//     }
 
//     validate() {
//         const isValid = this.input.value === this.captchaText;
//         this.errorMessage.style.display = isValid ? 'none' : 'block';
//         return isValid;
//     }
//  }