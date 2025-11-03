import React from 'react';
import TelegramLoginWidget from './TelegramLoginWidget';
import { useTelegramAuth } from './useTelegramAuth';

const Loginnew = () => {
  const { user, loading, error, handleTelegramAuth, logout, isAuthenticated } = useTelegramAuth();

  const handleAuth = async (telegramUser) => {
    try {
      await handleTelegramAuth(telegramUser);
      console.log('Usuario autenticado:', telegramUser);
    } catch (err) {
      console.error('Error en autenticación:', err);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">Verificando autenticación...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>Iniciar Sesión con Telegram</h1>
      
      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}

      {isAuthenticated ? (
        <div className="user-profile">
          <h2>¡Bienvenido!</h2>
          {user.photo_url && (
            <img 
              src={user.photo_url} 
              alt="Avatar" 
              className="user-avatar"
            />
          )}
          <p><strong>Nombre:</strong> {user.first_name} {user.last_name || ''}</p>
          <p><strong>Username:</strong> @{user.username}</p>
          <p><strong>ID:</strong> {user.id}</p>
          <button onClick={logout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div className="login-section">
          <p>Inicia sesión con tu cuenta de Telegram</p>
          
          <TelegramLoginWidget
            botName="Zijduexvyvd_bot" // Reemplaza con el username de tu bot
            onAuthCallback={handleAuth}
            buttonSize="large" // 'large', 'medium', o 'small'
            cornerRadius={8}
            showAvatar={true}
            lang="es"
          />

          <div className="info">
            <p>🔐 Tus datos están protegidos por Telegram</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loginnew;