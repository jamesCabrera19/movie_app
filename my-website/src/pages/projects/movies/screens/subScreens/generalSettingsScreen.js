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
} from "../../components/icons";

import { GoBackButton } from "../../components/goBackButton";
import { MyButtons } from "../../components/myButtons";
import { Text } from "../../components/text";
import { MySwitch } from "../../components/mySwitch";

const GeneralSettingsScreen = () => {
    const [state, setState] = useState(false);
    const {
        state: { theme },
        switchTheme,
    } = useContext(ThemeContext);
    //

    const handleThemeChange = () => (e) => {
        setState((prev) => !prev);
        if (theme.type === "light") {
            switchTheme("dark");
        } else {
            switchTheme("light");
        }
    };
    const handleNotifications = () => {
        console.log("Notifications Feature needs to be implemented");
    };
    //
    //
    const buttons = [
        {
            label: "Theme",
            Icon_A: (props) => <BsPaletteFill {...props} />,
            Component: () => (
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
            ),
        },
        {
            label: "Notifications",
            Icon_A: (props) => <IoIosNotificationsOutline {...props} />,
            Component: (props) => <MySwitch onChange={handleNotifications} />,
        },
        {
            label: "Data Usage",
            Icon_A: (props) => <IoMdStats {...props} />,
            Component: (props) => (
                <div
                    style={{
                        margin: "15px 10px 0 10px",
                    }}
                >
                    <Text color={theme.fontColor}>
                        This should be only a NUMBER, ex: 720mb downloaded
                    </Text>
                </div>
            ),
        },
    ];
    return (
        <div style={{ height: "63vh" }}>
            <GoBackButton />
            <div>
                <Text color={theme.fontColor} variant={"headlineSmall"}>
                    General Settings
                </Text>
                <MyButtons buttons={buttons} />
            </div>
        </div>
    );
};

export default GeneralSettingsScreen;
