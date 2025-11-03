import React, { useEffect, useRef } from 'react';

const TelegramLoginButton = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!document.getElementById('telegram-login-script')) {
      const script = document.createElement('script');
      script.id = 'telegram-login-script';
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.async = true;
      script.setAttribute('data-telegram-login', 'Aaaasessionbot_bot');
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-auth-url', 'https://apis-cyan-six.vercel.app/login/telegram');
      if (ref.current) {
        ref.current.appendChild(script);
      }
    }
  }, []);

  return <div ref={ref}></div>;
};

export default TelegramLoginButton;