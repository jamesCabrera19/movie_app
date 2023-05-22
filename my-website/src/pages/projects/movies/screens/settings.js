import { useContext, useState } from "react";
//
import Image from "next/image";
import { ImageLoader } from "../components/utils";
// context
import NavigationContext from "../context/navigation";
import { Context as MovieContext } from "../context/movieContext";
import { Context as ThemeContext } from "../context/themeContext";
// components
import { NavigationBar } from "../components/navigationBar";
import { MyButtons } from "../components/myButtons";
import { Text } from "../components/text";
import { MySwitch } from "../components/mySwitch";
import Switch from "react-switch";

// hooks
import useLocalStorage from "../hooks/useLocalStorage";

// styles

import _styles from "./test.module.css";
// icons
import {
    IoIosNotificationsOutline,
    IoMdStats,
    MdOutlineTitle,
    MdHistory,
    MdWbSunny,
    MdPlayCircleOutline,
    BsGearWideConnected,
    BsDownload,
    BsPaletteFill,
    BsFillMoonStarsFill,
    AiOutlineUser,
    FaAudioDescription,
    RiParentLine,
    SiThemoviedatabase,
} from "../components/icons";
//
import GeneralSettingsScreen from "./subScreens/generalSettingsScreen";
import VideoSettingsScreen from "./subScreens/videoSettingsScreen";
import AccountScreen from "./subScreens/accountScreen";
//
//
// components to import
const SpinningRow = () => {
    const NUMBER_OF_IMAGES = 18;
    const {
        state: { movies },
    } = useContext(MovieContext);

    const images = movies
        .filter((el, idx) => idx <= NUMBER_OF_IMAGES)
        .map((el) => (
            <div className={_styles.slide} key={el.id}>
                <Image
                    alt="Movie Poster"
                    loader={ImageLoader}
                    src={el.poster_path}
                    height={100}
                    width={70}
                    style={{
                        borderRadius: 10,
                        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.5)",
                        margin: "0 5px",
                    }}
                />
            </div>
        ));

    return (
        <>
            <div className={_styles.slider}>
                <div className={_styles.slideTrack}>
                    {images}
                    {images}
                </div>
            </div>
        </>
    );
};
// COMPONENTS // COMPONENTS // COMPONENTS // COMPONENTS // COMPONENTS // COMPONENTS // COMPONENTS
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
// SUB-SCREEN

// SCREENS // SCREENS // SCREENS // SCREENS  // SCREENS // SCREENS // SCREENS // SCREENS
const GeneralButtonSelector = () => {
    const { screenNavigator } = useContext(NavigationContext);

    const {
        state: { theme },
    } = useContext(ThemeContext);

    const userSettings = [
        {
            label: "Account Management",
            Icon_A: (props) => <AiOutlineUser {...props} />,
            onClick: () => screenNavigator("Account"),
            Component: null,
        },

        {
            label: "History and Privacy",
            Icon_A: (props) => <MdHistory {...props} />,
            Component: (props) => null,
        },
    ];

    return (
        <>
            <div
                style={{
                    marginTop: -100,
                    marginBottom: 50,
                }}
            >
                <SpinningRow />
            </div>
            <GeneralSettingsScreen />
            <VideoSettingsScreen />
            {[userSettings].map((el, idx) => (
                <MyButtons buttons={el} key={idx} />
            ))}

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: 50,
                }}
            >
                <Text color={theme.themeColorToRGBA(0.5, theme.fontColor)}>
                    last updated 04/27/2023
                </Text>
                <Text color={theme.themeColorToRGBA(0.5, theme.fontColor)}>
                    James Cabrera
                </Text>
            </div>
        </>
    );
};

// MAIN SCREENS // MAIN SCREENS // MAIN SCREENS // MAIN SCREENS // MAIN SCREENS // MAIN SCREENS
const SCREENS = [
    {
        component: <GeneralButtonSelector />,
        title: "General",
        active: true,
        id: 0,
    },
    {
        component: <AccountScreen />,
        title: "Account",
        active: false,
        id: 1,
    },
];
// APP // APP // APP // APP // APP // APP // APP // APP // APP
function MySettings() {
    const {
        state: { theme },
    } = useContext(ThemeContext);
    return (
        <div>
            <div
                style={{
                    width: 700,
                    margin: "auto",
                    borderRadius: 10,
                    border: `0px solid ${theme.panelBackgroundColor}`,
                }}
            >
                <NavigationBar
                    components={SCREENS}
                    hide={["General", "Account"]}
                />
            </div>
        </div>
    );
}

export default MySettings;
