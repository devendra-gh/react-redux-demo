import {CHANNEL} from '../constants';

const initialState = {
  home: {
    list: [],
    error: {},
  },
  landing: {
    headCarousel: [],
    moreShows: {
      list: [],
      listCount: 0,
    },
    error: {},
  },
};

const channel = function (state = initialState, action) {
  switch (action.type) {
    case CHANNEL.HOME.SUCCESS:
      return {
        ...state,
        home: {
          list: action.data,
          error: {},
        },
      };

    case CHANNEL.HOME.FAILURE:
      return {
        ...state,
        home: {
          list:[],
          error: action.error.message,
        },
      };


    case CHANNEL.LANDING.HEAD_CAROUSEL:
      return {
        ...state,
        landing: {
          ...state.landing,
          headCarousel: action.data,
        },
      };

    case CHANNEL.LANDING.MORE_SHOWS:
      return {
        ...state,
        landing: {
          ...state.landing,
          moreShows: {
            list: action.data.assets,
            listCount: action.data.total_items,
          },
        },
      };

    case CHANNEL.LANDING.SHOW_MORE_RESET:
      return {
        ...state,
        landing: {
          ...state.landing,
          moreShows: {
            list: [],
            listCount: 0,
          },
        },
      };

    case CHANNEL.LANDING.APPEND_MORE_SHOWS:
      return {
        ...state,
        landing: {
          ...state.landing,
          moreShows: {
            list: state.landing.moreShows.list.concat(action.data.assets),
            listCount: action.data.total_items,
          },
        },
      };

    case CHANNEL.LANDING.FAILURE:
      return {
        ...state,
        landing: {
          ...state.landing,
          error: action.error.message,
        },
      };

    case CHANNEL.LANDING.HEAD_CAROUSEL_RESET:
      return {
        ...state,
        landing: {
          ...state.landing,
          headCarousel: {},
        },
      };
    case CHANNEL.LANDING.RESET:
      return {
        ...state,
        landing: {
          ...state.landing,
          headCarousel: [],
          moreShows: {
            list: [],
            listCount: 0,
          },
          error: {},
        },
      };

    default:
      return state;
  }
};

export default channel;
