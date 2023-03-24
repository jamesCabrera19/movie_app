import { useEffect, useState } from "react";

let initState = [315162];

export default () => {
    const [state, setState] = useState(initState);

    const removeFromList = (id) => {
        console.log("removeFromList");
    };
    const addToList = (id) => {
        const movie = initState.includes(id);
        if (movie) {
            console.log("false");
            return false;
        } else {
            console.log("addToList: ", id);
            initState.push(id);
        }
    };
    useEffect(() => {
        setState(initState);
    }, [initState]);

    // const handleIt = (id) => {
    //     initState.includes(id) ? deleteId(id) : saveId(id);
    // };

    return [state, addToList, removeFromList, initState];
};
