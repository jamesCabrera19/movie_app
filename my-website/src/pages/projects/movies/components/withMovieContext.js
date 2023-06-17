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

export const withMovieContext = (WrappedComponent, useParams) => {
    // Return a new component that wraps the original component
    return (props) => {
        // Access the context values using useContext
        const {
            state: { movies },
        } = useContext(MovieContext);
        const {
            state: { myMovies },
        } = useContext(LikedMoviesContext); // saved movie ids
        const {
            params: { ids, genre },
        } = useContext(NavigationContext);
        //
        let extractedMovies = useParams
            ? filteredMovies(ids, movies)
            : filteredMovies(myMovies, movies);

        // Pass the context values as props to the wrapped component
        return (
            <WrappedComponent
                movies={extractedMovies}
                selectedGenre={genre}
                {...props}
            />
        );
    };
};
