import { useContext } from "react";
import { Context as LikedMoviesContext } from "../context/likedMoviesContext";

const useLikedMovies = (movieID) => {
    const { state } = useContext(LikedMoviesContext);

    const upNextSet = new Set(state.upNext);
    const myMoviesSet = new Set(state.myMovies);

    const isMovieInMyMovies = myMoviesSet.has(movieID);
    const isMovieInUpNext = upNextSet.has(movieID);

    // checks if movie is stored in either state context
    return { isMovieInMyMovies, isMovieInUpNext }; // bool
};

export default useLikedMovies;
