import {CHANNEL_MEDIAS} from '../constants';
import callApi from '../util/apiCaller';
import {success,failure, checkResponse} from '../util/response';
import { mergeDefault } from '../util/helper';
import {setLoader} from './loader';
import endpoints from '../endpoints/shows';


export const getChannelMedias=(params, successCallback, failureCallback)=> {
  const showEndpoints = endpoints.getChannelMedias;
  const paramsData = {
      cName:params.cName,
      mName:params.mName || 'kidsClusters',
  };
  return dispatch => {
    return callApi({
      path: showEndpoints.path,
      method: showEndpoints.method,
      query: mergeDefault(showEndpoints.query.defaultParams, paramsData),
    }).then((response)=> checkResponse(response))
      .then(response => {
        dispatch(success(CHANNEL_MEDIAS.GET_CHANNEL_MEDIAS,response.assets));
        if(successCallback && typeof successCallback !== "object")
          dispatch(successCallback);
      })
      .catch(error=> {
        dispatch(failure(CHANNEL_MEDIAS.FAILURE,error));
        if(failureCallback)
          dispatch(failureCallback);
      });
  };
};
export function clearChannelMedias(){
  return {
    type: CHANNEL_MEDIAS.CLEAR_CHANNEL_MEDIAS,
  };
}

