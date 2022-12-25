import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    // Sidebar navigation
    return (
        <nav>
            <div
                className="menu-icon"
                onClick={(e) => {
                    // Get nav element
                    document
                        .querySelector(".navigation")
                        .classList.toggle("to-side");
                    e.currentTarget.classList.toggle("to-side");
                }}>
                <img src={require("../menu.png")} alt="Menu icon" />
            </div>
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
