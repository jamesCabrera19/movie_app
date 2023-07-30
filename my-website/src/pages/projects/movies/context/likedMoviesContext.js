import createDataContext from "../../../../../context/index";
//helper functions - adds or removes movies to the or from the state
const toggleMovieInState = (state, movie, key) => {
    const isMovieIncluded = state[key].includes(movie);
    return {
        ...state,
        [key]: isMovieIncluded
            ? state[key].filter((el) => el !== movie)
            : [...state[key], movie],
    };
};

const likedMoviesReducer = (state, action) => {
    switch (action.type) {
        case "my_movies":
            return toggleMovieInState(state, action.payload, "myMovies");

        case "del_my_movies":
            return toggleMovieInState(state, action.payload, "myMovies");

        case "up_next":
            return toggleMovieInState(state, action.payload, "upNext");

        case "del_up_next":
            return toggleMovieInState(state, action.payload, "upNext");

        default:
            return state;
    }
};
function handleDispatch(dispatch) {
    return (action, movie) => {
        // console.log("dispatch: ", action, "movie id: ", movie);
        dispatch({ type: action, payload: movie });

        // actions: [del_up_next,up_next,del_my_movies,my_movies]
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
