import {RELATEDMEDIA} from '../constants';
import callApi from '../util/apiCaller';
import {success,failure, checkResponse} from '../util/response';
import { mergeDefault } from '../util/helper';
import {setLoader} from './loader';

export const getRelatedMedia=(params,data)=>{
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body: data,
      query: mergeDefault(params.query.defaultParams,data),
    }).then((response)=> checkResponse(response))
      .then(relatedMedia => {
        dispatch(success(RELATEDMEDIA.SUCCESS,relatedMedia));
        dispatch(setLoader(false));
      })
      .catch(error=> {
        // console.log(error,'RELATED MEDIA FAILURE');
        // Todo : needs to be fixed later
        if (error.toString().toLowerCase().indexOf("error: minified exception occurred") > -1) {
          // do nothing
        } else if (typeof error == "object" && error.name != 'Invariant Violation') {
          dispatch(failure(RELATEDMEDIA.FAILURE, error));
        }
        dispatch(setLoader(false));
      });
  };
};

export function clearRelatedMedia() {
  return {
    type: RELATEDMEDIA.CLEAR,
  };
}
