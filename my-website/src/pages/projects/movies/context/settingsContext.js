import createDataContext from "../../../../../context/index";

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
    {
        videoPlaybackQuality: "HD",
        videoAudioLanguage: "en", // needs to be lower case
        parentalControls: false, // if true filter out mature content
        history: [],
        theme: "light", //'dark'
    }
);
