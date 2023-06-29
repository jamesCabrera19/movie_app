import React, { useContext } from "react";
// context
import { Context as SettingsContext } from "../context/settingsContext";
import { Context as MovieContext } from "../context/movieContext";
// components
import { TheModal } from "./modal";
import { Text } from "./text";
// helper functions
import {
    movieGenreMerger,
    movieRecommendations,
} from "../recommendationSystem";
//
const MovieRecommendation = ({ movies, type }) => {
    const MINIMUM_SCORE = 1;
    //
    const { state } = useContext(MovieContext);
    const {
        state: { theme },
    } = useContext(SettingsContext);
    // get unique movie genres
    const uniqueMovieGenres = movieGenreMerger(
        movies.map((el) => el.genre_ids)
    );
    // Generate recommendations
    const recommendations = movieRecommendations(
        uniqueMovieGenres, // genres ids
        state.movies, // movie array
        type === "TV_SHOWS" ? state.tv_shows : [] // tv_show array
    ).filter((movie) => movie.score > MINIMUM_SCORE);
    // Get unique movie IDs
    const getUniqueMovieIds = (moviesArray, recommendationsArray) => {
        const movieIds = new Set(moviesArray.map((movie) => movie.id));
        const recommendationsIds = recommendationsArray.map(
            (movie) => movie.id
        );
        const uniqueMovieIds = recommendationsIds.filter(
            (id) => !movieIds.has(id)
        );

        return uniqueMovieIds;
    };
    // Retrieve recommended movies
    const uniqueMovieIds = getUniqueMovieIds(movies, recommendations);
    // helper filtration function
    const movieFiltration = (array) => {
        return array.filter((el) => uniqueMovieIds.includes(el.id));
    };
    // Recommendation Results
    const tvShowsRecommended = movieFiltration(state.tv_shows);
    const moviesRecommended = movieFiltration(state.movies).concat(
        tvShowsRecommended
    );

    if (!type) {
        return new Error(
            `No movie or tv show provided, type should be "MY_MOVIES" or "TV_SHOWS"`
        );
    }

    if (!moviesRecommended.length) {
        return null;
    }

    return (
        <div style={{ marginTop: 50 }}>
            <Text color={theme.fontColor} variant="headlineExtraSmall">
                Recommendations
            </Text>
            <div
                style={{
                    scrollbarWidth: "none",
                    display: "flex",
                    flexDirection: "row",
                    overflowX: "scroll",
                    overflowY: "hidden",
                    height: 180,
                }}
            >
                {moviesRecommended.map((el) => (
                    <TheModal
                        key={el.id}
                        movieID={el.id}
                        poster={el.backdrop_path}
                        title={el.name || el.title}
                        overview={el.overview}
                        release_date={el.first_air_date || el.release_date}
                        vote_average={el.vote_average}
                        original_language={el.original_language}
                        type={type}
                    />
                ))}
            </div>
        </div>
    );
};

export { MovieRecommendation };
