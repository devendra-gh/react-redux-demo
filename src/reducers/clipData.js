import {CLIP_SEARCH_ASSET, CLIP_GET_MEDIA_INFO, CLIP_GET_RELATED_MEDIA} from '../constants/searchAssetConstant';

const initialState = {

  mediaInfo: {
    data: {},
    error: {},
  },

  searchAssets: {
    data: {},
    error: {},
  },

  relatedMedia: {
    data: {},
    error: {},
  },
};

export const clipData = function (state = initialState, action) {
  switch (action.type) {
    case CLIP_GET_MEDIA_INFO.SUCCESS:
      return {
        ...state,
        mediaInfo: {
          data: action.data,
          error: {},
        },
      };

    case CLIP_GET_MEDIA_INFO.CLEAR:
      return {
        ...state,
        mediaInfo: {
          data: {},
          error: {},
        },
      };

    case CLIP_GET_MEDIA_INFO.FAILURE: {
      return {
        ...state,
        mediaInfo: {
          data: action.data,
          error: {},
        },
      };
    }

    case CLIP_SEARCH_ASSET.SUCCESS:
      return {
        ...state,
        searchAssets: {
          data: action.data,
          error: {},
        },
      };

    case CLIP_SEARCH_ASSET.FAILURE: {
      return {
        ...state,
        searchAssets: {
          data: action.data,
          error: {},
        },
      };
    }

    case CLIP_GET_RELATED_MEDIA.SUCCESS:
      return {
        ...state,
        relatedMedia: {
          data: action.data,
          error: {},
        },
      };

    case CLIP_GET_RELATED_MEDIA.FAILURE: {
      return {
        ...state,
        relatedMedia: {
          data: action.data,
          error: {},
        },
      };
    }
    default:
      return state;
  }
};
