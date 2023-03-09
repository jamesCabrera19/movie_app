import Modal from "react-bootstrap/Modal";
import { theme as movieTheme } from "../styles";
import { ImageLoader } from "./utils";
import Image from "next/image";
import { Text } from "./text";

const img_src = `https://image.tmdb.org/t/p/w500/irwQcdjwtjLnaA0iErabab9PrmG.jpg`;
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

    const buttons = [
        {
            id: 0,
            icon: "like",
            action: () => {},
        },
        {
            id: 0,
            icon: "like",
            action: () => {},
        },
        {
            id: 0,
            icon: "like",
            action: () => {},
        },
    ];

    const styles = {
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

// const MyModal_v2 = () => {
//     const {
//         state: { movies },
//     } = useContext(MovieContext);
//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     const [movie, setMovie] = useState({
//         backdrop_path: img_src,
//         title: "Movie App",
//         overview:
//             "App created with the most recent versions of React, NextJS, useContext API, and Axios.",
//         release_date: "11/11/22",
//         vote_average: 10,
//         original_language: "EN",
//     });
//     const openModal = (movieID) => (e) => {
//         e.preventDefault();
//         // router.push(`${router.pathname}/?movie=${movieID}`);
//         const theMovie = movies.filter((el) => el.id === movieID)[0];
//         setMovie(theMovie);
//         handleShow();
//     };

//     const closeModal = () => (e) => {
//         // router.push(router.pathname, undefined, { shallow: true });
//         handleClose();
//     };

//     return (
//         <MyModal show={show} onClick={closeModal} movie={movie}>
//             <div
//                 style={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     justifyContent: "space-between",
//                 }}
//             >
//                 {movies.map((el) => (
//                     <MyCard
//                         onClick={openModal}
//                         key={el.id}
//                         poster={el.backdrop_path}
//                         movieID={el.id}
//                     />
//                 ))}
//             </div>
//         </MyModal>
//     );
// };

function MyModal({ children, onClick, show, movie }) {
    return (
        <>
            {children}
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                contentClassName="bg-transparent border-0"
                onHide={onClick()}
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

export { MyModal };
