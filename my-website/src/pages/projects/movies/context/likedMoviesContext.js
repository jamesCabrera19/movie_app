import createDataContext from "../../../../../context/index";

const findMovie = (state, id) => state.includes(id);
const filterMovie = (state, id) => state.filter((el) => el != id);
//
let res;
let movies;
//
const my_movies = "my_movies";
const up_next = "up_next";
const del_my_movies = "del_my_movies";
const del_up_next = "del_up_next";

const initState = [315162, 1003579, 76600, 804150];

const likedMoviesReducer = (state, action) => {
    switch (action.type) {
        case my_movies:
            res = findMovie(state.myMovies, action.payload);
            if (!res) {
                return {
                    ...state,
                    myMovies: [...state.myMovies, action.payload],
                };
            } else {
                return state;
            }

        case del_my_movies:
            movies = filterMovie(state.myMovies, action.payload);
            return { ...state, myMovies: [...movies] };

        case up_next:
            res = findMovie(state.upNext, action.payload);
            if (!res) {
                return {
                    ...state,
                    upNext: [...state.upNext, action.payload],
                };
            } else {
                return state;
            }

        case del_up_next:
            movies = filterMovie(state.upNext, action.payload);
            return { ...state, upNext: [...movies] };

        default:
            return state;
    }
};
function handleDispatch(dispatch) {
    return (location = "", movie = Number) => {
        console.log("dispatch: ", location);
        dispatch({ type: location, payload: movie });
    };
}

export const { Context, Provider } = createDataContext(
    likedMoviesReducer,
    { handleDispatch }, // action Functions
    { upNext: initState, myMovies: initState } // init STATE
);
