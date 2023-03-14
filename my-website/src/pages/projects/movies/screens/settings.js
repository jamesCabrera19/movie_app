import { Text } from "../components/text";

const Content = () => {
    return (
        <div style={{ border: "1px solid red" }}>
            <Text>this is MySettings section</Text>
        </div>
    );
};

function MySettings() {
    return (
        <div style={{ height: "100vh" }}>
            <Content />
        </div>
    );
}

export default MySettings;
