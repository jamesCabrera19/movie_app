import React, { useState } from "react";
//
import { Provider as LikedMoviesProvider } from "./context/likedMoviesContext";
//
import { theme as movieTheme } from "./styles";
import { NavigationBar } from "./components/navigationBar";
// screens
import MyMovies from "./screens/myMovies";
import TVShows from "./screens/tvShows";
import MySettings from "./screens/settings";
import WatchNow from "./screens/watchNow";
import MyResults from "./screens/results";

const screens = [
    {
        title: "Watch Now",
        active: true,
        id: 0,
        component: <WatchNow />,
    },
    {
        title: "My Movies",
        active: false,
        id: 1,
        component: <MyMovies />,
    },
    {
        title: "TV Shows",
        active: false,
        id: 2,
        component: <TVShows />,
    },

    {
        title: "Settings",
        active: false,
        id: 4,
        component: <MySettings />,
    },
    {
        title: "Results",
        active: false,
        id: 5,
        component: <MyResults />,
    },
];
function App() {
    const theme = movieTheme;

    return (
        <div style={{ backgroundColor: theme.backgroundColor }}>
            <NavigationBar omit="Results" components={screens} />
        </div>
    );
}

function MoviesApp() {
    return (
        <LikedMoviesProvider>
            <App />
        </LikedMoviesProvider>
    );
}

export default MoviesApp;
