import {GETMEDIAINFO,
  GET_IS_FOLLOW_INFO,
  REMOVE_FOLLOW_INFO,
  ADD_FOLLOW_INFO,
  GET_FOLLOW_LIST,
  RESET_ADD_FOLLOW,
  RESET_IS_FOLLOWED_INFO,
} from '../constants';
import callApi from '../util/apiCaller';
import {success,failure, checkResponse} from '../util/response';
import {mergeDefault, setRemarketingData} from '../util/helper';
import {setLoader} from './loader';
import endpoints from '../../src/endpoints/playList';

export function clearMediaInfo() {
  return {
    type: GETMEDIAINFO.CLEAR,
  };
}

export const getMediaInfo=(params)=>{
  return dispatch => {
    const getMediaInfoEndPoint = endpoints.getMediaInfo;
    const mId = {mediaId: params.mediaId || params.episodeId};
    //dispatch(setLoader(true));
      return callApi({
        path: getMediaInfoEndPoint.path,
        method: getMediaInfoEndPoint.method,
        query: mergeDefault(getMediaInfoEndPoint.query.defaultParams,mId),
      }).then((response)=> checkResponse(response))
        .then(getMediaInfo => {
          if(typeof window !== "undefined"){
            setRemarketingData(getMediaInfo);
          }
          dispatch(success(GETMEDIAINFO.SUCCESS,getMediaInfo));
          dispatch(setLoader(false));
        })
        .catch(error=> {
          // Todo : needs to be fixed later
          if (error.toString().toLowerCase().indexOf("error: minified exception occurred") > -1) {
            // do nothing
          } else if (typeof error == "object" && error.name != 'Invariant Violation') {
            dispatch(failure(GETMEDIAINFO.FAILURE, error));
          }
          dispatch(setLoader(false));
        });
    }

};

export const getIsFollowedInfo=(params,queryParamsIsFollowed)=>{
  // debugger;
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body:queryParamsIsFollowed,
      query: mergeDefault(params.query.defaultParams,queryParamsIsFollowed),
    }).then((response)=> checkResponse(response))
      .then(isFollowedInfo => {
        dispatch(success(GET_IS_FOLLOW_INFO.SUCCESS,isFollowedInfo));
       // dispatch(setLoader(false));
      })
      .catch(error=> {
       dispatch(failure(GET_IS_FOLLOW_INFO.FAILURE,error));
       dispatch(setLoader(false));
      });
  };
};

export const getFollowList = (params, data)=>{
  return dispatch => {
    return callApi({
      path:params.path,
      method: params.method,
      body:data,
      query: mergeDefault(params.query.defaultParams),
    }).then(response => checkResponse(response))
      .then(followList => {
        dispatch(success(GET_FOLLOW_LIST.SUCCESS, followList));
        //dispatch(setLoader(false));
      })
      .catch(error => {
        dispatch(failure(GET_FOLLOW_LIST.FAILURE,error));
        dispatch(setLoader(false));
      });
  };
};

export const addFollowedInfo=(params,data)=>{
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body:data,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response))
      .then(followedInfo => {
        dispatch(success(ADD_FOLLOW_INFO.SUCCESS,followedInfo));
        dispatch(setLoader(false));
      })
      .catch(error=> {
        dispatch(failure(ADD_FOLLOW_INFO.FAILURE,error));
        dispatch(setLoader(false));
      });
  };
};

export const resetAddFollow = ()=>{
  return {
    type: RESET_ADD_FOLLOW.RESET,
  };
};

export const resetIsFollowedInfo = ()=>{
  return {
    type: RESET_IS_FOLLOWED_INFO.RESET,
  };
};

export const removeFollowedInfo=(params,queryParamsIsFollowed)=>{
  // debugger;
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body:queryParamsIsFollowed,
      query: mergeDefault(params.query.defaultParams,queryParamsIsFollowed),
    }).then((response)=> checkResponse(response))
      .then(followedInfo => {
        dispatch(success(REMOVE_FOLLOW_INFO.SUCCESS,followedInfo));
        dispatch(setLoader(false));
      })
      .catch(error=> {
        dispatch(failure(REMOVE_FOLLOW_INFO.FAILURE,error));
        dispatch(setLoader(false));
      });
  };
};
