//import "./panel.css";
import { generatecard } from "./genfun"
import { useState } from "react";

export default function Gen() {
    const [cartext,sendcardtext] = useState("");
    const [carserie,sendcardserie] = useState("");
    const [carmes,sendcardmes] = useState("R");
    const [carano,sendcardano] = useState("R");

    let gener = new generatecard();
    const generate = async () => {
        let texto = '';
        for (let i = 0; i < 10; i++) {
            let seriee = carserie;
            let mes = carmes;
            let ano = carano;
            if (mes == 'R') {
                mes = Math.floor(Math.random() * 12) + 1;
                if (mes < 10) {
                    mes = '0' + mes.toString()
                } else {
                    mes = mes.toString();
                }
            }
            if (ano == 'R') {
                ano = Math.floor(Math.random() * 16) + 2025;
            }
            let card = await gener.gencard(seriee + "|" + mes + "|" + ano);
            if (card.result === 'fail') {
                texto = "No se pudo generar la tarjeta";
                break;
            } else {
                texto += card.card + '\n';
            }
        }
        sendcardtext(texto);
    };

    const copy = async (text) => {
        navigator.clipboard.writeText(text)
    };

    return <>
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header justify-content-between d-flex align-items-center" style={{ display: "flex !important", justifyContent: "flex-start !important", flexDirection: "row", alignContent: "center" }}>
                                    <h4 className="card-title">GENERATE CARDS</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="mb-3 row">
                                                <div className="form-floating">

                                                    <div id="concookies">
                                                        <p id="cookie1_label">Bin/Serie:</p>
                                                        <input type="text" className="form-control" id="serie" name="serie" placeholder="serie" onChange={e => {sendcardserie(e.target.value)}} />
                                                    </div>

                                                    <div className="card-header d-flex align-items-center" style={{ display: "flex !important", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                                                        <div style={{ display: "flex", alignContent: "center", flexDirection: "row", alignItems: "center" }}>
                                                            <h4 className="card-title">MES: </h4>
                                                            <div className="select-container">
                                                                <select name="meses" id="meses" className="dropdown" onChange={e => {sendcardmes(e.target.value);}}>
                                                                    <option value="R">Random</option>
                                                                    <option value="01">01</option>
                                                                    <option value="02">02</option>
                                                                    <option value="03">03</option>
                                                                    <option value="04">04</option>
                                                                    <option value="05">05</option>
                                                                    <option value="06">06</option>
                                                                    <option value="07">07</option>
                                                                    <option value="08">08</option>
                                                                    <option value="09">09</option>
                                                                    <option value="10">10</option>
                                                                    <option value="11">11</option>
                                                                    <option value="12">12</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: "flex", alignContent: "center", flexDirection: "row", alignItems: "center" }}>
                                                            <h4 className="card-title">AÑO: </h4>
                                                            <div className="select-container">
                                                                <select name="anos" id="anos" className="dropdown" onChange={e => {sendcardano(e.target.value);}}>
                                                                    <option value="R">Random</option>
                                                                    <option value="2025">2025</option>
                                                                    <option value="2026">2026</option>
                                                                    <option value="2027">2027</option>
                                                                    <option value="2028">2028</option>
                                                                    <option value="2029">2029</option>
                                                                    <option value="2030">2030</option>
                                                                    <option value="2031">2031</option>
                                                                    <option value="2032">2032</option>
                                                                    <option value="2033">2033</option>
                                                                    <option value="2034">2034</option>
                                                                    <option value="2035">2035</option>
                                                                    <option value="2036">2036</option>
                                                                    <option value="2037">2037</option>
                                                                    <option value="2038">2038</option>
                                                                    <option value="2039">2039</option>
                                                                    <option value="2040">2040</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div id="ccscontainer" style={{ display: "flex", flexDirection: "column", flexWrap: "nowrap", alignItems: "center" }}>
                                                        <label htmlFor="floatingTextarea2">Final:</label>
                                                        <textarea className="form-control form-checker"
                                                            placeholder="" id="floatingTextarea2" readOnly value={cartext}
                                                            style={{ height: "259px", width: "280px", color: "white", textAlign: "center" }}>
                                                        </textarea>
                                                    </div>
                                                    <br />
                                                    <center>
                                                        <button className="btn btn-primary" onClick={() => {generate();}}>Generar</button>
                                                        <button className="btn btn-copy btn-primary" onClick={() => {copy(cartext)}}>Copiar</button>
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