import { useContext, useEffect, useState } from "react";
// context
import { Context as SettingsContext } from "../context/settingsContext";
import { withMovieContext } from "../components/withMovieContext";
// helper functions
import { MovieRecommendation } from "../components/movieRecommendation";
// components
import { TheModal } from "../components/modal";
import { Text } from "../components/text";
//

const Movies = ({ movies, additionalProp }) => {
    const {
        state: { theme },
    } = useContext(SettingsContext);

    return (
        <>
            <div>
                <Text variant="headlineMedium" color={theme.fontColor}>
                    My movies
                </Text>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
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
    return <ContentWithProps additionalProp={null} />;
}

export default MyMovies;
