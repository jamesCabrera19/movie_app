import { useContext } from "react";

import { Text } from "../components/text";
import { Context as movieContext } from "../context/movieContext";
import { MovieOrganizer } from "../components/Helpers";
import { genres } from "../components/utils";
import { TheModal } from "../components/modal";

const CardRow = ({ title, IDS, type }) => {
    const {
        state: { tv_shows, movies },
    } = useContext(movieContext);

    // filters movies from the main state
    const idSet = new Set(IDS); // set of unique movies
    //
    const filteredData = (type === "TV_SHOWS" ? tv_shows : movies).filter(
        ({ id }) => idSet.has(id)
    );
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
    // console.log(filteredData);

    return (
        <div style={styles.bigContainer}>
            <Text>{title}</Text>
            <div style={styles.bigRowContainer}>
                {filteredData.map((el) => (
                    <>
                        <TheModal
                            type={type}
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
                    </>
                ))}
            </div>
        </div>
    );
};

export default function TVShows() {
    const {
        state: { tv_shows },
        fetchTVData,
    } = useContext(movieContext);
    // console.log(tv_shows[0]);
    // console.log(movies[0]);
    const tvLibrary = new MovieOrganizer(tv_shows, genres, true);
    // console.log(movies[0]);
    const tv = tvLibrary.moviesByGenre();

    const cardRows = Object.entries(tv)
        .sort(([keyA, idsA], [keyB, idsB]) => idsB.length - idsA.length)
        .map(([key, ids]) => {
            return ids.length === 0 ? null : (
                <CardRow key={key} title={key} IDS={ids} type={"TV_SHOWS"} />
            );
        });

    return (
        <div>
            <div style={{ marginLeft: 20 }}>
                <Text variant="headlineLarge">Top Rated TV Shows</Text>
            </div>
            <button onClick={() => fetchTVData()}> click</button>
            <div style={{ borderTop: "1px solid red", margin: "20px 40px" }} />
            {cardRows}
        </div>
    );
}
