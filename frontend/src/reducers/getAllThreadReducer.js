import isEmpty from '../validation/is-empty';
import { GET_ALL_THREAD } from '../actions/types';

const initialState = {
    getAllThread: {}
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_ALL_THREAD:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}
