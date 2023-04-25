import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Text } from "./text";
import { BsApple, BsMeta } from "./icons";

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

function MyForm({ label }) {
    const onSubmit = () => (e) => {
        e.preventDefault();
        console.log("submitted");
    };

    // james@james.com
    // password
    return (
        <form
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: 10,
                height: 350,
                paddingTop: 20,
            }}
            onSubmit={onSubmit()}
        >
            <Text variant="headlineSmall">Sign in</Text>
            <div style={styles.container}>
                <label for="email">Email:</label>
                <input
                    style={styles.input}
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    placeholder={"email@email.com"}
                />
            </div>
            <div style={styles.container}>
                <label for="email">Password:</label>
                <input
                    style={styles.input}
                    id="password"
                    name="password"
                    type="text"
                    autoComplete="password"
                    placeholder={"******"}
                    required
                />
            </div>
            <LogInButton onClick={onSubmit} type={label} />
        </form>
    );
}
const styles = {
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
        backgroundColor: "white",
        marginBottom: 10,
        width: 340,
    },
};
export { MyForm };
