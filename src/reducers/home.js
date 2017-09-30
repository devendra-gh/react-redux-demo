import {HOME} from '../constants/index';
const initialState = {
  data: [],
  resultantSize: 0,
  currentPage: 0,
  error: {},
};

export const home = function (state = initialState, action) {
  let output = [];
  switch (action.type) {
    case HOME.SUCCESS:
      return {
        ...state,
        data: action.data,
        error: {},
      };
    case HOME.REQUEST:
      return {...state, data: []};
    case HOME.RESET_LOADER:
      return {...state};
    case HOME.FAILURE:
      return {
        ...state,
        data: [],
        error: action.error.message,
      };

    /* Paginated Home data actions **************************************/
    case HOME.PAGINATED_DATA.SUCCESS:
      if (state.data != [] && state.data != null) {
        if (action.data.assets != [] && action.data.assets != null) {
          output = state.data.concat(action.data.assets);
        }
        else
          output = state.data;
      }
      else if (action.data.assets != [] && action.data.assets != null) {
        output = action.data.assets;
      }

      return {
        ...state,
        data: output,
        resultantSize: action.data.assets != null ? action.data.assets.length : 0,
        currentPage: state.currentPage,
        error: {},
      };
    case HOME.PAGINATED_DATA.UPDATE_CURRENT_PAGE :
      return {
        ...state,
        data: state.data,
        resultantSize: state.resultantSize,
        currentPage: action.data.currentPage,
        error: {},
      };
    case HOME.PAGINATED_DATA.FAILURE:
      return {
        ...state,
        data: [],
        resultantSize: 0,
        currentPage: 0,
        error: action.error.message,
      };
    case HOME.PAGINATED_DATA.RESET:
      return {
        ...state,
        data: [],
        resultantSize: 0,
        currentPage: 0,
        error: {},
      };
    default:
      return state;
  }
};
