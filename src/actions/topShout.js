import {TOP_SHOUT, SHOUT, TV_SERIES_TOP_SHOUT} from '../constants';
import callApi from '../util/apiCaller';
import {success,failure,checkResponse} from '../util/response';
import { mergeDefault } from '../util/helper';
import {setLoader} from './loader';
import {formDataGenerator} from '../util/formDataGenerator';
import endpoints from '../endpoints/playList';

export const getTopShout=(params,data)=>{
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body: data,
      query: mergeDefault(params.query.defaultParams,data),
    }).then((response)=> checkResponse(response))
      .then(response => {
        dispatch(success(TOP_SHOUT.SUCCESS,response));
        //dispatch(setLoader(false));
      })
      .catch(error=> {
        dispatch(failure(TOP_SHOUT.FAILURE,error));
        //dispatch(setLoader(false));
      });
  };
};

export const getTvSeriesTopShout=(params,data)=>{
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body: data,
      query: mergeDefault(params.query.defaultParams,data),
    }).then((response)=> checkResponse(response))
      .then(response => {
        dispatch(success(TV_SERIES_TOP_SHOUT.SUCCESS,response));
        //dispatch(setLoader(false));
      })
      .catch(error=> {
        dispatch(failure(TV_SERIES_TOP_SHOUT.FAILURE,error));
        //dispatch(setLoader(false));
      });
  };
};

export const getShoutList=(params)=> {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response))
      .then(response => {
        dispatch(success(SHOUT.SHOUT_LIST.SUCCESS,response.assets));
       // dispatch(setLoader(false));
      })
      .catch(error=> {
        dispatch(failure(SHOUT.SHOUT_LIST.FAILURE,error));
        //dispatch(setLoader(false));
      });
  };
};

export const getShoutByUser=(params, data, callback)=>{
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body: data,
      query: mergeDefault(params.query.defaultParams,data),
    }).then((response)=> checkResponse(response))
      .then(response => {
        dispatch(success(SHOUT.SHOUT_BY_USER.SUCCESS,response));
        if(callback){
          callback();
        }
       // dispatch(setLoader(false));
      })
      .catch(error=> {
        dispatch(failure(SHOUT.SHOUT_BY_USER.FAILURE,error));
        if(callback){
          callback();
        }
       // dispatch(setLoader(false));
      });
  };
};

function requestShoutByUser(){

  return {type: SHOUT.SHOUT_BY_USER.REQUEST};
}

export const makeShout =(params,data, topShoutData, shoutByUserData)=>{
 // console.log('data',data);
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body: data,
      query: mergeDefault(params.query.defaultParams,data),
    }).then((response)=> checkResponse(response))
      .then(response => {
        dispatch(success(SHOUT.MAKE_SHOUT.SUCCESS,response));
        dispatch(getShoutByUser(endpoints.shoutByUser, formDataGenerator(shoutByUserData)));
        dispatch(getTopShout(endpoints.topShout, formDataGenerator(topShoutData)));
      })
      .catch(error=> {
        dispatch(failure(SHOUT.MAKE_SHOUT.FAILURE,error));
      });
  };
};


export const resetMakeShout = ()=>{
  return {
    type:SHOUT.MAKE_SHOUT.RESET_MAKE_SHOUT,
  };
};
