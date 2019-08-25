import axios from 'axios';
import { GET_ERRORS,ADD_THREAD } from './types';

export const addThread = (data, history) => dispatch => {
    axios.post('api/threads/createThreads', data)
        .then(res => {
            dispatch(updateThread(res));
            history.push('/');
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
        type: ADD_THREAD,
        payload: res
    }
}