import { Text } from "../components/text";
import { useRef, useLayoutEffect, useEffect, useState } from "react";
import Image from "next/image";

import useHover from "../hooks/useHover";
import { theme as movieTheme } from "../styles";
import { ImageLoader } from "../components/utils";
import MyCard from "../components/myCard";

function MySettings() {
    const handleClick = () => (e) => console.log("card");

    return (
        <div style={{ height: "100vh" }}>
            <div style={{ margin: "100px 100px" }}>
                <MyCard onClick={handleClick} />
            </div>
        </div>
    );
}

export default MySettings;
