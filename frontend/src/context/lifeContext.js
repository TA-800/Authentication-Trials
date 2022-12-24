import { createContext } from "react";

let lifeContext = createContext();
export default lifeContext;

export function LifeProvider({ children }) {
    let context = {
        questions: [],
    };

    return (
        <lifeContext.Provider value={questions}>{children}</lifeContext.Provider>
    );
}
