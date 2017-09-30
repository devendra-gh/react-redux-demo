import {
  TOP_SHOUT, SHOUT, TV_SERIES_TOP_SHOUT,
} from '../constants';

const initialState = {
  topShout: {
    data: {},
    error: {},
  },
  shoutList: {
    data: {},
    error: {},
  },
  shoutByUser: {
    data: {},
    error: {},
    shoutByUser:false,
  },
  makeShout: {
    data: {},
    error: {},
    isShouted: false,
  },
  getTvSeriesTopShout: {
    data: {},
    error: {},
  },
};

const topShout = function (state = initialState, action) {
  switch (action.type) {
    case TOP_SHOUT.SUCCESS:
      return {
        ...state,
        topShout: {
          data: action.data,
          error: {},
        },
      };
    case TOP_SHOUT.FAILURE:
      return {
        ...state,
        topShout: {
          data: {},
          error: action.error,
        },
      };
    case TV_SERIES_TOP_SHOUT.SUCCESS:
      return {
        ...state,
        getTvSeriesTopShout: {
          data: action.data,
          error: {},
        },
      };
    case TV_SERIES_TOP_SHOUT.FAILURE:
      return {
        ...state,
        getTvSeriesTopShout: {
          data: {},
          error: action.error,
        },
      };
    case SHOUT.SHOUT_LIST.SUCCESS:
      return {
        ...state,
        shoutList: {
          data: action.data,
          error: {},
        },
      };
    case SHOUT.SHOUT_LIST.FAILURE:
      return {
        ...state,
        shoutList: {
          data: {},
          error: action.error,
        },
      };
    case SHOUT.SHOUT_BY_USER.SUCCESS:
      return {
        ...state,
        shoutByUser: {
          data: action.data,
          error: {},
        },
      };
    case SHOUT.SHOUT_BY_USER.FAILURE:
      return {
        ...state,
        shoutByUser: {
          data: {},
          error: action.error,
        },
      };
    case SHOUT.MAKE_SHOUT.SUCCESS:
     // console.log('action',action);
      return {
        ...state,
        makeShout: {
          data: action.data,
          isShouted: true,
          error: {},
        },
      };
    case SHOUT.MAKE_SHOUT.FAILURE:
      return {
        ...state,
        makeShout: {
          data: {},
          isShouted: false,
          error: action.error,
        },
      };
    case SHOUT.MAKE_SHOUT.RESET_MAKE_SHOUT:
      return {
        ...state,
        makeShout:{
          isShouted:false,
        },
      };
    default:
      return state;
  }
};

export default topShout;
