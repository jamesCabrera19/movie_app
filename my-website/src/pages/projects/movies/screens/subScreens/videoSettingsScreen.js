import { useContext, useState } from "react";
//
import { Context as settingsContext } from "../../context/settingsContext";
//
import { FaAudioDescription } from "../../components/icons";
//
import { Text } from "../../components/text";
//
//
const Buttons = ({ buttons, selectedButton, handleClick, fontColor }) => {
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
const VideoSettingsScreen = () => {
    const {
        state: { theme, videoAudioLanguage },
        switchLanguage,
    } = useContext(settingsContext);

    const handleClick = (label) => (e) => {
        // Convert label to lowercase and pass it to switchLanguage
        switchLanguage(label.toLowerCase());
    };
    const containerStyles = {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            borderRadius: 10,
            overflow: "hidden",
            width: "100%",
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
        <div style={containerStyles.container}>
            <div style={containerStyles.bar}>
                <div style={containerStyles.content}>
                    <div style={containerStyles.description}>
                        <FaAudioDescription
                            size={25}
                            style={{ marginLeft: 10 }}
                            color={theme.fontColor}
                        />
                        <div style={{ margin: "15px 10px 0 10px" }}>
                            <Text color={theme.fontColor}>Audio Language</Text>
                        </div>
                    </div>
                    <div style={containerStyles.buttonContainer}>
                        <Buttons
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
const styles = {};

export default VideoSettingsScreen;
