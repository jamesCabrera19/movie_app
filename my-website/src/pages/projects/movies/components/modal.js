import React, { useState, useContext } from "react";
// NEXT JS
import Image from "next/image";
// BOOTSTRAP
import Modal from "react-bootstrap/Modal";
// OTHER
import { imageLoaderHighQuality } from "./utils";
// COMPONENTS
import { Text } from "./text";
import MyCard from "./myCard";
// CONTEXT
import { Context as LikedMoviesContext } from "../context/likedMoviesContext";
import { Context as ThemeContext } from "../context/settingsContext";
import NavigationContext from "../context/navigation";
// HOOKS
import useLocalStorage from "../hooks/useLocalStorage";

//

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
const MyButton = ({ buttons }) => {
    const {
        state: { theme },
    } = useContext(ThemeContext);
    //

    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-evenly",
                marginTop: 20,
            }}
        >
            {buttons.map((el) => (
                <button
                    key={el.title}
                    onClick={el.onClick()}
                    style={{
                        height: 50,
                        width: 200,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: el.disable ? "" : "pointer",
                        backgroundColor: theme.buttonColor,
                        borderRadius: 10,
                        border: "0px solid red",
                    }}
                    disabled={el.disable}
                >
                    <Text
                        variant="headlineExtraSmall"
                        color={el.disable ? "grey" : theme.buttonFontColor}
                    >
                        {el.title}
                    </Text>
                </button>
            ))}
        </div>
    );
};
const ModalBodyText = ({ title, overview, vote, language, date }) => {
    const {
        state: { theme },
    } = useContext(ThemeContext);
    const roundTo = (n, digits) => {
        if (digits === undefined) {
            digits = 0;
        }
        const multiplicator = Math.pow(10, digits);
        n = parseFloat((n * multiplicator).toFixed(11));
        const test = Math.round(n) / multiplicator;

        return +test.toFixed(digits);
    };
    const styles = {
        container: {
            display: "flex",
            position: "relative",
            borderRadius: 10,
        },
        boxContainer: {
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            padding: 10,
            boxSizing: "border-box",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
        },
        date: {
            display: "flex",
            justifyContent: "space-evenly",
        },
        textColor:
            theme.type == "dark" ? theme.backgroundColor : theme.fontColor,
    };
    return (
        <div style={styles.container}>
            <div style={styles.boxContainer}>
                <Text variant="headlineExtraSmall" color={styles.textColor}>
                    {title}
                </Text>
                <Text color={styles.textColor}>{overview}</Text>
                <div style={styles.date}>
                    <Text variant="headlineExtraSmall" color={styles.textColor}>
                        Released — {date}
                    </Text>
                    <Text variant="headlineExtraSmall" color={styles.textColor}>
                        Rating — {roundTo((vote / 10) * 100, 1)}%
                    </Text>

                    <Text variant="headlineExtraSmall" color={styles.textColor}>
                        Original language — {language.toUpperCase()}
                    </Text>
                </div>
            </div>
        </div>
    );
};
const ModalImage = ({ src, onClick }) => {
    return (
        <div
            style={{
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
            }}
            onClick={onClick()}
        >
            <Image
                alt="Movie Poster"
                loader={imageLoaderHighQuality}
                src={src}
                width={800}
                height={500}
                style={{ borderRadius: 10 }}
            />
        </div>
    );
};
const ModalBody = (props) => {
    const {
        handleDispatch,
        state: { upNext, myMovies },
    } = useContext(LikedMoviesContext); //upNext // myMovies

    const { screenNavigator } = useContext(NavigationContext);

    //
    const date = new Date(props.release_date).toDateString();
    //
    const handlePlayNavigation = () =>
        screenNavigator("Video Screen", {
            id: props.movieID,
            type: props.type,
        });

    const buttons = [
        {
            title: "Play",
            onClick: () =>
                screenNavigator("Video Screen", {
                    id: props.movieID,
                    type: props.type,
                }),
            disable: null,
        },
        {
            title: "Add to Up Next",
            onClick: (args) => (e) => handleDispatch("up_next", props.movieID),
            disable: upNext.includes(props.movieID),
        },
        {
            title: "Add to My Movies",
            onClick: (args) => (e) =>
                handleDispatch("my_movies", props.movieID),
            disable: myMovies.includes(props.movieID),
        },
    ];
    return (
        <>
            <Modal.Body style={{ padding: 0, margin: 0, width: 800 }}>
                <ModalImage onClick={handlePlayNavigation} src={props.poster} />

                <ModalBodyText
                    title={props.title}
                    overview={props.overview}
                    date={date}
                    vote={props.vote_average}
                    language={props.original_language}
                />
                <MyButton buttons={buttons} />
            </Modal.Body>
        </>
    );
};

function TheModal(props) {
    const { movieID, poster } = props;
    //
    const [value, updateValue, clearValue] = useLocalStorage("movies", "");

    // modal controls
    const [movie, setMovie] = useState(initMovieProps);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const closeModal = () => (e) => handleClose();
    const openModal = () => {
        console.log("TheModal props: ", props.title);

        setMovie(props);
        handleShow();
        // console.log("card was clicked: ", props.title);
        updateValue(`${props.title},`);
    };

    // * determine where or if the buttons prop has been passed down to Modal.
    // * when user navigates to My Movies TheModal  should not include the following buttons:
    // * 'Add to My Movies', this button title should be rename to "remove from My Movies"

    return (
        <>
            <MyCard
                poster={poster}
                movieID={movieID}
                onClick={openModal}
                switchButtons={props.switchButtons}
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
