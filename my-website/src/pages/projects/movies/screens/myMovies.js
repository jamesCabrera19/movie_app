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
                        movieID={el.id}
                        poster={el.backdrop_path}
                        title={el.name || el.title}
                        overview={el.overview}
                        release_date={el.first_air_date || el.release_date}
                        vote_average={el.vote_average}
                        original_language={el.original_language}
                        // IF el has a 'name' property, el IS a tv show
                        // IF el has a 'title' property, el IS a movie
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
