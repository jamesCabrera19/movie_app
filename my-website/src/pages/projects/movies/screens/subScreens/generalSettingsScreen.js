import { useRef, useCallback, useEffect, useState, useContext } from "react";
import { Context as ThemeContext } from "../../context/themeContext";

import Switch from "react-switch";
import {
    IoIosNotificationsOutline,
    IoMdStats,
    MdOutlineCheck,
    MdWbSunny,
    BsPaletteFill,
    BsFillMoonStarsFill,
    FiXCircle,
    RiParentLine,
} from "../../components/icons";

import { GoBackButton } from "../../components/goBackButton";
import { MyButtons } from "../../components/myButtons";
import { Text } from "../../components/text";
import { MySwitch } from "../../components/mySwitch";
import useLocalStorage from "../../hooks/useLocalStorage";

const MarginText = ({ text, color }) => {
    const {
        state: { theme },
    } = useContext(ThemeContext);
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
const GeneralSettingsScreen = () => {
    const {
        state: { theme },
        switchTheme,
    } = useContext(ThemeContext);

    const [state, setState] = useState(false); // switch state
    // hook
    const [playTime, update, clear] = useLocalStorage("play_time", 0);

    //
    const handleThemeChange = () => (e) => {
        setState((prev) => !prev);
        theme.type === "light" ? switchTheme("dark") : switchTheme("light");
    };
    const handleParentalControls = (props) => (e) =>
        console.log("Parental Controls");

    //
    const SwitchComponent = ({ onClick }) => {
        return (
            <Switch
                onChange={handleThemeChange()}
                checked={state}
                checkedHandleIcon={
                    <MdWbSunny
                        color="yellow"
                        style={{ margin: "0px 0 1px 5px" }}
                    />
                }
                uncheckedHandleIcon={
                    <BsFillMoonStarsFill
                        color="white"
                        style={{ margin: "0px 0 1px 5px" }}
                    />
                }
                checkedIcon={false}
                uncheckedIcon={false}
                offHandleColor={"#232323"}
                onHandleColor="#232323"
                onColor={"#FFF"} // rail color
                offColor={"#888"} // rail color
            />
        );
    };
    //
    const buttons = [
        {
            label: "Theme",
            Icon_A: (props) => <BsPaletteFill {...props} />,
            Component: () => <SwitchComponent onClick={handleThemeChange} />,
        },
        {
            label: "Parental Controls",
            Icon_A: (props) => <RiParentLine {...props} />,
            Component: () => <MySwitch onChange={handleParentalControls()} />,
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
