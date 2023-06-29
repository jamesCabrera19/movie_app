// components
import Switch from "react-switch";
// icons
import {
    MdWbSunny,
    BsFillMoonStarsFill,
    MdOutlineCheck,
    FiXCircle,
} from "./icons";
//
//
const MySwitch = ({ onChange, checked, type }) => {
    const handleChange = () => onChange();

    const checkedIcon =
        type === "theme" ? (
            <MdWbSunny color="yellow" style={{ margin: "0px 0 1px 5px" }} />
        ) : (
            <MdOutlineCheck style={{ margin: "0 0 3px 5px" }} color="#FFFFFF" />
        );

    const uncheckedIcon =
        type === "theme" ? (
            <BsFillMoonStarsFill
                color="white"
                style={{ margin: "0px 0 1px 5px" }}
            />
        ) : (
            <FiXCircle style={{ margin: "0 0 2px 5px" }} color="#FFFFFF" />
        );

    return (
        <Switch
            onChange={handleChange}
            checked={checked}
            checkedHandleIcon={checkedIcon}
            uncheckedHandleIcon={uncheckedIcon}
            checkedIcon={false}
            uncheckedIcon={false}
            offHandleColor={"#232323"}
            onHandleColor="#232323"
            onColor={"#FFF"} // rail color
            offColor={"#888"} // rail color
        />
    );
};

export { MySwitch };
