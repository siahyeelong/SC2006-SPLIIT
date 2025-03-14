import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAuth } from "../../classes/AuthContext";

const AuthLayout = () => {
    // const { user, loading } = useAuth();

    // if (loading) {
    //     return <div>Loading...</div>
    // }

    // if (!user) {
    //     return <Navigate to="/home" />;
    // }

    return (
        <div className="app">
            <Sidebar />
            <main className="content">
                <Topbar />
                <Outlet /> {/* This will render child routes */}
            </main>
        </div>
    );
};

export default AuthLayout;
