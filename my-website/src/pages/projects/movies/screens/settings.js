import { useContext } from "react";
// context
import NavigationContext from "../context/navigation";
import { Context as SettingsContext } from "../context/settingsContext";
// screens
import AccountScreen from "./subScreens/accountScreen";
import { SpinningRow } from "../components/carousel";
// components
import { NavigationBar } from "../components/navigationBar";
import { MyButtons } from "../components/myButtons";
import { Text } from "../components/text";
import {
    SettingsButtons,
    AudioLanguageButtons,
    HistoryAndPrivacy,
} from "../components/settingsButtons";
// icons
import { AiOutlineUser } from "../components/icons";

//

// SCREENS // SCREENS // SCREENS // SCREENS  // SCREENS // SCREENS // SCREENS // SCREENS
const GeneralButtons = () => {
    const { screenNavigator } = useContext(NavigationContext);
    const {
        state: { theme },
    } = useContext(SettingsContext);

    const textColor = theme.themeColorToRGBA(0.5, theme.fontColor);

    const userSettings = [
        {
            label: "Account Management",
            Icon_A: (props) => <AiOutlineUser {...props} />,
            onClick: () => screenNavigator("Account"),
            Component: null,
        },
    ];

    return (
        <>
            <SpinningRow />
            {/* BUTTONS, BUTTONS, BUTTONS */}
            <SettingsButtons />
            <AudioLanguageButtons />

            <HistoryAndPrivacy />
            <MyButtons buttons={userSettings} />
            {/*  */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: 50,
                }}
            >
                <Text color={textColor}>last updated 06/7/2023</Text>
                <Text color={textColor}>James Cabrera</Text>
            </div>
        </>
    );
};

// MAIN SCREENS // MAIN SCREENS // MAIN SCREENS // MAIN SCREENS // MAIN SCREENS // MAIN SCREENS
const SCREENS = [
    {
        component: <GeneralButtons />,
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
    // List of components/screens to be hidden in the NavigationBar
    const hiddenComponents = ["General", "Account"];
    return (
        <div style={{ width: 700, margin: "auto", minHeight: "100vh" }}>
            <NavigationBar
                components={SCREENS}
                hiddenComponents={hiddenComponents}
            />
        </div>
    );
}

export default MySettings;
