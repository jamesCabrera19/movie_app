import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import { theme as movieTheme } from "../styles";
import { ImageLoader } from "./utils";
import Image from "next/image";
import { Text } from "./text";
import MyCard from "./myCard";
import useUpNext from "../hooks/useUpNext";

const initMovieProps = {
    poster: "/irwQcdjwtjLnaA0iErabab9PrmG.jpg",
    title: "Movie App",
    overview:
        "App built utilizing the most latest versions of React, NextJS, React createContext API, and Axios.",
    release_date: "11/11/22",
    vote_average: 10,
    original_language: "EN",
    id: 129182,
};
const MyButton = ({ title, onClick }) => {
    const [state, addToList, removeFromList] = useUpNext();

    const theme = movieTheme;

    return (
        <div
            onClick={onClick()}
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
    const [state, addToList, removeFromList] = useUpNext();
    const theme = movieTheme;

    const handleBackgroundClick = () => (e) =>
        console.log("Open Video: ", props);

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
    const buttonData = [
        {
            title: "Play",
            onClick: (id) => (e) => {
                console.log("Play Movie: ", props.movieID);
                removeFromList(props.movieID);
            },
            id: 0,
        },
        {
            title: "Add to Up Next",
            onClick: () => (e) => {
                addToList(props.movieID);
                console.log(props.movieID);
            },
            id: 1,
        },
        {
            title: "Add to My Movies",
            onClick: (id) => (e) => {
                console.log(state);
            },
            id: 2,
        },
    ];
    return (
        <>
            <Modal.Body style={styles.body}>
                <div
                    style={styles.imageContainer}
                    onClick={handleBackgroundClick()}
                >
                    <Image
                        alt="Movie Poster"
                        loader={ImageLoader}
                        src={props.poster}
                        width={733}
                        height={412}
                        style={{ borderRadius: 10 }}
                    />
                </div>
                <div style={styles.textContainer}>
                    <div style={{ width: "50%" }}>
                        <Text variant="headlineExtraSmall" color={"white"}>
                            {props.title}
                        </Text>
                        <Text color={"white"}>{props.overview}</Text>
                    </div>
                    <div
                        style={{
                            backgroundColor: theme.themeColorToRGBA(
                                0.009,
                                theme.backgroundColor
                            ),
                        }}
                    >
                        <Text variant="headlineExtraSmall" color={"white"}>
                            {props.release_date}
                        </Text>
                        <Text variant="headlineExtraSmall" color={"white"}>
                            {props.vote_average}
                        </Text>
                        <Text variant="headlineExtraSmall" color={"white"}>
                            {props.original_language}
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
                    {buttonData.map((el) => (
                        <MyButton
                            title={el.title}
                            key={el.id}
                            // id={props.movieID}
                            onClick={el.onClick}
                        />
                    ))}

                    {/* <MyButton title="Add to Up Next" />
                    <MyButton title="Add to My Movies" /> */}
                </div>
            </Modal.Body>
        </>
    );
};

function TheModal(props) {
    // modal controls
    const [movie, setMovie] = useState(initMovieProps);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const closeModal = () => (e) => handleClose();
    const openModal = () => (e) => {
        setMovie(props);
        handleShow();
    };

    return (
        <>
            <MyCard
                poster={props.poster}
                sizePercent={props.addButtonOptions ? 0.26 : 0.0}
                buttonPosition={props.addButtonOptions ? { left: 130 } : null}
                onClick={openModal}
            />

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
