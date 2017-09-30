import {
  SMALL_LOADER,
} from '../constants';

const initialState = {
  load: false,
};

const smallLoader = function (state = initialState, action) {
  switch (action.type) {
    case SMALL_LOADER:
      return {
        ...state,
        load: action.state,
      };

    default:
      return state;
  }
};
export default smallLoader;
