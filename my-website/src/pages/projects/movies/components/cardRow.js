import { useContext, useCallback } from "react";
//
import { TheModal } from "./modal";
import { Text } from "./text";
import { theme as movieTheme } from "../styles";
//
import NavigationContext from "../context/navigation";
import { Context as MovieContext } from "../context/movieContext";
import MyCard from "./myCard";
//

const RowTitle = ({ title, movieIDS }) => {
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
                    ids: movieIDS,
                    genre: title,
                })}
                style={{ cursor: "pointer" }}
            >
                <Text color={theme.fontColorSecondary}>See All</Text>
            </div>
        </div>
    );
};

const CardRow = ({ title, bigRow, movieIDS, add, remove }) => {
    const {
        state: { movies },
    } = useContext(MovieContext);
    const theme = movieTheme;
    const movieIds = movieIDS || [];

    // filters movies from the main state
    const result = movies.filter(({ id }) => movieIds.includes(id)); // array of objs[{}]
    // console.log(result);
    return (
        <div style={bigRow ? styles.bigContainer : styles.smallContainer}>
            {bigRow ? (
                <>
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
                        {result.map((el) => (
                            <MyCard
                                id={el.id}
                                key={el.id}
                                onClick={() => () => console.log(el.title)}
                                poster={el.backdrop_path}
                                sizePercent={0.26}
                                buttonPosition={{ left: 130 }}
                                add={add}
                                remove={remove}
                            />
                        ))}
                    </div>
                </>
            )}
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
    },
    smallRowContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "hidden",
    },
};

export { CardRow };
