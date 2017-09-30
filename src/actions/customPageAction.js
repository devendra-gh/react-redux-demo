import callApi from '../util/apiCaller';
import {success,failure, checkResponse} from '../util/response';
import {mergeDefault} from '../util/helper';
import {setLoader} from './loader';
import {CUSTOM_PAGE} from '../constants';
import endpoints from '../endpoints/shows';

export const customPageAction=(slugName, callback)=>{
  const customEndpoint = endpoints.customPage;
  const params = {'slugName':slugName};
  return dispatch => {
    return callApi({
      path: customEndpoint.path,
      method: customEndpoint.method,
      query: mergeDefault(customEndpoint.query.defaultParams,params),
    }).then((response)=> checkResponse(response))
      .then(customData => {
        dispatch(success(CUSTOM_PAGE.SUCCESS,customData));
        if(callback && callback.successCallback && typeof callback.successCallback !== "object")
          dispatch(callback.successCallback);

        dispatch(setLoader(false));
      })
      .catch(error=> {
        dispatch(failure(CUSTOM_PAGE.FAILURE,error));
        dispatch(setLoader(false));
      });
  };
};

export function clearCustomPageData() {
  return {
    type: CUSTOM_PAGE.CLEAR_DATA,
    data: {assets: [], total_items: 0},
  };
}
