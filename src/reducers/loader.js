import {
  LOADER,
} from '../constants';

const initialState = {
  load: false,
};

const loader = function (state = initialState, action) {
  switch (action.type) {
    case LOADER:
      return {
        ...state,
        load: action.state,
      };

    default:
      return state;
  }
};
export default loader;
