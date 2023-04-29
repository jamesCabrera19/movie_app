import { useContext, useEffect, useState, useRef } from "react";
import { Text } from "./text";
import NavigationContext from "../context/navigation";
import { Context as ThemeContext } from "../context/themeContext";

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

function NavigationBar({ components, omit, hide }) {
    const [state, setState] = useState(components);
    const {
        state: { theme },
    } = useContext(ThemeContext); //

    const screenNavigator =
        (screen = "", params = {}) =>
        (e) => {
            setState((prev) => {
                const match = prev.find((el) => el.title === screen);
                const el = prev.filter((el) => el.title !== screen);
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
                        const hiddenItems = Array.from(hide);
                        if (hiddenItems.includes(el.title)) {
                            // console.log(el.title);
                            return null;
                        }

                        // if (el.title === omit || omit === "all") {
                        //     return null;
                        // }
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
                                onClick={screenNavigator}
                            />
                        );
                    })}
                </div>
            </div>
            <NavigationContext.Provider
                value={{
                    screenNavigator,
                    params: state.filter((el) => el.active)[0].params,
                }}
            >
                {state.filter((el) => el.active)[0].component}
            </NavigationContext.Provider>
        </>
    );
}

export { NavigationBar };
