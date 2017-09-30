import {
  CUSTOM_PAGE,
} from '../constants';

const initialState = {
  data: {},
  error:{},
};

const customData = function (state = initialState, action) {
  switch (action.type) {
    case CUSTOM_PAGE.SUCCESS:
      return {
        ...state,
          data: action.data,
          error: {},
      };

    case CUSTOM_PAGE.FAILURE: {
      return {
        ...state,
          data: action.data,
          error: {},
      };
    }
    case CUSTOM_PAGE.CLEAR_DATA: {
      return {
        ...state,
          data: action.data,
          error: {},
      };
    }

    default:
      return state;
  }
};
export default customData;
