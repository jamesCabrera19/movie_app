import createDataContext from "../../../../../context/index";
import authApi from "../movieAPI/authApi";

const authReducer = (state, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return {
                ...state,
                token: action.payload,
                endpoint: "/projects/movies",
            };
        case "LOGOUT":
            return { token: null, error: null };

        case "ERROR":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
const logIn = (dispatch) => {
    return async ({ endpoint, data }) => {
        try {
            const response = await authApi.post(endpoint, data);
            if (response.status === 200) {
                const token = response.data.token;
                dispatch({ type: "SIGN_IN", payload: token });
            }
        } catch (error) {
            console.log("SIGN IN ", error);
            dispatch({ type: "ERROR", payload: error });
        }
    };
};
const logOut = (dispatch) => () => dispatch({ type: "LOGOUT" });

export const { Context, Provider } = createDataContext(
    authReducer,
    { logIn, logOut }, // action Functions
    {
        token: undefined,
        error: null,
    }
);
