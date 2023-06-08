import { useContext, useState } from "react";
//
import Image from "next/image";
import { ImageLoader } from "../components/utils";
// context
import NavigationContext from "../context/navigation";
import { Context as MovieContext } from "../context/movieContext";
import { Context as SettingsContext } from "../context/settingsContext";
// components
import { NavigationBar } from "../components/navigationBar";
import { MyButtons } from "../components/myButtons";
import { Text } from "../components/text";
// styles
import _styles from "./test.module.css";
// icons
import { MdHistory, AiOutlineUser } from "../components/icons";
// screens
import GeneralSettingsScreen from "./subScreens/generalSettingsScreen";
import VideoSettingsScreen from "./subScreens/videoSettingsScreen";
import AccountScreen from "./subScreens/accountScreen";
//
//
// components to import
const SpinningRow = () => {
    const {
        state: { movies },
    } = useContext(MovieContext);

    const NUMBER_OF_IMAGES = 18;

    const images = movies.slice(0, NUMBER_OF_IMAGES).map((el) => (
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
        <div className={_styles.slider}>
            <div className={_styles.slideTrack}>
                {images}
                {images}
            </div>
        </div>
    );
};

// SCREENS // SCREENS // SCREENS // SCREENS  // SCREENS // SCREENS // SCREENS // SCREENS
const GeneralButtonSelector = () => {
    const { screenNavigator } = useContext(NavigationContext);

    const {
        state: { theme },
    } = useContext(SettingsContext);

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
            {/* SettingsButtons */}
            <MyButtons buttons={userSettings} />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: 50,
                }}
            >
                <Text color={theme.themeColorToRGBA(0.5, theme.fontColor)}>
                    last updated 06/7/2023
                </Text>
                <Text color={theme.themeColorToRGBA(0.5, theme.fontColor)}>
                    James Cabrera
                </Text>
            </div>
        </>
    );
};

class Screens {
    constructor(component, title = "", active = false, id) {
        this.component = component;
        this.title = title;
        this.active = active;
        this.id = id;
    }
    toggle() {
        this.active = !this.active;
    }
}

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
    } = useContext(SettingsContext);
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
                    // disables navigation buttons
                    hide={["General", "Account"]}
                />
            </div>
        </div>
    );
}

export default MySettings;
