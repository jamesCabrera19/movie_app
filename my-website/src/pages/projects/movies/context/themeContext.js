import createDataContext from "../../../../../context/index";
const darkTheme = {
    type: "dark",
    backgroundColor: "#232323",
    panelBackgroundColor: "#1b1b1b",
    //
    fontColor: "#a09f9d",
    fontColorSecondary: "#eb6395",
    //

    buttonColor: "#eb6395",
    buttonFontColor: "#1b1b1b",
    boxShadowColor: "0 1px 1px rgba(0,0,0,.05)",
    themeColorToRGBA: function (alpha, hex) {
        const opacity = alpha || 0.9;
        const color = hex || "red";
        const [r, g, b] = color.match(/\w\w/g).map((x) => parseInt(x, 16));
        return `rgba(${r},${g},${b},${opacity})`;
    },
};
const lightTheme = {
    type: "light",
    backgroundColor: "#FFEBEB",
    panelBackgroundColor: "#a09f9d",
    //
    fontColor: "#1b1b1b",
    fontColorSecondary: "#eb6395",
    //
    buttonColor: "#eb6395",
    buttonFontColor: "#1b1b1b",
    boxShadowColor: "0 1px 1px rgba(0,0,0,.05)",
    themeColorToRGBA: function (alpha, hex) {
        const opacity = alpha || 0.9;
        const color = hex || "red";
        const [r, g, b] = color.match(/\w\w/g).map((x) => parseInt(x, 16));
        return `rgba(${r},${g},${b},${opacity})`;
    },
};
const themeReducer = (state, action) => {
    switch (action.type) {
        case "light":
            return { theme: lightTheme };
        case "dark":
            return { theme: darkTheme };
        default:
            return state;
    }
};
const switchTheme = (dispatch) => (type) => dispatch({ type: type });

export const { Context, Provider } = createDataContext(
    themeReducer,
    {
        switchTheme,
    }, // action Functions
    {
        theme: darkTheme,
    }
);
