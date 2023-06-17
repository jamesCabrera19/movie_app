import { useContext, useEffect, useState, useRef, useCallback } from "react";

import { Context as ThemeContext } from "../context/settingsContext";

const MoviesContainer = ({ children }) => {
    const {
        state: { theme },
    } = useContext(ThemeContext);
    return (
        <div
            style={{
                backgroundColor: theme.backgroundColor,
                height: "100vh",
                padding: 100,
            }}
        >
            {children}
        </div>
    );
};

export default MoviesContainer;
