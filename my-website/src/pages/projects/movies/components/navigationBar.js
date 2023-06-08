import { useContext, useEffect, useState, useRef } from "react";
import { Text } from "./text";
import NavigationContext from "../context/navigation";
import { Context as ThemeContext } from "../context/settingsContext";

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

function NavigationBar({ components, hide }) {
    const [state, setState] = useState(components);
    const {
        state: { theme },
    } = useContext(ThemeContext); //

    const screenNavigator =
        (screen = "", params = {}) =>
        (e) => {
            setState((prev) => {
                // update the active screen based on the title
                const updatedScreens = prev.map((el) => ({
                    ...el,
                    active: el.title === screen,
                    // Assign params to the matching screen
                    params: el.title === screen ? params : null,
                }));
                return updatedScreens;
            });
        };
    const filteredState = state.filter((el) => !hide.includes(el.title));
    const activeComponent = state.filter((el) => el.active)[0].component;

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
                    {filteredState.map((el) => (
                        <NavigationButton
                            key={el.id}
                            styles={{
                                backgroundColor: el.active
                                    ? theme.panelBackgroundColor
                                    : theme.backgroundColor,
                                fontColor: theme.fontColor,
                            }}
                            title={el.title}
                            onClick={screenNavigator}
                        />
                    ))}
                </div>
            </div>
            <NavigationContext.Provider
                value={{
                    screenNavigator,
                    params: state.filter((el) => el.active)[0].params,
                }}
            >
                {activeComponent}
            </NavigationContext.Provider>
        </>
    );
}

export { NavigationBar };
