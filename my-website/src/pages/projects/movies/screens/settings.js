import { Text } from "../components/text";

function ABC(props) {
    return (
        <div style={{ height: 200, border: "1px solid red", color: "white" }}>
            <h1>hello</h1>
            <button onClick={() => console.log("props: ", props)}>
                read params
            </button>
        </div>
    );
}
const testing = {
    component: function (params) {
        return <ABC {...params} />;
    },
    params: function (params) {
        console.log(params);
        return this.component();
    },
};
function MySettings() {
    return (
        <div>
            <Text>this is MySettings section</Text>
            <button onClick={() => testing.params({ title: "QWERTY" })}>
                Test
            </button>
            {testing.component()}
        </div>
    );
}

export default MySettings;
