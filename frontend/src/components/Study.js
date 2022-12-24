import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Study() {
    const [courses, setCourses] = useState([]);
    let { logout } = useContext(AuthContext);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/backend/courses/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        })
            .then((response) => {
                if (response.status !== 200) {
                    return response.json().then((data) => {
                        throw new Error(
                            `${response.status} ${response.statusText}\n${data.detail}`
                        );
                    });
                }
                return response.json();
            })
            .then((data) => {
                // console.log("Success: " + data);
                setCourses(data);
            })
            .catch((errorMessage) => {
                alert(errorMessage);
                // Sign the user out
                logout();
            });
    }, []);

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl font-mono">Study</h1>
            <p className="text-2xl font-mono">Welcome to the Study room</p>
            <ul>
                {courses.map((course, index) => (
                    <li key={index} className="text-sky-500">
                        {course.course_name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
