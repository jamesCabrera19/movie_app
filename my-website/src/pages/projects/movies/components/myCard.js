import { useState, useContext } from "react";

import Image from "next/image";
import { ImageLoader } from "./utils";
import { theme as movieTheme } from "../styles";
import useHover from "../hooks/useHover";
import useUpNext from "../hooks/useUpNext";
import { Context as LikedMoviesContext } from "../context/likedMoviesContext";
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

const CardOverlay = ({ options, movieID, switchButtons }) => {
    const { handleDispatch } = useContext(LikedMoviesContext);
    const [hoverRef, isHovered] = useHover(3000);
    const theme = movieTheme;
    //
    const Test = (props) => console.log(movieID);

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

    const buttonSwitch = {
        title: switchButtons ? "remove from My Movies" : "add to My Movies",
        dispatch: switchButtons ? "del_my_movies" : "my_movies",
    };

    const overviewButton = {
        myMovies: {
            title: buttonSwitch.title,
            onClick: (props) => handleDispatch(buttonSwitch.dispatch, movieID),
        },
        upNext: {
            title: "add to Up Next",
            onClick: (props) => handleDispatch("up_next", movieID),
        },
        remove: {
            title: "Remove from Up Next",
            onClick: (props) => handleDispatch("del_up_next", movieID),
        },
    };
    const SingleButton = () => {
        return (
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
        );
    };
    const DoubleButton = () => {
        return (
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
        );
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
                        right: options ? -100 : -150,
                        top: options ? -100 : -80,
                    }}
                >
                    {options ? <SingleButton /> : <DoubleButton />}
                </div>
            ) : null}
        </>
    );
};

const MyCard = (props) => {
    const {
        onClick,
        poster,
        sizePercent,
        buttonPosition,
        movieID,
        switchButtons,
    } = props;
    //
    //
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
            <CardOverlay
                switchButtons={switchButtons}
                options={options.button}
                movieID={movieID}
            />
        </div>
    );
};

export default MyCard;
