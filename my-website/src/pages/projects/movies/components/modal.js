import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import { theme as movieTheme } from "../styles";
import { ImageLoader } from "./utils";
import Image from "next/image";
import { Text } from "./text";

const initMovieProps = {
    backdrop_path: "/irwQcdjwtjLnaA0iErabab9PrmG.jpg",
    title: "Movie App",
    overview:
        "App built utilizing the most latest versions of React, NextJS, React createContext API, and Axios.",
    release_date: "11/11/22",
    vote_average: 10,
    original_language: "EN",
};
const MyButton = ({ title }) => {
    const theme = movieTheme;

    return (
        <div
            style={{
                padding: "6px 20px 0 20px",
                width: 200,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                backgroundColor: theme.panelBackgroundColor,
                borderRadius: 10,
                // marginRight: 20,
            }}
        >
            <Text variant="headlineExtraSmall" color={"white"}>
                {title}
            </Text>
        </div>
    );
};

const ModalBody = (props) => {
    const theme = movieTheme;
    const {
        backdrop_path,
        title,
        overview,
        release_date,
        vote_average,
        original_language,
    } = props;

    const styles = {
        body: {
            padding: 0,
            margin: 0,
            // border: "1px solid red",
            width: 733,
            // height: 412,
        },
        imageContainer: {
            borderRadius: 10,
            marginBottom: 20,
            display: "flex",
            justifyContent: "center",
        },
        textContainer: {
            marginTop: -250,
            display: "flex",
            justifyContent: "space-between",
            paddingRight: 20,
            paddingLeft: 20,
        },
    };

    return (
        <Modal.Body style={styles.body}>
            <div style={styles.imageContainer}>
                <Image
                    alt="Movie Poster"
                    loader={ImageLoader}
                    src={backdrop_path}
                    width={733}
                    height={412}
                    style={{ borderRadius: 10 }}
                />
            </div>
            <div style={styles.textContainer}>
                <div style={{ width: "50%" }}>
                    <Text variant="headlineExtraSmall" color={"white"}>
                        {title}
                    </Text>
                    <Text color={"white"}>{overview}</Text>
                </div>
                <div
                    style={{
                        // width: "20%",
                        backgroundColor: "rgba(100, 100, 100, 0.001)",
                    }}
                >
                    <Text variant="headlineExtraSmall" color={"white"}>
                        {release_date}
                    </Text>
                    <Text variant="headlineExtraSmall" color={"white"}>
                        {vote_average}
                    </Text>
                    <Text variant="headlineExtraSmall" color={"white"}>
                        {original_language}
                    </Text>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-evenly",
                    marginTop: 20,
                }}
            >
                <MyButton title="Play" />

                <MyButton title="Add to Up Next" />
                <MyButton title="Add to My Movies" />
            </div>
        </Modal.Body>
    );
};

function TheModal({ item, children }) {
    // modal controls
    const [movie, setMovie] = useState(initMovieProps);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const closeModal = () => (e) => handleClose();
    const openModal = (movie) => (e) => {
        setMovie(movie);
        handleShow();
    };

    return (
        <>
            <div onClick={openModal(item)}>{children}</div>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                contentClassName="bg-transparent border-0"
                onHide={closeModal()}
                show={show}
                animation
                size="lg"
                centered
            >
                <ModalBody {...movie} />
            </Modal>
        </>
    );
}

export { TheModal };
