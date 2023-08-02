import React, { useContext } from "react";
// context
import { Context as LikedMoviesContext } from "../context/likedMoviesContext";
import { Context as SettingsContext } from "../context/settingsContext";
import { Context as MovieContext } from "../context/movieContext";
import memoizeOne from "memoize-one";
// helper functions
import NavigationContext from "../context/navigation";
//
// helper functions
const filteredMovies = memoizeOne((moviesIds, moviesArray) => {
    const uniqueMovies = new Set(moviesIds);
    return moviesArray.filter((el) => uniqueMovies.has(el.id));
});

export const withMovieContext = (WrappedComponent, defaultType) => {
    // Return a new component that wraps the original component
    return (props) => {
        // Access the context values using useContext
        // * when user clicks on genre 'see all' button the row ids are collected and passed down as params
        const {
            params: { ids, genre, type },
        } = useContext(NavigationContext);
        //
        const {
            state: { myMovies },
        } = useContext(LikedMoviesContext); // saved movie ids
        // data state
        const {
            state: { movies, tv_shows },
        } = useContext(MovieContext);
        // theme state
        const {
            state: { theme },
        } = useContext(SettingsContext);
        //
        //
        let myType = defaultType ? defaultType : type;
        let extractedMovies = [];

        // console.log(myMovies);

        switch (myType) {
            case "MOVIES":
                extractedMovies = filteredMovies(ids, movies);
                break;
            case "TV_SHOWS":
                extractedMovies = filteredMovies(ids, tv_shows);
                break;
            case "MY_MOVIES":
                const extractedTVshows = filteredMovies(myMovies, tv_shows);
                const moviesFiltered = filteredMovies(myMovies, movies);
                extractedMovies = [...extractedTVshows, ...moviesFiltered];
                break;
            default:
                break;
        }
        // Pass the context values as props to the wrapped component
        return (
            <div
                style={{
                    backgroundColor: theme.backgroundColor,
                    padding: 100,
                }}
            >
                <WrappedComponent
                    movies={extractedMovies}
                    selectedGenre={genre}
                    type={type}
                    {...props}
                />
            </div>
        );
    };
};
