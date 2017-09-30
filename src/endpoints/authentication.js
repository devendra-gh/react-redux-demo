import { getParams, getAuthParams } from './params';
import {apiUrl} from '../constants/apiConstant';

export default({
  login: {
    path: apiUrl.AUTH + apiUrl.authentication,
    method: 'POST',
    query: getParams(),
  },
  getProfile: {
    path: apiUrl.AUTH + apiUrl.getProfile,
    method: 'POST',
    query: getParams(),
  },
  signup: {
    path: apiUrl.AUTH + apiUrl.createProfile,
    method: 'POST',
    query: getParams(),
  },
  changePassword: {
    path: apiUrl.AUTH + apiUrl.passwordChange,
    method: 'POST',
    query: getParams(),
  },
  forgotPassword: {
    path: apiUrl.AUTH + apiUrl.accountPasswordSet,
    method: 'POST',
    query: getParams(),
  },
  country: {
    path: apiUrl.BASE + apiUrl.country,
    method: 'GET',
    query: getParams(),
  },
  accessTokenUrl: {
    path: apiUrl.apiLR + apiUrl.access_tokenLR,
  },
  userProfileUrl: {
    path: apiUrl.apiLR + apiUrl.userProfileLR,
  },
  checkEmailExists: {
    path: apiUrl.AUTH + apiUrl.checkEmail,
    method: 'POST',
    query: getParams(),
  },
  kalturaLogin: {
    path: apiUrl.AUTH + apiUrl.kalturaLogin,
    method: 'POST',
    query: getAuthParams(),
  },
  kalturaRegistration: {
    path: apiUrl.AUTH + apiUrl.kalturaRegistration,
    method: 'POST',
    query: getAuthParams(),
  },
});


