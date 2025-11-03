import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";


export default function Historial() {
    const [cardslist, setcardslist] = useState([]);
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        setcardslist(JSON.parse(localStorage.getItem('kaysstorage')) || []);
    }, []);

    const copiar = async (texto) => {
        navigator.clipboard.writeText(texto);
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const [mensaje, setMensaje] = useState("");
    const [visible, setVisible] = useState(false);

    const alertaa = async (texto) => {
        setMensaje(texto);
        setVisible(true);
        await delay(5000);
        setVisible(false);
        setMensaje("");
    }

    const savecard = async (texto) => {
        let params = new URLSearchParams();
        params.append("text", texto);
        const response = await apiClient.post("/gates/save",
            params, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        alertaa(response.data.message);
    }

    return <>
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header justify-content-between d-flex align-items-center" style={{ display: "flex !important", justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                                    <h4 className="card-title">CHECKED CARDS</h4>
                                </div>

                                <div className="col-10" id="alertalv" style={visible ? { display: "block" } : { display: "none" }}>
                                    <div className="card">

                                        <div className="card-body">
                                            <div className="row">
                                                <div id="lista_aprovadas" style={{ color: "white" }}>{mensaje}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="card-body">
                                    <div style={{ overflowY: "auto", height: "434px" }} id="cardbodya">

                                        {cardslist.map((tarjeta) => (
                                            <div className="card mb-3">
                                                <div className="card-body p-0">
                                                    <div className="row g-0 align-items-center" style={{ fontSize: "0.9rem" }}>
                                                        <div className="col-12 col-md-5 p-3 text-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
                                                            <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.85rem", color: "#e9ecef", letterSpacing: "1px" }}>
                                                                {Object.keys(tarjeta)[0]}
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-4 p-3 text-center">
                                                            <span className="badge bg-danger text-white" style={{ width: "240px", fontSize: "0.85rem", padding: "6px 10px", whiteSpace: "normal", wordWrap: "break-word", display: "inline-block" }}>
                                                                {tarjeta[Object.keys(tarjeta)[0]].response}
                                                            </span>
                                                        </div>
                                                        <div className="col-12 col-md-3 p-3">
                                                            <div style={{ display: "flex", flexdirection: "column", alignItems: "center", gap: "6px" }}>
                                                                <button className="btn btn-outline-primary btn-sm w-100" onClick={() => { copiar(Object.keys(tarjeta)[0] + " - " + tarjeta[Object.keys(tarjeta)[0]].response) }}>
                                                                    Copiar
                                                                </button>
                                                                <button className="btn btn-outline-primary btn-sm w-100" onClick={() => { savecard(Object.keys(tarjeta)[0] + "_response_" + tarjeta[Object.keys(tarjeta)[0]].response + "_type_" + tarjeta[Object.keys(tarjeta)[0]].status); alertaa(Object.keys(tarjeta)[0] + " Guardada"); }}>
                                                                    Guardar
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
};