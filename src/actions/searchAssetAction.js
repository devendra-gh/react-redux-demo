import callApi from '../util/apiCaller';
import {success,failure,checkResponse} from '../util/response';
import { mergeDefault } from '../util/helper';
import { SEARCH_ASSET } from '../constants/searchAssetConstant';
import {setLoader} from './loader';

export function searchAsset(params, data, callback){
  return dispatch => {
    return callApi({
        path: params.path,
        method: params.method,
        body:data,
        query: mergeDefault(params.query.defaultParams),
      }).then((response)=> checkResponse(response))
      .then(response => {
        dispatch(success(SEARCH_ASSET.SUCCESS,response));
        if(callback && callback.successCallback)
          dispatch(callback.successCallback);
      })
      .catch(error=> {
        dispatch(failure(SEARCH_ASSET.FAILURE,error));
        if(callback && callback.failureCallback)
          dispatch(callback.failureCallback);
      });
  };
}

