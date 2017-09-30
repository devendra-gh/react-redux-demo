import {SEARCH} from '../constants/searchActionConstants';
import callApi from '../util/apiCaller';
import {success,failure, checkResponse, getMediaInfo, loadMoreSearch, setKidsImages} from '../util/response';
import { mergeDefault } from '../util/helper';
import {setSmallLoader} from './loader';
import mixPanel from '../util/mixPanel';

const errorMsg = 'No Results Found!';

/****************CLEAR ALL DATA FOR SEARCH RESULTS********************/
export function clearSearch() {
  return {
    type: SEARCH.CLEAR_SEARCH,
  };
}


/****************ADULT SEARCH ********************/
export function getAdultPopularSearchSuggestionList(params) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(SEARCH.ADULT.GET_POPULAR_SEARCH,response.assets));
      })
      .catch(error=>{
        //console.log(error);
      });
  };
}

export function adultSearch(params, data) {
  let searchText = (data && data.searchText) || '';
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams,data),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(SEARCH.ADULT.SEARCH_SUCCESS,response.assets));

        let total_count = 0;
        if(response && response.assets){
          let clip = response.assets.clips.total_items;
          let episode = response.assets.episode.total_items;
          let movies = response.assets.movies.total_items;
          let tvSeries = response.assets.tvSeries.total_items;

          let kidsTvSeries = response.assets.kidsTvSeries.total_items;
          let kidsVideos = response.assets.kidsVideos.total_items;

          total_count = clip + episode + movies + tvSeries + kidsTvSeries + kidsVideos;
        }
        mixPanel.search(searchText,total_count);
        dispatch(setSmallLoader(false));
      })
      .catch(error=>{
        dispatch(failure(SEARCH.ADULT.SEARCH_FAILURE,error));
        dispatch(setSmallLoader(false));
      });
  };
}

/****************KIDS SEARCH ********************/
export function getKidsPopularSearchSuggestionList(params) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(SEARCH.KIDS.GET_POPULAR_SEARCH,response.assets));
      })
      .catch(error=>{
        //console.log(error);
      });
  };
}

export function kidsSearch(params, data) {
  let searchText = (data && data.searchText) || '';
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams,data),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(SEARCH.KIDS.SEARCH_SUCCESS,response.assets));
        let total_count = 0;
        if(response && response.assets){
          let episode = response.assets.episode.total_items;
          let tvSeries = response.assets.tvSeries.total_items;
          total_count = episode + tvSeries;
        }
        mixPanel.search(searchText,total_count);
        dispatch(setSmallLoader(false));
      })
      .catch(error=>{
        dispatch(failure(SEARCH.KIDS.SEARCH_FAILURE,error));
        dispatch(setSmallLoader(false));
      });
  };
}

export function getKidsImages(params, data, index, resultType, dataType, reducer) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams,data),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(setKidsImages(SEARCH.KIDS.GET_IMAGES,response.assets, index, resultType, dataType, reducer));
      });
  };
}


/****************SUGGESTED SEARCH ********************/
export function getAutoCompleteSearchSuggestionList(params, data, keyword) {
  let searchText;
  if(keyword)
    searchText = keyword;
  else
    searchText = '';

  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body: data,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(SEARCH.GET_SEARCH_SUGGESTION_LIST,response.assets));
      })
      .catch(error=>{
        dispatch(success(SEARCH.GET_SEARCH_SUGGESTION_LIST,[]));
      });
  };
}


/****************GET MEDIA INFO CALLS********************/
export function getMediaInfoCalls(params, data, type, index, reducer) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams, data),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(getMediaInfo(SEARCH.GET_MEDIA_INFO_CALLS,response.assets, type, index, reducer));
      })
      .catch(error=>{
        //console.log(error);
      });
  };
}


/****************SEARCH ASSETS INFO CALLS********************/
export function searchAssestInfoCalls(params, data, type, index, reducer) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body: data,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(getMediaInfo(SEARCH.SEARCH_ASSETS_CALLS,response.assets, type, index, reducer));
      })
      .catch(error=>{
        //console.log(error);
      });
  };
}




/****************LOAD MORE CALLS FOR ADULTS AND KIDS********************/
export function loadMoreContent(params, data, key, reducer, callback) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body: data,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(loadMoreSearch(SEARCH.LOAD_MORE,response.assets, key, reducer));
        if(callback)
          callback();
      })
      .catch(error=>{
        //console.log(error);
        if(callback)
          callback();
      });
  };
}


/**No result found for Adults ******************************************************/

export function adultPopularSearch(params, data) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body: data,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(SEARCH.ADULT.POPULAR_SHOWS, response));
      })
      .catch(error=>{
        //console.log(error);
      });
  };
}

export function adultPopularEpisodes(params, data, callback) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body: data,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(SEARCH.ADULT.POPULAR_EPISODES,response));
        if(callback)
          callback();
      })
      .catch(error=>{
        //console.log(error);
      });
  };
}

/****************SEARCH ASSETS INFO CALLS FOR NO RESULT********************/
export function searchAssestInfoCallsNoResult(params, data, type, index, reducer) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body: data,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(getMediaInfo(SEARCH.ADULT.SEARCH_ASSEST_NO_RESULT,response.assets, type, index, reducer));
      })
      .catch(error=>{
        //console.log(error);
      });
  };
}


/**No result found for Kids ******************************************************/

export function kidsPopularSearch(params, data, callback) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body: data,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(SEARCH.KIDS.POPULAR_SHOWS, response));
        if(callback)
          callback();
      })
      .catch(error=>{
        //console.log(error);
      });
  };
}

export function kidsPopularEpisodes(params, data, callback) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body: data,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(SEARCH.KIDS.POPULAR_EPISODES,response));
        if(callback)
          callback();
      })
      .catch(error=>{
        //console.log(error);
      });
  };
}
