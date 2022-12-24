import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    // Sidebar navigation
    return (
        <nav>
            <ul className="navigation">
                <li
                    onClick={() => navigate("/home")}
                    className={
                        location.pathname === "/home"
                            ? "active-navbar-button"
                            : ""
                    }>
                    Home
                </li>
                <li
                    onClick={() => navigate("/study")}
                    className={
                        location.pathname === "/study"
                            ? "active-navbar-button"
                            : ""
                    }>
                    Study
                </li>
                <li
                    onClick={() => navigate("/life")}
                    className={
                        location.pathname === "/life"
                            ? "active-navbar-button"
                            : ""
                    }>
                    Life
                </li>
                <li
                    onClick={() => navigate("/account")}
                    className={
                        location.pathname === "/account"
                            ? "active-navbar-button"
                            : ""
                    }>
                    Account
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
