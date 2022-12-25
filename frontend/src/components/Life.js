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
    let selectable = true;

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
        if (selectable) {
            const parent = event.target.parentNode;
            const siblings = Array.from(parent.children).filter(
                (child) => child !== event.target
            );

            siblings.forEach((sibling) => {
                sibling.classList.remove("selected");
            });

            event.target.classList.add("selected");
        }
    }

    function submitAnswer(event) {
        let score = 0;
        // The last question is the submit button which is not a question, so it will show up as undefined
        Array.from(parentRef.current.children).forEach((question) => {
            // Disable the ability to select answers
            selectable = false;
            // Get the selected answer
            let selectedAnswer = question.querySelector(".selected");
            selectedAnswer?.classList.remove("selected");
            selectedAnswer?.classList.add("show");
            // Get the correct answer
            const correctAnswer = question.dataset.answer
                ? he.unescape(question.dataset.answer)
                : undefined;
            // Get the correct answer element
            question.querySelectorAll(".trivia-answer").forEach((answer) => {
                if (answer.textContent === correctAnswer) {
                    answer.classList.add("correct");
                }
            });
            // Console log the result
            console.log({
                selectedAnswer: selectedAnswer?.textContent,
                correctAnswer: correctAnswer,
            });
            // Check if the selected answer is correct
            if (correctAnswer) {
                if (selectedAnswer?.textContent === correctAnswer) {
                    // Slightly green out the background of the entire question
                    question.style.backgroundColor = "rgba(0, 255, 0, 0.05)";
                    score++;
                } else {
                    // Slightly gray out the background of the entire question
                    question.style.backgroundColor = "rgba(0, 0, 0, 0.10)";
                }
            }
        });
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
                // <div>Loading</div>
                // Add a div with the text "Loading" and the icon "load.png" in the same folder
                <div className="flex flex-row gap-x-4 text-5xl">
                    <p className="font-mono">Loading</p>
                    <img src={require("../load.png")} alt="Refresh icon" />
                    <p className="text-sm opacity-50">
                        <a
                            target="_blank"
                            href="https://icons8.com/icon/Gtd77uwrkdpc/refresh">
                            Refresh
                        </a>{" "}
                        icon by{" "}
                        <a target="_blank" href="https://icons8.com">
                            Icons8
                        </a>
                    </p>
                </div>
            ) : (
                <ol className="trivia-wrapper" ref={parentRef}>
                    {questions.map((q, i) => (
                        <li key={i} data-answer={q.correct_answer}>
                            <p className="trivia-question">
                                {i + 1}.{" "}
                                <strong>{he.unescape(q.question)}</strong>
                            </p>
                            <ul className="trivia-answer-wrapper">
                                {randomizeArray([
                                    ...q.incorrect_answers,
                                    q.correct_answer,
                                ]).map((a, j) => {
                                    return (
                                        <li
                                            className="trivia-answer"
                                            onClick={(e) => selectAnswer(e)}
                                            key={j}>
                                            {he.unescape(a)}
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    ))}
                    <li className="submit-li">
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
function randomizeArray(array) {
    // console.log("Initial:" + array);
    let randomziedArray = [];
    while (array.length > 0) {
        const random = Math.floor(Math.random() * array.length);
        randomziedArray.push(array[random]);
        array.splice(random, 1);
    }
    return randomziedArray;
}
