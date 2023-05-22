import { useContext, useCallback } from "react";
//
import { TheModal } from "./modal";
import { Text } from "./text";
//
import NavigationContext from "../context/navigation";
import { Context as MovieContext } from "../context/movieContext";
import { Context as ThemeContext } from "../context/themeContext";

import MyCard from "./myCard";
//

const RowTitle = ({ title, movieIDS }) => {
    const {
        state: { theme },
    } = useContext(ThemeContext);
    const { screenNavigator } = useContext(NavigationContext);
    console.log(title, movieIDS.length);
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
                onClick={screenNavigator("Results", {
                    ids: movieIDS,
                    genre: title,
                })}
                style={{ cursor: "pointer" }}
            >
                {movieIDS.length > 5 ? (
                    <Text color={theme.fontColorSecondary}>See All</Text>
                ) : null}
            </div>
        </div>
    );
};
const CardRowNoModal = ({ movieIDS }) => {
    const { state } = useContext(MovieContext);
    const { screenNavigator } = useContext(NavigationContext);

    const {
        state: { theme },
    } = useContext(ThemeContext);
    const movieIds = movieIDS || [];
    // filters movies from the main state
    const result = state.movies.filter(({ id }) => movieIds.includes(id)); // array of objs[{}]

    return (
        <div style={styles.smallContainer}>
            <div style={{ marginLeft: 10 }}>
                <Text variant="headlineExtraSmall" color={theme.fontColor}>
                    Up Next
                </Text>
            </div>
            <div style={{ display: "flex" }}>
                {result.map((el) => (
                    <MyCard
                        onClick={() =>
                            screenNavigator("Video Screen", {
                                id: el.id,
                            })
                        }
                        poster={el.backdrop_path}
                        buttonPosition={{ left: 130 }}
                        sizePercent={0.26}
                        movieID={el.id}
                        key={el.id}
                    />
                ))}
            </div>
        </div>
    );
};
const CardRow = ({ title, movieIDS }) => {
    const {
        state: { movies },
    } = useContext(MovieContext);

    const movieIds = movieIDS || [];

    // filters movies from the main state
    const result = movies.filter(({ id }) => movieIds.includes(id)); // array of objs[{}]
    // console.log(result);
    return (
        <div style={styles.bigContainer}>
            <RowTitle title={title} movieIDS={movieIds} />
            <div style={styles.bigRowContainer}>
                {result.map((el) => (
                    <TheModal
                        key={el.id}
                        movieID={el.id}
                        poster={el.backdrop_path}
                        title={el.title}
                        overview={el.overview}
                        release_date={el.release_date}
                        vote_average={el.vote_average}
                        original_language={el.original_language}
                    />
                ))}
            </div>
        </div>
    );
};

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
        overflowY: "hidden",
        scrollbarWidth: "none",
    },
    smallRowContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "hidden",
    },
};

export { CardRow, CardRowNoModal };
