import callApi from '../util/apiCaller';
import {success,failure} from '../util/response';
import { mergeDefault } from '../util/helper';
import { SEARCH_ASSET } from '../constants/searchAssetConstant';
import {CLIP_SEARCH_ASSET} from '../constants/searchAssetConstant';
import endpoint from '../endpoints/playList';
import {MEDIA_TYPE} from '../constants/media';
import {setLoader} from './loader';
import {clipDataRelatedMedia} from '../actions/clipDataRelatedMedia';
import {formDataGenerator} from '../util/formDataGenerator';

let refSeriesId='';

const checkResponse = (response)=>{
  if(response.assets){
    refSeriesId = response.assets[0].id;
    return response;
  }else{
    let error = new Error();
    error.message = response;
    throw error;
  }
};

export function clipDataSearchAssets(data){
  return dispatch => {
    const clipDataGetInfoEndpoint = endpoint.searchAssets;
    return callApi({
        path: clipDataGetInfoEndpoint.path,
        method: clipDataGetInfoEndpoint.method,
        body:data,
        query: mergeDefault(clipDataGetInfoEndpoint.query.defaultParams),
      }).then((response)=> checkResponse(response))
      .then(response => {
        dispatch(success(CLIP_SEARCH_ASSET.SUCCESS,response));

        // console.log('refSeriesId ',refSeriesId);
        let data = [
          {
            "key": "mediaId",
            "value": refSeriesId,
          },
          {
            "key": "reqMediaTypes",
            "value": MEDIA_TYPE.TV_SERIES,
          },
          {
            "key": "pageSize",
            "value": 4,
          },
          {
            "key": "pageIndex",
            "value": 0,
          },
        ];
        dispatch(clipDataRelatedMedia(endpoint.relatedMedia,formDataGenerator(data)));

      })
      .catch(error=> {
        // Todo : needs to be fixed later
        if (error.toString().toLowerCase().indexOf("error: minified exception occurred") > -1) {
          // do nothing
        } else if (typeof error == "object" && error.name != 'Invariant Violation') {
          dispatch(failure(CLIP_SEARCH_ASSET.FAILURE, error));
        }
      });
  };
}

