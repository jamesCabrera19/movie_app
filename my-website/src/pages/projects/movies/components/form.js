import React, { useState, useContext } from "react";
import { Text } from "./text";
import { BsApple, BsMeta, HiIdentification } from "./icons";
import { Context as ThemeContext } from "../context/themeContext";

const Button = ({ children, label }) => {
    return (
        <button
            style={{
                backgroundColor:
                    label.toLowerCase() === "meta" ? "#3b5998" : "black",
                ...styles.button,
            }}
        >
            <div
                style={{
                    marginTop: 10,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {children}
                <Text color="white">Sign in with {label}</Text>
            </div>
        </button>
    );
};
const IconButton = (key) => {
    switch (key) {
        case "Apple":
            return (
                <Button label={key}>
                    <BsApple
                        size={18}
                        color="white"
                        style={{ marginTop: -15, marginRight: 20 }}
                    />
                </Button>
            );
        case "Meta":
            return (
                <Button label={key}>
                    <BsMeta
                        size={18}
                        color="white"
                        style={{ marginTop: -15, marginRight: 20 }}
                    />
                </Button>
            );
        default:
            return (
                <Button label={key}>
                    <HiIdentification
                        size={25}
                        color="white"
                        style={{ marginTop: -15, marginRight: 20 }}
                    />
                </Button>
            );
    }
};

function MyForm({ label }) {
    const {
        state: { theme },
    } = useContext(ThemeContext);
    //

    //
    const onSubmit = () => async (e) => {
        e.preventDefault();
        // Get data from the form.
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
            type: label.toLowerCase(),
        };
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);
        // API endpoint where we send form data.
        const endpoint = "/api/form";
        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: "POST",
            // Tell the server we're sending JSON.
            headers: {
                "Content-Type": "application/json",
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        };

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options);

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json();
        alert(`Is this your full name: ${result.data}`);
    };

    // james@james.com
    // password
    return (
        <form
            style={{
                ...styles.form,
                backgroundColor: theme.backgroundColor,
            }}
            onSubmit={onSubmit()}
        >
            <Text variant="headlineSmall" color={theme.fontColor}>
                Sign in
            </Text>
            <div style={styles.container}>
                <label htmlFor="email">
                    <Text variant="headlineExtraSmall" color={theme.fontColor}>
                        Email:
                    </Text>
                </label>

                <input
                    style={styles.input}
                    type="text"
                    id="email"
                    name="email"
                    placeholder={"email@email.com"}
                    required
                />
            </div>
            <div style={styles.container}>
                <label htmlFor="email">
                    <Text variant="headlineExtraSmall" color={theme.fontColor}>
                        Password:
                    </Text>
                </label>
                <input
                    style={styles.input}
                    type="text"
                    id="password"
                    name="password"
                    placeholder="password"
                    required
                />
            </div>

            {IconButton(label)}
        </form>
    );
}
const styles = {
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        height: 350,
        paddingTop: 20,
    },
    input: {
        fontSize: 18,
        border: "1px solid grey",
        outline: "none",
        padding: 5,
        borderRadius: 5,
    },
    container: {
        display: "flex",
        flexDirection: "column",
        // backgroundColor: "white",
        marginBottom: 10,
        width: 340,
    },
    button: {
        width: "45%",
        height: 50,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        cursor: "pointer",
        border: "none",
    },
};
export { MyForm };
