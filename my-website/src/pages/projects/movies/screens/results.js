import React, { useContext, useState } from "react";

import { Context as MovieContext } from "../context/movieContext";
import NavigationContext from "../context/navigation";
//
import { Text } from "../components/text";
import { TheModal } from "../components/modal";
import {
    findGenre,
    movieRecommendations,
    movieGenreMerger,
} from "../recommendationSystem";
import MoviesContainer from "../components/moviesContainer";
import { withMovieContext } from "../components/withMovieContext";

const MovieRecommendation = ({ genres, movies, type }) => {
    const { state } = useContext(MovieContext);
    // Generate recommendations
    const recommendations = movieRecommendations(
        movieGenreMerger(movies.map((el) => el.genre_ids)),
        state.movies,
        []
    ).filter((movie) => movie.score > 1);
    // Get unique movie IDs
    const getUniqueMovieIds = (movies, recommendations) => {
        const movieIds = new Set(movies.map((movie) => movie.id));
        const recommendationsIds = recommendations.map((movie) => movie.id);
        const uniqueMovieIds = recommendationsIds.filter(
            (id) => !movieIds.has(id)
        );

        return uniqueMovieIds;
    };
    // Retrieve recommended movies
    const uniqueMovieIds = getUniqueMovieIds(movies, recommendations);
    const movieRecommendation = state.movies.filter((el) =>
        uniqueMovieIds.includes(el.id)
    );

    return (
        <>
            <Text>Movies Recommended</Text>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    overflowX: "scroll",
                    overflowY: "hidden",
                }}
            >
                {movieRecommendation.map((el) => (
                    <TheModal
                        key={el.id}
                        movieID={el.id}
                        poster={el.backdrop_path}
                        title={type === "TV_SHOWS" ? el.name : el.title}
                        overview={el.overview}
                        release_date={
                            type === "TV_SHOWS"
                                ? el.first_air_date
                                : el.release_date
                        }
                        vote_average={el.vote_average}
                        original_language={el.original_language}
                        type={type}
                    />
                ))}
            </div>
        </>
    );
};
//
const LibraryContent = ({ movies, selectedGenre, type }) => {
    return (
        <MoviesContainer>
            <div style={{ marginTop: -50 }}>
                <Text variant="headlineMedium">{selectedGenre}</Text>
            </div>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                }}
            >
                {movies.map((el) => (
                    <TheModal
                        key={el.id}
                        movieID={el.id}
                        poster={el.backdrop_path}
                        title={type === "TV_SHOWS" ? el.name : el.title}
                        overview={el.overview}
                        release_date={
                            type === "TV_SHOWS"
                                ? el.first_air_date
                                : el.release_date
                        }
                        vote_average={el.vote_average}
                        original_language={el.original_language}
                        type={type}
                    />
                ))}
            </div>
            <MovieRecommendation movies={movies} type={type} />
        </MoviesContainer>
    );
};

const MoviesWithProps = withMovieContext(LibraryContent);

function MyResults() {
    return (
        <>
            <MoviesWithProps additionalProp={null} />
        </>
    );
}

export default MyResults;
