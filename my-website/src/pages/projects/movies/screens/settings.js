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

const General = () => {
    const { handleNavigation } = useContext(NavigationContext);
    return (
        <div>
            <Text>Sync MyMovie Library</Text>
            <Text>Display all available categories</Text>
            <Text>Hide categories that contain less than one movie</Text>
            <button
                onClick={handleNavigation("Account", { bitch: "bitching" })}
            >
                callback
            </button>
        </div>
    );
};
const Account = () => {
    const { handleNavigation, params } = useContext(NavigationContext);
    console.log(params);
    return (
        <div>
            <Text>Account</Text>
            <Text>Account</Text>
            <Text>Account</Text>
        </div>
    );
};
const Playback = () => {
    return (
        <div>
            <Text>Playback</Text>
            <Text>Playback</Text>
            <Text>Playback</Text>
        </div>
    );
};
const initState = [
    {
        title: "General",
        active: true,
        id: 0,
        component: <General />,
    },
    {
        title: "Account",
        active: false,
        id: 1,
        component: <Account />,
    },
    {
        title: "Playback",
        active: false,
        id: 2,
        component: <Playback />,
    },
];
const NavigationButton = ({ styles, title, onClick }) => {
    return (
        <div
            style={{
                padding: "10px 20px",
                width: 200,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                ...styles,
            }}
            onClick={onClick(title)}
        >
            <Text variant="headlineExtraSmall" color={styles.fontColor}>
                {title}
            </Text>
        </div>
    );
};
function NavigationBar({ components, omit }) {
    const [state, setState] = useState(components);
    const theme = movieTheme;
    //
    const handleNavigation =
        (location = "", params = {}) =>
        (e) => {
            setState((prev) => {
                const match = prev.find((el) => el.title === location);
                const el = prev.filter((el) => el.title !== location);
                el.map((el) => (el.active = false));
                match.active = true;
                //
                const x = { ...match, params: params ? params : null };
                const res = [x, ...el].sort((a, b) => a.id - b.id);

                return res;
            });
        };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                    style={{
                        display: "flex",
                        border: `1px solid ${theme.panelBackgroundColor}`,
                        borderRadius: 10,
                        marginTop: 65,
                        marginBottom: 65,
                        overflow: "hidden",
                    }}
                >
                    {state.map((el) => {
                        if (el.title === omit) {
                            return null;
                        }
                        return (
                            <NavigationButton
                                key={el.id}
                                styles={{
                                    backgroundColor: el.active
                                        ? theme.panelBackgroundColor
                                        : theme.backgroundColor,
                                    fontColor: theme.fontColor,
                                }}
                                title={el.title}
                                onClick={handleNavigation}
                            />
                        );
                    })}
                </div>
            </div>
            <NavigationContext.Provider
                value={{
                    handleNavigation,
                    params: state.filter((el) => el.active)[0].params,
                }}
            >
                {state.filter((el) => el.active)[0].component}
            </NavigationContext.Provider>
        </>
    );
}

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
                    border: "1px solid red",
                    margin: "auto",
                    borderRadius: 10,
                }}
            >
                <NavigationBar omit="" components={initState} />
            </div>
        </div>
    );
}

export default MySettings;
