import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const refresh = async () => {
            try {
                const res = await axios.get(`${backendURL}/users/refresh`, { withCredentials: true });
                setAccessToken(res.data.accessToken);
                setUser(res.data.user);
                localStorage.setItem("user", res.data.user)
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        console.log("Not authenticated: No refresh token.");
                    } else if (error.response.status === 403) {
                        console.log("Invalid refresh token or user not found.");
                    } else {
                        console.log("Unexpected server error:", error.response.status);
                    }
                } else {
                    console.log("Network error or server unreachable.");
                }
                setUser(null);
                localStorage.removeItem("user")
            } finally {
                setLoading(false);
            }
        };

        refresh();
    }, []);


    const login = async (username, password) => {
        try {
            const res = await axios.post(
                `${backendURL}/users/login`,
                { username, password },
                { withCredentials: true }
            );

            setAccessToken(res.data.accessToken);
            setUser(res.data.user);
            localStorage.setItem("user", res.data.user)
        } catch (error) {
            if (error.response) {
                // Server responded with a status outside the 2xx range
                if (error.response.status === 401) {
                    throw new Error("Invalid credentials. Please try again.");
                } else {
                    throw new Error("Network error. Please try again later.");
                }
            } else {
                // No response received or other network issue
                throw new Error("Network error. Please check your connection.");
            }
        }
    };

    const setSessionTrip = (tripID) => {
        localStorage.setItem("trip", tripID)
    }

    const logout = async () => {
        try {
            await axios.post(`${backendURL}/users/logout`, {}, { withCredentials: true });
            setUser(null);
            setAccessToken(null);
            localStorage.removeItem("user")
            localStorage.removeItem("trip")
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };


    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout, loading, setSessionTrip }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)
