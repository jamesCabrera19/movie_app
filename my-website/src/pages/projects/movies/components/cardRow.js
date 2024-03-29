import { useContext } from "react";
// context
import { Context as settingsContext } from "../context/settingsContext";
import { Context as MovieContext } from "../context/movieContext";
import NavigationContext from "../context/navigation";
// components
import { TheModal } from "./modal";
import { Text } from "./text";
import MyCard from "./myCard";

// helper functions
function filterMoviesByIds(movieIds, movies) {
    const movieIdSet = new Set(movieIds);
    return movies.filter(({ id }) => movieIdSet.has(id));
}

const RowTitle = ({ title, movieIDS, type }) => {
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
                    type: type,
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
const CardRowNoModal = ({ movieIDS, type }) => {
    const { state } = useContext(MovieContext);

    const { screenNavigator } = useContext(NavigationContext);

    const {
        state: { theme },
    } = useContext(settingsContext);

    const movieIds = movieIDS || [];

    // filters movies from the main state
    const filteredMovies = filterMoviesByIds(movieIds, state.movies);
    if (!filteredMovies.length) {
        return null;
    }

    return (
        <div style={styles.smallContainer}>
            <div style={{ marginLeft: 10 }}>
                <Text variant="headlineExtraSmall" color={theme.fontColor}>
                    Up Next
                </Text>
            </div>
            <div style={{ display: "flex", marginBottom: 20 }}>
                {filteredMovies.map((el) => (
                    <MyCard
                        onClick={screenNavigator("Video Screen", {
                            id: el.id,
                            type: type,
                        })}
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
    const LIMIT = 4; // minimum amount of items per row
    const {
        state: { tv_shows, movies },
    } = useContext(MovieContext);

    // filters movies from the main state
    const filteredData = filterMoviesByIds(
        IDS,
        type === "TV_SHOWS" ? tv_shows : movies
    );

    if (filteredData.length < LIMIT) {
        return null;
    }

    return (
        <div style={styles.bigContainer}>
            <RowTitle title={title} movieIDS={IDS} type={type} />
            <div style={styles.bigRowContainer}>
                {filteredData.map((el) => (
                    <TheModal
                        key={el.id}
                        {...el}
                        title={el.title || el.name}
                        poster={el.backdrop_path || el.poster_path}
                        release_date={el.release_date || el.first_air_date}
                        type={type}
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
