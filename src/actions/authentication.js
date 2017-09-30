import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  COOKIE,
  CHECKEMAIL,
} from '../constants';
import { mergeDefault } from '../util/helper';
import {success,failure} from '../util/response';
import {setLoader} from './loader';
import callApi from '../util/apiCaller';
import {getUserProfileData} from '../util/helper';
import cookie from 'react-cookie';
import {formDataGenerator} from '../util/formDataGenerator';
import endpoint from '../endpoints/authentication';
import appBoyEvent from '../util/appboyEvent';
import mixPanel from '../util/mixPanel';


const checkResponse = (response)=>{
  if(response.ID){
    return response;
  }else{
    let error = new Error();
    error.message = response;
    throw error;
  }
};

export function login(params, data, callback) {
  return dispatch => {
    let userInfo = cookie.load(COOKIE.USER_ID) && cookie.load(COOKIE.USER_ID) === 'undefined'? false : cookie.load(COOKIE.USER_ID);
    // if userInfo will be exist only for server side rendering
    // when use click on login button user_id cookie shouldn't exist, becoz it removed on logout
    if(userInfo){
      if (cookie.load(COOKIE.USER_JUST_LOGGED_IN) && cookie.load(COOKIE.USER_JUST_LOGGED_IN) != 'undefined') {
        getUserProfileData(userInfo);
        cookie.remove(COOKIE.USER_JUST_LOGGED_IN);
      }
      return new Promise((resolve,reject)=>{
        resolve(userInfo);
      }).then((userInfo)=>{

        if(typeof window !== "undefined"){
          appBoyEvent.isLogin(true);
        }

        dispatch(success(LOGIN.SUCCESS,userInfo));
        let kalturaData = [
          {
            "key": "email",
            "value": userInfo.emailid,
          },
          {
            "key": "UID",
            "value": userInfo.Uid,
          },
          {
            "key": "firstname",
            "value": userInfo.FirstName,
          },
          {
            "key": "lastname",
            "value": userInfo.LastName,
          },
        ];
        dispatch(kalturaConfiguration(endpoint.kalturaLogin,formDataGenerator(kalturaData)));
      });
    }

    if (cookie.load(COOKIE.USER_FAILED) && cookie.load(COOKIE.USER_FAILED) != 'undefined') {
      mixPanel.authenticated('Guest', '', 'F', '', '', '', '', '', '','');
      if(typeof window !== "undefined"){
        appBoyEvent.isLogin(false);
      }
      cookie.remove(COOKIE.USER_FAILED);
    }

    if(params && params.path)
    return callApi({
        path:  params.path,
        method: params.method,
        body: data,
        query: params.query && mergeDefault(params.query.defaultParams),
      }
    ).then((response)=> checkResponse(response))
      .then(response => {
        let userProfileData = getUserProfileData(response);
        cookie.save(COOKIE.USER_ID,JSON.stringify(userProfileData),{
          maxAge: 86400 * 30 * 6 // maximum age of the cookie 6 months
        });
        dispatch(success(LOGIN.SUCCESS,response));
        dispatch(setLoader(false));

        if(typeof window !== "undefined"){
          appBoyEvent.isLogin(true);
        }

        if(callback)
          callback();
      })
      .catch(error=> {
        if(typeof window !== "undefined"){
          dispatch(failure(LOGIN.FAILURE,error));
        }
        dispatch(setLoader(false));
        mixPanel.authenticated('Guest', '', 'F', '', '', '', '', '', '','');

        if(typeof window !== "undefined"){
          appBoyEvent.isLogin(false);
        }
      });
  };
}

export function kalturaConfiguration(params, data) {
  return dispatch => {
    //dispatch(requestEmailExist());
    return callApi({
      path: params.path,
      method: params.method,
      body: data,
      query: mergeDefault(params.query.defaultParams),
    }).then(response => {
      cookie.save(COOKIE.KALTURA_PLAYER_CONFIG_IDS,JSON.stringify(response));
    }).catch(error => {
      cookie.save(COOKIE.KALTURA_PLAYER_CONFIG_IDS,JSON.stringify(error));
    });
  };
}

export function clearLoginErrors(){
  return {
    type: LOGIN.CLEAR_ERRORS,
  };
}

export function logout(state={}){
  return {
    type: LOGOUT.SUCCESS,
    state,
  };
}

export function signUpNewUser(params, data, callback) {
  return dispatch => {
    return callApi({
        path: params.path,
        method: params.method,
        body: data,
        query: mergeDefault(params.query.defaultParams),
      }
    ).then((response)=> checkResponse(response))
      .then(response => {
        let userProfileData = getUserProfileData(response);
        cookie.save(COOKIE.USER_ID,JSON.stringify(userProfileData));
        dispatch(success(SIGNUP.SUCCESS,response));
        dispatch(setLoader(false));
        if(callback)
          callback();

        if(typeof window !== "undefined") {
          appBoyEvent.isSignUp(true);
        }
      })
      .catch(error=> {

        dispatch(failure(SIGNUP.FAILURE,error));
        dispatch(setLoader(false));
        mixPanel.authenticated('Guest', '', 'F', '', '', '', '', '', '','');

        if(typeof window !== "undefined") {
          appBoyEvent.isSignUp(false);
        }
      });
  };
}

export function clearSignUpErrors(){
  return {
    type: SIGNUP.CLEAR_ERRORS,
  };
}

export function checkEmailExists(params, data, callback) {
  return dispatch => {
    dispatch(requestEmailExist());
    return callApi({
      path: params.path,
      method: params.method,
      body: data,
      query: mergeDefault(params.query.defaultParams),
    }).then(response => {
      dispatch(success(CHECKEMAIL.SUCCESS, response));
      if(callback){
        callback();
      }
      //dispatch(setLoader(false));
    }).catch(error => {
      dispatch(failure(CHECKEMAIL.FAILURE));
      // dispatch(setLoader(false));
    });
  };
}

export function requestEmailExist(){
  return {
    type: CHECKEMAIL.REQUREST,
  };
}

/*function getProfileData(userInfo) {
 let userProfileData = {
 "ID":userInfo.ID,
 "Uid":userInfo.Uid,
 "emailid":userInfo.Email.Value,
 "ImageUrl":userInfo.ImageUrl,
 "FirstName":userInfo.FirstName,
 "MiddleName":userInfo.MiddleName,
 "LastName":userInfo.LastName,
 "Languages":userInfo.Languages,
 };
 // console.log(JSON.stringify(userProfileData),"<<<<<<<<<<<<<<")
 cookie.save(COOKIE.USER_ID,JSON.stringify(userProfileData));
 // let d = cookie.load(COOKIE.USER_ID);
 // console.log(d,"########")

 }*/

