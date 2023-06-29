import { useContext } from "react";
// context
import { Context as settingsContext } from "../context/settingsContext";
import { Context as movieContext } from "../context/movieContext";
// helper functions
import { MovieOrganizer } from "../components/Helpers";
// components
import { CardRow } from "../components/cardRow";
import { genres } from "../components/utils";
import { Text } from "../components/text";

export default function TVShows() {
    const {
        state: { tv_shows },
    } = useContext(movieContext);
    const {
        state: { theme },
    } = useContext(settingsContext);
    //
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
                <Text variant="headlineLarge" color={theme.fontColor}>
                    Top Rated TV Shows
                </Text>
            </div>

            <div
                style={{
                    borderTop: `1px solid ${theme.fontColor}`,
                    margin: "20px 40px",
                }}
            />
            {cardRows}
        </div>
    );
}
