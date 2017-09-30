import callApi from '../util/apiCaller';
import {success,failure, checkResponse} from '../util/response';
import { mergeDefault } from '../util/helper';
import {CLIP_GET_RELATED_MEDIA} from '../constants/searchAssetConstant';
import {setLoader} from './loader';
import {formDataGenerator} from '../util/formDataGenerator';

export const clipDataRelatedMedia=(params,data)=>{
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body: data,
      query: mergeDefault(params.query.defaultParams,data),
    }).then((response)=> checkResponse(response))
      .then(relatedMedia => {
        dispatch(success(CLIP_GET_RELATED_MEDIA.SUCCESS,relatedMedia));
//        dispatch(setLoader(false));
      })
      .catch(error=> {
        dispatch(failure(CLIP_GET_RELATED_MEDIA.FAILURE,error));
//        dispatch(setLoader(false));
      });
  };
};
