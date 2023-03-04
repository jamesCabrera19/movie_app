import { useContext, useEffect, useState, useRef } from "react";
import { Text } from "./text";
import { theme as movieTheme } from "../styles";

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

function NavigationBar({}) {
    const theme = movieTheme;
    const [buttons, setButtons] = useState([
        {
            title: "Watch Now",
            active: true,
            id: 0,
        },
        {
            title: "My Movies",
            active: false,
            id: 1,
        },
        {
            title: "TV Shows",
            active: false,
            id: 2,
        },
        {
            title: "Library",
            active: false,
            id: 3,
        },
        {
            title: "Settings",
            active: false,
            id: 4,
        },
    ]);
    const handleButtonSwitch = (title) => (e) => {
        setButtons((prev) => {
            // function => one button will ALWAYS be selected, no matter what.
            // to do this. we find the button that was pressed.
            // we find the button by title.
            const match = prev.find((el) => el.title === title);
            // we then filter out buttons that do not match the title
            const el = prev.filter((el) => el.title !== title);
            // once we have the Selected button we change its Active property to true.
            match.active = true;
            // to ensure that no other Buttons are selected we loop over them and change their Active property to false
            el.forEach((el) => (el.active = false));
            // finally, we sort out the array of buttons and save them to an array return it
            const result = [match, ...el].sort((a, b) => a.id - b.id);
            return result;
        });
    };

    return (
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
                {buttons.map((el, idx) => {
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
                            onClick={handleButtonSwitch}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export { NavigationBar };
