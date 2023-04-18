import React, { useState, useContext } from "react";
// NEXT JS
import Image from "next/image";
// BOOTSTRAP
import Modal from "react-bootstrap/Modal";
// OTHER
import { ImageLoader } from "./utils";
// COMPONENTS
import { Text } from "./text";
import MyCard from "./myCard";
// CONTEXT
import { Context as LikedMoviesContext } from "../context/likedMoviesContext";
// THEME
import { Context as ThemeContext } from "../context/themeContext";
//
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
const MyButton = ({ title, onClick, disable }) => {
    const {
        state: { theme },
    } = useContext(ThemeContext);
    //

    return (
        <button
            onClick={onClick()}
            style={{
                height: 50,
                width: 200,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: disable ? "" : "pointer",
                backgroundColor: theme.buttonColor,
                borderRadius: 10,
                border: "0px solid red",
            }}
            disabled={disable}
        >
            <Text
                variant="headlineExtraSmall"
                color={disable ? "grey" : theme.buttonFontColor}
            >
                {title}
            </Text>
        </button>
    );
};
const ModalBodyText = ({ title, overview, vote, language, date }) => {
    const {
        state: { theme },
    } = useContext(ThemeContext);
    return (
        <div
            style={{
                display: "flex",
                paddingRight: 20,
                paddingLeft: 20,
                position: "relative",
                backgroundColor: theme.themeColorToRGBA(0.5, theme.buttonColor),
                borderRadius: 10,
            }}
        >
            <div>
                <Text
                    variant="headlineExtraSmall"
                    color={theme.backgroundColor}
                >
                    {title}
                </Text>
                <Text
                    // variant="headlineExtraSmall"
                    color={theme.backgroundColor}
                >
                    {overview}
                </Text>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                    }}
                >
                    <Text
                        variant="headlineExtraSmall"
                        color={theme.backgroundColor}
                    >
                        {date}
                    </Text>
                    <div
                        style={{
                            margin: "0 20px",
                        }}
                    >
                        <Text
                            variant="headlineExtraSmall"
                            color={theme.backgroundColor}
                        >
                            {vote}
                        </Text>
                    </div>

                    <Text
                        variant="headlineExtraSmall"
                        color={theme.backgroundColor}
                    >
                        {language}
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
                marginBottom: 20,
                display: "flex",
                justifyContent: "center",
            }}
            onClick={onClick()}
        >
            <Image
                alt="Movie Poster"
                loader={ImageLoader}
                src={src}
                width={733}
                height={412}
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
    //
    const date = new Date(props.release_date).toDateString();
    //
    const handleBackgroundClick = () => (e) =>
        console.log("Open Video: ", props);
    //
    const Test = (props) => console.log(props.movieID);

    const buttonData = [
        {
            title: "Play",
            onClick: (args) => (e) => Test(props),
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
            <Modal.Body style={{ padding: 0, margin: 0, width: 733 }}>
                <ModalImage
                    onClick={handleBackgroundClick}
                    src={props.poster}
                />

                <ModalBodyText
                    title={props.title}
                    overview={props.overview}
                    date={date}
                    vote={props.vote_average}
                    language={props.original_language}
                />

                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-evenly",
                        marginTop: 20,
                    }}
                >
                    {buttonData.map((el, idx) => (
                        <MyButton
                            onClick={el.onClick}
                            title={el.title}
                            key={idx}
                            disable={el.disable}
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
