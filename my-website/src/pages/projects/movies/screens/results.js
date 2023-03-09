import React, { useContext, useState } from "react";

import { Context as MovieContext } from "../context/movieContext";
import NavigationContext from "../context/navigation";
import { Text } from "../components/text";
import MyCard from "../components/myCard";
import { MyModal } from "../components/modal";
const img_src = `https://image.tmdb.org/t/p/w500/irwQcdjwtjLnaA0iErabab9PrmG.jpg`;

const SharedComponent = ({ movies }) => {
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
    //  /22z44LPkMyf5nyyXvv8qQLsbom.jpg
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
                    // onClick, poster, movieID, sizePercent, buttonPosition
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

function MyResults() {
    const {
        state: { movies },
    } = useContext(MovieContext);
    const { params: ids } = useContext(NavigationContext);
    //
    const [myMovies, setMyMovies] = useState([]);
    const someIds = [631842, 1011679, 646389, 965839, 772515];
    //
    const filterMovies = (ids) => {
        setMyMovies(movies.filter((el) => ids.includes(el.id)));
    };
    //
    // console.log(myMovies);
    return (
        <div>
            <Text>this is MyResults section</Text>
            <button
                onClick={() => {
                    filterMovies(someIds);
                }}
            >
                find ids
            </button>
            {myMovies.length !== 0 ? (
                <SharedComponent movies={myMovies} />
            ) : null}
        </div>
    );
}

export default MyResults;
