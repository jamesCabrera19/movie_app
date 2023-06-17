import createDataContext from "../../../../../context/index";
//helper functions
const isMovieIncluded = (state, id) => state.includes(id);
const filterOutMovie = (state, id) => state.filter((el) => el !== id);

const likedMoviesReducer = (state, action) => {
    switch (action.type) {
        case "my_movies":
            if (!isMovieIncluded(state.myMovies, action.payload)) {
                return {
                    ...state,
                    myMovies: [...state.myMovies, action.payload],
                };
            }
            return state;

        case "del_my_movies":
            return {
                ...state,
                myMovies: filterOutMovie(state.myMovies, action.payload),
            };

        case "up_next":
            if (!isMovieIncluded(state.upNext, action.payload)) {
                return {
                    ...state,
                    upNext: [...state.upNext, action.payload],
                };
            }
            return state;

        case "del_up_next":
            return {
                ...state,
                upNext: filterOutMovie(state.upNext, action.payload),
            };

        default:
            return state;
    }
};
function handleDispatch(dispatch) {
    return (location = "", movie) => {
        console.log("dispatch: ", location, "movie id: ", movie);
        dispatch({ type: location, payload: movie });
    };
}

export const { Context, Provider } = createDataContext(
    likedMoviesReducer,
    { handleDispatch }, // action Functions
    {
        myMovies: [603692, 1074034, 324857, 502356, 569094],
        upNext: [315162, 1003579, 76600, 804150],
    } // init STATE
);
