import { useState, useContext } from "react";
import { Context as SettingsContext } from "../../context/settingsContext";

import Switch from "react-switch";
import {
    IoMdStats,
    MdWbSunny,
    BsPaletteFill,
    BsFillMoonStarsFill,
    RiParentLine,
    MdOutlineCheck,
    FiXCircle,
} from "../../components/icons";

import { MyButtons } from "../../components/myButtons";
import { Text } from "../../components/text";
import { MySwitch } from "../../components/mySwitch";
import useLocalStorage from "../../hooks/useLocalStorage";

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

const SwitchComponent = ({ onChange, checked, type }) => {
    const handleChange = () => onChange();

    const checkedIcon =
        type === "theme" ? (
            <MdWbSunny color="yellow" style={{ margin: "0px 0 1px 5px" }} />
        ) : (
            <MdOutlineCheck style={{ margin: "0 0 3px 5px" }} color="#FFFFFF" />
        );

    const uncheckedIcon =
        type === "theme" ? (
            <BsFillMoonStarsFill
                color="white"
                style={{ margin: "0px 0 1px 5px" }}
            />
        ) : (
            <FiXCircle style={{ margin: "0 0 2px 5px" }} color="#FFFFFF" />
        );

    return (
        <Switch
            onChange={handleChange}
            checked={checked}
            checkedHandleIcon={checkedIcon}
            uncheckedHandleIcon={uncheckedIcon}
            checkedIcon={false}
            uncheckedIcon={false}
            offHandleColor={"#232323"}
            onHandleColor="#232323"
            onColor={"#FFF"} // rail color
            offColor={"#888"} // rail color
        />
    );
};
const GeneralSettingsScreen = () => {
    const {
        state: { parentalControls, theme },
        switchTheme,
        switchParentalControls,
    } = useContext(SettingsContext);
    // hook
    const [playTime] = useLocalStorage("play_time", 0);
    //
    const buttons = [
        {
            label: "Theme",
            Icon_A: (props) => <BsPaletteFill {...props} />,
            Component: () => (
                <SwitchComponent
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
                <SwitchComponent
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
    ];
    return <MyButtons buttons={buttons} />;
};

export default GeneralSettingsScreen;
