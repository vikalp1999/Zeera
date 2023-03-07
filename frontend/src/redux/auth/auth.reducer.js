import { AUTH_ERROR, AUTH_LOGIN_SUCCESS, AUTH_REGISTER_SUCCESS, AUTH_RESET, UPDATE_USER } from "./auth.types";

const initialState = {
    isRegistered: false,
    isAuth: false,
    userData: {},
    isError: false,
    ErrorMsg:''
};

export const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case AUTH_REGISTER_SUCCESS: {
            return {
                ...state,
                isRegistered: true,
                isError: false,
                isAuth: true,
                userData: payload,
                ErrorMsg:''
            };
        }
        case AUTH_LOGIN_SUCCESS: {
            return {
                ...state,
                isAuth: true,
                isError: false,
                userData: payload.user,
                ErrorMsg:''
            };
        }
        case AUTH_ERROR: {
            return {
                ...state,
                isRegistered: false,
                isAuth: false,
                isError: true,
                ErrorMsg:payload
            };
        }
        case AUTH_RESET: {
            return {
                ...state,
                isRegistered: false,
                isAuth: false,
                isError: false,
                ErrorMsg:''
            };
        }
        case UPDATE_USER: {
            return {
                ...state,
                userData:payload
            };
        }
        default: {
            return state;
        }
    }
};
