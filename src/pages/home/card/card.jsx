//import "./card.css"
import apiClient from "../../../services/apiClient";
export default function Card({ admin, titulo, info, id, alertcardact, setalertcardact, alerttext, setalerttext, recarga }) {

    const deletecard = async (id) => {
        await apiClient.delete(`/delete/news/${id}`, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` } });
        setalertcardact(true);
        setalerttext(`Noticia eliminada correctamente`)
        setTimeout(() => {
            setalertcardact(false);
            recarga();
        }, 5000)
    }

    return <>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
            <div className="custom-card">
                <div className="custom-card-header">
                    <h4 className="custom-card-title">{titulo}</h4>
                </div>
                <div className="custom-card-body">
                    <p style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: info }}></p>
                    {admin ? <button id={id} className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={(e) => { deletecard(e.target.id) }}>Eliminar</button> : null}
                </div>
            </div>
        </div>
    </>;
}