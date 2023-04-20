import { useContext } from "react";
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

const SimpleButton = ({ label, onClick }) => {
    const {
        state: { theme },
    } = useContext(ThemeContext);

    return (
        <button
            onClick={onClick()}
            style={{
                borderRadius: 5,
                backgroundColor: "transparent",
                color: theme.fontColor,
                padding: 5,
                border: `2px solid ${theme.fontColor}`,
            }}
        >
            {label}
        </button>
    );
};
const VideoSettingsScreen = () => {
    const {
        state: { theme },
    } = useContext(ThemeContext);

    const handleSimpleButton = () => (e) => {
        console.log("Video Quality needs to be implemented");
    };
    const handleLanguageSwap = () => (e) => {
        console.log("Language Funcitonality needs to be implemented");
    };
    const buttons = [
        {
            label: "Auto Play",
            Icon_A: (props) => <BsPaletteFill {...props} />,
            Component: () => (
                <Switch
                    onChange={() => {}}
                    checked={true}
                    checkedHandleIcon={
                        <MdOutlineCheck
                            style={{ margin: "0 0 2px 5px" }}
                            color={"white"}
                        />
                    }
                    uncheckedHandleIcon={
                        <FiXCircle
                            style={{ margin: "0 0 2px 5px" }}
                            color={"white"}
                        />
                    }
                    onColor={"#FFF"} // rail color
                    offColor={"#888"} // rail color
                    checkedIcon={false}
                    uncheckedIcon={false}
                    offHandleColor={"#232323"}
                    onHandleColor="#232323"
                />
            ),
        },
        {
            label: "Subtitles/Captions",
            Icon_A: (props) => <BsPaletteFill {...props} />,
            Component: () => (
                <Switch
                    onChange={() => {}}
                    checked={true}
                    checkedHandleIcon={
                        <MdOutlineCheck
                            style={{ margin: "0 0 2px 5px" }}
                            color={"white"}
                        />
                    }
                    uncheckedHandleIcon={
                        <FiXCircle
                            style={{ margin: "0 0 2px 5px" }}
                            color={"white"}
                        />
                    }
                    onColor={"#FFF"} // rail color
                    offColor={"#888"} // rail color
                    checkedIcon={false}
                    uncheckedIcon={false}
                    offHandleColor={"#232323"}
                    onHandleColor="#232323"
                />
            ),
        },
        {
            label: "Download Quality",
            Icon_A: (props) => <BsPaletteFill {...props} />,
            Component: () => (
                <div
                    style={{
                        display: "flex",
                        width: 200,
                        justifyContent: "space-around",
                    }}
                >
                    <SimpleButton onClick={handleSimpleButton} label="HD" />
                    <SimpleButton
                        onClick={handleSimpleButton}
                        label="Full HD"
                    />
                    <SimpleButton onClick={handleSimpleButton} label="4K" />
                </div>
            ),
        },

        {
            label: "Audio Language",
            Icon_A: (props) => <BsPaletteFill {...props} />,
            Component: () => (
                <div
                    style={{
                        display: "flex",
                        width: 100,
                        justifyContent: "space-around",
                    }}
                >
                    <SimpleButton onClick={handleLanguageSwap} label="EN" />
                    <SimpleButton onClick={handleLanguageSwap} label="SP" />
                </div>
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
