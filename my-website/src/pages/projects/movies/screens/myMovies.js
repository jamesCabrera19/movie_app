import { useContext, useEffect, useState, useRef, useCallback } from "react";

import { TheModal } from "../components/modal";
import { Context as MovieContext } from "../context/movieContext";
import { Context as ThemeContext } from "../context/settingsContext";

import { Context as LikedMoviesContext } from "../context/likedMoviesContext";
import {
    findGenre,
    movieGenreMerger,
    movieRecommendation,
} from "../recommendationSystem";

//
const Recommendations = ({ genres }) => {
    const { state } = useContext(MovieContext);
    const uniqueGenres = movieGenreMerger(genres);
    //
    const movieRecommendations = movieRecommendation(uniqueGenres, state.movies)
        .filter((movie) => movie.score > 1)
        .map((movie) => movie.id);

    console.log("movieRecommendations", movieRecommendations);

    return <div>{movieRecommendations.length}</div>;
};

const Content = () => {
    const {
        state: { myMovies },
    } = useContext(LikedMoviesContext); // saved movie ids

    // movie object state array
    const { state } = useContext(MovieContext);

    const movies = useCallback(() => {
        // creating a set of unique movie ids
        const movieIdSet = new Set(myMovies);
        return state.movies.filter((el) => movieIdSet.has(el.id));
    }, [myMovies]);

    const genres = movies().map((el) => el.genre_ids);

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
            }}
        >
            {movies().map((el) => (
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

            <Recommendations genres={genres} />
        </div>
    );
};

function MyMovies({}) {
    const {
        state: { theme },
    } = useContext(ThemeContext);

    console.log("this screen is:MyMovies ");

    return (
        <div
            style={{ backgroundColor: theme.backgroundColor, height: "100vh" }}
        >
            <Content />
        </div>
    );
}

export default MyMovies;
