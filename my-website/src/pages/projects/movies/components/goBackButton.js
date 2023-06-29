import { useContext } from "react";
// context
import { Context as ThemeContext } from "../context/settingsContext";
import NavigationContext from "../context/navigation";
// icons
import { IoMdArrowBack } from "./icons";
//
const GoBackButton = ({}) => {
    const { screenNavigator } = useContext(NavigationContext);
    const {
        state: { theme },
    } = useContext(ThemeContext);

    return (
        <div
            onClick={screenNavigator("General")}
            style={{ position: "absolute", marginTop: -120, cursor: "pointer" }}
        >
            <IoMdArrowBack color={theme.fontColor} size={40} />
        </div>
    );
};

export { GoBackButton };
