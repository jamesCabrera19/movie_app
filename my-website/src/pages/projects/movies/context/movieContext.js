import createDataContext from "../../../../../context/index";
import movieApi from "../movieAPI/index";

const movieDataReducer = (state, action) => {
    switch (action.type) {
        case "get_movies":
            return { ...state, movies: action.payload };
        case "get_tv":
            return { ...state, tv_shows: action.payload };
        default:
            return state;
    }
};

const fetchData = (dispatch) => async (type, endpoint) => {
    const TV_SHOWS_ENDPOINT = "/tv/top_rated?language=en-US&page=1";
    const MOVIE_ENDPOINT = "/discover/movie?sort_by=popularity.desc";
    //
    let selectedEndpoint =
        endpoint === "tv" ? TV_SHOWS_ENDPOINT : MOVIE_ENDPOINT;
    try {
        const response = await movieApi.get(selectedEndpoint);

        dispatch({
            type: type,
            payload: response.data.results,
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
