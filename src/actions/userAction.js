import callApi from '../util/apiCaller';
import {success,failure} from '../util/response';
import { mergeDefault } from '../util/helper';
import { CHANGE_PROFILE, GET_PROFILE } from '../constants';
import {setLoader} from './loader';

const checkResponse = (response)=>{
  if(response.isPosted || response.ID){
    return response;
  }else{
    let error = new Error();
    error.message = response;
    throw error;
  }
};

export function changeProfile(params, data){
  return dispatch => {
    dispatch(setLoader(true));
    return callApi({
        path: params.path,
        method: params.method,
        body:data,
        query: mergeDefault(params.query.defaultParams),
      }).then((response)=> checkResponse(response))
      .then(response => {
        dispatch(success(CHANGE_PROFILE.SUCCESS,response));
        dispatch(setLoader(false));
      })
      .catch(error=> {
        dispatch(failure(CHANGE_PROFILE.FAILURE,error));
        dispatch(setLoader(false));
      });
  };
}

export function getProfile(params, data){
  return dispatch =>{
    return callApi({
      path: params.path,
      method: params.method,
      body:data,
      query: mergeDefault(params.query.defaultParams),
    }).then((response) => checkResponse(response))
      .then(response => {
        dispatch(success(GET_PROFILE.SUCCESS,response));
        dispatch(setLoader(false));
      })
      .catch(error=> {
        dispatch(failure(GET_PROFILE.FAILURE,error));
        dispatch(setLoader(false));
      });
  };
}
