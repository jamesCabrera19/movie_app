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
import { Context as movieContext } from "../context/movieContext";

import NavigationContext from "../context/navigation";
// HOOKS
import useLocalStorage from "../hooks/useLocalStorage";
import useLikedMovies from "../hooks/useLikedMovies";

// Define initial movie properties
const initMovieProps = {
    adult: false,
    backdrop_path: "/irwQcdjwtjLnaA0iErabab9PrmG.jpg",
    poster: "/irwQcdjwtjLnaA0iErabab9PrmG.jpg",
    title: "Movie App",
    original_title: "Movie App",
    overview:
        "App built utilizing the most latest versions of React, NextJS, React createContext API, and Axios.",
    release_date: "11/11/22",
    vote_average: 10,
    original_language: "EN",
    id: 129182,
    genre_ids: [],
    popularity: 0.6,
    video: false,
    vote_count: 0,
};
const ModalButtons = ({ buttons }) => {
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
    // Get the theme from the ThemeContext
    const {
        state: { theme },
    } = useContext(ThemeContext);

    // Function to round a number to a specific number of decimal places
    const roundNumber = (n, digits) => {
        if (digits === undefined) {
            digits = 0;
        }
        const multiplicator = Math.pow(10, digits);
        n = parseFloat((n * multiplicator).toFixed(11));
        const test = Math.round(n) / multiplicator;
        return +test.toFixed(digits);
    };
    // Styles for the component
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
                {/* Display the movie title */}
                <Text variant="headlineExtraSmall" color={styles.textColor}>
                    {title}
                </Text>
                {/* Display the movie overview */}
                <Text color={styles.textColor}>{overview}</Text>
                {/* Display the movie release date, rating, and original language */}
                <div style={styles.date}>
                    <Text variant="headlineExtraSmall" color={styles.textColor}>
                        Released — {date}
                    </Text>
                    <Text variant="headlineExtraSmall" color={styles.textColor}>
                        Rating — {roundNumber((vote / 10) * 100, 1)}%
                    </Text>
                    <Text variant="headlineExtraSmall" color={styles.textColor}>
                        Original language — {language.toUpperCase()}
                    </Text>
                </div>
            </div>
        </div>
    );
};

const ModalImage = ({ src }) => {
    return (
        <div
            style={{
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
            }}
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
    const { handleDispatch } = useContext(LikedMoviesContext); // For handling liked movies
    const { screenNavigator } = useContext(NavigationContext); // For navigation
    const {
        state: { movies },
        addToState,
    } = useContext(movieContext); // Movie context state and function

    // Extract movie ID from props
    const MOVIE_ID = props.movieID || props.id;

    // Check if movie is saved in either state
    const { isMovieInMyMovies, isMovieInUpNext } = useLikedMovies(MOVIE_ID);

    // Format release date as a string
    const date = new Date(props.release_date).toDateString();

    // Create a navigator function for video screen
    const navigator = screenNavigator("Video Screen", {
        id: MOVIE_ID,
        type: props.type,
    });

    // Create a set to store movie IDs in state
    const movieStateSet = new Set(movies.map((movie) => movie.id));

    // Function to add movie to state if it doesn't exist
    const addMovieToStateIfNotExists = (movieStateSet, MOVIE_ID, props) => {
        if (!movieStateSet.has(MOVIE_ID) && props.type === "MOVIES") {
            // Add movie to state
            addToState(props);
        }
    };

    // Buttons configuration
    const buttons = [
        {
            title: "Play",
            onClick: () => (e) => {
                addMovieToStateIfNotExists(movieStateSet, MOVIE_ID, props);
                navigator();
            },
            disable: null,
        },
        {
            title: "Add to Up Next",
            onClick: (args) => (e) => {
                addMovieToStateIfNotExists(movieStateSet, MOVIE_ID, props);
                handleDispatch("up_next", MOVIE_ID);
            },
            disable: isMovieInUpNext, // Disable the button if the movie is already in the "Up Next" list
        },
        {
            title: "Add to Library",
            onClick: (args) => (e) => {
                addMovieToStateIfNotExists(movieStateSet, MOVIE_ID, props);
                handleDispatch("my_movies", MOVIE_ID);
            },
            disable: isMovieInMyMovies, // Disable the button if the movie is already in the "Library"
        },
    ];
    return (
        <>
            {/* The Modal Body */}
            <Modal.Body style={{ padding: 0, margin: 0, width: 800 }}>
                {/* Add the ModalImage, ModalBodyText, and MyButton components */}
                <ModalImage src={props.poster} />
                <ModalBodyText
                    language={props.original_language}
                    vote={props.vote_average}
                    overview={props.overview}
                    title={props.title}
                    date={date}
                />
                <ModalButtons buttons={buttons} />
            </Modal.Body>
        </>
    );
};

// function TheModal(props) {
//     // Get value, updateValue, and clearValue from local storage using the useLocalStorage hook
//     const [value, updateValue, clearValue] = useLocalStorage("movies", "");

//     // Define state for the movie data and modal visibility
//     const [movie, setMovie] = useState(initMovieProps);
//     const [show, setShow] = useState(false);

//     // Function to close the modal
//     const handleClose = () => setShow(false);

//     // Function to open the modal
//     const handleShow = () => {
//         setMovie(props); // Set the movie data to the props received
//         setShow(true); // Set the show state to true, showing the modal
//         updateValue(`${props.title},`); // Update the local storage value with the movie title
//     };

//     // Function to close the modal when clicked
//     const closeModal = () => (e) => handleClose();

//     return (
//         <>
//             {/* Render the MyCard component with the movie poster and movieID */}
//             <MyCard
//                 poster={props.poster}
//                 movieID={props.movieID}
//                 onClick={handleShow}
//             />
//             {/* The Modal */}
//             <Modal
//                 aria-labelledby="contained-modal-title-vcenter"
//                 contentClassName="bg-transparent border-0"
//                 onHide={closeModal()}
//                 show={show}
//                 animation
//                 size="lg"
//                 centered
//             >
//                 {/* Pass the movie data to the ModalBody component */}
//                 <ModalBody {...movie} />
//             </Modal>
//         </>
//     );
// }
const TheModal = React.memo((props) => {
    // Get value, updateValue, and clearValue from local storage using the useLocalStorage hook
    const [value, updateValue, clearValue] = useLocalStorage("movies", "");

    // Define state for the movie data and modal visibility
    const [movie, setMovie] = useState(initMovieProps);
    const [show, setShow] = useState(false);

    // Function to close the modal
    const handleClose = () => setShow(false);

    // function to check and replace null values
    const initializeProps = (props) => {
        // Get an array of property names in props
        const propNames = Object.keys(props);

        // Iterate through the property names
        propNames.forEach((prop) => {
            if (!props[prop]) {
                console.log(prop, prop.title);
            }
            if (!props[prop]) {
                props[prop] = initMovieProps[props];
            }
        });
        return props;
    };
    // Function to open the modal
    const handleShow = () => {
        // checking for null props

        setMovie(props); // Set the movie data to the props received
        setShow(true); // Set the show state to true, showing the modal
        updateValue(`${props.title},`); // Update the local storage value with the movie title
    };

    // Function to close the modal when clicked
    const closeModal = () => (e) => handleClose();

    return (
        <>
            {/* Render the MyCard component with the movie poster and movieID */}
            <MyCard
                poster={props.poster}
                movieID={props.id}
                onClick={handleShow}
            />
            {/* The Modal */}
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                contentClassName="bg-transparent border-0"
                onHide={closeModal()}
                show={show}
                animation
                size="lg"
                centered
            >
                {/* Pass the movie data to the ModalBody component */}
                <ModalBody {...movie} />
            </Modal>
        </>
    );
});

export { TheModal };
