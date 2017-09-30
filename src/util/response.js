import {checkPropertyInArray} from './mapingFilters';
import {getImageUrlMap} from './getShowDetails';

/***********CHECK RESPONSE HAS ASSESTS AS DATA***********/
export const checkResponse = (response, data)=>{
  if(response.assets){
    return response;
  }else{
    let error = new Error();
    error.message = data ? data : response;
    throw error;
  }
};

/***********SUCCESS ACTION***********/
export const success = (type,data) => {
  return {
    type: type,
    data: data,
  };
};


/***********ERROR ACTION***********/
export const failure = (type,error) => {
  return {
    type: type,
    error: error,
  };
};

/***********ACTIONS TO APPEND + MAP CURATED VOOT SHORTS***********/
export const appendWithMapping = (type,data,title) => {
  return {
    type: type,
    data: mapObject(data),
    title,
  };
};

export const mapObject = (arr) => {
  let newData=[];
  arr.list.map((data,key)=>{
    let item= {};
    item = getImageUrlMap(data.Pictures);
    item.mId = data.MediaID;
    item.mediaType = data.MediaTypeName;
    item.contentType = checkPropertyInArray(data.Metas, 'ContentType');
    item.name = data.MediaName;
    item.duration = checkPropertyInArray(data.Metas, 'ContentDuration');
    item.mediaMainTitle = checkPropertyInArray(data.Metas, 'EpisodeMainTitle');
    item.refSeriesId = null;
    item.refSeriesTitle = checkPropertyInArray(data.Metas, 'RefSeriesTitle');
    item.refSeriesSeason = checkPropertyInArray(data.Metas, 'RefSeriesSeason');
    item.SBU = checkPropertyInArray(data.Metas, 'SBU');
    item.imgURL = data.Pictures[0].URL;

    newData.push(item);
  });
  return newData;
};


/***********GET MEDIA INFO CALL FOR SEARCH***********/
export const getMediaInfo = (type, data, key, index, reducer) => {
  return {
    type,
    data,
    key,
    index,
    reducer,
  };
};

/***********LOAD MORE FOR SEARCH***********/
export const loadMoreSearch = (type, data, key, reducer) => {
  return {
    type,
    data,
    key,
    reducer,
  };
};

/***********GET KIDS IMAGE***********/
export const setKidsImages = (type, data, index, resultType, dataType, reducer) => {
  return {
    type,
    data,
    index,
    resultType,
    dataType,
    reducer,
  };
};
