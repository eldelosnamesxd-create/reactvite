import { use, useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

//import "./card.css"
export default function Amazonchk({ gate, }) {
    const [cards, sendcards] = useState("")
    const [startstate, setstartstate] = useState(false)
    const [startstate2, setstartstate2] = useState(false)
    const [stopstate, setstopstate] = useState(true)
    const [cardslist, setcardslist] = useState([]);
    const [diesstate, setdiestate] = useState(true)
    const token = sessionStorage.getItem("token");

    const agregarDato = async (objeto, claveInterna) => {
        let datos = JSON.parse(localStorage.getItem('kaysstorage')) || [];
        datos.push({
            [claveInterna]: objeto
        });
        if (datos.length > 150) {
            datos.shift();
        }
        localStorage.setItem('kaysstorage', JSON.stringify(datos));
    }

    const [generar, setGenerar] = useState(false)
    const [cookiestext, setcookiestext] = useState("")

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const copiar = async (texto) => {
        navigator.clipboard.writeText(texto);
    }

    const deleteca = async (id) => {
        document.getElementById("" + id + "").remove();
    }

    const maxLines = 10;
    const handleChange = (e) => {
        const lines = e.target.value.split("\n");
        if (lines.length <= maxLines) {
            sendcards(e.target.value);
        } else {
            sendcards(lines.slice(0, maxLines).join("\n"));
        }
    };

    const [mensaje, setMensaje] = useState("");
    const [visible, setVisible] = useState(false);

    const alertaa = async (texto) => {
        setMensaje(texto);
        setVisible(true);
        await delay(5000);
        setVisible(false);
        setMensaje("");
    }

    const showdies = async () => {
        console.log(!diesstate)
        setdiestate(!diesstate)
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

    async function agregar(card, id, message, type) {
        let base = 'danger';
        if (type == 'success') {
            base = 'success';
        }
        setcardslist((prev) => [...prev,
        {
            id: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
            card: card,
            message: message,
            type: type,
        }
        ]);
    }

    const [checando, setChecando] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const ver = async () => {
            let cardsplit = cards.split("\n");
            const token = sessionStorage.getItem("token");

            if (checando && index < cardsplit.length) {
                setstartstate2(true);
                let card = cardsplit[index];
                let params = new URLSearchParams();
                params.append("card", card);
                params.append("cookies", cookiestext);

                try {
                    const response = await apiClient.post(
                        "/gates/amazon",
                        params,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    await agregar(card, index + 1, response.data.message, response.data.status);
                    await agregarDato({
                        status: response.data.status,
                        response: response.data.message
                    }, card);
                    await delay(700);
                    setIndex(prev => prev + 1);
                } catch (error) {
                    setChecando(false);
                    setstartstate(false);
                    setstopstate(true);
                    console.error(error);
                }
                setstartstate2(false);
            } else if (index >= cards.split("\n").length) {
                setChecando(false);
                setIndex(0);
                setstartstate(false);
                setstopstate(true);
                console.log("ended...");
            }
        };

        if (checando) {
            ver();
        }
    }, [checando, index, cards]);

    const iniciar = () => {
        if (startstate2) {
            alertaa('No puedes iniciar el proceso si hay CCS en cola.');
            return;
        }
        setstartstate(true);
        setstopstate(false);
        setChecando(true);
        setIndex(0);
    };

    const detener = () => {
        setChecando(false);
        setstartstate(false);
        setstopstate(true);
        console.log("ended...");
    };


    return <>
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header justify-content-between d-flex align-items-center" style={{ display: "flex !important", justifyContent: "flex-start !important", flexDirection: "row", alignContent: "center" }}>
                                    <h4 className="card-title">{gate}</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="mb-3 row">
                                                <div className="form-floating">
                                                    <div id="chkbocontent" style={gate == "Amazon_US" ? { display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", height: "30px" } : { display: "none", alignItems: "center", justifyContent: "center", gap: "10px", height: "30px" }} >
                                                        <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                                                            <span style={{ marginLeft: "8px" }}>Generar</span>
                                                            <input id="generate" type="checkbox" className="checkbox-custom" value={generar} onChange={e => { setGenerar(e.target.checked); console.log(e.target.checked) }} />
                                                        </label>
                                                    </div>
                                                    <div id="ccscontainer" style={generar ? { display: "none" } : { display: "block" }}>
                                                        <label htmlFor="floatingTextarea2">inserta las CCs aqui:</label>
                                                        <textarea className="form-control form-checker"
                                                            placeholder="Ingresa las ccs" id="floatingTextarea2"
                                                            style={{ height: "100px", color: "white", textAlign: "center" }} value={cards} onChange={handleChange} ></textarea>
                                                    </div>

                                                    <div id="ccscontainergen" style={generar ? { display: "block" } : { display: "none" }}>
                                                        <label htmlFor="floatingTextareagenerate">inserta la serie:</label>
                                                        <textarea className="form-control form-checker"
                                                            placeholder="Ingresa la serie" id="floatingTextareagenerate"
                                                            style={{ height: "100px", color: "white", textAlign: "center" }}></textarea>
                                                    </div>

                                                    <br />
                                                    <div id="concookies" style={{ display: "block" }}>
                                                        <p id="cookie1_label">Cookie:</p>
                                                        <input type="text" className="form-control" id="cookie1" name="cookie1"
                                                            placeholder="Cookies" value={cookiestext} onChange={e => setcookiestext(e.target.value)} />
                                                    </div>
                                                    <br />
                                                    <input hidden type="text" name="bbb" id="actgate" defaultValue={gate} />

                                                    <br />
                                                    <center>
                                                        <button className="btn btn-primary btn-play" disabled={startstate} onClick={() => (iniciar())} >Iniciar</button>
                                                        <button className="btn btn-danger btn-stop" disabled={stopstate} onClick={() => (detener())} >Detener</button>
                                                    </center>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="cardscont">

            <div className="col-10" id="alertalv" style={visible ? { display: "block" } : { display: "none" }}>
                <div className="card">

                    <div className="card-body">
                        <div className="row">
                            <div id="lista_aprovadas" style={{ color: "white" }}>{mensaje}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-10">
                <div className="card">
                    <div className="card-header justify-content-between d-flex align-items-center">
                        <h4 className="card-title">Resultados: </h4>
                        <div className="float-right">

                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div style={{ overflowY: "auto", height: "434px" }}>
                                <div id="lista_reprovadas" style={diesstate ? {color: "white", display: "block" } : {color: "white", display: "none" }}>

                                    {cardslist.map((tarjeta) => (
                                        <div className="card mb-3" id={tarjeta.id}>
                                            <div className="card-body p-0">
                                                <div className="row g-0 align-items-center" style={{ fontSize: "0.9 rem" }}>
                                                    <div className="col-12 col-md-5 p-3 text-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
                                                        <div style={{ fontFamily: "'Courier New'", fontSize: "0.85rem", color: "#e9ecef", letterSpacing: "1px" }}>
                                                            {tarjeta.card}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-4 p-3 text-center">
                                                        <span className={`badge bg-${tarjeta.type === 'success' ? "success" : "danger"} text-white`} style={{ width: "240px", fontFamily: "'Courier New', monospace", fontSize: "0.85rem", padding: "6px 10px", whiteSpace: "normal", wordWrap: "breakWord", display: "inlineBlock" }}>
                                                            {tarjeta.message}
                                                        </span>
                                                    </div>
                                                    <div className="col-12 col-md-3 p-3">
                                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                                                            <button className="btn btn-outline-primary btn-sm w-100" onClick={() => { copiar(tarjeta.card + " - " + tarjeta.message); alertaa(tarjeta.card + ' Copiada'); }}>
                                                                Copiar
                                                            </button>
                                                            <button className="btn btn-outline-primary btn-sm w-100" onClick={() => { deleteca(tarjeta.id) }}>
                                                                Borrar
                                                            </button>
                                                            <button className="btn btn-outline-primary btn-sm w-100" onClick={() => { savecard(tarjeta.card + "_response_" + tarjeta.message + "_type_" + tarjeta.type); alertaa(tarjeta.card + ' Guardada'); }}>
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
    </>;
}