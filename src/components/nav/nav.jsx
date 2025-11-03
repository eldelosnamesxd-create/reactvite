import { useEffect } from 'react';
import './nav.css';

export default function Navbar({ id, img , menustate,setmenustate}) {
    return (
        <>
            <div id="layout-wrapper" style={{position:"unset"}}>
                <header id="page-topbar">
                    <div className="collapse show dash-content" id="dashtoggle">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", height: "70px" }}>
                                        <div className="breadcrumb-item" style={{ marginRight: "15px", color: "#9295a4"}}>{id}</div>
                                        <div className="">
                                            <img src={img} style={{ borderRadius: "160px", width: "50px" }} onClick={() => {setmenustate(menustate ? false : true); console.log(menustate ? false : true)}} />
                                        </div>
                                        <div style={{ width: "20px", height: "20px" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
}