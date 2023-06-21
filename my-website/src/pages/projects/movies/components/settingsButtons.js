import { useState, useContext } from "react";
import { Context as SettingsContext } from "../context/settingsContext";
import Switch from "react-switch";
import {
    IoMdStats,
    MdWbSunny,
    BsPaletteFill,
    BsFillMoonStarsFill,
    RiParentLine,
    MdOutlineCheck,
    FiXCircle,
    FaAudioDescription,
    HiIdentification,
    BsApple,
    BsMeta,
    MdHistory,
} from "./icons";

import { MyButtons } from "./myButtons";
import { Text } from "./text";
import { MySwitch } from "./mySwitch";
import Modal from "react-bootstrap/Modal";
import { GoBackButton } from "./goBackButton";
import { MyForm } from "./form";

import useLocalStorage from "../hooks/useLocalStorage";

// helper functions
// playTime unit converter Function
function isValidTime(seconds) {
    let str = "s";
    let time = 0;
    //if seconds fall below thress hold they are seconds

    if (seconds <= 59) {
        // not a minute
        time = seconds;
    } else if (seconds <= 3599) {
        // seconds are minutes
        str = "m";
        time = Math.floor(seconds / 60);
    } else {
        // seconds are hours
        str = "h";
        time = Math.floor(seconds / 3600);
    }
    return time + str;
}

// components
const MarginText = ({ text, color }) => {
    const {
        state: { theme },
    } = useContext(SettingsContext);
    const col = color ? color : theme.themeColorToRGBA(0.3, theme.fontColor);
    return (
        <div
            style={{
                margin: "15px 10px 0 10px",
            }}
        >
            <Text color={col}>{text}</Text>
        </div>
    );
};
const HistoryAndPrivacyModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                contentClassName="bg-transparent"
            >
                <Modal.Body>
                    <div style={{ height: 300, border: "1px solid red" }}>
                        <Text>Not yet implemented</Text>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};
//
const LanguageButtons = (props) => {
    const { buttons, selectedButton, handleClick, fontColor } = props;
    const getColors = (label) =>
        label.toLowerCase() === selectedButton ? "white" : fontColor;

    return (
        <>
            {buttons.map((label) => (
                <button
                    key={label}
                    onClick={handleClick(label)}
                    style={{
                        borderRadius: 5,
                        padding: 5,
                        backgroundColor: "transparent",
                        border: `2px solid ${getColors(label)}`,
                        color: getColors(label),
                    }}
                >
                    {label}
                </button>
            ))}
        </>
    );
};
//

const SettingsButtons = () => {
    const {
        state: { parentalControls, theme },
        switchTheme,
        switchParentalControls,
    } = useContext(SettingsContext);

    // hook
    const [playTime] = useLocalStorage("play_time", 0);
    const [value] = useLocalStorage("movies", "");
    //
    const buttons = [
        {
            label: "Theme",
            Icon_A: (props) => <BsPaletteFill {...props} />,
            Component: () => (
                <MySwitch
                    onChange={switchTheme}
                    checked={theme.type === "dark" ? false : true}
                    type="theme"
                />
            ),
        },
        {
            label: "Parental Controls",
            Icon_A: (props) => <RiParentLine {...props} />,
            Component: () => (
                <MySwitch
                    onChange={switchParentalControls}
                    checked={parentalControls}
                />
            ),
        },
        {
            label: "Total Play Time",
            Icon_A: (props) => <IoMdStats {...props} />,
            Component: (props) => (
                <MarginText text={`${isValidTime(playTime)}`} />
            ),
        },
        {
            label: "History and Privacy",
            Icon_A: (props) => <MdHistory {...props} />,
            Component: null,
            onClick: (props) => () => {
                console.log(value);
            },
        },
    ];
    return <MyButtons buttons={buttons} />;
};

const AudioLanguageButtons = () => {
    const {
        state: { theme, videoAudioLanguage },
        switchLanguage,
    } = useContext(SettingsContext);

    // Convert label to lowercase and pass it to switchLanguage
    const handleClick = (label) => (e) => {
        switchLanguage(label.toLowerCase());
    };

    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            borderRadius: 10,
            overflow: "hidden",
            marginBottom: 20,
        },
        bar: {
            display: "flex",
            width: "100%",
            height: 50,
            backgroundColor: theme.panelBackgroundColor,
            borderBottom: `1px solid ${theme.backgroundColor}`,
            cursor: "pointer",
        },
        content: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        description: {
            display: "flex",
            alignItems: "center",
        },
        buttonContainer: {
            display: "flex",
            width: 200,
            justifyContent: "space-around",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.bar}>
                <div style={styles.content}>
                    <div style={styles.description}>
                        <FaAudioDescription
                            size={25}
                            style={{ marginLeft: 10 }}
                            color={theme.fontColor}
                        />
                        <div style={{ margin: "15px 10px 0 10px" }}>
                            <Text color={theme.fontColor}>Audio Language</Text>
                        </div>
                    </div>
                    <div style={styles.buttonContainer}>
                        <LanguageButtons
                            buttons={["EN", "ES", "FR"]}
                            selectedButton={videoAudioLanguage}
                            handleClick={handleClick}
                            fontColor={theme.fontColor}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { SettingsButtons, AudioLanguageButtons };
