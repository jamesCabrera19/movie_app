import React, { useContext } from "react";
// context
import { Context as LikedMoviesContext } from "../context/likedMoviesContext";
import { Context as SettingsContext } from "../context/settingsContext";
import { Context as MovieContext } from "../context/movieContext";
import memoizeOne from "memoize-one";
// helper functions
import NavigationContext from "../context/navigation";
//
// Helper function for filtering movies based on IDs
const filteredMovies = memoizeOne((moviesIds, moviesArray) => {
    const uniqueMovies = new Set(moviesIds);
    return moviesArray.filter((el) => uniqueMovies.has(el.id));
});

export const withExtractedMovies = (WrappedComponent, defaultType) => {
    // Return a new component that wraps the original component
    return (props) => {
        // Access the context values using useContext
        // Get parameters from NavigationContext
        const {
            params: { ids, genre, type },
        } = useContext(NavigationContext);

        // Get saved movie IDs from LikedMoviesContext
        const {
            state: { myMovies },
        } = useContext(LikedMoviesContext);

        // Get data state (movies and TV shows) from MovieContext
        const {
            state: { movies, tv_shows },
        } = useContext(MovieContext);

        // Get theme state from SettingsContext
        const {
            state: { theme },
        } = useContext(SettingsContext);

        // Determine the type of movies to extract based on defaultType or type from NavigationContext
        let selectedType = defaultType ? defaultType : type;
        let extractedMovies = [];

        // Switch statement to extract movies based on the selected type
        switch (selectedType) {
            case "MOVIES":
                extractedMovies = filteredMovies(ids, movies);
                break;
            case "TV_SHOWS":
                extractedMovies = filteredMovies(ids, tv_shows);
                break;
            case "MY_MOVIES":
                // Combine filtered TV shows and movies to get user's liked content
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
