// ================================================================
// ARCHIVO: src/services/authService.js
// ================================================================
// Este archivo maneja toda la comunicación con el backend de autenticación

const API_URL = "http://localhost:3000";

// Guardar y obtener token del localStorage
const getToken = () => localStorage.getItem("authToken");
const setToken = (token) => localStorage.setItem("authToken", token);
const removeToken = () => localStorage.removeItem("authToken");

// 1. REGISTRAR USUARIO
export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error en registro");
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error registrando:", error);
    return { success: false, error: error.message };
  }
};

// 2. LOGIN (OBTENER TOKEN)
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error en login");
    }

    // Guardar token
    setToken(data.token);

    return { 
      success: true, 
      user: data.user,
      token: data.token 
    };
  } catch (error) {
    console.error("Error en login:", error);
    return { success: false, error: error.message };
  }
};

// 3. OBTENER DATOS DEL USUARIO
export const fetchUserData = async () => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error("No hay sesión activa");
    }

    const response = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error al obtener datos");
    }

    return { success: true, user: data.user };
  } catch (error) {
    console.error("Error obteniendo datos:", error);
    return { success: false, error: error.message };
  }
};

// 4. LOGOUT
export const logoutUser = async () => {
  try {
    const token = getToken();
    
    if (!token) {
      removeToken();
      return { success: true, message: "Sesión cerrada" };
    }

    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    // Eliminar token del localStorage de todas formas
    removeToken();

    if (!response.ok) {
      throw new Error(data.error || "Error en logout");
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error en logout:", error);
    removeToken(); // Limpiar de todas formas
    return { success: true, message: "Sesión cerrada" };
  }
};

// 5. VERIFICAR SI HAY SESIÓN ACTIVA
export const isAuthenticated = () => {
  return !!getToken();
};

// 6. OBTENER TOKEN ACTUAL
export const getCurrentToken = () => {
  return getToken();
};
