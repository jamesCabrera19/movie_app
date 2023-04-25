import { useContext, useState } from "react";
import { Context as ThemeContext } from "../../context/themeContext";

import Switch from "react-switch";
import {
    MdOutlineCheck,
    FaAudioDescription,
    FiXCircle,
    MdPlayCircleOutline,
    BsDownload,
    MdOutlineTitle,
} from "../../components/icons";

import { GoBackButton } from "../../components/goBackButton";
import { MyButtons } from "../../components/myButtons";
import { Text } from "../../components/text";

import { MySwitch } from "../../components/mySwitch";

const SimpleButton = ({ onClick, labels }) => {
    const {
        state: { theme },
    } = useContext(ThemeContext);

    const handleClick = (item, idx) => (e) => {
        onClick(item);
        console.log(idx);
        // state.type === el? backgroundColor:'green'
    };
    return (
        <div
            style={{
                display: "flex",
                width: labels.length > 2 ? 200 : 100,
                justifyContent: "space-around",
            }}
        >
            {labels.map((el, idx) => (
                <button
                    key={idx}
                    onClick={handleClick(el, idx)}
                    style={{
                        borderRadius: 5,
                        padding: 5,
                        backgroundColor: "transparent",
                        color: theme.fontColor,
                        border: `2px solid ${theme.fontColor}`,
                    }}
                >
                    {el}
                </button>
            ))}
        </div>
    );
};

const VideoSettingsScreen = () => {
    const {
        state: { theme },
    } = useContext(ThemeContext);

    const handleAutoPlay = (props) => console.log("Auto Play Switch: ", props);
    const handleSubtitles = (props) => console.log("Subtitles Switch: ", props);

    const handleSimpleButton = (quality) => {
        console.log("Video Quality needs to be implemented: ", quality);
    };
    const handleLanguageSwap = (language) => {
        console.log(
            "Language Funcitonality needs to be implemented: ",
            language
        );
    };

    const buttons = [
        {
            label: "Auto Play",
            Icon_A: (props) => <MdPlayCircleOutline {...props} />,
            Component: () => <MySwitch onChange={handleAutoPlay} />,
        },
        {
            label: "Subtitles/Captions",
            Icon_A: (props) => <MdOutlineTitle {...props} />,
            Component: () => <MySwitch onChange={handleSubtitles} />,
        },
        {
            label: "Download Quality",
            Icon_A: (props) => <BsDownload {...props} />,
            Component: () => (
                <SimpleButton
                    onClick={handleSimpleButton}
                    labels={["HD", "Full HD", "4K"]}
                />
            ),
        },

        {
            label: "Audio Language",
            Icon_A: (props) => <FaAudioDescription {...props} />,
            Component: () => (
                <SimpleButton
                    onClick={handleLanguageSwap}
                    labels={["EN", "ES"]}
                />
            ),
        },
    ];
    return (
        <div style={{ height: "100vh" }}>
            <GoBackButton />
            <div>
                <Text color={theme.fontColor} variant={"headlineSmall"}>
                    Video Player Settings
                </Text>
                <MyButtons buttons={buttons} />
            </div>
        </div>
    );
};

export default VideoSettingsScreen;
