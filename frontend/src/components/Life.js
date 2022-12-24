import { useEffect, useState } from "react";

export default function () {
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-5xl font-mono">Life</h1>
                <p className="text-2xl font-mono">Welcome to the Life page</p>
            </div>
            <br />
            <Questions />
        </>
    );
}

function Questions() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/backend/life/")
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error(
                        "Something went wrong when trying to fetch data"
                    );
                }

                return response.json();
            })
            .then((data) => {
                for (let obj of data.results) {
                    setQuestions((questions) => [...questions, obj]);
                }
                setLoading(false);
            })
            .catch((error) => {
                alert(error);
            });
    }, []);

    return (
        <>
            <h2 className="text-xl">
                <i>TRIVIA FOR YOUR LEISURE.</i>
            </h2>
            <br />
            {loading ? (
                <div>Loading</div>
            ) : (
                <ol className="trivia-wrapper">
                    {questions.map((q, i) => (
                        <li key={i}>
                            <p className="trivia-question">
                                {i + 1}.{" "}
                                <strong>{unescapeHtml(q.question)}</strong>
                            </p>
                            <ul className="trivia-answer-wrapper">
                                <li
                                    className="trivia-answer"
                                    onClick={(e) => selectAnswer(e)}>
                                    <i>{unescapeHtml(q.correct_answer)}</i>
                                </li>
                                {q.incorrect_answers.map((a, j) => (
                                    <li
                                        className="trivia-answer"
                                        onClick={(e) => selectAnswer(e)}
                                        key={j}>
                                        {unescapeHtml(a)}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ol>
            )}
        </>
    );
}

function selectAnswer(event) {
    const parent = event.target.parentNode;
    const siblings = Array.from(parent.children).filter(
        (child) => child !== event.target
    );

    siblings.forEach((sibling) => {
        sibling.classList.remove("selected");
    });

    event.target.classList.add("selected");
}

// Reference: https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript
// function escapeHtml(unsafe) {
//     return unsafe
//         .replace(/&/g, "&amp;")
//         .replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;")
//         .replace(/"/g, "&quot;")
//         .replace(/'/g, "&#039;");
// }

// Opposite of the above function
function unescapeHtml(safe) {
    return safe
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&micro;/g, "µ")
        .replace(/&uuml;/g, "ü");
}
