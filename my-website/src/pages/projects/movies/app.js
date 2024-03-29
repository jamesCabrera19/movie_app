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
import MyResults from "./screens/results";
import Footer from "./components/footer";
import Search from "./screens/searchScreen";

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
        title: "Results",
        active: false,
        id: 5,
        component: <MyResults />,
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
    {
        title: "Search",
        active: false,
        id: 5,
        component: <Search />,
    },
];

function App() {
    const {
        state: { theme },
    } = useContext(SettingsContext);

    // List of components/screens to be hidden in the NavigationBar
    const hiddenComponents = ["Results", "Video Screen"];

    return (
        <div style={{ backgroundColor: theme.backgroundColor }}>
            <NavigationBar
                hiddenComponents={hiddenComponents}
                components={screens}
            />
            <Footer />
        </div>
    );
}

function MoviesApp() {
    return (
        <LikedMoviesProvider>
            <SettingsProvider>
                <App />
            </SettingsProvider>
        </LikedMoviesProvider>
    );
}
// TODO * Features
// Search Functionality
// User Reviews and Ratings - User Interaction
// Social Sharing
// Notifications
// ? User Profiles ?
// Community Discussions
// User Dashboard
// User Activity Feeds
// ? Enhanced Analytics ?

export default MoviesApp;
