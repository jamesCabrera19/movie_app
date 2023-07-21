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
import movieApi from "../movieAPI";
//

const DataFetcher = ({ endpoint, render }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const responses = await Promise.all(
                    endpoint.map((endpoint) => movieApi.get(endpoint))
                );
                const responseData = await Promise.all(
                    responses.map((response) => response.data)
                );
                setData(responseData);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return render({ data, error, isLoading });
};
const DataResults = () => {
    //  `/tv/${id}/credits?language=en-US`,
    //  `/tv/${id}/reviews?language=en-US&page=1`,
    // movie/${id}/credits
    // tv show id 1396
    // movie id 667538

    const parsedData = (data) => {
        return (
            (acc, curr) => {
                return {
                    reviews: curr.results || acc.results,
                    // crew: curr.crew || acc.crew,
                    cast: curr.cast || acc.cast,
                };
            },
            { results: [], crew: [], cast: [] }
        );
    };
    return (
        <DataFetcher
            endpoint={[
                "/tv/1396/credits?language=en-US",
                "/tv/1396/reviews?language=en-US&page=1",
            ]}
            render={({ data }) => console.log("DataResults: ", data)}
        />
    );
};

const Movies = ({ movies, additionalProp }) => {
    // const genres = movies.map((el) => el.genre_ids);
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
            <DataResults />
        </>
    );
};

const ContentWithProps = withMovieContext(Movies, "MY_MOVIES");
function MyMovies() {
    return <ContentWithProps additionalProp={null} />;
}

export default MyMovies;
