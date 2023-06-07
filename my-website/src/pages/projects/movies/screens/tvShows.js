import { useContext, useEffect, useState, useRef, Children } from "react";

import { Text } from "../components/text";
import { Provider as SettingsProvider } from "../context/settingsContext";
import { Context as SettingsContext } from "../context/settingsContext";

import { ImageLoader } from "../components/utils";
import { CardRow } from "../components/cardRow";
import { fibonacci } from "../components/codeChallenges";
const data = [
    {
        id: 0,
        header_text: "Highlights",
        ids: [],
    },
    {
        id: 1,
        header_text: "TV Channels",
        ids: [],
    },
    {
        id: 2,
        header_text: "Premiers",
        ids: [],
    },
    {
        id: 3,
        header_text: "Trending TV Shows",
        ids: [],
    },
    {
        id: 4,
        header_text: "Binge-Worthy Television",
        ids: [],
    },
    {
        id: 5,
        header_text: "TV Shows by Genre",
        ids: [],
    },
];
const App = () => {
    const { state, switchTheme, switchLanguage } = useContext(SettingsContext);

    const handleTheme = () => switchTheme();

    return (
        <div>
            <div style={{ marginLeft: 20 }} onClick={() => handleTheme()}>
                <Text variant="headlineLarge">TV Shows</Text>
                <Text variant="headlineLarge">{state.videoAudioLanguage}</Text>
            </div>

            <div style={{ borderTop: "1px solid red", margin: "20px 40px" }} />
            {data.map((el) => (
                <CardRow
                    key={el.id}
                    title={el.header_text}
                    bigRow={true}
                    seeAll={true}
                />
            ))}
        </div>
    );
};
export default function TVShows() {
    return (
        <SettingsProvider>
            <App />
        </SettingsProvider>
    );
}
