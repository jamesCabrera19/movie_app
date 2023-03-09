import { useContext, useEffect, useState, useRef, Children } from "react";

import { useRouter } from "next/router";
import Overlay from "react-bootstrap/Overlay";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Text } from "../components/text";
import { theme as movieTheme } from "../styles";
import { MyModal } from "../components/modal";
import { Context as MovieContext } from "../context/movieContext";
import { ImageLoader } from "../components/utils";

//
const img_src = `https://image.tmdb.org/t/p/w500/irwQcdjwtjLnaA0iErabab9PrmG.jpg`;

const MyCard = ({ onClick, poster, movieID }) => {
    return (
        <div
            onClick={onClick(movieID)}
            style={{
                height: 130,
                width: 230,
                margin: 10,
            }}
        >
            <Image
                alt="Movie Poster"
                loader={ImageLoader}
                src={poster}
                width={230}
                height={130}
                style={{
                    borderRadius: 10,
                    boxShadow: "0 1px 1px rgba(0, 0, 0, 0.5)",
                }}
            />
        </div>
    );
};

const SharedComponent = () => {
    const {
        state: { movies },
    } = useContext(MovieContext);
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
        // router.push(`${router.pathname}/?movie=${movieID}`);
        const theMovie = movies.filter((el) => el.id === movieID)[0];
        setMovie(theMovie);
        handleShow();
    };

    const closeModal = () => (e) => {
        // router.push(router.pathname, undefined, { shallow: true });
        handleClose();
    };
    return (
        <MyModal show={show} onClick={closeModal} movie={movie}>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                }}
            >
                {movies.map((el) => (
                    <MyCard
                        onClick={openModal}
                        key={el.id}
                        poster={el.backdrop_path}
                        movieID={el.id}
                        sizePercent={-0.0}
                        buttonPosition={null}
                    />
                ))}
            </div>
        </MyModal>
    );
};

function MyMovies({}) {
    const {
        state: { movies },
    } = useContext(MovieContext);
    const theme = movieTheme;
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
        // router.push(`${router.pathname}/?movie=${movieID}`);
        const theMovie = movies.filter((el) => el.id === movieID)[0];
        setMovie(theMovie);
        handleShow();
    };

    const closeModal = () => (e) => {
        // router.push(router.pathname, undefined, { shallow: true });
        handleClose();
    };

    return (
        <div>
            <SharedComponent />
            {/* <MyModal show={show} onClick={closeModal} movie={movie}>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                    }}
                >
                    {movies.map((el) => (
                        <MyCard
                            onClick={openModal}
                            key={el.id}
                            poster={el.backdrop_path}
                            movieID={el.id}
                        />
                    ))}
                </div>
            </MyModal> */}
        </div>
    );
}

export default MyMovies;
