import {SHOWS} from '../constants/showsActionConstants';
import callApi from '../util/apiCaller';
import {success, failure, appendWithMapping, checkResponse} from '../util/response';
import { mergeDefault } from '../util/helper';
import {setLoader, setSmallLoader} from './loader';
import endpoints from '../endpoints/shows';

const errorMsg = 'No Results Found!';

/**All Tv Shows Action Collection ********************************************************/
export function getTvShowsCarousel(params) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(SHOWS.TV_SERIES.CAROUSEL,response.assets));
        dispatch(setLoader(false));
      });
  };
}
export function getTvShowsData(params, data) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
      body: data,
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(SHOWS.TV_SERIES.GET_DATA,response));
        dispatch(setLoader(false));
      })
      .catch(error=>{
        dispatch(success(SHOWS.TV_SERIES.GET_DATA,{assets:[], total_items:0}));
        dispatch(failure(SHOWS.TV_SERIES.ERROR, error));
        dispatch(setLoader(false));
      });
  };
}
export function appendTvShowsData(params, data) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
      body: data,
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(SHOWS.TV_SERIES.APPEND_DATA,response));
        dispatch(setLoader(false));
      })
      .catch(error=>{
        dispatch(failure(SHOWS.TV_SERIES.ERROR, error));
        dispatch(setLoader(false));
      });
  };
}

export function clearTvSeriesData() {
  return {
    type: SHOWS.TV_SERIES.CLEAR_DATA,
  };
}


export function clearTvShowsErrors() {
  return {
    type: SHOWS.TV_SERIES.CLEAR_ERROR,
  };
}

/**All Voot Originals Collection ********************************************************/
export function getVootOriginalsCarousel(params) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(SHOWS.VOOT_ORIGINALS.CAROUSEL,response.assets));
        dispatch(setLoader(false));
      });
  };
}
export function getAndAppendVootOriginalsData(params, data) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
      body: data,
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(SHOWS.VOOT_ORIGINALS.GET_AND_APPEND_DATA,response));
        dispatch(setLoader(false));
      })
      .catch(error=>{
        dispatch(failure(SHOWS.VOOT_ORIGINALS.ERROR, error));
        dispatch(setLoader(false));
      });
  };
}

export function clearVootOriginalsErrors() {
  return {
    type: SHOWS.VOOT_ORIGINALS.CLEAR_ERROR,
  };
}

export function clearVootOriginalsData() {
  return {
    type: SHOWS.VOOT_ORIGINALS.CLEAR_DATA,
  };
}


/**All Shows Landing Episodes Collection ********************************************************/
export function getAllShowsEpisodesData(params, data, callback) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body: data,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(SHOWS.EPISODES.ALL_EPISODES.GET_DATA,response));
        dispatch(setSmallLoader(false));
        if(callback){
          callback();
        }
      })
      .catch(error=>{
        dispatch(success(SHOWS.EPISODES.ALL_EPISODES.GET_DATA,{assets: [], total_items: 0}));
        dispatch(setSmallLoader(false));
      });
  };
}

export function appendAllShowsEpisodesData(params, data) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body: data,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(SHOWS.EPISODES.ALL_EPISODES.APPEND_DATA,response));
        dispatch(setSmallLoader(false));
      })
      .catch(error=>{
        dispatch(setSmallLoader(false));
      });
  };
}

export function clearAllShowsEpisodesData() {
  return {
    type: SHOWS.EPISODES.ALL_EPISODES.CLEAR_DATA,
    data: {assets: [], total_items: 0},
  };
}

/**All Voot Shorts Curated Collection ********************************************************/
export function getCuratedVootShortsData(params, data, callback) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams, data),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(SHOWS.EPISODES.VOOT_SHORTS.CURATED_VOOT_SHORTS_GET_DATA,response));
        if(callback){
          callback();
        }
      })
      .catch(error=>{
      });
  };
}

export function appendCuratedVootShortsData(params, data, title) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams, data),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(appendWithMapping(SHOWS.EPISODES.VOOT_SHORTS.CURATED_VOOT_SHORTS_APPEND_DATA,response.assets,title));
      });
  };
}

/**All Voot Shorts Collection ********************************************************/
export function getAllVootShortsData(params, data, callback) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body: data,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(SHOWS.EPISODES.VOOT_SHORTS.ALL_VOOT_SHORTS_GET_DATA,response));
        dispatch(setSmallLoader(false));
        if(callback){
          callback();
        }
      })
      .catch(error=>{
        dispatch(setSmallLoader(false));
      });
  };
}


export function appendAllVootShortsData(params, data) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      body: data,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(SHOWS.EPISODES.VOOT_SHORTS.ALL_VOOT_SHORTS_APPEND_DATA,response));
        dispatch(setSmallLoader(false));
      })
      .catch(error=>{
        dispatch(setSmallLoader(false));
      });
  };
}


/**Clearing Voot Shorts Collection (ALL + CURATED) ********************************************************/
export function clearVootShortsData() {
  return {
    type: SHOWS.EPISODES.VOOT_SHORTS.ALL_VOOT_CLEAR_DATA,
  };
}


/**Setting all Poster Routes********************************************************/
export function setAllVootShortsPosterRoute(data) {
  return {
    type: SHOWS.POSTER_ROUTES.ALL_VOOT_SHORTS,
    data,
  };
}

export function setCuratedVootShortsPosterRoute(data) {
  return {
    type: SHOWS.POSTER_ROUTES.CURATED_VOOT_SHORTS,
    data,
  };
}

export function setEpisodePosterRoute(data) {
  return {
    type: SHOWS.POSTER_ROUTES.EPISODES,
    data,
  };
}

export function clearAllPosterRoutes() {
  return {
    type: SHOWS.POSTER_ROUTES.CLEAR_ROUTES,
  };
}



