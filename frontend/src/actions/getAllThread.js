import axios from 'axios';
import { GET_ERRORS, GET_ALL_THREAD } from './types';

const URL = "http://localhost:3000/api/threads/getAllThread/";

export const getAllThread = (data) => dispatch => {
    axios({
        method: "get",
        url: URL,
        params: {
            data
        }
    })
        .then(res => {
            dispatch(updateThread(res));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const updateThread = res => {
    return {
        type: GET_ALL_THREAD,
        payload: res
    }
}