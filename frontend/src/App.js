import Main from "./components/Main";
import Navbar from "./components/Navbar";
import "./App.css";
import { LifeProvider } from "./context/lifeContext";

function App() {
    return (
        <>
            <Navbar />
            <br />
            <LifeProvider>
                <Main />
            </LifeProvider>
        </>
    );
}

export default App;
