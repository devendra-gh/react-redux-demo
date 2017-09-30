import {
  GETMEDIAINFO,
  GET_IS_FOLLOW_INFO,
  ADD_FOLLOW_INFO,
  REMOVE_FOLLOW_INFO,
  GET_FOLLOW_LIST,
  RESET_ADD_FOLLOW,
  RESET_IS_FOLLOWED_INFO,
} from '../constants';

const initialState = {
  mediaInfo: {
    data: {},
    error: {},
  },
  isFollowInfo: {
    data: {},
    error: {},
  },
  addFollowInfo: {
    data: {},
    error: {},
  },
  removeFollowInfo: {
    data: {},
    error: {},
  },
  followList:{
    data:{},
    error:{},
    load: false,
  },
};

export const getMediaInfo = function (state = initialState, action) {
  switch (action.type) {
    //***************GET MEDIA INFO REDUCER*********************
    case GETMEDIAINFO.SUCCESS:
      return {
        ...state,
        mediaInfo: {
          data: action.data,
          error: {},
        },
      };

    case GETMEDIAINFO.FAILURE:
      return {
        ...state,
        mediaInfo: {
          data: {},
          error: action.error,
        },
      };

    case GETMEDIAINFO.CLEAR:
      return {
        ...state,
        mediaInfo: {
          data: {},
          error: {},
        },
      };

    //***************IS FOLLOW REDUCER*********************
    case GET_IS_FOLLOW_INFO.SUCCESS:
      return {
        ...state,
        isFollowInfo: {
          data: action.data,
          error: {},
        },
      };
    case GET_IS_FOLLOW_INFO.FAILURE:
      return {
        ...state,
        isFollowInfo: {
          data: {},
          error: action.error,
        },
      };

    //***************ADD FOLLOW REDUCER*********************
    case ADD_FOLLOW_INFO.SUCCESS:
      return {
        ...state,
        addFollowInfo: {
          data: action.data,
          error: {},
        },
        removeFollowInfo: {
          data: {},
        },
      };
    case ADD_FOLLOW_INFO.FAILURE:
      return {
        ...state,
        addFollowInfo: {
          data: {},
          error: action.error,
        },
        removeFollowInfo: {
          data: {},
        },
      };

    //***************REMOVE FOLLOW REDUCER*********************
    case REMOVE_FOLLOW_INFO.SUCCESS:
      return {
        ...state,
        removeFollowInfo: {
          data: action.data,
          error: {},
        },
        addFollowInfo: {
          data: {},
        },
      };
    case REMOVE_FOLLOW_INFO.FAILURE:
      return {
        ...state,
        removeFollowInfo: {
          data: {},
          error: action.error,
        },
        addFollowInfo: {
          data: {},
        },
      };
    case GET_FOLLOW_LIST.SUCCESS:
      return {
        ...state,
        followList:{
          data:action.data,
          error:{},
          load: true,
        },
      };
    case GET_FOLLOW_LIST.FAILURE:
      return {
        ...state,
        followList:{
          data:{},
          error:action.error,
          load: true,
        },
      };
    case RESET_ADD_FOLLOW.RESET:
      return{
        ...state,
        addFollowInfo: {
          data: {},
          error: {},
        },
        removeFollowInfo: {
          data: {},
          error: {},
        },
      };
    case RESET_IS_FOLLOWED_INFO.RESET:
      return{
        ...state,
        isFollowInfo: {
          data: {},
          error: action.error,
        },
        addFollowInfo: {
          data: {},
          error: {},
        },
        removeFollowInfo: {
          data: {},
          error: {},
        },
      };
    default:
      return state;
  }
};

/*

 export const getIsFollowInfo = function (state = initialState, action) {
 switch (action.type) {
 case GETMEDIAINFO.SUCCESS:
 return {
 ...state,
 mediaInfo: {
 data: action.data,
 error: {},
 },
 };
 case GETMEDIAINFO.FAILURE:
 return {
 ...state,
 mediaInfo: {
 data: {},
 error: action.error,
 },
 };
 default:
 return state;
 }
 };*/
