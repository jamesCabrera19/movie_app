import createDataContext from "../../../../../context/index";
import movieApi from "../movieAPI/index";

const movieDataReducer = (state, action) => {
    switch (action.type) {
        case "get_movies":
            return { ...state, movies: action.payload };
        default:
            return state;
    }
};

const fetchMovies = (dispatch) => async () => {
    try {
        const res = await movieApi.get(
            "/discover/movie?sort_by=popularity.desc"
        );

        dispatch({
            type: "get_movies",
            payload: res.data.results,
        });
    } catch (error) {
        console.log("fetchMovies ERROR");
    }
};

export const { Context, Provider } = createDataContext(
    movieDataReducer,
    {
        fetchMovies,
    }, // action Functions
    { movies: [] } // init STATE
);
