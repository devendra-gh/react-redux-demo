import {
  CHANGE_PASSWORD,
  SEND_LINK_TO_EMAIL,
} from '../constants';
import { mergeDefault } from '../util/helper';
import {success,failure} from '../util/response';
import callApi from '../util/apiCaller';
import {setLoader} from './loader';

const checkResponse = (response)=>{
  if(response.isPosted){
    return response;
  }else{
    let error = new Error();
    error.message = response;
    throw error;
  }
};

export function changePassword(params, data) {
  return dispatch => {
    return callApi({
        path: params.path,
        method: params.method,
        body:data,
        query: mergeDefault(params.query.defaultParams),
      }
    ).then((response)=> checkResponse(response))
      .then(response => {
        dispatch(success(CHANGE_PASSWORD.SUCCESS,response));
        dispatch(setLoader(false));
      })
      .catch(error=> {
        dispatch(failure(CHANGE_PASSWORD.FAILURE,error));
        dispatch(setLoader(false));
      });
  };
}

export function clearErrors(){
  return {
    type : CHANGE_PASSWORD.CLEAR_ERRORS,
  };
}

export function forgotModalClosed(){
  return {
     type : SEND_LINK_TO_EMAIL.MODAL_CLOSE,
  };
}
export function changePasswordModalClosed(){
  return {
    type : CHANGE_PASSWORD.MODAL_CLOSE,
  };
}
export function sendLInktoEmail(params, data) {
  return dispatch => {
    return callApi({
        path: params.path,
        method: params.method,
        body:data,
        query: mergeDefault(params.query.defaultParams),
      }
    ).then((response)=> checkResponse(response))
      .then(response => {
        dispatch(success(SEND_LINK_TO_EMAIL.SUCCESS,response));
        dispatch(setLoader(false));
      })
      .catch(error=> {
        dispatch(failure(SEND_LINK_TO_EMAIL.FAILURE,error));
        dispatch(setLoader(false));
      });
  };
}


export function clearErrorsForgotPassword(){
  return {
    type : SEND_LINK_TO_EMAIL.CLEAR_ERRORS,
  };
}
