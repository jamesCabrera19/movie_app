import createDataContext from "../../../../../context/index";

const ActionTypes = {
    SWITCH_THEME: "SWITCH_THEME",
    SWITCH_LANGUAGE: "SWITCH_LANGUAGE",
    PARENTAL_CONTROLS: "PARENTAL_CONTROLS",
};

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

const settingsReducer = (state, action) => {
    switch (action.type) {
        case "SWITCH_THEME":
            const themeType = state.theme.type;
            return {
                ...state,
                theme: themeType === "light" ? darkTheme : lightTheme,
            };
        case "SWITCH_LANGUAGE":
            return { ...state, videoAudioLanguage: action.payload };

        case "PARENTAL_CONTROLS":
            const res = state.parentalControls ? false : true;
            return { ...state, parentalControls: res };
        default:
            return state;
    }
};

const switchTheme = (dispatch) => () =>
    dispatch({ type: ActionTypes.SWITCH_THEME });
//
//
//
const switchLanguage = (dispatch) => (language) =>
    dispatch({ type: ActionTypes.SWITCH_LANGUAGE, payload: language });
//
//
//
const switchParentalControls = (dispatch) => () =>
    dispatch({ type: ActionTypes.PARENTAL_CONTROLS });
//
//
//
export const { Context, Provider } = createDataContext(
    settingsReducer,
    { switchTheme, switchLanguage, switchParentalControls }, // action Functions
    {
        videoAudioLanguage: "en", // needs to be lower case
        parentalControls: false, // boolean
        history: [],
        theme: darkTheme, //'dark'
    }
);
