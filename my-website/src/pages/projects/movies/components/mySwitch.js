import { useContext, useState } from "react";
import Switch from "react-switch";

import {
    MdOutlineCheck,
    FaAudioDescription,
    FiXCircle,
    MdPlayCircleOutline,
    BsDownload,
    MdOutlineTitle,
} from "./icons";

const MySwitch = ({ IconA, IconB, onChange }) => {
    const [state, setState] = useState(false);

    const handleIt = () => (e) => {
        if (onChange) onChange();
        setState((prev) => !prev);
    };
    const checked = (
        <MdOutlineCheck style={{ margin: "0 0 3px 5px" }} color="#FFFFFF" />
    );
    const unChecked = (
        <FiXCircle style={{ margin: "0 0 2px 5px" }} color="#FFFFFF" />
    );

    return (
        <Switch
            onChange={handleIt()}
            checked={state}
            checkedHandleIcon={IconA ? IconA : checked}
            uncheckedHandleIcon={IconB ? IconB : unChecked}
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
