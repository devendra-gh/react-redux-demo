import {
  MOVIES,
} from '../constants/moviesActionConstants';

const initialState = {
  carousel: {},
  moviesData: {
    data: [],
    dataCount: 0,
  },
  error: {},
};


const movies = function (state = initialState, action) {
  switch (action.type) {

    /**All Movies Listing Actions ********************************************************/
    case MOVIES.CAROUSEL:
      return {
        ...state,
        carousel: action.data,
      };

    case MOVIES.GET_DATA:
      return {
        ...state,
        moviesData: {
          data: action.data.assets,
          dataCount: action.data.total_items,
        },
      };
    case MOVIES.APPEND_DATA:
      return {
        ...state,
        moviesData: {
          data: state.moviesData.data.concat(action.data.assets),
          dataCount: action.data.total_items,
        },
      };

    case MOVIES.ERROR:
      return {
        ...state,
        error: action.error,
      };

    case MOVIES.CLEAR_ERROR:
      return {
        ...state,
        error: {},

      };

    case MOVIES.CLEAR_DATA:
      return {
        ...state,
        moviesData: {
          data: [],
          dataCount: 0,
        },
        error: {},
      };


    default:
      return state;
  }
};
export default movies;
