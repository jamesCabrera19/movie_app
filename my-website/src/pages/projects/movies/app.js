import React, { useContext, useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";
import Overlay from "react-bootstrap/Overlay";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
//
import { Context as MovieContext } from "../../../../context/movieContext";
import NavigationContext from "./context/navigation";
//

import { Text } from "./components/text";
import { theme as movieTheme } from "./styles";
import { CardRow } from "./components/cardRow";
import { NavigationBar } from "./components/navigationBar";
import { ModalBody } from "react-bootstrap";
// screens
import MyMovies from "./screens/myMovies";
import TVShows from "./screens/tvShows";
import MySettings from "./screens/settings";
import WatchNow from "./screens/watchNow";

function MyResults() {
    const { handleNavigation } = useContext(NavigationContext);
    console.log(handleNavigation);
    return (
        <div>
            <Text>this is MyResults section</Text>
            <button onClick={handleNavigation("Watch Now")}>
                go to watch now
            </button>
        </div>
    );
}

function MoviesApp() {
    const theme = movieTheme;
    const [navigation, setNavigation] = useState([
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
    ]);

    const handleNavigation =
        (title = "") =>
        (e) => {
            setNavigation((prev) => {
                // function => one button will ALWAYS be selected, no matter what.
                // to do this. we find the button that was pressed.
                // we find the button by title.
                const match = prev.find((el) => el.title === title);
                // we then filter out buttons that do not match the title
                const el = prev.filter((el) => el.title !== title);
                // once we have the Selected button we change its Active property to true.
                match.active = true;
                // to ensure that no other Buttons are selected we loop over them and change their Active property to false
                el.forEach((el) => (el.active = false));
                // finally, we sort out the array of buttons and save them to an array return it
                const result = [match, ...el].sort((a, b) => a.id - b.id);
                return result;
            });
        };
    const handleProps =
        (props = []) =>
        (e) =>
            console.log(props);
    return (
        <div style={{ backgroundColor: theme.backgroundColor }}>
            <NavigationBar
                myNavigationState={navigation}
                handleNavigation={handleNavigation}
            />
            {/* <AppContent /> */}
            <NavigationContext.Provider
                value={{
                    handleNavigation,
                    locations: [
                        "Watch Now",
                        "My Movies",
                        "TV Shows",
                        "Settings",
                        "Results",
                    ],
                    params: null,
                }}
            >
                {navigation.filter((el) => el.active)[0].component}
            </NavigationContext.Provider>
        </div>
    );
}

export default MoviesApp;
