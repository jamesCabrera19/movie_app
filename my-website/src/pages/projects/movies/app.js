import React, { useState } from "react";
//
import NavigationContext from "./context/navigation";
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

const initState = [
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
    const [navigation, setNavigation] = useState(initState);
    const theme = movieTheme;
    const handleNavigation =
        (location = "", params = {}) =>
        (e) => {
            setNavigation((prev) => {
                // function => one button will ALWAYS be selected, no matter what.
                // to do this. we find the button that was pressed.
                // we find the button by title.
                const match = prev.find((el) => el.title === location);
                // we then filter out the Match from the array
                // once we have the Selected button we change its Active property to true.
                match.active = true;
                const el = prev.filter((el) => el.title !== location);
                // to ensure that no other Buttons are selected we loop over them and change their Active property to false
                el.forEach((el) => (el.active = false));
                // passing params if any to the state object

                const x = { ...match, params };
                // finally, we sort out the array of buttons and save them to an array return it
                const result = [x, ...el].sort((a, b) => a.id - b.id);
                return result;
            });
        };

    return (
        <div style={{ backgroundColor: theme.backgroundColor }}>
            <NavigationBar
                myNavigationState={navigation}
                handleNavigation={handleNavigation}
            />

            <NavigationContext.Provider
                value={{
                    handleNavigation,
                    // params should be minimal not intended for large objects
                    params: navigation.filter((el) => el.active)[0].params,
                }}
            >
                {navigation.filter((el) => el.active)[0].component}
            </NavigationContext.Provider>
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
