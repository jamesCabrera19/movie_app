import { useContext, useState } from "react";
import { Context as ThemeContext } from "../../context/settingsContext";

import Switch from "react-switch";
import {
    MdOutlineCheck,
    BsPaletteFill,
    FiXCircle,
    MdPlayCircleOutline,
    IoShareSocial,
    MdOutlineFormatListNumbered,
    BsMeta,
    BsApple,
    HiIdentification,
    RiParentLine,
    BiHistory,
} from "../../components/icons";

import { GoBackButton } from "../../components/goBackButton";
import { MyButtons } from "../../components/myButtons";
import { Text } from "../../components/text";
import { MySwitch } from "../../components/mySwitch";
import Modal from "react-bootstrap/Modal";
import { MyForm } from "../../components/form";

const LogInModal = () => {
    const [btn, setBtn] = useState("Locally"); // local//apple/meta
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAuth = (type) => {
        handleShow();

        let label = type.split(" ")[4];
        if (label === "Local") {
            label = "Local Account";
        }
        setBtn(label);
    };

    const modalButtons = [
        {
            label: "Sign In with a Local account",
            Icon_A: (props) => <HiIdentification {...props} />,
            onClick: (type) => (e) => handleAuth(type),
            Component: null,
        },
        {
            label: "Sign In with your Apple Account",
            Icon_A: (props) => <BsApple {...props} />,
            onClick: (type) => (e) => handleAuth(type),
            Component: null,
        },
        {
            label: "Sign In with your Meta Account",
            Icon_A: (props) => <BsMeta {...props} />,
            onClick: (type) => (e) => handleAuth(type),
            Component: null,
        },
    ];

    return (
        <>
            <MyButtons buttons={modalButtons} />
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                contentClassName="bg-transparent"
            >
                <Modal.Body>
                    <MyForm label={btn} />
                </Modal.Body>
            </Modal>
        </>
    );
};

const AccountScreen = () => {
    const {
        state: { theme },
    } = useContext(ThemeContext);

    const signOut = () => (e) => {
        console.log("Sign out Function");
    };

    return (
        <div style={{}}>
            <GoBackButton />
            <Text color={theme.fontColor} variant={"headlineSmall"}>
                Account Management
            </Text>
            <LogInModal />

            <br />
            <br />
            <br />
            <div
                onClick={signOut()}
                style={{
                    // marginTop: 50,
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                }}
            >
                <div
                    style={{
                        width: 200,
                        display: "flex",
                        justifyContent: "center",
                        borderRadius: 10,
                        backgroundColor: theme.buttonColor,
                    }}
                >
                    <Text
                        variant="headlineExtraSmall"
                        color={theme.buttonFontColor}
                    >
                        Sign Out
                    </Text>
                </div>
            </div>
        </div>
    );
};

export default AccountScreen;
