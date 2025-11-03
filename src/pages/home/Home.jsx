import Card from "./card/card";
import "./Home.css"
import "./card/card.css"
import { use, useState } from "react";
import apiClient from "../../services/apiClient";

export default function Home({ userdata, setUserdata }) {
  const token = sessionStorage.getItem("token");
  const [news, setnewa] = useState([]);

  const [newtitle, setnewtitle] = useState("");
  const [newinfo, setnewinfo] = useState("");

  const [alertcardact, setalertcardact] = useState(false);
  const [alerttext, setalerttext] = useState("");

  const recarga = async () => {
    let response = await apiClient.get("/get/news", {
      headers:
      {
        Authorization: `Bearer ${token}`
      }
    });
    setnewa(response.data);
  }

  useState(async () => {
    let response = await apiClient.get("/get/news", {
      headers:
      {
        Authorization: `Bearer ${token}`
      }
    });
    setnewa(response.data);
  });

  const addnew = async () => {

    if (newtitle.length <= 0 || newinfo.length <= 0)
      return;

    let response = await apiClient.post("/create/news", {
      title: newtitle,
      description: newinfo
    }, {
      headers:
      {
        Authorization: `Bearer ${token}`
      }
    });
    try {
      setalertcardact(true);
      setalerttext(response.data.message);
      setTimeout(() => {
        setalertcardact(false);
      }, 3000);
      recarga();
      setnewtitle("");
      setnewinfo("");
    }
    catch (error) {
      setalertcardact(true);
      setalerttext(error);
      setTimeout(() => {
        setalertcardact(false);
      }, 3000);
    }
  }

  return <>
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-12">
              <div className="card-header justify-content-between d-flex align-items-center" style={{ display: "flex !important", justifyContent: "flex-start !important", flexDirection: "row", alignContent: "center" }}>
                <h4 className="card-title">
                  Bienvenido, {userdata?.user?.username}
                </h4>
              </div>
              <br />
              <div id="alertcard" className="card-header align-items-center" style={alertcardact ? { display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", backgroundColor: "#25736fff" } : { display: "none" }}>
                <div style={{ width: "400px", display: "flex", alignContent: "center", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                  <h4 className="card-title" id="alertbase">{alerttext}</h4>
                </div>
              </div>

            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
              <div className="custom-card">
                <div className="custom-card-header">
                  <h4 className="custom-card-title">Usuario: {userdata?.user?.username}</h4>
                </div>
                <div className="custom-card-body">
                  <p>ID: {userdata?.user?.telegram_id}</p>
                  <p>Rango: {userdata?.user?.rango}</p>
                  <p>Creditos: {userdata?.user?.creditos}</p>
                  <p>Tiempo Restante: {userdata?.user?.time}</p>
                </div>
              </div>
            </div>

            {userdata?.user?.rango === "admin" ?

              <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
                <div className="custom-card">
                  <div className="custom-card-header">
                    <h4 className="custom-card-title">Agregar Nueva</h4>
                  </div>
                  <div className="custom-card-body">
                    <div style={{ display: "flex", alignContent: "center", flexDirection: "row", alignItems: "center" }}>
                      <h4 style={{ width: "150px" }} className="card-title">Titulo: </h4>
                      <input type="text" className="form-control" id="tgid" name="tgid" placeholder="" value={newtitle} onChange={(e) => { setnewtitle(e.target.value) }} />
                    </div>
                    <br />
                    <div style={{ display: "flex", alignContent: "center", flexDirection: "row", alignItems: "center" }}>
                      <h4 style={{ width: "150px" }} className="card-title">Contenido: </h4>
                      <textarea type="text" className="form-control" id="tgid" name="tgid" value={newinfo} onChange={(e) => { setnewinfo(e.target.value) }}></textarea>
                    </div>
                    <br />
                    <button id="updatetok" className="btn btn-primary" style={{ marginLeft: "10px", width: "95%" }} onClick={() => { addnew() }}>Agregar</button>
                  </div>
                </div>
              </div>
              : null}

            {news.map((item) => <Card admin={userdata?.user?.rango === "admin" ? true : false} titulo={item.title} info={item.description} id={item._id} alertcardact={alertcardact} setalertcardact={setalertcardact} alerttext={alerttext} setalerttext={setalerttext} recarga={recarga}  />)}

          </div>
        </div>
      </div>
    </div>
  </>
};