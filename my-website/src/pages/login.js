import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";

import { Text } from "./projects/movies/components/text";
import { Context as AuthContext } from "./projects/movies/context/AuthContext";

const AuthenticationForm = ({ theme }) => {
    // AuthContext
    const { state, logIn } = useContext(AuthContext);
    // navigation router
    const router = useRouter();
    // sign in state
    const [isSignUp, setIsSignUp] = useState(false);
    // switch between server endpoints '/signin' or '/signup'
    const handleToggle = () => {
        setIsSignUp(!isSignUp);
    };
    //
    const handleSubmit = (e) => {
        e.preventDefault();
        // Get data from the form.
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        };
        //  server endpoint
        const endpoint = isSignUp ? "/signup" : "/signin";
        // dispatching auth process
        logIn({ endpoint, data });
    };

    useEffect(() => {
        if (state.token && state.endpoint) {
            router.push(state.endpoint);
        }
    }, [state.endpoint, state.token]);

    const styles = {
        input: {
            fontSize: 18,
            padding: 5,
            borderRadius: 5,
            border: "none",
            outline: "none",
        },
        container: {
            display: "flex",
            flexDirection: "column",
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

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: 10,
                paddingTop: 20,
                backgroundColor: theme.backgroundColor,
            }}
        >
            <Text variant="headlineSmall" color={theme.fontColor}>
                {isSignUp ? "Sign Up" : "Log In"}
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

            <button
                type="submit"
                style={{
                    cursor: "pointer",
                    width: 340,
                    height: 50,
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: theme.buttonColor,
                    borderRadius: 10,
                    border: "none",
                    paddingTop: 7,
                }}
            >
                <Text color={theme.buttonFontColor}>
                    {isSignUp ? "Sign Up" : "Log In"}
                </Text>
            </button>

            <Text>
                {isSignUp ? "A member?" : "Not a member?"}
                &nbsp;
                <button
                    type="button"
                    onClick={handleToggle}
                    style={{ border: "none", background: "none" }}
                >
                    <code className={styles.code}>
                        {isSignUp ? "Log In" : "Sign Up"}
                    </code>
                </button>
            </Text>
        </form>
    );
};

const ProtectedRoute = () => {
    const theme = {
        backgroundColor: "#232323",
        fontColor: "#a09f9d",
        buttonColor: "#eb6395",
        buttonFontColor: "#1b1b1b",
    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: theme.backgroundColor,
            }}
        >
            <AuthenticationForm theme={theme} />
        </div>
    );
};

export default ProtectedRoute;
