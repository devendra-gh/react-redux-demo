import {
  FORGET_PASSWORD,
  SEND_LINK_TO_EMAIL,
} from '../constants';

const initialState = {
    isLinkSend: false,
    data:{},
    error: {},
};

const forgotPassword = function (state = initialState, action) {
  switch (action.type) {
    case SEND_LINK_TO_EMAIL.SUCCESS:
      return {
        ...state,
          isLinkSend: true,
          data:action.data,
          error: {},
      };

    case SEND_LINK_TO_EMAIL.FAILURE:
      return {
        ...state,
          isLinkSend: false,
          data:{},
          error:action.error.message,
      };
    case SEND_LINK_TO_EMAIL.MODAL_CLOSE :
      return {
        ...state,
        isLinkSend: false,
        data: {},
        error:{},
      };

    case SEND_LINK_TO_EMAIL.CLEAR_ERRORS :
      return {
        ...state,
        error:{},
      };
    default:
      return state;
  }
};
export default forgotPassword;
