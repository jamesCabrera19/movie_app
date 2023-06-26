import { useContext } from "react";

import { Text } from "../components/text";
import { Context as movieContext } from "../context/movieContext";
import { Context as settingsContext } from "../context/settingsContext";
import { MovieOrganizer } from "../components/Helpers";
import { genres } from "../components/utils";
import { CardRow } from "../components/cardRow";

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
