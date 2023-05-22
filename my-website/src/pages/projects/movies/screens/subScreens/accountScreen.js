import { useContext, useState } from "react";
import { Context as ThemeContext } from "../../context/themeContext";

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
        let label = type.split(" ")[4];
        if (label === "Local") {
            label = "Local Account";
        }
        setBtn(label);
        handleShow();
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
const HistoryNPrivacyModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const otherButtons = [
        {
            label: "History and Privacy",
            Icon_A: (props) => <BiHistory {...props} />,
            onClick: () => (e) => handleShow(),
            Component: null,
        },
    ];

    return (
        <>
            <MyButtons buttons={otherButtons} />
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                contentClassName="bg-transparent"
            >
                <Modal.Body>
                    <div style={{ height: 300, border: "1px solid red" }}>
                        <Text>Not yet implemented</Text>
                    </div>
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
        <div style={{ height: "65vh" }}>
            <GoBackButton />
            <Text color={theme.fontColor} variant={"headlineSmall"}>
                Account Management
            </Text>
            <LogInModal />
            {/* <HistoryNPrivacyModal /> */}

            <div
                onClick={signOut()}
                style={{
                    marginTop: 50,
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                }}
            >
                <div
                    style={{
                        // border: "1px solid red",
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
