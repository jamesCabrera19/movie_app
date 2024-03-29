import React, { useContext } from "react";
// context
import { withExtractedMovies } from "../components/withExtractedMovies";

import { Context as settingsContext } from "../context/settingsContext";

// helper functions
import { MovieRecommendation } from "../components/movieRecommendation";

// components
import { TheModal } from "../components/modal";
import { Text } from "../components/text";
//
const LibraryContent = ({ movies, selectedGenre, type }) => {
    const {
        state: { theme },
    } = useContext(settingsContext);
    //
    // console.log("Running");
    return (
        <>
            <div style={{ marginTop: -50 }}>
                <Text variant="headlineMedium" color={theme.fontColor}>
                    {selectedGenre}
                </Text>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {movies.map((el) => (
                    <TheModal
                        key={el.id}
                        {...el}
                        title={el.title || el.name}
                        poster={el.backdrop_path || el.poster_path}
                        release_date={el.release_date || el.first_air_date}
                        type={type}
                    />
                ))}
            </div>

            <MovieRecommendation movies={movies} type={type} />
        </>
    );
};

const MoviesWithProps = withExtractedMovies(LibraryContent);

function MyResults() {
    return <MoviesWithProps additionalProp={null} />;
}

export default MyResults;
