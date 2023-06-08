import React, { useContext } from "react";
//
import { Provider as LikedMoviesProvider } from "./context/likedMoviesContext";
// import { Provider as ThemeProvider } from "./context/themeContext";
import { Provider as SettingsProvider } from "./context/settingsContext";
import { Context as SettingsContext } from "./context/settingsContext";

//
import { NavigationBar } from "./components/navigationBar";
// screens
import MyMovies from "./screens/myMovies";
import TVShows from "./screens/tvShows";
import MySettings from "./screens/settings";
import WatchNow from "./screens/watchNow";
import VideoScreen from "./screens/videoScreen";

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
        title: "Video Screen",
        active: false,
        id: 5,
        component: <VideoScreen />,
    },
];
function App() {
    const {
        state: { theme },
    } = useContext(SettingsContext);

    return (
        <div style={{ backgroundColor: theme.backgroundColor }}>
            <NavigationBar
                hide={["Results", "Video Screen"]}
                components={screens}
            />
        </div>
    );
}

// todo =>
// * 1. stop working on everything else and work on making the movie video Playable.
// * a. UP NEXT movies should redirect to the PlayMovieScreen (not yet created),
// * b. PosterIntro should redirect to the PlayMovieScreen
// * c. MyMovies should redirect to the PlayMovieScreen
// 2. Divide MyMovies Screen into TWO sections. TV Shows and Movies
// 3. Once movies are playable start collecting user "play time".
// a. User starts a movie => Fire the Function that will start adding Time.
// NO MORE DESIGNING COMPONENTS UNTIL THIS IS DONE.
// DESIGNING COMPONENTS TAKES TIME AND BURNS YOU OUT.
// take breaks to implement sign in code
function MoviesApp() {
    return (
        <LikedMoviesProvider>
            <SettingsProvider>
                <App />
            </SettingsProvider>
        </LikedMoviesProvider>
    );
}

export default MoviesApp;
