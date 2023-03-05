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
const data = [
    {
        adult: false,
        overview:
            "A lighthouse keeper and his wife living off the coast of Western Australia raise a baby they rescue from an adrift rowboat.",
        release_date: "2016-09-02",
        genre_ids: [18],
        id: 283552,
        original_title: "The Light Between Oceans",
        original_language: "en",
        title: "The Light Between Oceans",
        popularity: 4.546151,
        vote_count: 11,
        video: false,
        vote_average: 4.41,
        poster_path: "/22z44LPkMyf5nyyXvv8qQLsbom.jpg",
        backdrop_path: "/22z44LPkMyf5nyyXvv8qQLsbom.jpg",
    },
    {
        adult: false,
        overview:
            "A lighthouse keeper and his wife living off the coast of Western Australia raise a baby they rescue from an adrift rowboat.",
        release_date: "2016-09-02",
        genre_ids: [18],
        id: 283552,
        original_title: "The Light Between Oceans",
        original_language: "en",
        title: "The Light Between Oceans",

        popularity: 4.546151,
        vote_count: 11,
        video: false,
        vote_average: 4.41,
        poster_path: "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
        backdrop_path: "/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
    },

    {
        adult: false,
        overview:
            "A lighthouse keeper and his wife living off the coast of Western Australia raise a baby they rescue from an adrift rowboat.",
        release_date: "2016-09-02",
        genre_ids: [18],
        id: 283552,
        original_title: "The Light Between Oceans",
        original_language: "en",
        title: "The Light Between Oceans",

        popularity: 4.546151,
        vote_count: 11,
        video: false,
        vote_average: 4.41,
        backdrop_path: "/b1Y8SUb12gPHCSSSNlbX4nB3IKy.jpg",
        poster_path: "/kuf6dutpsT0vSVehic3EZIqkOBt.jpg",
    },
    {
        adult: false,
        overview:
            "A lighthouse keeper and his wife living off the coast of Western Australia raise a baby they rescue from an adrift rowboat.",
        release_date: "2016-09-02",
        genre_ids: [18],
        id: 283552,
        original_title: "The Light Between Oceans",
        original_language: "en",
        title: "The Light Between Oceans",

        popularity: 4.546151,
        vote_count: 11,
        video: false,
        vote_average: 4.41,
        backdrop_path: "/9Rq14Eyrf7Tu1xk0Pl7VcNbNh1n.jpg",
        poster_path: "/qi9r5xBgcc9KTxlOLjssEbDgO0J.jpg",
    },
    {
        adult: false,
        overview:
            "A lighthouse keeper and his wife living off the coast of Western Australia raise a baby they rescue from an adrift rowboat.",
        release_date: "2016-09-02",
        genre_ids: [18],
        id: 283552,
        original_title: "The Light Between Oceans",
        original_language: "en",
        title: "The Light Between Oceans",

        popularity: 4.546151,
        vote_count: 11,
        video: false,
        vote_average: 4.41,
        backdrop_path: "/AsEgGeccI32SwMBkxpwhOkhbzmF.jpg",
        poster_path: "/v5CfpzxoJDkZxjZAizClFdlEF0U.jpg",
    },
    {
        adult: false,
        overview:
            "A lighthouse keeper and his wife living off the coast of Western Australia raise a baby they rescue from an adrift rowboat.",
        release_date: "2016-09-02",
        genre_ids: [18],
        id: 283552,
        original_title: "The Light Between Oceans",
        original_language: "en",
        title: "The Light Between Oceans",

        popularity: 4.546151,
        vote_count: 11,
        video: false,
        vote_average: 4.41,
        backdrop_path: "/k4V6EvpcOsu8CX10JD0H53lFXLq.jpg",
        poster_path: "/cmWTZj9zzT9KFt3XyL0gssL7Ig8.jpg",
    },
];
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
const MyCard = ({ sizePercent, buttonPosition, image }) => {
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
                // src={img_src}
                loader={ImageLoader}
                src={image}
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

    const openModal = (movie) => (e) => {
        e.preventDefault();
        const { id } = movie;
        router.push(`${router.pathname}/?movie=${id}`);
        setMovie(movie);
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
    const styles = {
        modal: {
            body: {
                padding: 0,
                margin: 0,
                // border: "1px solid red",
                width: 733,
                height: 412,
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
        },
    };
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
                    <div onClick={openModal(el)}>
                        <MyCard
                            key={el.id}
                            sizePercent={-0.0}
                            buttonPosition={null}
                            image={el.backdrop_path}
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
                animation
                contentClassName="bg-transparent border-0"
            >
                <Modal.Body style={styles.modal.body}>
                    <div style={styles.modal.imageContainer}>
                        <Image
                            alt="Movie Poster"
                            loader={ImageLoader}
                            src={movie.backdrop_path}
                            width={733}
                            height={412}
                            style={{ borderRadius: 10 }}
                        />
                    </div>
                    <div style={styles.modal.textContainer}>
                        <div
                            style={{
                                width: "50%",
                                backgroundColor: "rgba(82, 82, 82, 0.2)",
                            }}
                        >
                            <Text
                                variant="headlineExtraSmall"
                                color={theme.fontColor}
                            >
                                {movie.title}
                            </Text>
                            <Text color={theme.fontColor}>
                                {movie.overview}
                            </Text>
                        </div>
                        <div
                            style={
                                {
                                    // width: "20%",
                                    // backgroundColor: "rgba(82, 82, 82, 0.2)",
                                }
                            }
                        >
                            <Text
                                variant="headlineExtraSmall"
                                color={theme.fontColor}
                            >
                                {movie.release_date}
                            </Text>
                            <Text
                                variant="headlineExtraSmall"
                                color={theme.fontColor}
                            >
                                {movie.vote_average}
                            </Text>
                            <Text
                                variant="headlineExtraSmall"
                                color={theme.fontColor}
                            >
                                {movie.original_language}
                            </Text>
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
                            image={el.backdrop_path}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export { CardRow, CardRowMini };
