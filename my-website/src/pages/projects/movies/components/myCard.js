import { useState } from "react";

import Image from "next/image";
import { ImageLoader } from "./utils";
import { theme as movieTheme } from "../styles";
import useHover from "../hooks/useHover";
import useUpNext from "../hooks/useUpNext";
//

const IMG_SRC = `/irwQcdjwtjLnaA0iErabab9PrmG.jpg`;
//
const OverlayButton = ({ title, onClick }) => {
    const [active, setActive] = useState(true);
    const theme = movieTheme;

    return (
        <button
            onClick={() => {
                onClick();
                setActive((prev) => !prev);
            }}
            style={{
                height: 40,
                border: "none",
                backgroundColor: theme.buttonColor,
                color: active ? theme.buttonFontColor : theme.fontColor,
            }}
        >
            {title}
        </button>
    );
};

const CardOverlay = ({ options, movieID }) => {
    const theme = movieTheme;
    const [hoverRef, isHovered] = useHover(3000);
    const [movieList, addToList, removeFromList, list] = useUpNext();

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
    const addedOptions = {
        right: options ? -100 : -150,
        top: options ? -100 : -80,
    };

    // console.log(state);
    const overviewButton = {
        myMovies: {
            title: "add to My Movies",
            onClick: () => {
                console.log("My Movies,", movieList);
            },
        },
        upNext: {
            title: "add to Up Next",
            onClick: () => addToList(movieID),
        },
        view: {
            title: "View",
            onClick: () => {
                console.log("View");
            },
        },
        remove: {
            title: "Remove from Up Next",
            onClick: () => removeFromList(movieID),
        },
    };

    return (
        <>
            <div ref={hoverRef} style={{ ...styles.container, ...options }}>
                <div style={styles.dot} />
                <div style={styles.dot} />
                <div style={styles.dot} />
            </div>
            {isHovered ? (
                <div
                    style={{
                        position: "relative",
                        ...addedOptions,
                    }}
                >
                    {options ? (
                        <div
                            style={{
                                ...styles.overlay,
                                backgroundColor: theme.buttonColor,
                                justifyContent: "center",
                                height: 60,
                            }}
                        >
                            <OverlayButton {...overviewButton.remove} />
                        </div>
                    ) : (
                        <div style={styles.overlay}>
                            <>
                                <OverlayButton {...overviewButton.upNext} />
                                <div
                                    style={{
                                        borderTop: `1px solid ${theme.backgroundColor}`,
                                    }}
                                />
                                <OverlayButton {...overviewButton.myMovies} />
                            </>
                        </div>
                    )}
                </div>
            ) : null}
        </>
    );
};

const MyCard = ({ onClick, poster, sizePercent, buttonPosition, movieID }) => {
    const options = {
        height: sizePercent ? 130 * -sizePercent + 130 : 130,
        width: sizePercent ? 230 * -sizePercent + 230 : 230,
        button: buttonPosition ? buttonPosition : null,
    };

    return (
        <div
            style={{
                height: options.height,
                width: options.width,
                margin: 10,
            }}
        >
            <div onClick={onClick ? onClick() : null}>
                <Image
                    alt="Movie Poster"
                    loader={ImageLoader}
                    src={poster ? poster : IMG_SRC}
                    height={options.height}
                    width={options.width}
                    style={{
                        borderRadius: 10,
                        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.5)",
                    }}
                />
            </div>
            <CardOverlay options={options.button} movieID={movieID} />
        </div>
    );
};

export default MyCard;
