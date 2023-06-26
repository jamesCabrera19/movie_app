import { useContext, useEffect } from "react";

//
import { Provider as MovieProvider } from "./context/movieContext";
import { Context as MovieContext } from "./context/movieContext";

import MoviesApp from "./app";

// This is a video streaming application built with the React createContext API, Axios, NodeJS, Express, Next JS, and React Navigation.

// The program is intended for two platforms: iOS and web devices.
// Both versions employ NodeJS, Express, and JWT for user authentication, react createContext for state management, and MongoDB for data storage.

// In addition, the app has CRUD operations, react Hooks, and a AI system recommendation system.
const App = () => {
    const { fetchData } = useContext(MovieContext);

    useEffect(() => {
        // dispatch types: "get_movies", 'get_movies'
        fetchData("get_movies", "movies");
        fetchData("get_tv", "tv");
    }, []);

    return <MoviesApp />;
};

export default function Movies() {
    return (
        <MovieProvider>
            <App />
        </MovieProvider>
    );
}
