import { useState, useReducer } from "react";

const initState = [505642, 1077280, 1011679, 646389];

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

export default () => {
    const [state, dispatch] = useReducer(reducer, initState);

    function addToList(id = Number) {
        dispatch({ type: "add_to_list", payload: id });
    }

    const removeFromList = (id = Number) => {
        dispatch({ type: "remove", payload: id });
    };

    return [state, addToList, removeFromList];
};
