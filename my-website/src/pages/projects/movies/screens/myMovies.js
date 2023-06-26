import { useContext, useEffect, useState, useRef, useCallback } from "react";

import { TheModal } from "../components/modal";
import { Context as MovieContext } from "../context/movieContext";
import {
    findGenre,
    movieGenreMerger,
    movieRecommendation,
    movieRecommendations,
} from "../recommendationSystem";
import { Text } from "../components/text";
import MoviesContainer from "../components/moviesContainer";
import { withMovieContext } from "../components/withMovieContext";

//
const Recommendations = ({ genres }) => {
    const {
        state: { movies, tv_shows },
    } = useContext(MovieContext);
    // collection of unique genres
    const uniqueGenres = movieGenreMerger(genres);
    //
    const recommendations = movieRecommendations(uniqueGenres, movies, tv_shows)
        .filter((movie) => movie.score > 1)
        .map((movie) => {
            return movie.title + "----" + movie.score;
        });

    return (
        <div style={{ color: "white" }}>
            {recommendations.map((el) => (
                <li key={el}>{el}</li>
            ))}
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
                    type="MY_MOVIES" //
                />
            ))}
            <Recommendations genres={genres} />
        </div>
    );
};

const ContentWithProps = withMovieContext(Movies, "MY_MOVIES");

function MyMovies({}) {
    return (
        <>
            <MoviesContainer>
                <div style={{}}>
                    <Text variant="headlineMedium">My Movies</Text>
                </div>
                <ContentWithProps additionalProp={null} />
            </MoviesContainer>
        </>
    );
}

export default MyMovies;
