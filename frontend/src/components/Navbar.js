import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useMediaPredicate } from "react-media-hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faUser,
    faBook,
    faLeaf,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const isSmallScreen = useMediaPredicate("(max-width: 640px)");
    const navRef = useRef(null);

    useEffect(() => {
        // Add classes to nav buttons depending on the size/layout of the screen
        // Replace the text of the buttons with icons by adding the "hide" class to the span element containing the text
        if (isSmallScreen) {
            navRef.current.childNodes.forEach((child) => {
                child.childNodes[1].classList.add("hide");
            });
        } else {
            navRef.current.childNodes.forEach((child) => {
                child.childNodes[1].classList.remove("hide");
            });
        }
    }, [isSmallScreen]);

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
            <ul ref={navRef} className="navigation">
                <li
                    data-tooltip="Home"
                    onClick={() => navigate("/home")}
                    className={
                        location.pathname === "/home"
                            ? "active-navbar-button"
                            : ""
                    }>
                    <FontAwesomeIcon icon={faHome} size="2x" />
                    <span>Home</span>
                </li>
                <li
                    data-tooltip="Study"
                    onClick={() => navigate("/study")}
                    className={
                        location.pathname === "/study"
                            ? "active-navbar-button"
                            : ""
                    }>
                    <FontAwesomeIcon icon={faBook} size="2x" />
                    <span>Study</span>
                </li>
                <li
                    data-tooltip="Life"
                    onClick={() => navigate("/life")}
                    className={
                        location.pathname === "/life"
                            ? "active-navbar-button"
                            : ""
                    }>
                    <FontAwesomeIcon icon={faLeaf} size="2x" />
                    <span>Life</span>
                </li>
                <li
                    data-tooltip="Account"
                    onClick={() => navigate("/account")}
                    className={
                        location.pathname === "/account"
                            ? "active-navbar-button"
                            : ""
                    }>
                    <FontAwesomeIcon icon={faUser} size="2x" />
                    <span>Account</span>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
