//import "./panel.css";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import { data } from "react-router-dom";
import e from "cors";

export default function Telegram({ userdata }) {
    const [bottoken, setbottoken] = useState("");
    const [tgid, settgid] = useState("");
    const [chatid, setchatid] = useState("");
    const [plantilla, setplantilla] = useState("");
    const [botstatus, setbotstatus] = useState("");
    const token = sessionStorage.getItem('token');

    const [alertcardact, setalertcardact] = useState(false);
    const [alerttext, setalerttext] = useState("");

    useEffect(() => {
        if (userdata?.user) {
            console.log(userdata);
            settgid(userdata.user.telegram_id);
            setchatid(userdata.user.chatid);
            setplantilla(userdata.user.plantilla);
            setbottoken(userdata.user.bottoken ? userdata.user.bottoken : "");
            setbotstatus(userdata.user.auto_save === "0" ? false : true);
        }
    }, [userdata]);

    const guardattoken = async () => {
        try {
            const params = new URLSearchParams();
            params.append("bottoken", bottoken);
            const response = await apiClient.post("/save/bottoken", params, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            try {
                setalertcardact(true);
                setalerttext(response.data.message);
                setTimeout(() => {
                    setalertcardact(false);
                }, 3000);
            }
            catch (error) {
                setalertcardact(true);
                setalerttext(error);
                setTimeout(() => {
                    setalertcardact(false);
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const guardarauto = async (e) => {
        try {
            setbotstatus(e.target.checked)
            const params = new URLSearchParams();
            params.append("auto_save", botstatus == true ? "1" : "0");
            const response = await apiClient.post("/save/autosave", params, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            try {
                setalertcardact(true);
                setalerttext(response.data.message);
                setTimeout(() => {
                    setalertcardact(false);
                }, 3000);
            }
            catch (error) {
                setalertcardact(true);
                setalerttext(error);
                setTimeout(() => {
                    setalertcardact(false);
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const guardarplan = async () => {
        try {
            const params = new URLSearchParams();
            params.append("plan", plantilla);
            const response = await apiClient.post("/save/plantilla", params, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            try {
                setalertcardact(true);
                setalerttext(response.data.message);
                setTimeout(() => {
                    setalertcardact(false);
                }, 3000);
            }
            catch (error) {
                setalertcardact(true);
                setalerttext(error);
                setTimeout(() => {
                    setalertcardact(false);
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const guardarchatid = async () => {
        try {
            const params = new URLSearchParams();
            params.append("chatid", chatid);
            const response = await apiClient.post("/save/chatid", params, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            try {
                setalertcardact(true);
                setalerttext(response.data.message);
                setTimeout(() => {
                    setalertcardact(false);
                }, 3000);
            }
            catch (error) {
                setalertcardact(true);
                setalerttext(error);
                setTimeout(() => {
                    setalertcardact(false);
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const verificarbot = async () => {
        try {
            //const params = new URLSearchParams();
            //params.append("plan", plantilla);
            const response = await apiClient.post("/verify/plantilla", null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            try {
                setalertcardact(true);
                setalerttext(response.data.message);
                setTimeout(() => {
                    setalertcardact(false);
                }, 3000);
            }
            catch (error) {
                setalertcardact(true);
                setalerttext(error);
                setTimeout(() => {
                    setalertcardact(false);
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return <>
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header justify-content-between d-flex align-items-center" style={{ display: "flex !important", justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                                    <h4 className="card-title">TELEGRAM SETTINGS</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="mb-3 row">
                                                <div className="form-floating">

                                                    <div className="card-header d-flex align-items-center" style={{ display: "flex !important", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                                                        <div style={{ display: "flex", alignContent: "center", flexDirection: "row", alignItems: "center" }}>
                                                            <h4 style={{ width: "350px" }} className="card-title">ID: {tgid}</h4>
                                                        </div>
                                                    </div>

                                                    <div className="card-header d-flex align-items-center" style={{ display: "flex !important", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                                                        <div style={{ display: "flex", alignContent: "center", flexDirection: "row", alignItems: "center" }}>
                                                            <h4 style={{ width: "150px" }} className="card-title">Bot token: </h4>
                                                            <input type="text" className="form-control" id="bottoken" name="bottoken" placeholder="" value={bottoken} onChange={e => setbottoken(e.target.value)} />
                                                            <button id="updatetok" className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={() => { guardattoken() }} >Actualizar</button>
                                                        </div>
                                                    </div>

                                                    <div className="card-header d-flex align-items-center" style={{ display: "flex !important", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                                                        <div style={{ display: "flex", alignContent: "center", flexDirection: "row", alignItems: "center" }}>
                                                            <h4 style={{ width: "150px" }} className="card-title">chatid: </h4>
                                                            <input type="text" className="form-control" id="tgid" name="tgid" placeholder="" value={chatid} onChange={e => setchatid(e.target.value)} />
                                                            <button id="updatetok" className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={() => { guardarchatid() }} >Actualizar</button>
                                                        </div>
                                                    </div>

                                                    <div className="card-header d-flex align-items-center" style={{ display: "flex !important", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                                                        <div style={{ display: "flex", alignContent: "center", flexDirection: "row", alignItems: "center" }}>
                                                            <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                                                                <span style={{ marginLeft: "8px" }}>Guardar Lives automáticamente: </span>
                                                                <input id="checklive" type="checkbox" className="checkbox-custom" value={botstatus} onClick={(e) => { guardarauto(e) }} />
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div id="alertcard" className="card-header align-items-center" style={alertcardact ? { display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly",backgroundColor: "#25736fff" } : { display: "none" }}>
                                                        <div style={{ width: "400px", display: "flex", alignContent: "center", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                                            <h4 className="card-title" id="alertbase">{alerttext}</h4>
                                                        </div>
                                                    </div>

                                                    <div style={{ display: "block", flexDirection: "column", flexWrap: "nowrap", alignItems: "center", marginBottom: "30px" }}>
                                                        <label htmlFor="floatingTextarea2">Plantilla:</label>
                                                        <textarea className="form-control form-checker" id="floatingTextarea2"
                                                            style={{ height: "300px", color: "white" }} value={plantilla} onChange={(e) => { setplantilla(e.target.value); }}>ND</textarea>
                                                    </div>
                                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                                        <p>~$card~ = Para mostrar la cc</p>
                                                        <p>~$response~ = Respuesta </p>
                                                        <p>~$type~ = Tipo de respuesta (Declinada, Aprovada)</p>
                                                        <p>~$bin~ = Muestra el bin</p>
                                                        <p>~$vendor~ = Visa/mastercar/etc</p>
                                                        <p>~$typec~ = Credit/debit/etc</p>
                                                        <p>~$level~ = business/gold/etc</p>
                                                        <p>~$bank~ = El banco de el bin</p>
                                                        <p>~$flag~ = Bandera del país </p>
                                                    </div>
                                                    <center>
                                                        <button id="verificar" className="btn btn-primary" onClick={() => { verificarbot() }}>Verificar Bot</button>
                                                        <button id="guardarplan" className="btn btn-primary" onClick={() => { guardarplan() }} >Guardar Plantilla</button>
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
    </>
};