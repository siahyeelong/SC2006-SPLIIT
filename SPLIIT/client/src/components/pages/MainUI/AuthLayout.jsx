import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AuthLayout = () => {
    return (
        <div className="app">
            <Sidebar />
            <main className="content">
                <Topbar />
                <Outlet />  {/* This will render child routes */}
            </main>
        </div>
    );
};

export default AuthLayout;
