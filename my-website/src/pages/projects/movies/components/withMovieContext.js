import React, { useState, useContext } from "react";
import { Context as LikedMoviesContext } from "../context/likedMoviesContext";
import { Context as MovieContext } from "../context/movieContext";
import NavigationContext from "../context/navigation";
import memoizeOne from "memoize-one";
// helper functions

const filteredMovies = memoizeOne((moviesIds, moviesArray) => {
    const uniqueMovies = new Set(moviesIds);
    return moviesArray.filter((el) => uniqueMovies.has(el.id));
});

export const withMovieContext = (WrappedComponent, defaultType) => {
    // Return a new component that wraps the original component
    return (props) => {
        // Access the context values using useContext
        const {
            params: { ids, genre, type },
        } = useContext(NavigationContext);
        //
        const {
            state: { myMovies },
        } = useContext(LikedMoviesContext); // saved movie ids
        const { state } = useContext(MovieContext);
        //
        //
        let myType = defaultType ? defaultType : type;
        let extractedMovies = [];

        console.log("withMovieContext : ", defaultType);

        switch (myType) {
            case "MOVIES":
                extractedMovies = filteredMovies(ids, state.movies);
                break;
            case "TV_SHOWS":
                extractedMovies = filteredMovies(ids, state.tv_shows);
                break;
            case "MY_MOVIES":
                extractedMovies = filteredMovies(myMovies, state.movies);
                break;
            default:
                break;
        }
        // Pass the context values as props to the wrapped component
        return (
            <WrappedComponent
                movies={extractedMovies}
                selectedGenre={genre}
                type={type}
                {...props}
            />
        );
    };
};
