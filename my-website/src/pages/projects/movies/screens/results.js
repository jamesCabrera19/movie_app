import React, { useContext } from "react";
// context
import { withMovieContext } from "../components/withMovieContext";
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
        </>
    );
};

const MoviesWithProps = withMovieContext(LibraryContent);

function MyResults() {
    return <MoviesWithProps additionalProp={null} />;
}

export default MyResults;
