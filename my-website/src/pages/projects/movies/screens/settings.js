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

const ActionButton = ({ children }) => {
    const theme = movieTheme;

    return (
        <div
            style={{
                backgroundColor: theme.panelBackgroundColor,
                borderRadius: 10,
                height: 50,
                display: "flex",
                flexDirection: "row",
            }}
        >
            {children}
        </div>
    );
};

const General = () => {
    const { screenNavigator } = useContext(NavigationContext);
    const theme = movieTheme;
    console.log(theme);
    return (
        <div style={{ marginLeft: 65, marginRight: 65 }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    height: 100,
                }}
            >
                <ActionButton
                    title="Sync movies to device"
                    placement="top"
                    icon=""
                >
                    <Text>Sync movies to device</Text>
                </ActionButton>

                <ActionButton
                    title="Sync movies to device"
                    placement="top"
                    icon=""
                >
                    <Text>Display all available categories</Text>
                </ActionButton>
                <ActionButton
                    title="Sync movies to device"
                    placement="top"
                    icon=""
                >
                    <Text>Hide categories that contain less than 5 movies</Text>
                </ActionButton>
            </div>
        </div>
    );
};
const Account = () => {
    const { screenNavigator, params } = useContext(NavigationContext);
    console.log(params);
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
        <div style={{ marginLeft: 65 }}>
            <Details title={"Account"} subtitle={"email@email.com"} />
            <Details title={"Chage Email"} subtitle={"new email"} />

            <Details title={"Password"} subtitle={"******"} />
            <Details title={"Credits Remaining"} subtitle={30} />
        </div>
    );
};
const Playback = () => {
    return (
        <div
            style={{
                height: "80%",
                width: "90%",
                border: "1px solid red",
                display: "flex",
                margin: "auto",
            }}
        >
            <Text>Playback</Text>
            <Text>Playback</Text>
            <Text>Playback</Text>
        </div>
    );
};
const screens = [
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
        component: <Playback />,
        title: "Playback",
        active: false,
        id: 2,
    },
];

function MySettings() {
    const settings = {
        settings: {
            videoSource: ["youtube", "video"],
            sync: "allow database fetching",
            videoQuality: ["1080p", "720p", "420p"],
            categories: "allow all categories",
            hideCategories: "hide categories that contain less than 5 items",
        },
        account: {
            credits: Number,
            devices: ["iOS", "web"],
            email: "string",
            password: "string",
        },
    };

    return (
        <div style={{ height: "100vh" }}>
            <div
                style={{
                    height: 600,
                    width: 700,
                    margin: "auto",
                    borderRadius: 10,
                    border: "1px solid red",
                }}
            >
                <NavigationBar omit="" components={screens} />
            </div>
        </div>
    );
}

export default MySettings;
