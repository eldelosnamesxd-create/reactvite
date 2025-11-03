import React, { useEffect, useRef } from 'react';
export default function TelegramLoginButton(){
  const ref = useRef(null);

  useEffect(() => {
    // Limpiar cualquier script previo
    if (ref.current) {
      ref.current.innerHTML = '';
    }

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;

    // Configuración esencial
    script.setAttribute('data-telegram-login', 'Zijduexvyvd_bot'); // Sin @
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-auth-url', 'https://apis-cyan-six.vercel.app/api/auth/telegram');
    script.setAttribute('data-request-access', 'write');

    // Configuraciones adicionales recomendadas
    script.setAttribute('data-radius', '8');
    script.setAttribute('data-userpic', 'true');

    if (ref.current) {
      ref.current.appendChild(script);
    }

    // Manejar el evento de mensaje de Telegram
    const handleMessage = (event) => {
      if (event.origin === 'https://oauth.telegram.org') {
        console.log('Message from Telegram:', event.data);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return <div ref={ref} style={{ minHeight: '50px' }}></div>;
};