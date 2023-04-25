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
import Button from "react-bootstrap/Button";
import { MyForm } from "../../components/form";

const LogInButton = ({ onClick, type }) => {
    let title = type;
    if (type === undefined || type === null) {
        title = "Label is Undefined";
    }
    let firstLetterCap = title[0];
    firstLetterCap = firstLetterCap.toUpperCase();
    const remainingLetters = title.slice(1);
    const label = firstLetterCap + remainingLetters;

    return (
        <div
            style={{
                backgroundColor: type === "apple" ? "black" : "#3b5998",
                width: "45%",
                height: 50,
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
            }}
        >
            <div
                onClick={onClick()}
                style={{
                    marginTop: 10,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {type == "apple" ? (
                    <BsApple
                        size={18}
                        color="white"
                        style={{ marginTop: -15, marginRight: 20 }}
                    />
                ) : (
                    <BsMeta
                        size={18}
                        color="white"
                        style={{ marginTop: -15, marginRight: 20 }}
                    />
                )}
                <Text color="white">Sign in with {label}</Text>
            </div>
        </div>
    );
};
const AccModal = () => {
    const {
        state: { theme },
    } = useContext(ThemeContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAuth = (type) => {
        console.log("Auth type: ", type);
        handleShow();
    };

    const modalButtons = [
        {
            label: "Sign In with a local account",
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
                    <MyForm label={"apple"} />
                </Modal.Body>
            </Modal>
        </>
    );
};

const AccountScreen = () => {
    const {
        state: { theme },
    } = useContext(ThemeContext);

    const handleAuth = (type) => console.log("Auth type: ", type);

    const modalButtons = [
        {
            label: "Sign In with a local account",
            Icon_A: (props) => <HiIdentification {...props} />,
            onClick: (type) => (e) => handleAuth(type),
            Component: () => <Text>this will trigger a popup window</Text>,
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
    const switchButtons = [
        {
            label: "Parental Control => Switch filter mature content?",
            Icon_A: (props) => <RiParentLine {...props} />,
            onClick: () => (e) => {},
            Component: () => (
                <MySwitch onChange={() => console.log("Parental Controls")} />
            ),
        },
    ];
    const otherButtons = [
        {
            label: "History and Privacy",
            Icon_A: (props) => <BiHistory {...props} />,
            onClick: () => (e) => {},
            Component: null,
        },
        {
            label: "My List",
            Icon_A: (props) => <MdOutlineFormatListNumbered {...props} />,
            onClick: () => (e) => {},
            Component: null,
        },
    ];
    return (
        <div style={{ height: "100vh" }}>
            <GoBackButton />
            <Text color={theme.fontColor} variant={"headlineSmall"}>
                Account Management
            </Text>
            <AccModal />

            <div>
                {/* <MyButtons buttons={modalButtons} /> */}
                <MyButtons buttons={otherButtons} />
                <MyButtons buttons={switchButtons} />
            </div>
        </div>
    );
};

export default AccountScreen;
