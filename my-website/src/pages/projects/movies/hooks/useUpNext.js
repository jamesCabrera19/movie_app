import { useEffect, useState } from "react";

let initState = [315162];

export default () => {
    const [state, setState] = useState(initState);

    const removeFromList = (id) => {
        console.log("removeFromList");
    };
    const addToState = () => setState(initState);

    const addToList = (id) => {
        const movie = initState.includes(id);
        setState((prev) => {
            if (!movie) {
                [...prev, id];
            }
        });
    };

    // const handleIt = (id) => {
    //     initState.includes(id) ? deleteId(id) : saveId(id);
    // };

    return [state, addToList, removeFromList, initState];
};
