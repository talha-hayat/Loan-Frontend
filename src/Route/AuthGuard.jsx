import { Navigate, Outlet } from "react-router-dom";

export const AuthGuard = ()=>{
    const token = !!localStorage.getItem('token');
    console.log(token);

    return token ? <Outlet /> : <Navigate to="/login" />
}