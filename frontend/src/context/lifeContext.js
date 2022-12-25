import { createContext, useState } from "react";

let lifeContext = createContext();
export default lifeContext;

export function LifeProvider({ children }) {
    const [cQuestions, setCQuestions] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    let context = {
        cQuestions,
        submitted,
        setCQuestions,
        setSubmitted,
    };

    return (
        <lifeContext.Provider value={context}>{children}</lifeContext.Provider>
    );
}
