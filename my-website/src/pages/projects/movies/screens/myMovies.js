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

    // console.log(movies[0], movies[1]);

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
                        {...el}
                        title={el.title || el.name}
                        poster={el.backdrop_path || el.poster_path}
                        release_date={el.release_date || el.first_air_date}
                        type={el.name ? "TV_SHOWS" : "MY_MOVIES"} //
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
