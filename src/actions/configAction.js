import callApi from '../util/apiCaller';
import {success,failure} from '../util/response';
import { getParams } from '../endpoints/params';
import { CONFIG } from '../constants';
import {apiUrl} from '../constants/apiConstant';
const configURL = apiUrl.BASE + 'config.json' ;

export function getConfig(){
  return dispatch => {
    dispatch(requestConfig());
    return callApi({
      path: configURL,
      method: 'GET',
      query: getParams().defaultParams,
    }).then(response =>  dispatch(success(CONFIG.SUCCESS,response)))
      .catch( error => dispatch(failure(CONFIG.FAILURE,error)));
  };
}

function requestConfig(){
  return{
    type:CONFIG.REQUEST,
  };
}
