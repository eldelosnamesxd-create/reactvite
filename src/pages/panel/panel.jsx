import "./panel.css";
import { useState } from "react";
import apiClient from "../../services/apiClient";
import { data } from "react-router-dom";

export default function Panel({ userdata, setUserData }) {

    const [rangosel, sendrangosel] = useState("admin")
    const [idsel, sendidsel] = useState("generado")
    const [credsel, sendcredsel] = useState("0")
    const [time1sel, sendtime1sel] = useState("1")
    const [time2sel, sendtime2sel] = useState("d")
    const token = sessionStorage.getItem("token");

    const createkey = async () => {
        let params = new URLSearchParams();
        params.append("userId", idsel);
        params.append("rango", rangosel);
        params.append("credits", credsel);
        params.append("time1", time1sel);
        params.append("time2", time2sel);
        try {
            const response = await apiClient.post("/createkey", params, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status == 403) {
                document.getElementById("cardalert").style.display = "block";
                document.getElementById("cardtext").innerHTML = response.data.error;
                setTimeout(() => {
                    document.getElementById("cardalert").style.display = "none";
                }, 3000);
            } else if (response.status == 201) {
                document.getElementById("cardalert").style.display = "block";
                document.getElementById("cardtext").innerHTML = response.data.message + ": " + response.data.key;
            } else if (response.status == 500) {
                document.getElementById("cardalert").style.display = "block";
                document.getElementById("cardtext").innerHTML = response.data.error;
                setTimeout(() => {
                    document.getElementById("cardalert").style.display = "none";
                }, 3000);
            }
            else if (response.status == 401) {
                document.getElementById("cardalert").style.display = "block";
                document.getElementById("cardtext").innerHTML = response.data.error;
                setTimeout(() => {
                    document.getElementById("cardalert").style.display = "none";
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return <>
        {userdata?.user?.rango == "admin" ?
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header justify-content-between d-flex align-items-center" style={{ display: "flex !important", justifyContent: "flex-start !important", flexDirection: "row", alignContent: "center" }}>
                                        <h4 className="card-title">Panel</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-xl-12">
                                                <div className="mb-3 row">
                                                    <div className="form-floating" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                        <div id="chkbocontent" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", height: "30px" }}>
                                                            <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                                                                <span style={{ marginLeft: "8px" }}>Generar key:</span>
                                                            </label>
                                                        </div>
                                                        <br />
                                                        <div id="chkbocontent" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", height: "30px" }}>
                                                            <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                                                                <span style={{ marginRight: "50px" }}>Rango</span>
                                                                <div className="select-container" style={{ width: "200px" }}>
                                                                    <select name="gateways" id="rangoa" className="dropdowncls" onChange={e => sendrangosel(e.target.value)}>
                                                                        <option value="admin">Admin</option>
                                                                        <option value="premium">Premium</option>
                                                                        <option value="banned">BAN</option>
                                                                    </select>
                                                                </div>
                                                            </label>
                                                        </div>
                                                        <br />
                                                        <div id="chkbocontent" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", height: "30px" }}>
                                                            <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                                                                <span style={{ marginRight: "78px" }}>ID</span>
                                                                <div className="select-container">
                                                                    <input type="text" className="form-control" id="ida" name="ida" placeholder="" value={idsel} onChange={e => sendidsel(e.target.value)} />
                                                                </div>
                                                            </label>
                                                        </div>
                                                        <br />
                                                        <div id="chkbocontent" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", height: "30px" }}>
                                                            <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                                                                <span style={{ marginRight: "44px" }}>créditos</span>
                                                                <div className="select-container">
                                                                    <input type="text" className="form-control" id="creditsa" name="ida" placeholder="" value={credsel} onChange={e => sendcredsel(e.target.value)} />
                                                                </div>
                                                            </label>
                                                        </div>
                                                        <br />
                                                        <br />
                                                        <div id="chkbocontent" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", height: "30px" }}>
                                                            <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                                                                <span style={{ marginRight: "45px" }}>Tiempo</span>
                                                                <div className="select-container">
                                                                    <input type="text" className="form-control" id="time1" name="gateways" placeholder="" value={time1sel} onChange={e => sendtime1sel(e.target.value)} />
                                                                    <div className="select-container">
                                                                        <select name="gateways" id="time2" className="dropdowncls" onChange={e => sendtime2sel(e.target.value)}>
                                                                            <option value="d">Dias</option>
                                                                            <option value="h">Horas</option>
                                                                            <option value="m">Minutos</option>
                                                                            <option value="s">Segundos</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                        </div>
                                                        <br />
                                                        <br />
                                                        <div id="chkbocontent" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", height: "30px" }}>
                                                            <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                                                                <span style={{ marginRight: "45px", width: "300px" }}>(Si ya existe el ID, solo se actualizarán los datos; eso incluye usuarios de Telegram así como de key.)</span>
                                                            </label>
                                                        </div>
                                                        <br />
                                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                            <button id="createadd" className="btn btn-primary btn-play" onClick={createkey}>Crear</button>
                                                        </div>
                                                        <br />
                                                        <div className="col-10" id="cardalert" style={{ display: "none" }}>
                                                            <div className="card" id="alertcolor">
                                                                <div className="card-header justify-content-between d-flex align-items-center" style={{ justifyContent: "center !important" }}>
                                                                    <h4 className="card-title" id="cardtext">Error: </h4>
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
                </div>
            </div>

            : '{"error":"sin acceso","message":"No intentes acceder aquí o tu cuenta será baneada."}'}
    </>
};