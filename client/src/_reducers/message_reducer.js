import {
    SAVE_MESSAGE,
} from '../_actions/types';

export default function (state = {messages:[]}, action) {
    switch (action.type) {
        case SAVE_MESSAGE:
            return {
                ...state,
                messages: state.messages.concat(action.payload) // payload: 데이터
            }
        default:
            return state;
    }
}