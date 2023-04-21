import { useContext } from "react";
import { Context as ThemeContext } from "../../context/themeContext";

import Switch from "react-switch";
import {
    MdOutlineCheck,
    BsPaletteFill,
    FiXCircle,
    MdPlayCircleOutline,
    IoShareSocial,
    BsShareFill,
} from "../../components/icons";

import { GoBackButton } from "../../components/goBackButton";
import { MyButtons } from "../../components/myButtons";
import { Text } from "../../components/text";

const AccountScreen = () => {
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
    const buttons = [
        {
            label: "Social Media Integration",
            Icon_A: (props) => <BsShareFill {...props} />,
            onClick: () => (e) => {},
            Component: (props) => (
                <div
                    style={{
                        margin: "15px 10px 0 10px",
                    }}
                >
                    <Text>Too many buttons</Text>
                </div>
            ),
        },
    ];
    return (
        <div style={{}}>
            <GoBackButton />
            <div style={{ marginTop: -50 }}>
                <Details title={"Account"} subtitle={"email@email.com"} />
                <Details title={"Chage Email"} subtitle={"new email"} />
                <Details title={"Password"} subtitle={"******"} />
                <Details title={"Credits Remaining"} subtitle={30} />
            </div>
            <MyButtons buttons={buttons} />
        </div>
    );
};

export default AccountScreen;
