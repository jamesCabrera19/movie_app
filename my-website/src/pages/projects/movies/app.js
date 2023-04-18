import React, { useContext } from "react";
//
import { Provider as LikedMoviesProvider } from "./context/likedMoviesContext";
import { Provider as ThemeProvider } from "./context/themeContext";
import { Context as ThemeContext } from "./context/themeContext";
import { Context as theme } from "./context/theme";

//
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
    const {
        state: { theme },
    } = useContext(ThemeContext);

    return (
        <div style={{ backgroundColor: theme.backgroundColor }}>
            <NavigationBar omit="Results" components={screens} />
        </div>
    );
}

function MoviesApp() {
    return (
        <LikedMoviesProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </LikedMoviesProvider>
    );
}

export default MoviesApp;
