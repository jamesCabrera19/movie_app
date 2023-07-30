import React, { useState, useContext } from "react";
// context
import { Context as LikedMoviesContext } from "../context/likedMoviesContext";
import { Context as ThemeContext } from "../context/settingsContext";
// components
import Image from "next/image";
// helper functions
import { ImageLoader } from "./utils";
//hooks
import useHover from "../hooks/useHover";
import useLikedMovies from "../hooks/useLikedMovies";

//
//
const IMG_SRC = `/irwQcdjwtjLnaA0iErabab9PrmG.jpg`;
//
const OverlayButton = ({ title, onClick, disable }) => {
    const {
        state: { theme },
    } = useContext(ThemeContext);

    return (
        <button
            disabled={disable}
            onClick={() => {
                onClick();
            }}
            style={{
                height: 40,
                border: "none",
                backgroundColor: theme.buttonColor,
            }}
        >
            {title}
        </button>
    );
};

const CardOverlay = ({ movieID }) => {
    const { handleDispatch } = useContext(LikedMoviesContext);
    const [hoverRef, isHovered] = useHover(3000);
    const { isMovieInMyMovies, isMovieInUpNext } = useLikedMovies(movieID);

    const {
        state: { theme },
    } = useContext(ThemeContext); //

    const styles = {
        container: {
            height: 30,
            width: 30,
            borderRadius: 15,
            cursor: "pointer",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            backgroundColor: theme.themeColorToRGBA(0.1, theme.buttonColor),
            left: 190,
            bottom: 40,
        },
        dot: {
            borderRadius: 2.5,
            height: 5,
            width: 5,
            backgroundColor: "white",
        },
        overlay: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: 80,
            width: 190,
            borderRadius: 10,
            overflow: "hidden",
        },
    };

    const buttons = [
        {
            title: isMovieInMyMovies ? "Remove from library" : "Add to library",
            onClick: () =>
                handleDispatch(
                    isMovieInMyMovies ? "del_my_movies" : "my_movies",
                    movieID
                ),
        },
        {
            title: isMovieInUpNext ? "Remove from Up Next" : "Add to Up Next",
            onClick: () =>
                handleDispatch(
                    isMovieInUpNext ? "del_up_next" : "up_next",
                    movieID
                ),
        },
    ];

    const RenderButtons = () => (
        <div style={styles.overlay}>
            {buttons.map((button, index) => (
                <React.Fragment key={index}>
                    {index > 0 && (
                        <div
                            style={{
                                borderTop: `1px solid ${theme.backgroundColor}`,
                            }}
                        />
                    )}
                    <OverlayButton {...button} />
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <>
            <div ref={hoverRef} style={styles.container}>
                <div style={styles.dot} />
                <div style={styles.dot} />
                <div style={styles.dot} />
            </div>
            {isHovered && (
                <div
                    style={{
                        position: "relative",
                        right: -150,
                        top: -80,
                    }}
                >
                    <RenderButtons />
                </div>
            )}
        </>
    );
};

const MyCard = ({ onClick, poster, movieID }) => {
    //

    return (
        <div
            style={{
                height: 130,
                width: 230,
                margin: 10,
            }}
        >
            <div onClick={onClick ? onClick : null}>
                <Image
                    alt="Movie Poster"
                    loader={ImageLoader}
                    src={poster || IMG_SRC}
                    height={130}
                    width={230}
                    style={{
                        borderRadius: 10,
                        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.5)",
                    }}
                />
            </div>
            <CardOverlay movieID={movieID} />
        </div>
    );
};

export default MyCard;
