import { useEffect } from 'react';
import './sidebar.css';

export default function Sidebar() {
    useEffect(() => {
        function toggleSubmenu(event, element) {
            event.preventDefault();
            event.stopPropagation();

            const dropdownMenu = element.nextElementSibling;
            const isVisible = dropdownMenu.style.display === 'block';

            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });

            if (!isVisible) {
                dropdownMenu.style.display = 'block';
            }
        }

        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.addEventListener('click', function (e) {
                if (!this.classList.contains('dropdown-toggle')) {
                    closeSidebar();
                }
            });
        });

        // Cerrar con Escape
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeSidebar();
            }
        };
        document.addEventListener('keydown', handleEscape);
        const handleResize = () => {
            if (window.innerWidth > 767) {
                document.body.style.overflow = '';
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            document.removeEventListener('keydown', handleEscape);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');

        if (sidebar && overlay) {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
            document.body.style.overflow = '';

            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    }

    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');

        if (!sidebar || !overlay) return;

        const isOpen = sidebar.classList.contains('open');
        if (isOpen) {
            closeSidebar();
        } else {
            sidebar.classList.add('open');
            overlay.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    const handleOverlayClick = () => {
        closeSidebar();
    };

    let admin = true;

    const eliminarToken = async () => {
        sessionStorage.removeItem('token');
        // también puedes eliminar en localStorage si lo usas allí
        // localStorage.removeItem('token');
    }


    return (
        <>
            <div className="sidebar-overlay" id="sidebarOverlay" onClick={closeSidebar}></div>                    <button className="sidebar-toggle" onClick={toggleSidebar}>
                ☰
            </button>
            <div className="sidebar" id="sidebar">
                <ul className="sidebar-menu">
                    <div style={{
                        zIndex: "9999", position: "relative", display: "flex", flexDirection: "column", alignContent: "flex-start", flexWrap: "wrap"
                    }}>
                        <div>
                            <a href="/" className="active sidebar__a">Dashboard</a>
                        </div>
                        {admin ? <div><a href="/panel" className="sidebar__a">Panel</a></div> : null}
                        <div className='sidevar__divs'>
                            <p style={{ margin: "0px" }} className="sidebar__a">Checker</p>
                            <div style={{ width: "86%", marginLeft: "35px" }}>
                                <a href="/checker/amazon" className="sidebar__a">Amazon</a>
                            </div>
                            <div style={{ width: "86%", marginLeft: "35px" }}>
                                <a href="/checker/adyen" className="sidebar__a">Adyen $0</a>
                            </div>
                            <div style={{ width: "86%", marginLeft: "35px" }}>
                                <a href="/checker/chase" className="sidebar__a">Chase $0</a>
                            </div>
                        </div>
                        <div className='sidevar__divs'>
                            <a href="/gen" className="sidebar__a">Gen</a>
                        </div>
                        <div className='sidevar__divs'>
                            <a href="/telegram" className="sidebar__a">Telegram</a>
                        </div>
                        <div className='sidevar__divs'>
                            <a href="/historial" className="sidebar__a">historial</a>
                        </div>
                        <div className='sidevar__divs'>
                            <a href="/" onClick={() => {eliminarToken()}} className="sidebar__a">Salir</a>
                        </div>
                    </div>
                </ul>
            </div>
        </>
    );
}
