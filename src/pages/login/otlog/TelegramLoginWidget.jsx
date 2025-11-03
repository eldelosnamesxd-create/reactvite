import React, { useEffect, useState } from 'react';
import './TelegramLoginWidget.css';

const TelegramLoginWidget = ({ 
  botName, 
  onAuthCallback, 
  buttonSize = 'large', 
  cornerRadius = 0,
  showAvatar = true,
  lang = 'en'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Cargar el script de Telegram Widget
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    
    script.onload = () => {
      setIsLoaded(true);
      initializeWidget();
    };

    document.body.appendChild(script);

    return () => {
      // Limpiar el script cuando el componente se desmonte
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      initializeWidget();
    }
  }, [isLoaded, botName, buttonSize, cornerRadius, showAvatar, lang]);

  const initializeWidget = () => {
    // Limpiar cualquier widget anterior
    const container = document.getElementById('telegram-login-container');
    if (container) {
      container.innerHTML = '';
    }

    // Crear el elemento script para el widget
    const widgetScript = document.createElement('script');
    widgetScript.async = true;
    widgetScript.setAttribute('data-telegram-login', botName);
    widgetScript.setAttribute('data-size', buttonSize);
    widgetScript.setAttribute('data-radius', cornerRadius.toString());
    widgetScript.setAttribute('data-request-access', 'write');
    widgetScript.setAttribute('data-userpic', showAvatar.toString());
    widgetScript.setAttribute('data-lang', lang);
    
    // Configurar la callback de autenticación
    if (onAuthCallback) {
      const callbackName = `onTelegramAuth${Date.now()}`;
      window[callbackName] = (user) => {
        onAuthCallback(user);
        // Limpiar la función global después de usarla
        delete window[callbackName];
      };
      widgetScript.setAttribute('data-onauth', callbackName + '(user)');
    }

    if (container) {
      container.appendChild(widgetScript);
    }
  };

  return (
    <div className="telegram-login-widget">
      <div 
        id="telegram-login-container" 
        className="telegram-login-container"
      />
    </div>
  );
};

export default TelegramLoginWidget;