import React, { useContext, useState } from "react";

import { Context as MovieContext } from "../context/movieContext";
import NavigationContext from "../context/navigation";
//
import { Text } from "../components/text";
import { TheModal } from "../components/modal";
import { findGenre, movieRecommendation } from "../recommendationSystem";
import MoviesContainer from "../components/moviesContainer";
import { withMovieContext } from "../components/withMovieContext";

//
const Content = ({ movies, selectedGenre }) => {
    const genres = movies.map((el) => el.genre_ids);
    // console.log(genres);
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
        </MoviesContainer>
    );
};

const ContentWithProps = withMovieContext(Content, "movies");

function MyResults() {
    return <ContentWithProps />;
}

export default MyResults;
