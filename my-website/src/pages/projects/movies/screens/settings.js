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
import { IoIosNotificationsOutline, IoMdArrowBack } from "react-icons/io";
import { MdKeyboardArrowRight, MdOutlineCheck } from "react-icons/md";
import { BsGearWideConnected } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
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

//
const ActionButton = ({ children, onClick }) => {
    const theme = movieTheme;

    return (
        <div
            onClick={onClick ? onClick() : () => {}}
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: 50,
                backgroundColor: theme.panelBackgroundColor,
                cursor: "pointer",
                // border: "1px solid red",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    height: 50,
                    borderBottom: `1px solid ${theme.backgroundColor}`,
                }}
            >
                {children}
            </div>
        </div>
    );
};
const MarginText = ({ text }) => {
    const theme = movieTheme;
    return (
        <div
            style={{
                margin: "15px 10px 0 10px",
            }}
        >
            <Text color={theme.fontColor}>{text}</Text>
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

const General = () => {
    const { screenNavigator } = useContext(NavigationContext);
    const theme = movieTheme;
    const signOut = () => (e) => {
        console.log("Sign out Function");
    };

    const actionButtons = [
        {
            title: "",
            icon: "",
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
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    borderRadius: 10,
                    overflow: "hidden",
                }}
            >
                <ActionButton>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            height: 50,
                        }}
                    >
                        <IoIosNotificationsOutline
                            color={theme.fontColor}
                            size={25}
                            style={{ marginLeft: 10 }}
                        />
                        <MarginText text="Notifications" />
                    </div>
                    <MdKeyboardArrowRight color={theme.fontColor} size={30} />
                </ActionButton>

                <ActionButton onClick={() => screenNavigator("MyList")}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            height: 50,
                        }}
                    >
                        <MdOutlineCheck
                            color={theme.fontColor}
                            size={25}
                            style={{ marginLeft: 10 }}
                        />

                        <MarginText text="My List" />
                    </div>
                    <MdKeyboardArrowRight color={theme.fontColor} size={30} />
                </ActionButton>

                <ActionButton>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            height: 50,
                        }}
                    >
                        <BsGearWideConnected
                            color={theme.fontColor}
                            size={25}
                            style={{ marginLeft: 10 }}
                        />
                        <MarginText text="App Settings" />
                    </div>
                    <MdKeyboardArrowRight color={theme.fontColor} size={30} />
                </ActionButton>
                <ActionButton>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            height: 50,
                        }}
                    >
                        <AiOutlineUser
                            color={theme.fontColor}
                            size={25}
                            style={{ marginLeft: 10 }}
                        />
                        <MarginText text="Account" />
                    </div>
                    <MdKeyboardArrowRight color={theme.fontColor} size={30} />
                </ActionButton>
            </div>
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
const MyList = () => {
    const { screenNavigator } = useContext(NavigationContext);
    return (
        <>
            <GoBackButton />
            <div style={{ marginTop: -50 }}>
                <MyCard />
            </div>
        </>
    );
};
const AppSettings = () => {
    return <Text>This is the app settings</Text>;
};

const SCREENS = [
    {
        component: <General />,
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
        component: <MyList />,
        title: "MyList",
        active: false,
        id: 2,
    },
    {
        component: <AppSettings />,
        title: "AppSettings",
        active: false,
        id: 3,
    },
];
function MySettings() {
    const theme = movieTheme;
    return (
        <div style={{ height: "100vh" }}>
            <div
                style={{
                    // height: 500,
                    width: 700,
                    margin: "auto",
                    borderRadius: 10,
                    border: `1px solid ${theme.panelBackgroundColor}`,
                }}
            >
                <NavigationBar omit="all" components={SCREENS} />
            </div>
        </div>
    );
}

export default MySettings;
