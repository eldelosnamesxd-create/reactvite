# ?? Guía de Autenticación - WebChk React

## ?? Resumen Rápido

Tu backend ahora tiene autenticación JWT completa con:
- ? Registro de usuarios con encriptación de contraseña
- ? Login con generación de token JWT
- ? Obtención de datos del usuario autenticado
- ? Logout con limpieza de sesión
- ? Middleware de verificación de token

---

## ?? Endpoints del Backend

### 1. Registrar Usuario
**Endpoint:** `POST http://localhost:3000/register`

**Datos a enviar:**
```json
{
  "username": "mi_usuario",
  "password": "mi_contraseña"
}
```

**Respuesta exitosa:**
```json
{
  "status": true,
  "message": "Usuario registrado exitosamente",
  "userId": "507f1f77bcf86cd799439011"
}
```

---

### 2. Login (Obtener Token)
**Endpoint:** `POST http://localhost:3000/login`

**Datos a enviar:**
```json
{
  "username": "mi_usuario",
  "password": "mi_contraseña"
}
```

**Respuesta exitosa:**
```json
{
  "status": true,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "mi_usuario",
    "rango": "usuario",
    "creditos": "0"
  }
}
```

**?? IMPORTANTE:** Guarda este token en `localStorage` con la clave `authToken`

---

### 3. Obtener Datos del Usuario
**Endpoint:** `GET http://localhost:3000/user`

**Headers requeridos:**
```
Authorization: Bearer [TU_TOKEN_JWT]
Content-Type: application/json
```

**Ejemplo en JavaScript:**
```javascript
const token = localStorage.getItem("authToken");
const response = await fetch("http://localhost:3000/user", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  }
});
```

**Respuesta exitosa:**
```json
{
  "status": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "mi_usuario",
    "rango": "usuario",
    "creditos": "100",
    "bot_token": null,
    "telegram_id": null,
    "plantilla": null,
    "photo": null
  }
}
```

---

### 4. Logout
**Endpoint:** `POST http://localhost:3000/logout`

**Headers requeridos:**
```
Authorization: Bearer [TU_TOKEN_JWT]
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

## ?? Configuración en Frontend

### Paso 1: Usa el servicio de autenticación

Ya hemos creado un servicio en `src/services/authService.js` con todas las funciones:

```javascript
import { loginUser, registerUser, fetchUserData, logoutUser, isAuthenticated } from "@/services/authService";
```

### Paso 2: Usa los componentes en tu app

En tu `App.jsx` o donde quieras:

```jsx
import { useState } from "react";
import { LoginForm } from "./components/auth/LoginForm";
import { RegisterForm } from "./components/auth/RegisterForm";
import { UserProfile } from "./components/auth/UserProfile";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLoginSuccess = (user) => {
    console.log("Usuario autenticado:", user);
    setAuthenticated(true);
  };

  const handleLogout = () => {
    console.log("Sesión cerrada");
    setAuthenticated(false);
  };

  return (
    <div>
      {!authenticated ? (
        <div>
          <h1>Bienvenido</h1>
          <LoginForm onLoginSuccess={handleLoginSuccess} />
          <hr />
          <RegisterForm onRegisterSuccess={() => {
            console.log("Cuenta creada, ahora inicia sesión");
          }} />
        </div>
      ) : (
        <UserProfile onLogout={handleLogout} />
      )}
    </div>
  );
}
```

---

## ?? Cómo Usar en Otros Componentes

### Ejemplo 1: Obtener datos del usuario en cualquier componente

```jsx
import { useEffect, useState } from "react";
import { fetchUserData, isAuthenticated } from "@/services/authService";

export function MiComponente() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      fetchUserData().then(result => {
        if (result.success) {
          setUser(result.user);
        }
      });
    }
  }, []);

  if (!user) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Hola, {user.username}!</h2>
      <p>Créditos: {user.creditos}</p>
    </div>
  );
}
```

### Ejemplo 2: Hacer peticiones autenticadas a otros endpoints

```jsx
import { getCurrentToken } from "@/services/authService";

async function traerMisDatos() {
  const token = getCurrentToken();
  
  const response = await fetch("http://localhost:3000/mis-datos", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  return data;
}
```

---

## ?? Variables de Entorno

En el backend (`src/database/api/.env`), ya tienes:

```env
Mongo_Url=mongodb://localhost:27017/thirdb
SECRET_KEY=tu_clave_super_secreta_2024
PORT=3000
```

Para cambiar la clave secreta, edita el archivo `.env`.

---

## ?? Comandos para Ejecutar

### Backend
```bash
cd src/database/api
npm run dev    # Inicia con nodemon (desarrollo)
npm start      # Inicia sin nodemon (producción)
```

### Frontend
```bash
npm run dev    # Vite en modo desarrollo
npm run build  # Build para producción
```

---

## ??? Seguridad - Checklist

? Las contraseñas se encriptan con bcryptjs  
? Los tokens tienen expiración (7 días)  
? El endpoint `/user` requiere token válido  
? Los tokens se guardan en localStorage  
? Al hacer logout, el token se elimina  

---

## ?? Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Token inválido o expirado` | Token mal formato o expirado | Login de nuevo |
| `No token provided` | No envías el header Authorization | Verifica que envías `Authorization: Bearer [token]` |
| `El usuario ya existe` | Username duplicado | Usa otro username |
| `Usuario no encontrado` | Username incorrecto en login | Verifica que el usuario existe |
| `CORS error` | Frontend intenta acceder desde otro puerto | Agrega CORS al backend |

---

## ?? Modificar Token Expiry

En `src/database/api/index.js`, línea 10:

```javascript
const TOKEN_EXPIRY = "7d"; // Cambia esto

// Opciones comunes:
// "1h"   - 1 hora
// "1d"   - 1 día
// "7d"   - 7 días
// "30d"  - 30 días
```

---

## ?? Agregar CORS (si necesitas)

Si el frontend está en diferente puerto, agrega CORS al backend:

```javascript
import cors from "cors";

app.use(cors({
  origin: "http://localhost:5173", // Tu frontend
  credentials: true
}));
```

Instala: `npm install cors`

---

## ? Siguiente: Rutas Protegidas

Para proteger ciertas rutas en React Router, puedes hacer:

```jsx
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/services/authService";

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}

// Uso en App.jsx
<Route path="/perfil" element={
  <ProtectedRoute>
    <UserProfile />
  </ProtectedRoute>
} />
```

---

¡Listo! Ahora tienes autenticación JWT completa en tu proyecto. ??
