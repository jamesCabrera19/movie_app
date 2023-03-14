import { useContext, useCallback } from "react";
//
import { TheModal } from "./modal";
import { Text } from "./text";
import { theme as movieTheme } from "../styles";
//
import NavigationContext from "../context/navigation";
import { Context as MovieContext } from "../context/movieContext";
//
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
//
const data = [
    {
        adult: false,
        overview:
            "A lighthouse keeper and his wife living off the coast of Western Australia raise a baby they rescue from an adrift rowboat.",
        release_date: "2016-09-02",
        genre_ids: [18],
        id: 123,
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
        id: 1234,
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
        id: 12345,
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
        id: 123456,
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
        id: 1234567,
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
        id: 12345678,
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

const RowTitle = ({ title, movieIds }) => {
    const theme = movieTheme;
    const { handleNavigation } = useContext(NavigationContext);

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
                onClick={handleNavigation("Results", {
                    ids: movieIds,
                    genre: title,
                })}
                style={{ cursor: "pointer" }}
            >
                <Text color={theme.fontColorSecondary}>See All</Text>
            </div>
        </div>
    );
};

const CardRow = ({ title, movieIDS, bigRow }) => {
    const {
        state: { movies },
    } = useContext(MovieContext);
    const theme = movieTheme;
    const movieIds = movieIDS || [];

    const result = movies.filter(({ id }) => movieIds.includes(id));

    return (
        <div style={bigRow ? styles.bigContainer : styles.smallContainer}>
            {bigRow ? (
                <>
                    <RowTitle title={title} movieIds={movieIds} />
                    <div style={styles.bigRowContainer}>
                        {result.map((el) => (
                            <TheModal
                                key={el.id}
                                poster={el.backdrop_path}
                                title={el.title}
                                overview={el.overview}
                                release_date={el.release_date}
                                vote_average={el.vote_average}
                                original_language={el.original_language}
                                addButtonOptions={false}
                            />
                        ))}
                    </div>
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
                    <div style={{ display: "flex" }}>
                        {data.map((el) => (
                            <TheModal
                                key={el.id}
                                poster={el.backdrop_path}
                                title={el.title}
                                overview={el.overview}
                                release_date={el.release_date}
                                vote_average={el.vote_average}
                                original_language={el.original_language}
                                addButtonOptions={true}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export { CardRow };
