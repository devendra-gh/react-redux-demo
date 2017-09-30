import { GET_PROFILE } from '../constants';

const initialState = {
  data:{},
  error: {},
};

const user = function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE.SUCCESS :
    return {
      ...state,
      data:action.data,
      error: {},
    };
    case GET_PROFILE.FAILURE :
      return {
        ...state,
        data:{},
        error: action.error.message,
      };
    default :
      return state;

  }
};

export default user ;
