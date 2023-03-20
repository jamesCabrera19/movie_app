import { useRef, useCallback, useEffect, useState } from "react";

export default (delay) => {
    const [value, setValue] = useState(false);

    const ref = useRef(null);

    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);

    useEffect(() => {
        const node = ref.current;
        const timer = (callback) => (e) => setTimeout(callback, delay);
        if (node) {
            node.addEventListener("mouseover", handleMouseOver);
            node.addEventListener("mouseout", timer(handleMouseOut));
            return () => {
                node.removeEventListener("mouseover", handleMouseOver);
                node.removeEventListener("mouseout", handleMouseOut);
            };
        }
        return () => clearTimeout(timer);
    }, [delay, ref.current]);

    return [ref, value];
};
