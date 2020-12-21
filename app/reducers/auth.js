import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOADING,
} from '../actions/types';

const initialState = {
    token: AsyncStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    user: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOADING:
            return {
                ...state,
                loading: true
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            AsyncStorage.setItem('token', "123testtoken123");
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                loading: false,
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            AsyncStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        default:
            return state;
    }
}
