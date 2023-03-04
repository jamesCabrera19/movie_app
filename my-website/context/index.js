import React, { useReducer } from "react";

export default (reducer, actions, initialState) => {
    // * USE ONLY TO CREATE DIFFERENT CONTEXT/PROVIDERS

    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        // actions === { fetchMovies: (dispatch) => { return () => {} } }
        // we loop over all action function and then these are called with dispatch
        const actionsCreators = {};
        for (let key in actions) {
            actionsCreators[key] = actions[key](dispatch);
        }

        return (
            <Context.Provider value={{ state, ...actionsCreators }}>
                {children}
            </Context.Provider>
        );
    };

    return { Context, Provider };
};
