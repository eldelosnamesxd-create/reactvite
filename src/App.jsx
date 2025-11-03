import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/login";
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/nav/nav";
import Panel from "./pages/panel/panel";
import Checker from "./pages/checker/checker";
import Chasechk from "./pages/checker/chaseCHK";
import Gen from "./pages/gen/gen";
import Telegram from "./pages/telegram/telegram";
import Historial from "./pages/histoarial/hist";
import MenuModal from "./components/menumodal/menumodal";
import TelegramReg from "./pages/telegramreg/telegramreg";
import BannedPage from "./pages/ban/ban";
import Amazonchk from "./pages/checker/amazonCHK";

import Loginnew from "./pages/login/otlog/login";

import "./App.css";
import "./gencss/bootstrap.min.css";
import "./gencss/icons.min.css";
import apiClient from "./services/apiClient";
import { useState, useEffect } from "react";
import NotFound from "./pages/NotFound";

function App() {
  const [userdata, setUserdata] = useState("");
  const token = sessionStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  const [menustate, setmenustate] = useState(false)
  const [nombre, setnombre] = useState("")

  useEffect(() => {
    let res = false;

    location.pathname == "/telegram/register" ? res = true : null;
    location.pathname == "/login" ? res = true : null;

    if (!token && location.pathname !== "/login" && !res) {
      navigate("/login", { replace: true });
      return;
    }
    if (token && location.pathname === "/login") {
      navigate("/", { replace: true });
      return;
    }

    async function fetchUserData() {
      try {
        const response = await apiClient.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserdata(response.data);
        setnombre(response.data.user.username)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    if (token) fetchUserData();
  }, [token, location.pathname, navigate]);

  const excludeLayout = location.pathname === "/login" || location.pathname === "/telegram/register" || location.pathname.includes("/telegram/register") || location.pathname.includes("/telegram/cancel/");
  const banned = userdata?.user?.rango === "banned";

  /*
  let debuggerActive = false;
  function checkDevTools() {
    const before = new Date();
    debugger;
    const after = new Date();
    if (after - before > 100) {
      if (!debuggerActive) {
        debuggerActive = true;
        console.log("Debugger activated.");
      }
    } else {
      if (debuggerActive) {
        debuggerActive = false;
        console.log("Debugger deactivated.");
      }
    }
  }

  setInterval(() => {
    checkDevTools();
  }, 1000);*/

  return (
    <div>

      {banned ? (
        <BannedPage />
      ) : (
        <>
          {!excludeLayout && userdata && (
            <nav>
              <MenuModal menustate={menustate} setmenustate={setmenustate} nombre={nombre} setnombre={setnombre} userdata={userdata} />
              <Navbar id={userdata.user?.username} img={userdata.user?.photo} menustate={menustate} setmenustate={setmenustate} />
            </nav>
          )}

          {!excludeLayout && <Sidebar />}

          <Routes>
            <Route path="/" element={<Home userdata={userdata} setUserdata={setUserdata} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/panel" element={<Panel userdata={userdata} />} />

            <Route path="/checker/adyen" element={<Checker gate={"Adyen $0"} />} />
            <Route path="/checker/chase" element={<Chasechk gate={"Chase $0"} />} />
            <Route path="/checker/amazon" element={<Amazonchk gate={"Amazon_US"} />} />

            <Route path="/gen" element={<Gen />} />
            <Route path="/telegram" element={<Telegram userdata={userdata} />} />
            <Route path="/historial" element={<Historial />} />

            <Route path="/telegram/register" element={<Loginnew userdata={userdata} />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
