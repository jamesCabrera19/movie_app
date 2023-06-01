import createDataContext from "../../../../../context/index";

const settings = {
    videoPlaybackQuality: "",
    videoAudioLanguage: undefined,
    parentalControls: false, // if true filter out mature content
    history: [],
    theme: "light", //'dark'
};
// userSettingsContext
// userSettings:{
// store locally
//

//}
const settingsReducer = (state, action) => {
    switch (action.type) {
        case value:
            break;

        default:
            break;
    }
};

export const { Context, Provider } = createDataContext(
    settingsReducer,
    {}, // action Functions
    {}
);
