import { useState } from "react";

import Image from "next/image";
import { ImageLoader } from "./utils";
import { theme as movieTheme } from "../styles";
import ToastContainer from "react-bootstrap/ToastContainer";
import Popover from "react-bootstrap/Popover";
import Toast from "react-bootstrap/Toast";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Text } from "./text";
const img_src = `/irwQcdjwtjLnaA0iErabab9PrmG.jpg`;

function renderTooltip(props) {
    let colors = {};
    //Sometimes, props.popper.state is undefined.
    //It runs this function enough times that state gets a value
    if (props.popper.state) {
        colors = { ...props.popper?.state?.options.colors };
    }
    const styles = {
        body: {
            border: `1px solid ${colors.panelBackgroundColor}`,
            backgroundColor: colors.backgroundColor,
            borderRadius: 10,
            overflow: "hidden",
        },
        textContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        },
        separator: {
            width: "100%",
            height: 1,
            borderTop: "1px solid #a09f9d",
            marginBottom: 8,
        },
        fontColor: colors.fontColor,
    };

    const TextClick = ({ text, title }) => (
        <div
            style={{ cursor: "pointer" }}
            onClick={props.popper?.state?.options?.handleToast(title)}
        >
            <Text color={styles.fontColor}>{text}</Text>
        </div>
    );
    return (
        <Popover id="popover-basic" {...props}>
            <Popover.Body style={styles.body}>
                <div style={styles.textContainer}>
                    <TextClick text="Add to Up Next" title="Up Next" />
                    <div style={styles.separator} />
                    <TextClick text="Add to My Movies" title="My Movies" />
                </div>
            </Popover.Body>
        </Popover>
    );
}
function AppleButton({ customStyle }) {
    const [toastTitle, setToastTile] = useState("");
    const [show, setShow] = useState(false);
    const theme = movieTheme;

    const handleToast = (title) => (e) => {
        setToastTile(title);
        setShow(true);
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
            backgroundColor: theme.buttonColor,
            left: 190,
            bottom: 40,
            ...customStyle,
        },
        dot: {
            borderRadius: 2.5,
            height: 5,
            width: 5,
            backgroundColor: "white",
        },
        toolTip: {
            height: 60,
            width: 150,
            borderRadius: 10,
            paddingLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            backgroundColor: theme.buttonColor,
        },
    };
    return (
        <>
            <ToastContainer position="top-center">
                <Toast
                    onClose={() => setShow(false)}
                    show={show}
                    delay={3000}
                    autohide
                    style={{ width: 200 }}
                >
                    <Toast.Header>
                        <strong className="me-auto">
                            ✔️ Movie Added to {toastTitle}
                        </strong>
                    </Toast.Header>
                </Toast>
            </ToastContainer>

            <OverlayTrigger
                autohide
                trigger="click"
                placement="right"
                overlay={renderTooltip}
                delay={{ show: 250, hide: 400 }}
                popperConfig={{
                    colors: {
                        panelBackgroundColor: theme.panelBackgroundColor,
                        backgroundColor: theme.backgroundColor,
                        fontColor: theme.fontColor,
                    },
                    handleToast,
                }}
            >
                <div style={styles.container}>
                    <div style={styles.dot} />
                    <div style={styles.dot} />
                    <div style={styles.dot} />
                </div>
            </OverlayTrigger>
        </>
    );
}
const MyCard = ({ onClick, poster, movieID, sizePercent, buttonPosition }) => {
    return (
        <div
            onClick={onClick ? onClick(movieID) : null}
            style={{
                height: 130 * -sizePercent + 130,
                width: 230 * -sizePercent + 230,
                margin: 10,
            }}
        >
            <Image
                alt="Movie Poster"
                loader={ImageLoader}
                src={poster ? poster : img_src}
                width={230 * -sizePercent + 230}
                height={130 * -sizePercent + 130}
                style={{
                    borderRadius: 10,
                    boxShadow: "0 1px 1px rgba(0, 0, 0, 0.5)",
                }}
            />
            <AppleButton customStyle={{ ...buttonPosition }} />
        </div>
    );
};

export default MyCard;
