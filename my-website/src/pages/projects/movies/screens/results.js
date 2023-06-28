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
import { MovieRecommendation } from "../components/movieRecommendation";
//
const LibraryContent = ({ movies, selectedGenre, type }) => {
    return (
        <MoviesContainer>
            <div style={{ marginTop: -50 }}>
                <Text variant="headlineMedium">{selectedGenre}</Text>
            </div>
            <div>
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
