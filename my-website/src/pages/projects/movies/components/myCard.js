import { useState } from "react";

import Image from "next/image";
import { ImageLoader } from "./utils";
import { theme as movieTheme } from "../styles";
import ToastContainer from "react-bootstrap/ToastContainer";
import Popover from "react-bootstrap/Popover";
import Toast from "react-bootstrap/Toast";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Text } from "./text";
//

//

const img_src = `/irwQcdjwtjLnaA0iErabab9PrmG.jpg`;

const MyCard = ({ onClick, poster, sizePercent, buttonPosition }) => {
    const theme = movieTheme;

    //
    const options = {
        height: sizePercent ? 130 * -sizePercent + 130 : 130,
        width: sizePercent ? 230 * -sizePercent + 230 : 230,
        button: buttonPosition ? buttonPosition : null,
    };
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
    };
    return (
        <div
            onClick={onClick ? onClick() : null}
            style={{
                height: options.height,
                width: options.width,
                margin: 10,
            }}
        >
            <Image
                alt="Movie Poster"
                loader={ImageLoader}
                src={poster ? poster : img_src}
                height={options.height}
                width={options.width}
                style={{
                    borderRadius: 10,
                    boxShadow: "0 1px 1px rgba(0, 0, 0, 0.5)",
                }}
            />
            <div style={{ ...styles.container, ...options.button }}>
                <div style={styles.dot} />
                <div style={styles.dot} />
                <div style={styles.dot} />
            </div>
        </div>
    );
};

export default MyCard;
