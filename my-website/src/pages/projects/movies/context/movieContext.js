import createDataContext from "../../../../../context/index";
import movieApi from "../movieAPI/index";

const ENDPOINTS = [
    "/tv/top_rated?language=en-US&page=1",
    "/discover/movie?sort_by=popularity.desc",
];

const movieDataReducer = (state, action) => {
    switch (action.type) {
        case "get_data":
            return action.payload;
        default:
            return state;
    }
};

const fetchData = (dispatch) => async () => {
    try {
        const responses = await Promise.all(
            ENDPOINTS.map((endpoint) => movieApi.get(endpoint))
        );
        const responseData = await Promise.all(
            responses.map((response) => response.data)
        );
        // data
        const [tvShows, movies] = responseData;
        // state object
        const data = { movies: movies.results, tv_shows: tvShows.results };

        dispatch({
            type: "get_data",
            payload: data,
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export const { Context, Provider } = createDataContext(
    movieDataReducer,
    {
        fetchData,
    }, // action Functions
    { movies: [], tv_shows: [] } // init STATE
);
