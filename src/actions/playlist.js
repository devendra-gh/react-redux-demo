import {PLAYLIST, VOPLAYLIST, RELATEDMEDIA, GETMEDIAINFO} from '../constants';
import callApi from '../util/apiCaller';
import {success,failure,checkResponse} from '../util/response';
import {mergeDefault,setRemarketingData} from '../util/helper';
import {setLoader} from './loader';
import endpoints from '../../src/endpoints/playList';


export const playlist=(params,callback)=>{
  return dispatch => {
    const getPlayListEndPoint = endpoints.playlist;
    const mId = {mediaId: params.mediaId};
    return callApi({
      path: getPlayListEndPoint.path,
      method: getPlayListEndPoint.method,
      query: mergeDefault(getPlayListEndPoint.query.defaultParams,mId),
    }).then((response)=> checkResponse(response))
      .then(playlist => {
        dispatch(success(PLAYLIST.GET_DATA,playlist));
        if(callback)
          dispatch(callback);
          dispatch(setLoader(false));
      })
      .catch(error=> {
        // TODO: remove this and dont call api when mediaId is wrong
        // if(!isNaN(params.mediaId))
        // dispatch(failure(PLAYLIST.FAILURE,error));
        // if(callback)
        //   dispatch(callback);
        dispatch(setLoader(false));
      });
  };
};

export const appendTopDataToPlayList=(params,mId,callback)=>{
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams,mId),
    }).then((response)=> checkResponse(response))
      .then(playlist => {
        dispatch(success(PLAYLIST.APPEND_TOP_DATA,playlist));
        dispatch(callback);
       // dispatch(setLoader(false));
      })
      .catch(error=> {
        dispatch(failure(PLAYLIST.FAILURE,error));
        dispatch(callback);
       // dispatch(setLoader(false));
      });
  };
};
export const appendBottomDataToPlayList=(params,mId, callback)=>{
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams,mId),
    }).then((response)=> checkResponse(response))
      .then(playlist => {
        dispatch(success(PLAYLIST.APPEND_BOTTOM_DATA,playlist));
        dispatch(callback);
       // dispatch(setLoader(false));
      })
      .catch(error=> {
        dispatch(failure(PLAYLIST.FAILURE,error));
        dispatch(callback);
       // dispatch(setLoader(false));
      });
  };
};


export function clearPlayList(){
  return {
    type: PLAYLIST.CLEAR_PLAYLIST,
  };
}

export const voPlaylist=(params,data)=>{
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams,data),
    }).then((response)=> checkResponse(response))
      .then(voPlaylist => {
        dispatch(success(VOPLAYLIST.SUCCESS,voPlaylist));
       // dispatch(setLoader(false));
      })
      .catch(error=> {
        dispatch(failure(VOPLAYLIST.FAILURE,error));
        //dispatch(setLoader(false));
      });
  };
};

export const relatedMedia=(params,data)=>{
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body:data,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response))
      .then(relatedMedia => {
        dispatch(success(RELATEDMEDIA.SUCCESS,relatedMedia));
       // dispatch(setLoader(false));
      })
      .catch(error=> {
        //dispatch(failure(RELATEDMEDIA.FAILURE,error));
        //dispatch(setLoader(false));
      });
  };
};

export const getMediaInfo=(params, callback)=>{
  return dispatch => {
    const getMediaInfoEndPoint = endpoints.getMediaInfo;
    const mId = {mediaId: params.mediaId || params.episodeId};
      return callApi({
        path: getMediaInfoEndPoint.path,
        method: getMediaInfoEndPoint.method,
        query: mergeDefault(getMediaInfoEndPoint.query.defaultParams,mId),
      }).then((response)=> checkResponse(response))
        .then(getMediaInfo => {
          dispatch(success(GETMEDIAINFO.SUCCESS,getMediaInfo));
          if(typeof window !== "undefined"){
            setRemarketingData(getMediaInfo);
          }
          if(callback && typeof callback !== "object"){
            callback();
          }
        })
        .catch(error=> {
          // Todo : needs to be fixed later
          if (error.toString().toLowerCase().indexOf("error: minified exception occurred") > -1) {
            // do nothing
          } else if (typeof error == "object" && error.name != 'Invariant Violation') {
            dispatch(failure(GETMEDIAINFO.FAILURE, error));
          }
          if (callback && typeof callback !== "object") {
            callback();
          }
        });
    }
};
