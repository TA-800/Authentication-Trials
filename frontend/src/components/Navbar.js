import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navbar() {
    const navigate = useNavigate();

    let { user } = useContext(AuthContext);

    // Sidebar navigation
    return (
        <nav>
            <ul className="navigation">
                <li onClick={() => navigate("/home")}>Home</li>
                <li onClick={() => navigate("/study")}>Study</li>
                <li onClick={() => navigate("/life")}>Life</li>
                <li onClick={() => navigate("/account")}>Account</li>
            </ul>
        </nav>
    );
}

export default Navbar;
