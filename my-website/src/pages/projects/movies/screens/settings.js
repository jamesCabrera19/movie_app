import { useRef, useCallback, useEffect, useState, useContext } from "react";
import Image from "next/image";
const { v4: uuidv4 } = require("uuid");

import useHover from "../hooks/useHover";
import { theme as movieTheme } from "../styles";
import { ImageLoader } from "../components/utils";
import MyCard from "../components/myCard";
// import { NavigationBar } from "../components/navigationBar";
import { Text } from "../components/text";
import NavigationContext from "../context/navigation";
import { NavigationBar } from "../components/navigationBar";
import { IoIosNotificationsOutline, IoMdArrowBack } from "react-icons/io";
import { MdKeyboardArrowRight, MdOutlineCheck } from "react-icons/md";
import { BsGearWideConnected } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

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
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        height: 50,
                    }}
                >
                    {children}
                </div>
                <MdKeyboardArrowRight color={theme.fontColor} size={30} />
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

    return (
        <div style={{}}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    // margin: "0 10px",
                }}
            >
                <ActionButton>
                    <IoIosNotificationsOutline
                        color={theme.fontColor}
                        size={25}
                        style={{ marginLeft: 10 }}
                    />
                    <MarginText text="Notifications" />
                </ActionButton>

                <ActionButton onClick={() => screenNavigator("MyList")}>
                    <MdOutlineCheck
                        color={theme.fontColor}
                        size={25}
                        style={{ marginLeft: 10 }}
                    />
                    <MarginText text="My List" />
                </ActionButton>
                <ActionButton>
                    <BsGearWideConnected
                        color={theme.fontColor}
                        size={25}
                        style={{ marginLeft: 10 }}
                    />
                    <MarginText text="App Settings" />
                </ActionButton>
                <ActionButton>
                    <AiOutlineUser
                        color={theme.fontColor}
                        size={25}
                        style={{ marginLeft: 10 }}
                    />
                    <MarginText text="Account" />
                </ActionButton>
            </div>
        </div>
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
    return (
        <div style={{ height: "100vh" }}>
            <div
                style={{
                    height: 500,
                    width: 700,
                    margin: "auto",
                    borderRadius: 10,
                    border: "1px solid red",
                }}
            >
                <NavigationBar omit="all" components={SCREENS} />
            </div>
        </div>
    );
}

export default MySettings;
