import { useState } from "react";
import { uuid } from "uuidv4";
//
import Image from "next/image";
//
import { useRouter } from "next/router";

import ToastContainer from "react-bootstrap/ToastContainer";
import Popover from "react-bootstrap/Popover";
import Toast from "react-bootstrap/Toast";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Modal from "react-bootstrap/Modal";

//
import { Text } from "./text";
import { theme as movieTheme } from "../styles";
import { ImageLoader } from "./utils";
const img_src = `https://image.tmdb.org/t/p/w500/irwQcdjwtjLnaA0iErabab9PrmG.jpg`;
//
const Items = (iterator, sizePercent, buttonPosition) => {
    const arr = [];
    for (let index = 0; index < iterator; index++) {
        arr.push(
            <MyCard
                key={index}
                sizePercent={sizePercent}
                buttonPosition={buttonPosition ? buttonPosition : null}
            />
        );
    }
    return arr;
};

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
    const handleAdd = (type) => (e) => {};

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
const MyCard = ({ sizePercent, buttonPosition, id }) => {
    return (
        <div
            style={{
                height: 130 * -sizePercent + 130,
                width: 230 * -sizePercent + 230,
                margin: 10,
            }}
        >
            <Image
                alt="Movie Poster"
                src={img_src}
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

const CardRow = ({ title }) => {
    const theme = movieTheme;
    const router = useRouter();
    // modal controls
    const [show, setShow] = useState(false);
    const [movie, setMovie] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const openModal = (movieID) => (e) => {
        e.preventDefault();
        const id = movieID;
        router.push(`${router.pathname}/?movie=${id}`);
        setMovie({});
        handleShow();
    };

    const closeModal = () => (e) => {
        router.push(router.pathname, undefined, { shallow: true });
        handleClose();
    };

    const handleSeeAll =
        (movieIds = []) =>
        (e) => {
            console.log("See All was clicked");
            // when clicked
            console.log(movieIds);
        };
    const data = [
        {
            id: uuid(),
        },
        {
            id: uuid(),
        },
        {
            id: uuid(),
        },
        {
            id: uuid(),
        },
        {
            id: uuid(),
        },
        {
            id: uuid(),
        },
    ];

    return (
        <div style={{ marginLeft: 20, marginRight: 20, padding: 0 }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "0 0 -35px 0",
                }}
            >
                <Text variant="headlineSmall" color={theme.fontColor}>
                    {title}
                </Text>
                <div onClick={handleSeeAll()} style={{ cursor: "pointer" }}>
                    <Text color={theme.fontColorSecondary}>See All</Text>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    overflowX: "scroll",
                    height: 200,
                }}
            >
                {data.map((el, idx) => (
                    <div onClick={openModal(el.id)}>
                        <MyCard
                            key={el.id}
                            sizePercent={-0.0}
                            buttonPosition={null}
                            id={el.id}
                        />
                    </div>
                ))}
            </div>
            <Modal
                show={show}
                onHide={closeModal()}
                // backdrop="static"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <div
                        style={{
                            cursor: "pointer",
                            marginBottom: 20,
                            display: "flex",
                            justifyContent: "center",
                            marginLeft: 10,
                            borderRadius: 10,
                        }}
                        // onClick={closeModal()}
                    >
                        <Image
                            alt="Movie Poster"
                            loader={ImageLoader}
                            src={movie.backdrop_path}
                            width={650}
                            height={450}
                            style={{ borderRadius: 10 }}
                        />
                    </div>
                    <div>
                        <h1>{movie.original_title}</h1>
                        <p>{movie.overview}</p>
                        <div>
                            <h3>{movie.release_date}</h3>
                            <h3>{movie.vote_average}</h3>
                            <h3>
                                Mature Content: {movie.adult ? "Yes" : "No"}
                            </h3>
                            <h3>{movie.original_language}</h3>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

const CardRowMini = ({ sizePercent }) => {
    const theme = movieTheme;
    const handleClick = (movieID) => (e) => {
        console.log("get movie: ", movieID);
    };
    const data = [
        {
            id: uuid(),
        },
        {
            id: uuid(),
        },
        {
            id: uuid(),
        },
        {
            id: uuid(),
        },
        {
            id: uuid(),
        },
        {
            id: uuid(),
        },
    ];
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                marginTop: -130,
                height: 200,
                width: "80%",
                overflowX: "scroll",
                overflowY: "hidden",
            }}
        >
            <div style={{ marginLeft: 10 }}>
                <Text variant="headlineExtraSmall" color={theme.fontColor}>
                    Up Next
                </Text>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // border: "1px solid red",
                }}
            >
                {data.map((el, idx) => (
                    <div onClick={handleClick(el.id)}>
                        <MyCard
                            key={el.id}
                            sizePercent={0.26}
                            buttonPosition={{ left: 130 }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export { CardRow, CardRowMini };
