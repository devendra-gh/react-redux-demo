import {
  CHANNEL_MEDIAS,
} from '../constants';

const initialState = {
  data: {},
  error:{},
};

const channelMedias = function (state = initialState, action) {
  switch (action.type) {
    case CHANNEL_MEDIAS.GET_CHANNEL_MEDIAS:
      return {
        ...state,
          data: action.data,
          error: {},
      };

    case CHANNEL_MEDIAS.FAILURE: {
      return {
        ...state,
          data: action.data,
          error: {},
      };
    }
    case CHANNEL_MEDIAS.CLEAR_CHANNEL_MEDIAS: {
      return {
        ...state,
        data: {},
        error: {},
      };
    }

    default:
      return state;
  }
};
export default channelMedias;
