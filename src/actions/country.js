import {COUNTRY} from '../constants';
import callApi from '../util/apiCaller';
import {success,failure} from '../util/response';
import { mergeDefault } from '../util/helper';

export function fetchCountry(params) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response))
      .then(country => dispatch(success(COUNTRY.SUCCESS,country.assets)));
  };
}

const checkResponse = (response)=>{
  if(response.assets.length>0){
    return response;
  }
};
