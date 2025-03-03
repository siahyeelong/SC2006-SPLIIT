import { Outlet } from "react-router-dom";
import PublicTopbar from "./PublicTopbar";

const PublicLayout = () => {
    return (
        <div className="app">
            <main className="content">
                <PublicTopbar />
                <Outlet />  {/* This will render child routes */}
            </main>
        </div>
    );
};

export default PublicLayout;
