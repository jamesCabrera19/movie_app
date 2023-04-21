import { useContext, useState } from "react";
import { Context as ThemeContext } from "../../context/themeContext";

import Switch from "react-switch";
import {
    MdOutlineCheck,
    BsPaletteFill,
    FiXCircle,
} from "../../components/icons";

import { GoBackButton } from "../../components/goBackButton";
import { MyButtons } from "../../components/myButtons";
import { Text } from "../../components/text";

const SimpleButton = ({ onClick, labels }) => {
    const {
        state: { theme },
    } = useContext(ThemeContext);

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
                    onClick={() => {
                        onClick(el);
                        console.log(idx);
                        // state.type === el? backgroundColor:'green'
                    }}
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

const MySwitch = ({ IconA, IconB, onChange }) => {
    const [state, setState] = useState(false);

    const handleIt = (props) => (e) => {
        setState((prev) => !prev);
        if (onChange) onChange(props);
    };
    return (
        <Switch
            onChange={handleIt(state)}
            checked={state}
            checkedHandleIcon={<IconA />}
            uncheckedHandleIcon={<IconB />}
            checkedIcon={false}
            uncheckedIcon={false}
            offHandleColor={"#232323"}
            onHandleColor="#232323"
            onColor={"#FFF"} // rail color
            offColor={"#888"} // rail color
        />
    );
};

const VideoSettingsScreen = () => {
    const {
        state: { theme },
    } = useContext(ThemeContext);

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
            Icon_A: (props) => <BsPaletteFill {...props} />,
            Component: () => (
                <MySwitch
                    onChange={() => console.log("Switch")}
                    //
                    //
                    IconA={() => (
                        <MdOutlineCheck
                            style={{ margin: "0 0 3px 5px" }}
                            color="#FFFFFF"
                        />
                    )}
                    IconB={() => (
                        <FiXCircle
                            style={{ margin: "0 0 2px 5px" }}
                            color="#FFFFFF"
                        />
                    )}
                />
            ),
        },
        {
            label: "Subtitles/Captions",
            Icon_A: (props) => <BsPaletteFill {...props} />,
            Component: () => (
                <MySwitch
                    onChange={() => console.log("Switch")}
                    //
                    //
                    IconA={() => (
                        <MdOutlineCheck
                            style={{ margin: "0 0 3px 5px" }}
                            color="#FFFFFF"
                        />
                    )}
                    IconB={() => (
                        <FiXCircle
                            style={{ margin: "0 0 2px 5px" }}
                            color="#FFFFFF"
                        />
                    )}
                />
            ),
        },
        {
            label: "Download Quality",
            Icon_A: (props) => <BsPaletteFill {...props} />,
            Component: () => (
                <SimpleButton
                    onClick={handleSimpleButton}
                    labels={["HD", "Full HD", "4K"]}
                />
            ),
        },

        {
            label: "Audio Language",
            Icon_A: (props) => <BsPaletteFill {...props} />,
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
