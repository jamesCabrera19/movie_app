import { useContext, useEffect, useState, useRef, useCallback } from "react";

import { useRouter } from "next/router";

import { Text } from "../components/text";
import { theme as movieTheme } from "../styles";
import { TheModal } from "../components/modal";
import { Context as MovieContext } from "../context/movieContext";
import { Context as LikedMoviesContext } from "../context/likedMoviesContext";

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
                justifyContent: "space-evenly",
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
                    switchButtons={true}
                    movieID={el.id}
                />
            ))}
        </div>
    );
};

function MyMovies({}) {
    const theme = movieTheme;
    return (
        <div
            style={{ backgroundColor: theme.backgroundColor, height: "100vh" }}
        >
            <Content />
        </div>
    );
}

export default MyMovies;
