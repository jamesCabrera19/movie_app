import { useContext } from "react";
// context
import NavigationContext from "../context/navigation";
import { Context as SettingsContext } from "../context/settingsContext";
// components
import { NavigationBar } from "../components/navigationBar";
import { MyButtons } from "../components/myButtons";
import { Text } from "../components/text";

// icons
import { MdHistory, AiOutlineUser } from "../components/icons";
// screens
import AccountScreen from "./subScreens/accountScreen";
import { SpinningRow } from "../components/carousel";
import {
    SettingsButtons,
    AudioLanguageButtons,
} from "../components/settingsButtons";
//

// SCREENS // SCREENS // SCREENS // SCREENS  // SCREENS // SCREENS // SCREENS // SCREENS
const GeneralButtons = () => {
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
    ];

    return (
        <>
            <SpinningRow />
            {/* BUTTONS, BUTTONS, BUTTONS */}
            <SettingsButtons />
            <AudioLanguageButtons />
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
    return (
        <div style={{ width: 700, margin: "auto", minHeight: "100vh" }}>
            <NavigationBar
                components={SCREENS}
                // disables navigation buttons
                hide={["General", "Account"]}
            />
        </div>
    );
}

export default MySettings;
