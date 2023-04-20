import { useRef, useCallback, useEffect, useState, useContext } from "react";
import { Context as ThemeContext } from "../../context/themeContext";

import Switch from "react-switch";
import {
    IoIosNotificationsOutline,
    IoMdArrowBack,
    IoMdStats,
    MdKeyboardArrowRight,
    MdOutlineCheck,
    MdOutlineTitle,
    MdHistory,
    MdPlayCircleOutline,
    MdWbSunny,
    BsGearWideConnected,
    BsDownload,
    BsPaletteFill,
    BsFillMoonStarsFill,
    AiOutlineUser,
    FaAudioDescription,
    RiParentLine,
    SiThemoviedatabase,
    FiXCircle,
} from "../../components/icons";

import { GoBackButton } from "../../components/goBackButton";
import { MyButtons } from "../../components/myButtons";
import { Text } from "../../components/text";

const GeneralSettingsScreen = () => {
    const {
        state: { theme },
        switchTheme,
    } = useContext(ThemeContext);

    const [state, setState] = useState({ checked: false, notifications: true });
    //
    //
    const handleThemeChange = () => {
        setState((prev) => ({ ...prev, checked: !prev.checked }));
        if (theme.type === "dark") {
            switchTheme("light");
        } else {
            switchTheme("dark");
        }
    };
    const handleNotifications = () => {
        setState((prev) => ({ ...prev, notifications: !prev.notifications }));
        console.log("Notifications Feature needs to be implemented");
    };
    //
    //
    const buttons = [
        {
            label: `Theme`,
            Icon_A: (props) => <BsPaletteFill {...props} />,
            Component: () => (
                <Switch
                    onChange={handleThemeChange}
                    checked={state.checked}
                    checkedHandleIcon={
                        <MdWbSunny
                            style={{ margin: "0 0 2px 5px" }}
                            color={"white"}
                        />
                    }
                    uncheckedHandleIcon={
                        <BsFillMoonStarsFill
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
            label: "Notifications",
            Icon_A: (props) => <IoIosNotificationsOutline {...props} />,
            Component: (props) => (
                <Switch
                    onChange={handleNotifications}
                    checked={state.notifications}
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
        <div style={{ height: "100vh" }}>
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
