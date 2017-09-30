import {GETMEDIAINFO} from '../constants';
import callApi from '../util/apiCaller';
import {success,failure} from '../util/response';
import {mergeDefault, setRemarketingData} from '../util/helper';
import {setLoader} from './loader';
import {formDataGenerator} from '../util/formDataGenerator';
import endpoint from '../endpoints/playList';
import {MEDIA_TYPE} from '../constants/media';
import {CLIP_GET_MEDIA_INFO} from '../constants/searchAssetConstant';
import {clipDataSearchAssets} from '../actions/clipDataSearchAssets';

let refSeriesTitle='';

// This method fetchs clip data = mediaInfo +  searchAssets + relatedMedia
export const clipDataGetInfo=(mId, callback)=>{
  return dispatch => {
    const clipDataGetInfoEndpoint = endpoint.getMediaInfo;
    return callApi({
      path: clipDataGetInfoEndpoint.path,
      method: clipDataGetInfoEndpoint.method,
      query: mergeDefault(clipDataGetInfoEndpoint.query.defaultParams,mId),
    }).then((response)=> checkResponse(response))
      .then(getMediaInfo => {
        dispatch(success(CLIP_GET_MEDIA_INFO.SUCCESS,getMediaInfo));
        if(typeof window !== "undefined"){
          setRemarketingData(getMediaInfo);
        }
        let data = [
          {
            "key": "filterTypes",
            "value": MEDIA_TYPE.TV_SERIES,
          },
          {
            "key": "filter",
            "value": `(and SeriesMainTitle='${refSeriesTitle.replace(/'/g, '%27')}')`,
          },
        ];

        dispatch(clipDataSearchAssets(formDataGenerator(data)));
        if(callback && typeof callback !== "object"){
          callback();
        }
      })
      .catch(error=> {
        dispatch(failure(CLIP_GET_MEDIA_INFO.FAILURE,error));
        if(callback && typeof callback !== "object"){
          callback();
        }
       // dispatch(setLoader(false));
      });
  };
};


export function clearClipMediaInfo() {
  return {
    type: CLIP_GET_MEDIA_INFO.CLEAR,
  };
}

const checkResponse = (response)=>{
  if(response.assets){
    if (response.assets.Metas)
      response.assets.Metas.map((item, index)=> {
        if (['RefSeriesTitle'].indexOf(item.Key) != -1) {
          refSeriesTitle = item.Value;
        }
      });
    return response;
  }else{
    let error = new Error();
    error.message = response;
    throw error;
  }
};
