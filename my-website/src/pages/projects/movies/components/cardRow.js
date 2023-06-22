import { useContext, useCallback } from "react";
//
import { TheModal } from "./modal";
import { Text } from "./text";
//
import NavigationContext from "../context/navigation";
import { Context as MovieContext } from "../context/movieContext";
// import { Context as ThemeContext } from "../context/themeContext";
import { Context as settingsContext } from "../context/settingsContext";

import MyCard from "./myCard";
//

const RowTitle = ({ title, movieIDS }) => {
    const {
        state: { theme },
    } = useContext(settingsContext);
    const { screenNavigator } = useContext(NavigationContext);
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
    } = useContext(settingsContext);
    const movieIds = movieIDS || [];

    // filters movies from the main state
    const movieIdSet = new Set(movieIds);
    const filteredMovies = state.movies.filter(({ id }) => movieIdSet.has(id));

    return (
        <div style={styles.smallContainer}>
            <div style={{ marginLeft: 10 }}>
                <Text variant="headlineExtraSmall" color={theme.fontColor}>
                    Up Next
                </Text>
            </div>
            <div style={{ display: "flex" }}>
                {filteredMovies.map((el) => (
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
const CardRow = ({ title, IDS, type }) => {
    const {
        state: { tv_shows, movies },
    } = useContext(MovieContext);

    // filters movies from the main state
    const idSet = new Set(IDS); // set of unique movies
    //
    const filteredData = (type === "TV_SHOWS" ? tv_shows : movies).filter(
        ({ id }) => idSet.has(id)
    );

    return (
        <div style={styles.bigContainer}>
            <RowTitle title={title} movieIDS={IDS} />
            <div style={styles.bigRowContainer}>
                {filteredData.map((el) => (
                    <TheModal
                        key={el.id}
                        movieID={el.id}
                        poster={el.backdrop_path}
                        title={type === "TV_SHOWS" ? el.name : el.title}
                        overview={el.overview}
                        release_date={
                            type === "TV_SHOWS"
                                ? el.first_air_date
                                : el.release_date
                        }
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
