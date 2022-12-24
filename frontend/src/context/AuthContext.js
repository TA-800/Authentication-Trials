import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();
export default AuthContext;

export function AuthProvider({ children }) {
    // Use JWT Decode to get the user's username
    // Using () => {} to make sure the function is only called once instead of every time the component is rendered
    let [user, setUser] = useState(() =>
        localStorage.getItem("access")
            ? jwt_decode(localStorage.getItem("access")).username
            : null
    );
    let [firstload, setFirstload] = useState(true);

    const navigate = useNavigate();

    function login(e) {
        e.preventDefault();

        fetch("http://127.0.0.1:8000/backend/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
            }),
        })
            .then((response) => {
                if (response.status !== 200) {
                    return response.json().then((json) => {
                        throw new Error(
                            `${response.status} ${response.statusText}\n${
                                json.detail || json.username || json.password
                            }`
                        );
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log("Login successful from AuthContext");
                localStorage.setItem("access", data.access);
                localStorage.setItem("refresh", data.refresh);
                // Set the user state to the username
                setUser(jwt_decode(data.access).username);
                // Redirect the user to the Account page
                navigate("/account");
            })
            .catch((errorMessage) => {
                alert(errorMessage);
            })
            .finally(() => {});
    }

    function logout() {
        // Remove the JWT token from local storage
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        // Change the user state to null
        setUser(null);
        // Redirect the user to the login page
        navigate("/login");
    }

    // The access token is valid for 5 minutes.
    // Use the refresh token to get a new access token before the access token expires.
    // Update the access token (and refresh token) every 4 minutes.
    // Access token is updated through refresh token instead of just retrieving a new access token because of extra security.

    // The updateToken function
    function updateToken() {
        fetch("http://127.0.0.1:8000/backend/refresh/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh: localStorage.getItem("refresh"),
            }),
        })
            .then((response) => {
                if (response.status !== 200) {
                    return response.json().then((json) => {
                        throw new Error(
                            `${response.status} ${response.statusText}\n${json.detail}`
                        );
                    });
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem("access", data.access);
                localStorage.setItem("refresh", data.refresh);
                setUser(jwt_decode(data.access).username); // This is not necessary because the user state is not going to change, but lets just have it for extra security in case of some freak accident.
                console.log("Token updated");
            })
            .catch((errorMessage) => {
                console.log(errorMessage);
                // If the refresh token is invalid, log the user out
                logout();
            });

        // Set firstload to false after the first load
        if (firstload) {
            setFirstload(false);
        }
    }

    // The Loading component to render if data is still being fetched
    function Loading() {
        return <div className="bg-red-500 text-3xl">Loading...</div>;
    }

    useEffect(() => {
        // Purpose of firstload:
        // User is logged in but leaves (closes) site for a while, longer than the access token's expiry time.
        // User comes back to the site, still logged in but the access token is expired.
        // Use the refresh token to get a new access token when the user loads the site for the first time.
        if (firstload) {
            // console.log("First load call");
            updateToken();
        }

        // Call the updateToken function every 4 minutes
        let interval = setInterval(() => {
            if (user !== null) {
                updateToken();
            }
        }, 4 * 60 * 1000);
        // Clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, [user]);

    // // DEBUG: Console.log the user state every time there is a change to the user state
    // useEffect(() => {
    //     console.log("User state in AuthContext:" + user);
    // }, [user]);

    let context = {
        user: user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={context}>
            {firstload ? <Loading /> : children}
        </AuthContext.Provider>
    );
}
