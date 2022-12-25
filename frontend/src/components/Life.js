import { useEffect, useRef, useState } from "react";
import he from "he"; // html-escape

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
    const [reload, setReload] = useState(false);
    const parentRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        console.log("Fetching data from backend");
        // Empty the questions array
        setQuestions([]);
        fetch("http://127.0.0.1:8000/backend/life/") // Using Django to fetch data instead of fetching from the API directly just for fun.
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
    }, [reload]);

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

    function submitAnswer(event) {
        let score = 0;
        // The last question is the submit button which is not a question, so it will show up as undefined
        const questionArray = Array.from(parentRef.current.children).forEach(
            (question) => {
                // Get the selected answer
                const selectedAnswer = question.querySelector(".selected");
                // Get the correct answer
                const correctAnswer = question.dataset.answer
                    ? he.unescape(question.dataset.answer)
                    : undefined;
                // Console log the result
                console.log({
                    selectedAnswer: selectedAnswer?.textContent,
                    correctAnswer: correctAnswer,
                });
                // Check if the selected answer is correct
                if (correctAnswer) {
                    if (selectedAnswer?.textContent === correctAnswer) {
                        score++;
                    }
                }
            }
        );
        // console.log(`Score: ${score} / ${questions.length}`);

        // Disable the button
        event.target.disabled = true;
        event.target.classList.add("disabled");
        // Change the text to show the score
        event.target.textContent = `Score: ${score} / ${questions.length}`;
    }

    return (
        <>
            <div className="text-xl flex flex-row justify-between items-center mx-10">
                <div>
                    <i>TRIVIA FOR YOUR LEISURE.</i>
                </div>
                <div>
                    <button
                        className="btn btn-red"
                        onClick={() => setReload((reload) => !reload)}>
                        RELOAD
                    </button>
                </div>
            </div>
            <br />
            {loading ? (
                <div>Loading</div>
            ) : (
                <ol className="trivia-wrapper" ref={parentRef}>
                    {questions.map((q, i) => (
                        <li key={i} data-answer={q.correct_answer}>
                            <p className="trivia-question">
                                {i + 1}.{" "}
                                <strong>{he.unescape(q.question)}</strong>
                            </p>
                            <ul className="trivia-answer-wrapper">
                                <li
                                    className="trivia-answer"
                                    onClick={(e) => selectAnswer(e)}>
                                    {he.unescape(q.correct_answer)}
                                </li>
                                {q.incorrect_answers.map((a, j) => (
                                    <li
                                        className="trivia-answer"
                                        onClick={(e) => selectAnswer(e)}
                                        key={j}>
                                        {he.unescape(a)}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                    <li className="flex justify-end text-lg m-10">
                        <button
                            className="btn btn-blue"
                            onClick={(e) => submitAnswer(e)}>
                            CHECK
                        </button>
                    </li>
                </ol>
            )}
        </>
    );
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
