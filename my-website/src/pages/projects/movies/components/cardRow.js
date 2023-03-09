import { useState, useContext } from "react";
//
import { useRouter } from "next/router";
//
import { MyModal } from "./modal";
import { Text } from "./text";
import { theme as movieTheme } from "../styles";
import MyCard from "./myCard";
//
import NavigationContext from "../context/navigation";
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

const RowTitle = ({ onClick, title }) => {
    const theme = movieTheme;
    const { handleNavigation, locations, params } =
        useContext(NavigationContext);

    return (
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
            <div
                onClick={handleNavigation("Results")}
                style={{ cursor: "pointer" }}
            >
                <Text color={theme.fontColorSecondary}>See All</Text>
            </div>
        </div>
    );
};

const CardRow = ({ title, movieIDS, bigRow, onClick }) => {
    const theme = movieTheme;
    // modal controls
    const [show, setShow] = useState(false);
    const [movie, setMovie] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const openModal = (movie) => (e) => {
        e.preventDefault();
        const { id } = movie;
        // router.push(`${router.pathname}/?movie=${id}`);
        setMovie(movie);
        handleShow();
    };
    const closeModal = () => (e) => handleClose();
    //

    const handleSeeAll = () => console.log("");

    const styles = {
        bigContainer: { marginLeft: 20, marginRight: 20, padding: 0 },
        smallContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            marginTop: -130,
            height: 200,
            width: "80%",
            overflowX: "scroll",
            overflowY: "hidden",
        },
        bigRowContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            overflowX: "scroll",
            height: 200,
        },
        smallRowContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
    };

    return (
        <div style={bigRow ? styles.bigContainer : styles.smallContainer}>
            {bigRow ? (
                <>
                    <RowTitle title={title} onClick={handleSeeAll} />
                    <MyModal show={show} onClick={closeModal} movie={movie}>
                        <div style={styles.bigRowContainer}>
                            {data.map((el) => (
                                <div onClick={openModal(el)} key={el.id}>
                                    <MyCard
                                        poster={el.backdrop_path}
                                        movieID={el.id}
                                        sizePercent={-0.0}
                                        buttonPosition={null}
                                    />
                                </div>
                            ))}
                        </div>
                    </MyModal>
                </>
            ) : (
                <>
                    <div style={{ marginLeft: 10 }}>
                        <Text
                            variant="headlineExtraSmall"
                            color={theme.fontColor}
                        >
                            Up Next
                        </Text>
                    </div>
                    <MyModal show={show} onClick={closeModal} movie={movie}>
                        <div style={styles.smallRowContainer}>
                            {data.map((el, idx) => (
                                <div onClick={openModal(el)} key={el.id}>
                                    <MyCard
                                        poster={el.backdrop_path}
                                        sizePercent={0.26}
                                        buttonPosition={{ left: 130 }}
                                    />
                                </div>
                            ))}
                        </div>
                    </MyModal>
                </>
            )}
        </div>
    );
};

export { CardRow };
