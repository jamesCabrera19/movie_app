import React, { useState } from "react";

import { useRouter } from "next/router";

const img_src = `https://image.tmdb.org/t/p/w500/irwQcdjwtjLnaA0iErabab9PrmG.jpg`;

const Context = React.createContext();

export default function TestComponent({ children }) {
    const router = useRouter();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [movie, setMovie] = useState({
        backdrop_path: img_src,
        title: "Movie App",
        overview:
            "App created with the most recent versions of React, NextJS, useContext API, and Axios.",
        release_date: "11/11/22",
        vote_average: 10,
        original_language: "EN",
    });
    const openModal = (movieID) => (e) => {
        e.preventDefault();
        router.push(`${router.pathname}/?movie=${movieID}`);
        const theMovie = movies.filter((el) => el.id === movieID)[0];
        setMovie(theMovie);
        handleShow();
    };

    const closeModal = () => (e) => {
        router.push(router.pathname, undefined, { shallow: true });
        handleClose();
    };

    return (
        <Context.Provider value={{ state, ...actionsCreators }}>
            {children}
        </Context.Provider>
    );
}
