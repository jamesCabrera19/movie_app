import { useContext } from "react";
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
// styles

import _styles from "./test.module.css";
// icons
import {
    IoIosNotificationsOutline,
    IoMdStats,
    MdOutlineTitle,
    MdHistory,
    MdPlayCircleOutline,
    BsGearWideConnected,
    BsDownload,
    BsPaletteFill,
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

// SCREENS // SCREENS // SCREENS // SCREENS  // SCREENS // SCREENS // SCREENS // SCREENS
const GeneralButtonSelector = () => {
    const { screenNavigator } = useContext(NavigationContext);
    const {
        state: { theme },
    } = useContext(ThemeContext);

    const signOut = () => (e) => {
        console.log("Sign out Function");
    };

    const videoSettings = [
        {
            label: "Video Player Settings",
            Icon_A: (props) => <IoIosNotificationsOutline {...props} />,
            onClick: () => screenNavigator("VideoSettings"),
            Component: null,
        },
        {
            label: "Auto Play",
            Icon_A: (props) => <MdPlayCircleOutline {...props} />,
            Component: (props) => <MarginText text="Switch" />,
        },

        {
            label: "Download Quality",
            Icon_A: (props) => <BsDownload {...props} />,
            Component: (props) => (
                <MarginText text="Low, Medium, High, Ultra High" />
            ),
        },
        {
            label: "Subtitles/Captions",
            Icon_A: (props) => <MdOutlineTitle {...props} />,
            Component: (props) => <MarginText text="Switch" />,
        },
        {
            label: "Audio Language",
            Icon_A: (props) => <FaAudioDescription {...props} />,
            Component: (props) => <MarginText text="En, Es, other" />,
        },
    ];
    const generalSettings = [
        {
            label: "General Settings",
            Icon_A: (props) => <BsGearWideConnected {...props} />,
            onClick: () => screenNavigator("GeneralSettings"),
            Component: null,
        },
        {
            label: "Interface Themes",
            Icon_A: (props) => <BsPaletteFill {...props} />,
            Component: (props) => <MarginText text={theme.type} />,
        },
        {
            label: "Notifications",
            Icon_A: (props) => <IoIosNotificationsOutline {...props} />,
            Component: (props) => <MarginText text="BOOLEAN value" />,
        },
        {
            label: "Data Usage",
            Icon_A: (props) => <IoMdStats {...props} />,
            Component: (props) => <MarginText text="NUMBER" />,
        },
    ];
    const userSettings = [
        {
            label: "Account Management",
            Icon_A: (props) => <AiOutlineUser {...props} />,
            onClick: () => screenNavigator("Account"),
            Component: null,
        },
        {
            label: "My List",
            Icon_A: (props) => <SiThemoviedatabase {...props} />,
            Component: (props) => <MarginText text="Switch" />,
        },
        {
            label: "History and Privacy",
            Icon_A: (props) => <MdHistory {...props} />,
            Component: (props) => <MarginText text="Switch" />,
        },
        {
            label: "Parental Controls",
            Icon_A: (props) => <RiParentLine {...props} />,
            Component: (props) => <MarginText text="Switch" />,
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
            {[generalSettings, videoSettings, userSettings].map((el, idx) => (
                <MyButtons buttons={el} key={idx} />
            ))}

            <div
                onClick={signOut()}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: 50,
                    cursor: "pointer",
                }}
            >
                <Text variant="headlineExtraSmall">Sign Out</Text>
                <Text>last updated 04/11/2023</Text>
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
    {
        component: <VideoSettingsScreen />,
        title: "VideoSettings",
        active: false,
        id: 2,
    },
    {
        component: <GeneralSettingsScreen />,
        title: "GeneralSettings",
        active: false,
        id: 3,
    },
];
// APP // APP // APP // APP // APP // APP // APP // APP // APP
function MySettings() {
    const {
        state: { theme },
    } = useContext(ThemeContext);
    return (
        <div style={{}}>
            <div
                style={{
                    // height: 500,
                    width: 700,
                    margin: "auto",
                    borderRadius: 10,
                    border: `0px solid ${theme.panelBackgroundColor}`,
                }}
            >
                <NavigationBar omit="all" components={SCREENS} />
            </div>
        </div>
    );
}

export default MySettings;
