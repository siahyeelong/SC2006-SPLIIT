import { Outlet, useLocation } from "react-router-dom";
import PublicTopbar from "./PublicTopbar";

const PublicLayout = () => {
    const location = useLocation();
    const showPublicTopbar = location.pathname !== "/home";

    return (
        <div className="app">
            <main className="content">
                {showPublicTopbar && <PublicTopbar />}
                {/* <PublicTopbar /> */}
                <Outlet /> {/* This will render child routes */}
            </main>
        </div>
    );
};

export default PublicLayout;
