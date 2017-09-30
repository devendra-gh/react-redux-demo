import {CHANNEL} from '../constants';
import callApi from '../util/apiCaller';
import {success, failure, checkResponse} from '../util/response';
import { mergeDefault } from '../util/helper';
import {setLoader} from './loader';

const errorMsg = 'No Results Found!';

export function getChannels(params, data) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
      body: data,
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(CHANNEL.HOME.SUCCESS,response.assets));
        dispatch(setLoader(false));
      })
      .catch(error=> {
        dispatch(failure(CHANNEL.HOME.FAILURE,error));
        dispatch(setLoader(false));
      });
  };
}

export function getChannelLanding(params,sbu) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams,sbu),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(CHANNEL.LANDING.HEAD_CAROUSEL,response.assets));
        dispatch(setLoader(false));
      })
      .catch(error=> {
        dispatch(failure(CHANNEL.LANDING.FAILURE,error));
        dispatch(resetChannelHeadCarouselDetails());
        dispatch(setLoader(false));
      });
  };
}

export function resetChannelShowMoreDetails(){
  return {
    type: CHANNEL.LANDING.SHOW_MORE_RESET,
  };
}

export function resetChannelHeadCarouselDetails(){
  return {
    type: CHANNEL.LANDING.HEAD_CAROUSEL_RESET,
  };
}

export function resetChannelDetails(){
  return {
    type: CHANNEL.LANDING.RESET,
  };
}

export function getMoreShows(params, data, callback) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
      body: data,
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(CHANNEL.LANDING.MORE_SHOWS,response));
        dispatch(setLoader(false));
        if(callback && typeof callback !== "object")
          dispatch(callback);
      })
      .catch(error=> {
        dispatch(failure(CHANNEL.LANDING.FAILURE,error));
        dispatch(resetChannelShowMoreDetails());
        dispatch(setLoader(false));
        if(callback && typeof callback !== "object")
          dispatch(callback);
      });
  };
}

export function appendMoreShows(params, data) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
      body: data,
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(CHANNEL.LANDING.APPEND_MORE_SHOWS,response));
        dispatch(setLoader(false));
      })
      .catch(error=>{
        dispatch(failure(CHANNEL.LANDING.FAILURE, error));
        dispatch(setLoader(false));
      });
  };
}
