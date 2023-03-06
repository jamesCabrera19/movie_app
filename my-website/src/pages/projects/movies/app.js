import { useContext, useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";
import Overlay from "react-bootstrap/Overlay";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
//
import { Context as MovieContext } from "../../../../context/movieContext";
//

import { Text } from "./components/text";
import { theme as movieTheme } from "./styles";
import { CardRow } from "./components/cardRow";
import { NavigationBar } from "./components/navigationBar";
import { ModalBody } from "react-bootstrap";

function MovieCover({}) {
    const img_src = `https://image.tmdb.org/t/p/original/irwQcdjwtjLnaA0iErabab9PrmG.jpg`;

    const handleClick = () => (e) => {
        console.log("Opent Modal");
    };

    const styles = {
        flex: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 40,
            // border: "1px solid red",
        },
        imageContainer: {
            width: "100%",
            height: 412.8,
            // border: "1px solid blue",
        },
    };
    return (
        <div style={styles.container}>
            <div
                style={{ ...styles.imageContainer, ...styles.flex }}
                onClick={handleClick("abcd")}
            >
                <Image
                    alt="Movie Poster"
                    // loader={ImageLoader}
                    src={img_src}
                    quality={100}
                    width={733.6}
                    height={412.8}
                    style={{ borderRadius: 10 }}
                />
            </div>

            <CardRow onClick={handleClick} />
        </div>
    );
}
function AppContent({}) {
    const data = [
        {
            id: 0,
            header_text: "Popular",
            ids: [],
        },
        {
            id: 1,
            header_text: "Top Rated",
            ids: [],
        },
        {
            id: 2,
            header_text: "Animated",
            ids: [],
        },
        {
            id: 3,
            header_text: "Upcoming",
            ids: [],
        },
    ];
    const handleClick = (movieID) => (e) => {
        console.log("get movie: ", movieID);
    };

    return (
        <>
            <MovieCover />
            {data.map((el) => (
                <CardRow
                    key={el.id}
                    title={el.header_text}
                    onClick={handleClick}
                    bigRow
                    seeAll
                />
            ))}
        </>
    );
}

function WatchNow() {
    return <AppContent />;
}
function MyMovies() {
    return (
        <div>
            <Text>This is myMovies Section</Text>
        </div>
    );
}
function TVShows() {
    return (
        <div>
            <Text>this is TVShows section</Text>
        </div>
    );
}
function MyLibrary() {
    return (
        <div>
            <Text>this is MyLibrary section</Text>
        </div>
    );
}
function MySettings() {
    return (
        <div>
            <Text>this is MySettings section</Text>
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
            title: "Library",
            active: false,
            id: 3,
            component: <MyLibrary />,
        },
        {
            title: "Settings",
            active: false,
            id: 4,
            component: <MySettings />,
        },
    ]);
    const handleNavigation = (title) => (e) => {
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
    return (
        <div style={{ backgroundColor: theme.backgroundColor }}>
            <NavigationBar
                myNavigationState={navigation}
                handleNavigation={handleNavigation}
            />
            {/* <AppContent /> */}
            {navigation.filter((el) => el.active)[0].component}
        </div>
    );
}

export default MoviesApp;
