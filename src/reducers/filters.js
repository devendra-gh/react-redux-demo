import {
  FILTERS,
} from '../constants';
import clone from 'clone';

const initialState = {
  mediaType : null,
  genre: ['All'],
  notInGenre: ['kids', 'kid'],
  language: ['English', 'Hindi'],
  constantData: ['English', 'Hindi'],
};

const filters = function (state = initialState, action) {
  switch (action.type) {
    case FILTERS.ADD_GENRE:
      return {
        ...state,
        genre: action.data,
      };

    case FILTERS.ADD_LANGUAGE:
      return {
        ...state,
        language: action.data,
      };

    case FILTERS.CLEAR_ALL_FILTERS:
      return {
        ...state,
        mediaType : state.mediaType,
        language: clone(state.constantData),
        genre: ['All'],
      };

    case FILTERS.ADD_MEDIATYPE:
      return {
        ...state,
        mediaType : action.data,
      };
    case FILTERS.UPDATE_LANGUAGE:
      return {
        ...state,
        language: action.data,
      };

    case FILTERS.UPDATE_INITIAL_LANGUAGE:
      return {
        ...state,
        constantData: clone(action.data),
      };
    case FILTERS.RESET_INITIAL_LANGUAGE:
      return {
        ...state,
        constantData: ['English', 'Hindi'],
      };
    default:
      return state;
  }
};
export default filters;
