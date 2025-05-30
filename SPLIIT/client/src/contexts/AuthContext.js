import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { User } from '../entities/User';
import { Trip } from '../entities/Trip';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    const [user, setUser] = useState(null);
    const [trip, setTrip] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const refresh = async () => {
        try {
            let res = await axios.get(`${backendURL}/users/refresh`, { withCredentials: true });
            setAccessToken(res.data.accessToken);
            // set current user
            setUser(new User(res.data.user));
            localStorage.setItem("user", res.data.user.username)

            // set current trip
            res = await axios.get(`${backendURL}/trips/tripinfo/${localStorage.getItem("trip")}`);
            setTrip(new Trip(res.data))
            localStorage.setItem("trip", res.data.tripID)
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

    useEffect(() => {
        refresh();
    }, []);


    const login = async (username, password) => {
        setLoading(true);

        try {
            const res = await axios.post(
                `${backendURL}/users/login`,
                { username, password },
                { withCredentials: true } // This ensures cookies like refreshToken are stored
            );

            const { accessToken, user } = res.data;

            if (!accessToken || !user) {
                throw new Error("Unexpected response from server. Please try again.");
            }

            setAccessToken(accessToken);
            setUser(new User(user));
            localStorage.setItem("user", user.username);

            return true;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 401) {
                        throw new Error("Invalid username or password.");
                    } else if (error.response.status === 500) {
                        throw new Error("Server error. Please try again later.");
                    }
                }
            }
            throw new Error("Unable to connect to server. Check your network and try again.");
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = async (username, token) => {
        setAccessToken(token);
        localStorage.setItem("user", username);
        await refresh();
    }

    const setSessionTrip = (theTrip) => {
        const sessionTrip = new Trip(theTrip)
        setTrip(sessionTrip)
        localStorage.setItem("trip", theTrip.tripID)
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
        <AuthContext.Provider value={{ user, trip, accessToken, login, logout, loading, refresh, setSessionTrip, googleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)
