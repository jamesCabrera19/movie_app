import createDataContext from "../../../../../context/index";
//
//helper functions
const findMovie = (state, id) => state.includes(id);
const filterMovie = (state, id) => state.filter((el) => el != id);
//
const initialState = {
    myMovies: [315162, 1003579, 76600, 804150],
    upNext: [315162, 1003579, 76600, 804150],
};

const likedMoviesReducer = (state, action) => {
    switch (action.type) {
        case "my_movies":
            if (!findMovie(state.myMovies, action.payload)) {
                return {
                    ...state,
                    myMovies: [...state.myMovies, action.payload],
                };
            }
            return state;

        case "del_my_movies":
            return {
                ...state,
                myMovies: filterMovie(state.myMovies, action.payload),
            };

        case "up_next":
            if (!findMovie(state.upNext, action.payload)) {
                return {
                    ...state,
                    upNext: [...state.upNext, action.payload],
                };
            }
            return state;

        case "del_up_next":
            return {
                ...state,
                upNext: filterMovie(state.upNext, action.payload),
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
    initialState // init STATE
);
