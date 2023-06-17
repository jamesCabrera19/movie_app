import React, { useContext, useState } from "react";

import { Context as MovieContext } from "../context/movieContext";
import NavigationContext from "../context/navigation";
//
import { Text } from "../components/text";
import { TheModal } from "../components/modal";
import { genres } from "../components/utils";
import { MovieOrganizer } from "../components/Helpers";
import { findGenre, movieRecommendation } from "../recommendationSystem";

// helper functions

//
const filteredMovies = (moviesIds, moviesArray) => {
    const uniqueMovies = new Set(moviesIds);
    return moviesArray.filter((el) => uniqueMovies.has(el.id));
}; // filters Genre Movies from  state
//

const ContentBasedFiltering = ({ movieIds, selectedGenre }) => {
    const { state } = useContext(MovieContext);
    const userGenresIds = findGenre(["Action", "Comedy"]).map((el) => el.id); // extracting the genre ids
    //

    const recommendations = movieRecommendation(
        userGenresIds,
        state.movies
    ).filter((movie) => movie.score > 0);

    console.log("recommendations: ", recommendations);

    return <div>{recommendations.length}</div>;
};

function MyResults() {
    const {
        state: { movies },
    } = useContext(MovieContext);
    const {
        params: { ids, genre },
    } = useContext(NavigationContext);

    const extractedMovies = filteredMovies(ids, movies);
    return (
        <div style={{ height: "100vh" }}>
            <div style={{ marginLeft: 100 }}>
                <Text variant="headlineMedium">{genre}</Text>
            </div>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "50px 100px 0 100px",
                }}
            >
                {extractedMovies.map((el) => (
                    <TheModal
                        key={el.id}
                        poster={el.backdrop_path}
                        title={el.title}
                        overview={el.overview}
                        release_date={el.release_date}
                        vote_average={el.vote_average}
                        original_language={el.original_language}
                        addButtonOptions={false}
                    />
                ))}
            </div>
            <ContentBasedFiltering movieIds={ids} selectedGenre={genre} />
        </div>
    );
}

export default MyResults;
