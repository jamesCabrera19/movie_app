import createDataContext from "../../../../../context/index";

const findMovie = (state, item) => state.includes(item);
const filterMovie = (state, item) => state.filter((el) => el != item);

const likedMoviesReducer = (state, action) => {
    switch (action.type) {
        case "my_movies":
            if (findMovie(state.savedMovies, action.payload)) {
                return state;
            } else {
                return {
                    ...state,
                    savedMovies: [...state.savedMovies, action.payload],
                };
            }
        case "delete_my_movies":
            let movies = filterMovie(state.savedMovies, action.payload);
            return { ...state, savedMovies: [...movies] };

        case "liked_movies":
            if (findMovie(state.likedMovies, action.payload)) {
                return state;
            } else {
                return {
                    ...state,
                    likedMovies: [...state.likedMovies, action.payload],
                };
            }
        case "delete_liked_movies":
            movies = filterMovie(state.likedMovies, action.payload);
            return { ...state, likedMovies: [...movies] };

        default:
            return state;
    }
};

const handleMovie =
    (dispatch) =>
    (location = "", movie = Number) => {
        dispatch({ type: location, payload: movie });
    };
export const { Context, Provider } = createDataContext(
    likedMoviesReducer,
    { handleMovie }, // action Functions
    { likedMovies: [], savedMovies: [] } // init STATE
);
