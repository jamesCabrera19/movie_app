import { useRef, useCallback, useEffect, useState, useContext } from "react";
//
import Image from "next/image";
import { ImageLoader } from "../components/utils";
// context
import NavigationContext from "../context/navigation";
import { Context as MovieContext } from "../context/movieContext";
import { Context as ThemeContext } from "../context/themeContext";

// hooks
import useHover from "../hooks/useHover";
// components
import { NavigationBar } from "../components/navigationBar";
import MyCard from "../components/myCard";
import { Text } from "../components/text";
// styles
// import { theme as movieTheme } from "../styles";
import _styles from "./test.module.css";
// icons
import {
    IoIosNotificationsOutline,
    IoMdArrowBack,
    IoMdStats,
} from "react-icons/io";
import {
    MdKeyboardArrowRight,
    MdOutlineCheck,
    MdOutlineTitle,
    MdHistory,
    MdPlayCircleOutline,
} from "react-icons/md";
import { BsGearWideConnected, BsDownload, BsPaletteFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { FaAudioDescription } from "react-icons/fa";
import { RiParentLine } from "react-icons/ri";
import { SiThemoviedatabase } from "react-icons/si";
//
import Form from "react-bootstrap/Form";
// other
const { v4: uuidv4 } = require("uuid");
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
const GoBackButton = ({}) => {
    const { screenNavigator } = useContext(NavigationContext);
    const {
        state: { theme },
    } = useContext(ThemeContext);

    return (
        <div
            onClick={screenNavigator("General")}
            style={{ position: "absolute", marginTop: -120, cursor: "pointer" }}
        >
            <IoMdArrowBack color={theme.fontColor} size={40} />
        </div>
    );
};
const MyButtons = ({ buttons }) => {
    const {
        state: { theme },
    } = useContext(ThemeContext);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
                borderRadius: 10,
                overflow: "hidden",
                width: "100%",
                marginBottom: 20,
            }}
        >
            {buttons.map((Item, idx) => (
                <div
                    key={idx}
                    onClick={
                        Item.onClick
                            ? Item.onClick({
                                  type: idx === 0 ? Item.label : undefined,
                              })
                            : null
                    }
                    style={{
                        display: "flex",
                        width: "100%",
                        height: 50,
                        backgroundColor: theme.panelBackgroundColor,
                        borderBottom: `1px solid ${theme.backgroundColor}`,
                        cursor: "pointer",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Item.Icon_A
                                size={25}
                                style={{ marginLeft: 10 }}
                                color={theme.fontColorSecondary}
                            />
                            <MarginText
                                text={Item.label}
                                color={theme.fontColor}
                            />
                        </div>
                        <div>
                            {Item.Component ? (
                                <Item.Component />
                            ) : (
                                <MdKeyboardArrowRight
                                    color={theme.fontColor}
                                    size={30}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const GeneralButtonSelector = () => {
    const { screenNavigator } = useContext(NavigationContext);

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
            Component: (props) => <MarginText text="Switch" />,
        },
        {
            label: "Notifications",
            Icon_A: (props) => <IoIosNotificationsOutline {...props} />,
            Component: (props) => <MarginText text="Switch" />,
        },
        {
            label: "Data Usage",
            Icon_A: (props) => <IoMdStats {...props} />,
            Component: (props) => <MarginText text="Switch" />,
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
    const otherSettings = [
        {
            label: "Social Media Integration",
            Icon_A: (props) => <MdPlayCircleOutline {...props} />,
            onClick: () => (e) => {},
            Component: (props) => <MarginText text="Many Buttons" />,
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
            <MyButtons buttons={generalSettings} />
            <MyButtons buttons={videoSettings} />
            <MyButtons buttons={userSettings} />
            <MyButtons buttons={otherSettings} />
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
const AccountScreen = () => {
    const { screenNavigator } = useContext(NavigationContext);

    const Details = ({ title, subtitle }) => (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
            }}
        >
            <Text>{title}: </Text>
            <Text>{subtitle}</Text>
        </div>
    );
    return (
        <>
            <GoBackButton />
            <div style={{ marginTop: -50 }}>
                <Details title={"Account"} subtitle={"email@email.com"} />
                <Details title={"Chage Email"} subtitle={"new email"} />
                <Details title={"Password"} subtitle={"******"} />
                <Details title={"Credits Remaining"} subtitle={30} />
            </div>
        </>
    );
};
const VideoSettingsScreen = () => {
    const { screenNavigator } = useContext(NavigationContext);
    return (
        <>
            <GoBackButton />
            <div style={{ marginTop: -50 }}>
                <Text>Video Settings</Text>
            </div>
        </>
    );
};
const GeneralSettingsScreen = () => {
    const {
        state: { theme },
        switchTheme,
    } = useContext(ThemeContext);
    const [state, setState] = useState(true);
    const [label, setLabel] = useState("Dark");

    const handleThemeSwitch = () => {
        if (theme.type === "dark") {
            switchTheme("light");
        } else {
            switchTheme("dark");
        }
    };

    const buttons = [
        {
            label: `Theme`,
            Icon_A: (props) => <BsPaletteFill {...props} />,
            Component: () => (
                // <button onClick={() => handleThemeSwitch()}>
                //     {theme.type}
                // </button>
                <Form.Switch
                    onClick={() => handleThemeSwitch()}
                    label={theme.type}
                />
            ),
        },
        {
            label: "Notifications",
            Icon_A: (props) => <IoIosNotificationsOutline {...props} />,
            Component: (props) => <MarginText text="Switch" />,
        },
        {
            label: "Data Usage",
            Icon_A: (props) => <IoMdStats {...props} />,
            Component: (props) => <MarginText text="Switch" />,
        },
    ];
    return (
        <div style={{ height: "70vh" }}>
            <GoBackButton />
            <div style={{}}>
                <Text color={theme.fontColor} variant={"headlineSmall"}>
                    General Settings
                </Text>
                <MyButtons buttons={buttons} />
            </div>
        </div>
    );
};

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
