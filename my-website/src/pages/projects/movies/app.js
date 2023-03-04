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
import { CardRow, CardRowMini } from "./components/cardRow";
import { NavigationBar } from "./components/navigationBar";

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
                onClick={handleClick()}
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
            <CardRowMini />
        </div>
    );
}
function AppContent({}) {
    const data = [
        {
            id: 0,
            header_text: "My Library",
            ids: [],
        },
        {
            id: 1,
            header_text: "What to Watch",
            ids: [],
        },
        {
            id: 2,
            header_text: "Animated",
            ids: [],
        },
        {
            id: 3,
            header_text: "New Movies",
            ids: [],
        },
    ];
    const handleClick = (movieID) => (e) => {
        console.log("get movie: ", movieID);
    };

    return (
        <>
            {data.map((el) => (
                <CardRow
                    key={el.id}
                    title={el.header_text}
                    onClick={handleClick}
                />
            ))}
        </>
    );
}

function MoviesApp() {
    const { state } = useContext(MovieContext);
    const theme = movieTheme;
    // console.log(state.allMovies);

    return (
        <div style={{ backgroundColor: theme.backgroundColor }}>
            <NavigationBar />
            <MovieCover />
            <AppContent />
        </div>
    );
}

export default MoviesApp;
