import React, { useState, useContext } from "react";

import Modal from "react-bootstrap/Modal";
import { theme as movieTheme } from "../styles";
import { ImageLoader } from "./utils";
import Image from "next/image";
import { Text } from "./text";
import MyCard from "./myCard";
import useUpNext from "../hooks/useUpNext";
import { Context as LikedMoviesContext } from "../context/likedMoviesContext";

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
    const {
        state: { upNext, myMovies },
        handleDispatch,
    } = useContext(LikedMoviesContext); //upNext // myMovies

    const theme = movieTheme;
    const date = new Date(props.release_date);
    const handleBackgroundClick = () => (e) =>
        console.log("Open Video: ", props);

    const styles = {
        body: {
            padding: 0,
            margin: 0,

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
            display: "flex",
            marginTop: -412 / 2,
            paddingRight: 20,
            paddingLeft: 20,
            position: "relative",
            backgroundColor: theme.themeColorToRGBA(0.6, theme.backgroundColor),
        },
    };
    const buttonData = [
        {
            title: "Play",
            onClick: (id) => (e) => {
                console.log("Play Movie: ", props.movieID);
            },
            id: 0,
        },
        {
            title: "Add to Up Next",
            onClick: () => handleDispatch("up_next", props.movieID),
            id: 1,
        },
        {
            title: "Add to My Movies",
            onClick: (id) => (e) => {
                console.log("state");
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
                    <div>
                        <Text variant="headlineExtraSmall" color={"white"}>
                            {props.title}
                        </Text>
                        <Text color={"white"}>{props.overview}</Text>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-start",
                            }}
                        >
                            <Text color={"white"}>{date.toDateString()}</Text>
                            <div
                                style={{
                                    margin: "0 20px",
                                }}
                            >
                                <Text
                                    variant="headlineExtraSmall"
                                    color={"white"}
                                >
                                    {props.vote_average}
                                </Text>
                            </div>

                            <Text variant="headlineExtraSmall" color={"white"}>
                                {props.original_language}
                            </Text>
                        </div>
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
                            onClick={el.onClick}
                        />
                    ))}
                </div>
            </Modal.Body>
        </>
    );
};

function TheModal(props) {
    const { movieID, poster } = props;
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

    // * determine where or if the buttons prop has been passed down to Modal.
    // * when user navigates to My Movies TheModal  should not include the following buttons:
    // * 'Add to My Movies', this button title should be rename to "remove from My Movies"

    return (
        <>
            <MyCard
                onClick={openModal}
                poster={poster}
                movieID={movieID}
                buttons={props.buttons}
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
