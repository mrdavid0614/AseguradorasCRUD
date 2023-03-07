import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Header } from "../Header";

export function Layout(){
    return (
        <>
            <Header />
            <Outlet />
            <ToastContainer />
        </>
    );
}