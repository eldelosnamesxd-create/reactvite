import "./login.css";
import { useState } from "react";
import apiClient from "../../services/apiClient";
import TelegramLogin from './telegramlog';
export default function Login() {
    const [accessKey, setAccessKey] = useState("");
    const login = async () => {
        let params = new URLSearchParams();
        params.append("key", accessKey);
        try {
            const response = await apiClient.post("/login/key", params.toString());
            if (response.data.status === false) {
                document.getElementById("alert").style.display = "block";
                document.getElementById("alertext").innerHTML = response.data.message;
                setTimeout(() => {
                    document.getElementById("alert").style.display = "none";
                }, 3000);
            } else if (response.data.status === true) {
                sessionStorage.setItem("token", response.data.token);
                window.location.href = "/";
            }
        } catch (error) {
            console.error(error);
        }
    };


    return <>
        <div className="login-container">
            <div className="logo" style={{ marginBottom: "40px" }}>
                <h1>Bienvenido</h1>
                <p>Inicia sesión con Telegram</p>
            </div>

            <TelegramLogin />

            <div className="form-footer">
                Tu número de teléfono permanece oculto.
            </div>

            <div className="divider">
                <span>O inicia sesión con tu key</span>
            </div>

            <div className="key-section">
                <input type="text" id="access-key" name="access-key" onChange={(e) => setAccessKey(e.target.value)} placeholder="Ingresa tu key" />
                <button type="button" className="key-button" onClick={login}>Continuar</button>
            </div>

            <div id="alert" style={{ display: "none" }}>
                <p id="alertext" >zona de alertas</p>
            </div>
        </div>
    </>
};