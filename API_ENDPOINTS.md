# ?? Endpoints - Autenticación Telegram y Key

## ?? Endpoints Disponibles

### 1. Registrar Usuario con Telegram
**Endpoint:** `POST http://localhost:3000/register`

**Datos a enviar:**
```json
{
  "telegram_user": "nombre_usuario_telegram",
  "telegram_token": "token_del_bot_telegram",
  "telegram_nombre": "Nombre Mostrable"
}
```

**Respuesta exitosa:**
```json
{
  "status": true,
  "message": "Usuario registrado exitosamente con Telegram",
  "userId": "507f1f77bcf86cd799439011",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "nombre_usuario_telegram",
    "telegram_nombre": "Nombre Mostrable",
    "rango": "usuario"
  }
}
```

---

### 2. Login con Telegram
**Endpoint:** `POST http://localhost:3000/login/telegram`

**Datos a enviar:**
```json
{
  "telegram_user": "nombre_usuario_telegram",
  "telegram_token": "token_del_bot_telegram",
  "telegram_nombre": "Nombre Mostrable"
}
```

?? **Importante:** Los 3 valores deben coincidir exactamente con los registrados

**Respuesta exitosa:**
```json
{
  "status": true,
  "message": "Login exitoso con Telegram",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "nombre_usuario_telegram",
    "telegram_nombre": "Nombre Mostrable",
    "rango": "usuario",
    "creditos": "0"
  }
}
```

---

### 3. Login con Key
**Endpoint:** `POST http://localhost:3000/login/key`

**Datos a enviar:**
```json
{
  "key": "ABCDEF-KEY-123456"
}
```

**Respuesta exitosa:**
```json
{
  "status": true,
  "message": "Login exitoso con Key",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "key_ABCDEFKEY123456",
    "rango": "premium",
    "creditos": "0",
    "key": "ABCDEF-KEY-123456"
  }
}
```

---

### 4. Obtener Datos del Usuario (Protegido)
**Endpoint:** `GET http://localhost:3000/user`

**Headers requeridos:**
```
Authorization: Bearer [JWT_TOKEN]
Content-Type: application/json
```

**Respuesta exitosa:**
```json
{
  "status": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "nombre_usuario_telegram",
    "rango": "usuario",
    "creditos": "0",
    "telegram_id": "Nombre Mostrable",
    "bot_token": "token_del_bot",
    "key": null,
    "authType": "telegram"
  }
}
```

---

### 5. Logout (Protegido)
**Endpoint:** `POST http://localhost:3000/logout`

**Headers requeridos:**
```
Authorization: Bearer [JWT_TOKEN]
Content-Type: application/json
```

**Respuesta exitosa:**
```json
{
  "status": true,
  "message": "Logout exitoso"
}
```

---

### 6. Crear Key (Admin)
**Endpoint:** `POST http://localhost:3000/createkey`

**Sin datos requeridos**

**Respuesta exitosa:**
```json
{
  "status": true,
  "message": "Key generada exitosamente",
  "key": "XYZABC-KEY-987654"
}
```

---

## ?? Configuración en Frontend

### Paso 1: Actualizar authService.js

Tu `authService.js` debe tener funciones para los 2 tipos de login:

```javascript
const API_URL = "http://localhost:3000";

// Guardar y obtener token
const getToken = () => localStorage.getItem("authToken");
const setToken = (token) => localStorage.setItem("authToken", token);
const removeToken = () => localStorage.removeItem("authToken");

// 1. LOGIN CON TELEGRAM
export const loginWithTelegram = async (telegram_user, telegram_token, telegram_nombre) => {
  try {
    const response = await fetch(`${API_URL}/login/telegram`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ telegram_user, telegram_token, telegram_nombre }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    setToken(data.token);
    return { success: true, user: data.user, token: data.token };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// 2. LOGIN CON KEY
export const loginWithKey = async (key) => {
  try {
    const response = await fetch(`${API_URL}/login/key`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    setToken(data.token);
    return { success: true, user: data.user, token: data.token };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// 3. REGISTRAR CON TELEGRAM
export const registerWithTelegram = async (telegram_user, telegram_token, telegram_nombre) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ telegram_user, telegram_token, telegram_nombre }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    return { success: true, message: data.message, userId: data.userId };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// 4. OBTENER DATOS DEL USUARIO
export const fetchUserData = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error("No hay sesión activa");

    const response = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// 5. LOGOUT
export const logoutUser = async () => {
  try {
    const token = getToken();
    if (!token) {
      removeToken();
      return { success: true };
    }

    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    removeToken();
    return { success: true };
  } catch (error) {
    removeToken();
    return { success: true };
  }
};

// 6. VERIFICAR SESIÓN
export const isAuthenticated = () => !!getToken();
```

### Paso 2: Usar en Componentes

**Ejemplo - Telegram Login:**
```jsx
import { loginWithTelegram } from "@/services/authService";

const handleTelegramLogin = async () => {
  const result = await loginWithTelegram(
    "mi_usuario_telegram",
    "token_bot_telegram",
    "Mi Nombre"
  );

  if (result.success) {
    console.log("? Login exitoso:", result.user);
  } else {
    console.log("? Error:", result.error);
  }
};
```

**Ejemplo - Key Login:**
```jsx
import { loginWithKey } from "@/services/authService";

const handleKeyLogin = async () => {
  const result = await loginWithKey("ABCDEF-KEY-123456");

  if (result.success) {
    console.log("? Login exitoso:", result.user);
  } else {
    console.log("? Error:", result.error);
  }
};
```

---

## ?? Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Credenciales de Telegram inválidas` | user, token o nombre no coinciden | Verifica que todos coincidan exactamente |
| `Key inválida o ya utilizada` | Key no existe o ya fue usada | Genera una nueva key con /createkey |
| `Token inválido o expirado` | Token JWT vencido | El usuario debe hacer login de nuevo |
| `No token provided` | No envías Authorization header | Verifica: `Authorization: Bearer [token]` |

---

## ?? Variables de Entorno

En `src/database/api/.env`:
```
Mongo_Url=mongodb://localhost:27017/thirdb
SECRET_KEY=tu_clave_super_secreta_2024
PORT=3000
```

---

¡Listo! Ahora tu backend solo autentica con Telegram y Keys. ??
