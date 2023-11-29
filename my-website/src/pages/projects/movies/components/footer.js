import React, { useContext, useState } from "react";

import { Context as SettingsContext } from "../context/settingsContext";
import { Text } from "./text";
import { FaGithubSquare } from "./icons";

function ContactForm({ callback }) {
    const { state } = useContext(SettingsContext);
    const { backgroundColor, fontColor, buttonColor, buttonFontColor } =
        state.theme;

    const [formState, setFormState] = useState({
        isLoading: false,
        success: false,
        error: false,
    });

    const styles = {
        form: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 400,
            borderRadius: 5,
            backgroundColor: backgroundColor,
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        },
        input: {
            width: "90%",
            borderWidth: 0,
            borderRadius: 5,
            fontSize: 18,
            height: 30,
        },

        btn: {
            backgroundColor: buttonColor,
            color: buttonFontColor,
            alignItems: "center",
            width: "90%",
            height: 50,
            padding: 5,
            borderRadius: 5,
            border: 0,
            cursor: "pointer",
            marginBottom: 20,
        },
        label: {
            color: fontColor,
            alignSelf: "flex-start",
            marginLeft: 20,
        },
        message: {
            width: "90%",
            borderRadius: 5,
            fontSize: 18,
            color: fontColor,
        },
    };

    const sendEmail = async (e) => {
        e.preventDefault();
        const SERVICE_ID = "service_af8wtm3";
        const TEMPLATE_ID = "template_56au859";
        const PUBLIC_KEY = "JTd49SKCYVRSBP9RA";
        // next.js => e.target.name.value => Getting value from input
        setFormState({ ...formState, isLoading: true });
        try {
            // await emailjs.sendForm(
            //     SERVICE_ID,
            //     TEMPLATE_ID,
            //     e.target,
            //     PUBLIC_KEY
            // );
            setFormState({ isLoading: false, success: true, error: false });

            console.log(e.target);
        } catch (error) {
            console.log("Error: ", error);
            setFormState({ isLoading: false, success: false, error: true });
        }
        e.target.reset();
    };
    return (
        <>
            <form onSubmit={sendEmail} style={styles.form}>
                {formState.isLoading ? (
                    <div className="loader" style={styles.message}>
                        Loading...
                    </div>
                ) : formState.success ? (
                    <div className="success-message" style={styles.message}>
                        Message sent successfully!
                    </div>
                ) : formState.error ? (
                    <div className="error-message" style={styles.message}>
                        Error sending message. Please try again later.
                    </div>
                ) : (
                    <>
                        <Text color={fontColor} variant="headlineSmall">
                            Contact Me
                        </Text>
                        <labe style={styles.label} htmlFor="name">
                            Your Name
                        </labe>

                        <input
                            style={styles.input}
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            placeholder="Your name"
                        />
                        <div style={{ margin: 10 }} />
                        <label style={styles.label} htmlFor="email">
                            Your Email
                        </label>
                        <input
                            style={styles.input}
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="to jctcabrera@outlook.com"
                        />

                        <div style={{ margin: 10 }} />
                        <label style={styles.label} htmlFor="message">
                            Message to Developer
                        </label>
                        <input
                            style={styles.input}
                            id="message"
                            name="message"
                            type="text"
                            autoComplete="msg"
                            required
                            placeholder="Message"
                        />
                        <div style={{ margin: 10 }} />
                        <button
                            style={styles.btn}
                            type="submit"
                            disabled={formState.isLoading}
                        >
                            {formState.isLoading
                                ? "Sending..."
                                : "Send Message"}
                        </button>
                    </>
                )}
            </form>
        </>
    );
}

const Footer = ({}) => {
    const { state } = useContext(SettingsContext);
    const { panelBackgroundColor, fontColor, buttonFontColor } = state.theme;

    const styles = {
        button: {
            padding: "10px 20px",
            backgroundColor: buttonFontColor,
            color: "#fff",
            border: `1px solid ${fontColor}`,
            borderRadius: "5px",
            cursor: "pointer",
        },
        footerContainer: {
            background: panelBackgroundColor,
            padding: "20px",
            textAlign: "center",
            marginTop: 50,
        },
        anchor: {
            marginLeft: "10px",
            color: "#333",
            textDecoration: "none",
        },
    };

    const FooterBtn = ({ label, children, link }) => {
        return (
            <a
                href={link} //
                target="_blank"
                rel="noopener noreferrer"
                style={styles.anchor}
            >
                <button style={styles.button}>{label || children}</button>
            </a>
        );
    };

    return (
        <footer style={styles.footerContainer}>
            {/* <ContactForm /> */}
            <Text color={fontColor}>Developed by: Jaime Cabrera</Text>

            <FooterBtn
                label="Contact"
                link={"https://github.com/jamesCabrera19"}
            />
            <a>
                <FooterBtn link={"https://github.com/jamesCabrera19"}>
                    <FaGithubSquare
                        size={20}
                        style={{
                            verticalAlign: "middle",
                            marginRight: "5px",
                        }}
                    />
                    GitHub
                </FooterBtn>
            </a>
        </footer>
    );
};
export default Footer;
