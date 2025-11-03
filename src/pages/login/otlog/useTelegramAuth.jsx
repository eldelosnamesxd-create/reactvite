import { useState, useCallback } from 'react';

export const useTelegramAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTelegramAuth = useCallback(async (telegramUser) => {
    setLoading(true);
    setError(null);

    try {
      // Validar los datos del usuario
      if (!telegramUser?.id || !telegramUser?.auth_date || !telegramUser?.hash) {
        throw new Error('Datos de usuario de Telegram inválidos');
      }

      // Aquí puedes enviar los datos a tu backend para verificación
      const response = await fetch('/api/auth/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(telegramUser),
      });

      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }

      const userData = await response.json();
      setUser(userData);
      
      // Guardar en localStorage si es necesario
      localStorage.setItem('telegram_user', JSON.stringify(userData));
      
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('telegram_user');
  }, []);

  return {
    user,
    loading,
    error,
    handleTelegramAuth,
    logout,
    isAuthenticated: !!user,
  };
};