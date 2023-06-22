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

const fetchMovies = (dispatch) => async () => {
    try {
        const response = await movieApi.get(
            "/discover/movie?sort_by=popularity.desc"
        );

        dispatch({
            type: "get_movies",
            payload: response.data.results,
        });
    } catch (error) {
        console.log("fetchMovies ERROR");
    }
};
const fetchTVData = (dispatch) => async () => {
    try {
        const response = await movieApi.get(
            "/tv/top_rated?language=en-US&page=1"
        );
        dispatch({
            type: "get_tv",
            payload: response.data.results,
        });
    } catch (error) {
        console.log("fetchMovies ERROR");
    }
};

export const { Context, Provider } = createDataContext(
    movieDataReducer,
    {
        fetchMovies,
        fetchTVData,
    }, // action Functions
    { movies: [], tv_shows: [] } // init STATE
);
