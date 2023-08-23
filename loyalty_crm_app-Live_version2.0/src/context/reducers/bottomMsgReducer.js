import {
  MESSAGE_CLEAR,
  MESSAGE_FAUILER,
  MESSAGE_INFO,
  MESSAGE_SUCCESS,
  MESSAGE_WARNING,
} from '../../constants/actionTypes';

export default bottomMsgReducer = (state, {type, message, long}) => {
  switch (type) {
    case MESSAGE_SUCCESS:
    case MESSAGE_WARNING:
    case MESSAGE_FAUILER:
    case MESSAGE_INFO:
      return {
        ...state.messages,
        messages: [
          ...state.messages,
          {
            key: new Date().getTime(),
            message: message,
            type: type,
            long: long,
          },
        ],
      };
    case MESSAGE_CLEAR:
      return {
        ...state.messages,
        messages: Object.values(state.messages).filter(
          msg => msg.message !== message,
        ),
      };
    default:
      return state;
  }
};
