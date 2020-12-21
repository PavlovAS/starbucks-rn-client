import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOADING
} from './types';

// Register User
export const register = ({ login, password }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ id: login, password: password });

    try {
        dispatch({
            type: LOADING,
        });

        const res = await axios.post(`https://cn4aj3ekdg.execute-api.us-east-2.amazonaws.com/prod/user/${login}`, body, config);

        if (res.status == 201) {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: login,
            });
        } else {
            dispatch({
                type: REGISTER_FAIL,
            });
        }
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

// Login User
export const login = ({ login, password }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        dispatch({
            type: LOADING,
        });

        const res = await axios.get(`https://cn4aj3ekdg.execute-api.us-east-2.amazonaws.com/prod/user/${login}`, config);

        if (res.data.password == password) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: login,
            });
        } else {
            dispatch({
                type: LOGIN_FAIL,
            });
        }
    } catch (error) {
        console.log(error);
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
};
