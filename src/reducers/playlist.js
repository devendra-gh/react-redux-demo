import {
  PLAYLIST, VOPLAYLIST, RELATEDMEDIA, GETMEDIAINFO,
} from '../constants';

const initialState = {

  playlist: {
    localData: {},
    data: {},
    error: {},
  },

  voPlaylist: {
    data: {},
    error: {},
  },

  getRelatedMedia: {
    data: {},
    error: {},
  },
};

export const playlist = function (state = initialState, action) {
  switch (action.type) {
    case PLAYLIST.GET_DATA:
      (action.data.assets.top != undefined && action.data.assets.top != null) ? action.data.assets.top.reverse() : '';
      return {
        ...state,
        playlist: {
          localData: action.data,
          data: action.data,
          error: {},
        },
      };
    case PLAYLIST.APPEND_TOP_DATA: {
      (action.data.assets.top != undefined && action.data.assets.top != null) ? action.data.assets.top.reverse() : '';
      return {
        ...state,
        playlist: {
          localData: {
            assets: {
              current: state.playlist.localData.assets.current,
              top: state.playlist.localData.assets.top != null ? ((action.data.assets.top != null) ?action.data.assets.top.concat(state.playlist.localData.assets.top) : [null].concat(state.playlist.localData.assets.top) ) : action.data.assets.top,
              bottom: state.playlist.localData.assets.bottom,
            },
          },
          data: action.data,
          error: {},
        },
      };
    }
    case PLAYLIST.APPEND_BOTTOM_DATA: {
      return {
        ...state,
        playlist: {
          localData: {
            assets: {
              current: state.playlist.localData.assets.current,
              top: state.playlist.localData.assets.top,
              bottom: state.playlist.localData.assets.bottom != null  ? ((action.data.assets.bottom !=null)?state.playlist.localData.assets.bottom.concat(action.data.assets.bottom):state.playlist.localData.assets.bottom.concat([null])) : action.data.assets.bottom,
            },
          },
          data: action.data,
          error: {},
        },
      };
    }
    case PLAYLIST.FAILURE:
      return {
        ...state,
        playlist: {
          localData: {},
          data: {},
          error: action.error,
        },
      };

    case PLAYLIST.CLEAR_PLAYLIST:
      return {
        ...state,
        playlist: {
          localData: {},
          data: {},
          error: {},
        },
      };

    case VOPLAYLIST.SUCCESS:
      return {
        ...state,
        voPlaylist: {
          data: action.data,
          error: {},
        },
      };
    case VOPLAYLIST.FAILURE:
      return {
        ...state,
        voPlaylist: {
          data: [],
          error: action.error,
        },
      };

    case RELATEDMEDIA.SUCCESS:
      return {
        ...state,
        getRelatedMedia: {
          data: action.data,
          error: {},
        },
      };
    case RELATEDMEDIA.FAILURE:
      return {
        ...state,
        getRelatedMedia: {
          data: {},
          error: action.error,
        },
      };
    case RELATEDMEDIA.CLEAR:
      return {
        ...state,
        getRelatedMedia: {
          data: {},
          error: {},
        },
      };
    default:
      return state;
  }
};
