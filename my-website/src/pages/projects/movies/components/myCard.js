import { useState } from "react";

import Image from "next/image";
import { ImageLoader } from "./utils";
import { theme as movieTheme } from "../styles";
import useHover from "../hooks/useHover";
//

const IMG_SRC = `/irwQcdjwtjLnaA0iErabab9PrmG.jpg`;
//
const MyBtn = ({ title, id }) => {
    const [active, setActive] = useState(true);
    const theme = movieTheme;

    return (
        <button
            onClick={() => {
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

const CardOverlay = ({ options, id }) => {
    const theme = movieTheme;

    const [hoverRef, isHovered] = useHover(3000);
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
            width: 150,
            borderRadius: 10,
            overflow: "hidden",
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
                <div style={{ position: "relative", right: -150, top: -80 }}>
                    <div style={styles.overlay}>
                        <MyBtn title="add to Up Next" />
                        <div
                            style={{
                                borderTop: `1px solid ${theme.backgroundColor}`,
                            }}
                        />
                        <MyBtn title="add to My Movies" />
                    </div>
                </div>
            ) : null}
        </>
    );
};

const MyCard = ({ onClick, poster, sizePercent, buttonPosition }) => {
    const options = {
        height: sizePercent ? 130 * -sizePercent + 130 : 130,
        width: sizePercent ? 230 * -sizePercent + 230 : 230,
        button: buttonPosition ? buttonPosition : null,
    };

    // console.log("MyCard render");

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
            <CardOverlay options={options.button} id={poster} />
        </div>
    );
};

export default MyCard;
