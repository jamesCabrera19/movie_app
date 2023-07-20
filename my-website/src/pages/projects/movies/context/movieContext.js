import createDataContext from "../../../../../context/index";
import movieApi from "../movieAPI/index";

const movieDataReducer = (state, action) => {
    switch (action.type) {
        case "get_data":
            const [tvShows, movies] = action.payload;
            return {
                ...state,
                movies: movies.results,
                tv_shows: tvShows.results,
            };

        default:
            return state;
    }
};

const fetchData = (dispatch) => async () => {
    const TV_SHOWS_ENDPOINT = "/tv/top_rated?language=en-US&page=1";
    const MOVIE_ENDPOINT = "/discover/movie?sort_by=popularity.desc";
    try {
        const responses = await Promise.all(
            [TV_SHOWS_ENDPOINT, MOVIE_ENDPOINT].map((endpoint) =>
                movieApi.get(endpoint)
            )
        );
        const responseData = await Promise.all(
            responses.map((response) => response.data)
        );

        dispatch({
            type: "get_data",
            payload: responseData,
        });
    } catch (error) {
        console.log("ERROR: ", error);
    }
};

export const { Context, Provider } = createDataContext(
    movieDataReducer,
    {
        fetchData,
    }, // action Functions
    { movies: [], tv_shows: [] } // init STATE
);
