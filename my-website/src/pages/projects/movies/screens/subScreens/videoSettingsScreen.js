import { useContext, useState } from "react";
//
import { Context as ThemeContext } from "../../context/themeContext";
//
import {
    FaAudioDescription,
    BsDownload,
    MdOutlineTitle,
} from "../../components/icons";
//
import { MyButtons } from "../../components/myButtons";
import { MySwitch } from "../../components/mySwitch";
//
//
const SimpleButton = ({ onClick, labels }) => {
    const [buttons, setButtons] = useState([
        {
            id: 0,
            active: true,
        },
        {
            id: 1,
            active: false,
        },
        {
            id: 2,
            active: false,
        },
    ]);
    const {
        state: { theme },
    } = useContext(ThemeContext);

    const handleClick = (buttonId) => (e) => {
        onClick(buttonId);
        const updatedButtons = buttons.map((button) => {
            return button.id === buttonId
                ? { ...button, active: true }
                : { ...button, active: false };
        });
        setButtons(updatedButtons);
    };
    return (
        <div
            style={{
                display: "flex",
                width: labels.length > 2 ? 200 : 100,
                justifyContent: "space-around",
            }}
        >
            {buttons.map((button, idx) => (
                <button
                    key={button.id}
                    onClick={handleClick(button.id)}
                    style={{
                        borderRadius: 5,
                        padding: 5,
                        backgroundColor: "transparent",
                        color: button.active ? "white" : theme.fontColor,
                        border: `2px solid ${theme.fontColor}`,
                    }}
                >
                    {labels[idx]}
                </button>
            ))}
        </div>
    );
};

const VideoSettingsScreen = () => {
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
            label: "Subtitles/Captions",
            Icon_A: (props) => <MdOutlineTitle {...props} />,
            Component: () => <MySwitch onChange={handleSubtitles} />,
        },
        {
            label: "Video Quality",
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
                    labels={["EN", "ES", "FR"]}
                />
            ),
        },
    ];
    return <MyButtons buttons={buttons} />;
};

export default VideoSettingsScreen;
