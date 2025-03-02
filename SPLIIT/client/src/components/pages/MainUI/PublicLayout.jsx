import { Outlet } from "react-router-dom";

const PublicLayout = () => {
    return (
        <div className="app">
            <main className="content">
                <Outlet />  {/* This will render child routes */}
            </main>
        </div>
    );
};

export default PublicLayout;
