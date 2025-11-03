import React, { useState } from 'react';
import './TelegramLogin.css';

const TelegramLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1); // 1: phone, 2: code, 3: success
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    setIsLoading(true);
    // Simular envío de código
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    if (!verificationCode.trim()) return;

    setIsLoading(true);
    // Simular verificación
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 1500);
  };

  const handleLogout = () => {
    setStep(1);
    setPhoneNumber('');
    setVerificationCode('');
  };

  if (step === 3) {
    return (
      <div className="telegram-login-container">
        <div className="telegram-login-card">
          <div className="telegram-success">
            <div className="success-icon">✓</div>
            <h2>¡Inicio de sesión exitoso!</h2>
            <p>Bienvenido a Telegram</p>
            <button 
              className="telegram-button secondary"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="telegram-login-container">
      <div className="telegram-login-card">
        <div className="telegram-header">
          <h1>Telegram</h1>
          <p>Inicia sesión en tu cuenta</p>
        </div>

        {step === 1 && (
          <form onSubmit={handlePhoneSubmit} className="telegram-form">
            <div className="input-group">
              <label htmlFor="phone">Número de teléfono</label>
              <input
                id="phone"
                type="tel"
                placeholder="+1 234 567 8900"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="telegram-input"
                disabled={isLoading}
              />
            </div>
            
            <button 
              type="submit" 
              className="telegram-button primary"
              disabled={!phoneNumber.trim() || isLoading}
            >
              {isLoading ? 'Enviando código...' : 'Siguiente'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleCodeSubmit} className="telegram-form">
            <div className="input-group">
              <label htmlFor="code">Código de verificación</label>
              <input
                id="code"
                type="text"
                placeholder="12345"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="telegram-input"
                disabled={isLoading}
                maxLength={6}
              />
              <p className="helper-text">
                Te hemos enviado un código por SMS al {phoneNumber}
              </p>
            </div>
            
            <button 
              type="submit" 
              className="telegram-button primary"
              disabled={!verificationCode.trim() || isLoading}
            >
              {isLoading ? 'Verificando...' : 'Iniciar sesión'}
            </button>

            <button 
              type="button" 
              className="telegram-button text"
              onClick={() => setStep(1)}
            >
              Cambiar número
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TelegramLogin;