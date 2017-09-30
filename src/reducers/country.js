import {
  COUNTRY,
} from '../constants';

const initialState = {
  list: [],
};

const country = function (state = initialState, action) {
  switch (action.type) {
    case COUNTRY.SUCCESS:
      return {
        ...state,
        list: action.data,
      };

    default:
      return state;
  }
};
export default country;
