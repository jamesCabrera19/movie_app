import { useRouter } from "next/router";
import { useState, useRef, useContext } from "react";
import authApi from "./projects/movies/movieAPI/authApi";
import { Text } from "./projects/movies/components/text";
import { Context as AuthContext } from "./projects/movies/context/AuthContext";

const AuthenticationForm = ({}) => {
    // AuthContext
    const { state, logIn } = useContext(AuthContext);

    //
    const formRef = useRef(null);
    const router = useRouter();
    // sign in state
    const [isSignUp, setIsSignUp] = useState(false);
    //
    const handleToggle = () => {
        setIsSignUp(!isSignUp);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Get data from the form.
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        };
        //  server endpoint
        const endpoint = isSignUp ? "/signup" : "/signin";

        logIn({ endpoint, data });

        if (state.redirect && state.token) {
            router.push(state.redirect);
        }
    };
    const theme = {
        type: "dark",
        backgroundColor: "#232323",
        panelBackgroundColor: "#1b1b1b",
        //
        fontColor: "#a09f9d",
        fontColorSecondary: "#eb6395",
        //

        buttonColor: "#eb6395",
        buttonFontColor: "#1b1b1b",
        boxShadowColor: "0 1px 1px rgba(0,0,0,.05)",
        themeColorToRGBA: function (alpha, hex) {
            const opacity = alpha || 0.9;
            const color = hex || "red";
            const [r, g, b] = color.match(/\w\w/g).map((x) => parseInt(x, 16));
            return `rgba(${r},${g},${b},${opacity})`;
        },
    };

    return (
        <form
            ref={formRef}
            style={{
                ...styles.form,
                backgroundColor: theme.backgroundColor,
            }}
            onSubmit={(e) => handleSubmit(e)}
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
            <button type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>

            <Text>
                Not a member? &nbsp;
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

const ProtectedRoute = () => {
    return (
        <>
            <AuthenticationForm />
        </>
    );
};

export default ProtectedRoute;
