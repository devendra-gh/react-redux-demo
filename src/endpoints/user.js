import { getParams } from './params';
import {apiUrl} from '../constants/apiConstant';

export default({
  changeProfile: {
    path: apiUrl.AUTH + apiUrl.editProfile,
    method: 'POST',
    query: getParams(),
  },
  getProfile:{
    path: apiUrl.AUTH + apiUrl.getProfile, //'getProfile.json?platform=Pwa&pId=13',
    method: 'POST',
    query: getParams(),
  },

});
