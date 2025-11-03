import { useEffect } from 'react';
export default function TelegramReg() {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    const status = queryParams.get('status');

    useEffect(() => {
        if (status === true || status === "true") {
            sessionStorage.setItem("token", token);
            window.location.href = "/";
        }else{
            window.location.href = "/";
        }
    }, [])

    return <>

    </>
};

