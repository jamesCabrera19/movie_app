import { useEffect, useState } from "react";

let initState = [315162, 631842];

function reducer(state, action) {
    switch (action.type) {
        case "remove":
            return state.filter((id) => id !== action.payload);
        case "add_to_list":
            const res = state.find((id) => id === action.payload);
            return res ? state : [...state, action.payload];
        default:
            return state;
    }
}

// export default () => {
//     const [state, dispatch] = useReducer(reducer, initState);

//     function addToList(id = Number) {
//         dispatch({ type: "add_to_list", payload: id });
//     }

//     const removeFromList = (id = Number) => {
//         dispatch({ type: "remove", payload: id });
//     };

//     return [state, addToList, removeFromList];
// };

export default () => {
    const [state, setState] = useState(initState);

    const removeFromList = (id) => {
        initState = state.filter((el) => el !== id);
        setState(state.filter((el) => el !== id));
        console.log("removeFromList ", id);
    };
    const addToList = (id) => {
        const res = state.includes(id);
        if (!res) {
            MY_SAVED_IDS.push(id);
            setState((prev) => [...prev, id]);
        }
    };

    // const handleIt = (id) => {
    //     initState.includes(id) ? deleteId(id) : saveId(id);
    // };

    return [state, addToList, removeFromList, initState];
};
