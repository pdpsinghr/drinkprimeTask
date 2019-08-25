import isEmpty from '../validation/is-empty';
import { ADD_THREAD } from '../actions/types';

const initialState = {
    addThread: {}
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case ADD_THREAD:
            return {
                ...state,
                user: action.payload
            }
        default: 
            return state;
    }
}

