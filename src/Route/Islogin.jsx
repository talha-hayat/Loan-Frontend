import { Navigate, Outlet } from "react-router-dom";

export const IsLogin = () => {
    const token = !!localStorage.getItem('token');
    console.log(token);

    return token ? <Navigate to="/" /> : <Outlet />
}