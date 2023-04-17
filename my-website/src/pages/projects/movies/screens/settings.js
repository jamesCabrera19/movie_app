import { useRef, useCallback, useEffect, useState, useContext } from "react";
//
import Image from "next/image";
import { ImageLoader } from "../components/utils";
// context
import NavigationContext from "../context/navigation";
import { Context as MovieContext } from "../context/movieContext";

// hooks
import useHover from "../hooks/useHover";
// components
import { NavigationBar } from "../components/navigationBar";
import MyCard from "../components/myCard";
import { Text } from "../components/text";
// styles
import { theme as movieTheme } from "../styles";
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
    const theme = movieTheme;
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
    const theme = movieTheme;

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
    const theme = movieTheme;

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
                        key={{ idx }}
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
const Account = () => {
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
const VideoSettings = () => {
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
const GeneralSettings = () => {
    return (
        <>
            <GoBackButton />
            <div style={{ marginTop: -50 }}>
                <Text>General Settings</Text>
            </div>
        </>
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
        component: <Account />,
        title: "Account",
        active: false,
        id: 1,
    },
    {
        component: <VideoSettings />,
        title: "VideoSettings",
        active: false,
        id: 2,
    },
    {
        component: <GeneralSettings />,
        title: "GeneralSettings",
        active: false,
        id: 3,
    },
];
function MySettings() {
    const theme = movieTheme;
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
