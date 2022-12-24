import { useContext } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./Home";
import Study from "./Study";
import Life from "./Life";
import Account, { Login, Logout } from "./Account";
import AuthContext from "../context/AuthContext";

function Main() {
    return (
        <div className="main-wrapper">
            <Routes>
                {/* Protected routes */}
                <Route element={<Protected />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/study" element={<Study />} />
                    <Route path="/life" element={<Life />} />
                    <Route path="/account" element={<Account />} />
                </Route>

                {/* Public routes */}
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

function Protected() {
    let { user } = useContext(AuthContext);

    // Purpose of Outlet
    // The <Outlet> component can be used in a parent <Route> element to render out child elements.
    // So the solution can be to nest private routes inside of a parent route.
    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default Main;
