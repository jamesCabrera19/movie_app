import React, { useContext } from "react";
import { Context as MovieContext } from "../context/movieContext";
import { Context as SettingsContext } from "../context/settingsContext";

import { TheModal } from "./modal";
import {
    movieGenreMerger,
    movieRecommendations,
} from "../recommendationSystem";
import { Text } from "./text";

//
//
const MovieRecommendation = ({ movies, type }) => {
    const MINIMUM_SCORE = 1;
    //
    const {
        state: { theme },
    } = useContext(SettingsContext);
    //
    const { state } = useContext(MovieContext);
    // get unique movie genres
    const uniqueMovieGenres = movieGenreMerger(
        movies.map((el) => el.genre_ids)
    );
    // Generate recommendations
    const recommendations = movieRecommendations(
        uniqueMovieGenres, // genres ids
        state.movies, // movie array
        [] // tv_show array
    ).filter((movie) => movie.score > MINIMUM_SCORE);
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

    if (!type) {
        return new Error(
            `No movie or tv show provided, type should be "MY_MOVIES" or "TV_SHOWS"`
        );
    }

    return (
        <div style={{ marginTop: 50 }}>
            <Text color={theme.fontColor} variant="headlineSmall">
                Movies Recommended
            </Text>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    overflowX: "scroll",
                    overflowY: "hidden",
                    height: 200,
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
        </div>
    );
};

export { MovieRecommendation };
