import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Account() {
    let { user } = useContext(AuthContext);

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-5xl font-mono">Account</h1>
                <p className="text-2xl font-mono">
                    Welcome, {user}, to the Account page
                </p>
            </div>
            <br />
            <Logout />
        </>
    );
}

export function Login() {
    let { user, login } = useContext(AuthContext);

    if (user) {
        return <Navigate to="/account" />;
    }

    return (
        <div className="flex flex-col justify-center items-center gap-y-2">
            <div>
                <h1 className="text-5xl text-center">Login</h1>
                <br />
                <p className="text-1xl text-center">
                    Welcome. Before you can access any other page, you must
                    login.
                </p>
            </div>
            <form
                className="flex flex-col justify-center items-center gap-y-4"
                onSubmit={(e) => login(e)}>
                {/* {err} */}
                <div className="flex flex-row w-96 h-12 border-2 border-white border-opacity-10 justify-evenly items-center">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        className="h-2/3 text-black p-1"
                    />
                </div>
                <div className="flex flex-row w-96 h-12 border-2 border-white border-opacity-10 justify-evenly items-center">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="h-2/3 text-black p-1"
                    />
                </div>
                <button type="submit" className="btn btn-blue">
                    Login
                </button>
            </form>
        </div>
    );
}

export function Logout() {
    let { logout } = useContext(AuthContext);

    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-2xl font-mono">Click below to logout</p>
            <button onClick={() => logout()} className="btn btn-blue">
                Logout
            </button>
        </div>
    );
}
