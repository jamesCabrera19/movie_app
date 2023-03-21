import { useReducer, useState } from "react";

let MY_SAVED_IDS = [315162, 631842];

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
    const [savedIds, setSaveIds] = useState(MY_SAVED_IDS);

    const removeFromList = (id) => {
        MY_SAVED_IDS = MY_SAVED_IDS.filter((el) => el !== id);
        setSaveIds(MY_SAVED_IDS);
    };
    const addToList = (id) => {
        if (!MY_SAVED_IDS.includes(id)) {
            MY_SAVED_IDS.push(id);
            setSaveIds((prev) => [...prev, id]);
        }
    };
    const handleIt = (id) => {
        initState.includes(id) ? deleteId(id) : saveId(id);
    };

    return [savedIds, addToList, removeFromList];
};
