import { useContext, useEffect, useState, useRef, useCallback } from "react";

import { TheModal } from "../components/modal";
import { Context as SettingsContext } from "../context/settingsContext";
import {
    movieGenreMerger,
    movieRecommendations,
} from "../recommendationSystem";
import { Text } from "../components/text";
import MoviesContainer from "../components/moviesContainer";
import { withMovieContext } from "../components/withMovieContext";
import { MovieRecommendation } from "../components/movieRecommendation";
//

const Movies = ({ movies, additionalProp }) => {
    // const genres = movies.map((el) => el.genre_ids);
    const {
        state: { theme },
    } = useContext(SettingsContext);

    return (
        <>
            <div style={{}}>
                <Text variant="headlineMedium" color={theme.fontColor}>
                    My movies
                </Text>
            </div>
            <div>
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
            </div>
            <MovieRecommendation movies={movies} type={"MY_MOVIES"} />
        </>
    );
};
const ContentWithProps = withMovieContext(Movies, "MY_MOVIES");

function MyMovies() {
    return (
        <>
            <MoviesContainer>
                <ContentWithProps additionalProp={null} />
            </MoviesContainer>
        </>
    );
}

export default MyMovies;
