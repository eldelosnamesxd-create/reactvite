import { useState } from "react";
import apiClient from "./../../services/apiClient";
export default function MenuModal({ menustate, setmenustate, nombre, setnombre, userdata }) {
    const token = sessionStorage.getItem('token');
    const [alertcardact, setalertcardact] = useState(false);
    const [alerttext, setalerttext] = useState("");

    const updatename = async () => {
        try {
            const params = new URLSearchParams();
            params.append("username", nombre);
            const response = await apiClient.post("/save/name", params, {
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

    return (<>
        <div style={menustate ? { backgroundColor: "#00000085", height: "100%", width: "100%", position: "absolute", zIndex: "99999" } : { display: "none" }}>

            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header justify-content-between d-flex align-items-center" style={{ display: "flex !important", justifyContent: "flex-start !important", flexDirection: "row", alignContent: "center" }}>
                                        <h4 className="card-title">PERFIL</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-xl-12">
                                                <div className="mb-3 row">
                                                    <div className="form-floating" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                        <div id="concookies" style={{ display: "flex", flexDirection: "row", alignItems: "baseline", marginBottom: "20px" }}>
                                                            <p id="cookie1_label" style={{ margin: "0px 30px 0px 0px" }}>Nombre:</p>
                                                            <input type="text" className="form-control" id="serie" name="serie" placeholder="Nombre" minLength={3} maxLength={20} value={nombre} onChange={e => { setnombre(e.target.value) }} />
                                                        </div>

                                                        <div id="concookies" style={{ display: "flex", flexDirection: "row", alignItems: "baseline", marginBottom: "20px" }}>
                                                            <p id="cookie1_label" style={{ margin: "0px 30px 0px 0px" }}>ID:</p>
                                                            <p type="text" className="form-control" id="idalv" name="serie">{userdata.user.telegram_id}</p>
                                                        </div>

                                                        <div id="concookies" style={{ display: "flex", flexDirection: "row", alignItems: "baseline", marginBottom: "20px" }}>
                                                            <p id="cookie1_label" style={{ margin: "0px 30px 0px 0px" }}>Rango:</p>
                                                            <p type="text" className="form-control" id="idalv" name="serie">{userdata.user.rango}</p>
                                                        </div>

                                                        <div id="concookies" style={{ display: "flex", flexDirection: "row", alignItems: "baseline", marginBottom: "20px" }}>
                                                            <p id="cookie1_label" style={{ margin: "0px 30px 0px 0px" }}>Creditos:</p>
                                                            <p type="text" className="form-control" id="idalv" name="serie">{userdata.user.creditos}</p>
                                                        </div>

                                                        <div id="alertcard" className="card-header align-items-center" style={alertcardact ? { display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", backgroundColor: "#25736fff" } : { display: "none" }}>
                                                            <div style={{ width: "400px", display: "flex", alignContent: "center", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                                                <h4 className="card-title" id="alertbase">{alerttext}</h4>
                                                            </div>
                                                        </div>

                                                        <center>
                                                            <button className="btn btn-copy btn-primary" style={{ marginRight: "5px" }} onClick={() => { setmenustate(false); }}>Cerrar</button>
                                                            <button className="btn btn-copy btn-primary" style={{ marginLeft: "5px" }} disabled={nombre && nombre.length > 3 && String(userdata.user.telegram_id || "").length == 18 ? false : true} onClick={() => { updatename() }}>Actualizar (solo key)</button>
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

        </div>
    </>
    )
}