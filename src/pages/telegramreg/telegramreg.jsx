import { useEffect } from 'react';
export default function TelegramReg() {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    const status = queryParams.get('status');

    useEffect(() => {
        if (status === true) {
            alert("Вы успешно зарегистрировались в телеграмм боте");
            sessionStorage.setItem("token", token);
            window.location.href = "/";
        }else{
            alert("Ошибка регистрации: "+queryParams);
            window.location.href = "/";
        }
    }, [])

    return <>

    </>
};