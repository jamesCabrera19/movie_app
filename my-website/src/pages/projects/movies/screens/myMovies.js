import { useContext, useEffect, useState, useRef, useCallback } from "react";

import { useRouter } from "next/router";
import Overlay from "react-bootstrap/Overlay";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Text } from "../components/text";
import { theme as movieTheme } from "../styles";
import { TheModal } from "../components/modal";
import { Context as MovieContext } from "../context/movieContext";
import { Context as LikedMoviesContext } from "../context/likedMoviesContext";
import { ImageLoader } from "../components/utils";

//

const Content = () => {
    const {
        state: { myMovies },
    } = useContext(LikedMoviesContext);
    const { state } = useContext(MovieContext);

    const res = useCallback(() => {
        return state.movies.filter((el) => myMovies.includes(el.id));
    }, [myMovies]);

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                height: "100vh",
            }}
        >
            {res().map((el) => (
                <TheModal
                    key={el.id}
                    poster={el.backdrop_path}
                    title={el.title}
                    overview={el.overview}
                    release_date={el.release_date}
                    vote_average={el.vote_average}
                    original_language={el.original_language}
                    addButtonOptions={false}
                    buttons={["add to Up Next", "remove from My Movies"]}
                />
            ))}
        </div>
    );
};

function MyMovies({}) {
    const theme = movieTheme;
    return (
        <div style={{ backgroundColor: theme.backgroundColor }}>
            <Content />
        </div>
    );
}

export default MyMovies;
