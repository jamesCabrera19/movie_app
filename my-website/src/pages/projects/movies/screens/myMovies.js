import { useContext, useEffect, useState, useRef, useCallback } from "react";

import { TheModal } from "../components/modal";
import { Context as MovieContext } from "../context/movieContext";
import {
    findGenre,
    movieGenreMerger,
    movieRecommendation,
} from "../recommendationSystem";
import { Text } from "../components/text";
import MoviesContainer from "../components/moviesContainer";
import { withMovieContext } from "../components/withMovieContext";

//
const Recommendations = ({ genres }) => {
    const { state } = useContext(MovieContext);
    const uniqueGenres = movieGenreMerger(genres);
    //
    const movieRecommendations = movieRecommendation(uniqueGenres, state.movies)
        .filter((movie) => movie.score > 1)
        .map((movie) => movie.id);

    console.log("movieRecommendations", movieRecommendations);

    return (
        <div style={{ color: "white" }}>
            {movieRecommendations.length} recommendations
        </div>
    );
};
const Movies = ({ movies, additionalProp }) => {
    const genres = movies.map((el) => el.genre_ids);

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
            }}
        >
            {movies.map((el) => (
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
            {/* <Recommendations genres={genres} /> */}
        </div>
    );
};

const ContentWithProps = withMovieContext(Movies, "myMovies");

function MyMovies({}) {
    return (
        <MoviesContainer>
            <div style={{ marginTop: -50 }}>
                <Text variant="headlineMedium">My Movies</Text>
            </div>
            <ContentWithProps additionalProp={null} />
        </MoviesContainer>
    );
}

export default MyMovies;
