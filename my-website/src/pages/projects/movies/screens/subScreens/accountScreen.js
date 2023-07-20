import { useContext, useState } from "react";
import { Context as ThemeContext } from "../../context/settingsContext";
import { BsMeta, BsApple, HiIdentification } from "../../components/icons";
import { GoBackButton } from "../../components/goBackButton";
import { MyButtons } from "../../components/myButtons";
import { Text } from "../../components/text";
import Modal from "react-bootstrap/Modal";
import { MyForm } from "../../components/form";
import { Context as AuthContext } from "../../context/AuthContext";

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
const SignOutButton = ({ colors }) => {
    const { logOut } = useContext(AuthContext);
    const signOut = () => logOut();

    return (
        <div
            onClick={() => signOut()}
            style={{
                cursor: "pointer",
                width: 200,
                display: "flex",
                justifyContent: "center",
                borderRadius: 10,
                backgroundColor: colors.buttonColor,
            }}
        >
            <Text variant="headlineExtraSmall" color={colors.fontColor}>
                Sign Out
            </Text>
        </div>
    );
};
const AccountScreen = () => {
    const {
        state: { theme },
    } = useContext(ThemeContext);

    return (
        <div style={{}}>
            <GoBackButton />
            <Text color={theme.fontColor} variant={"headlineSmall"}>
                Account Management
            </Text>
            <LogInModal />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 100,
                }}
            >
                <SignOutButton
                    colors={{
                        buttonColor: theme.buttonColor,
                        fontColor: theme.buttonFontColor,
                    }}
                />
            </div>
        </div>
    );
};

export default AccountScreen;
