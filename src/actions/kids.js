import {KIDS} from '../constants';
import callApi from '../util/apiCaller';
import {success, failure, checkResponse} from '../util/response';
import { mergeDefault } from '../util/helper';
import {setLoader} from './loader';
import endpoints from '../endpoints/kids';

const errorMsg = 'No Results Found!';

/** Kids Collection ********************************************************/
export function getKidsClusterData(params, successCallback, failureCallback) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(KIDS.CLUSTER.GET_DATA, response));
        if(successCallback)
          dispatch(successCallback);
      })
      .catch(error=> {
        dispatch(success(KIDS.CLUSTER.ERROR, {assets: [], total_items: 0}));
        if(failureCallback)
          dispatch(failureCallback);
      });
  };
}
export function appendKidsClusterData(params, data) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
      body: data,
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(KIDS.CLUSTER.APPEND_DATA,response.assets));
      })
      .catch(error=>{
        dispatch(failure(KIDS.CLUSTER.ERROR, error));
      });
  };
}


export function clearKidsClusterErrors() {
  return {
    type: KIDS.CLUSTER.CLEAR_ERROR,
  };
}

export function clearKidsClusterData() {
  return {
    type: KIDS.CLUSTER.CLEAR_DATA,
    data: {assets: [], total_items: 0},
  };
}


/**********************/

/** Kids Home ********************************************************/
export function getKidsHomeData(params,callback) {
  const kidsHomeEndpoints = endpoints.kidsHome, paginationDetails = {Version: '2.0', page: params.pageIndex || 1};
  return dispatch => {
    return callApi({
      path: kidsHomeEndpoints.path,
      method: kidsHomeEndpoints.method,
      query: mergeDefault(kidsHomeEndpoints.query.defaultParams, paginationDetails),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(KIDS.HOME.GET_DATA, response));
        if(callback && callback.successCallback)
          dispatch(callback.successCallback);
      })
      .catch(error=> {
        dispatch(success(KIDS.HOME.ERROR, {assets: [], total_items: 0}));
        if(callback && callback.failureCallback)
          dispatch(callback.failureCallback);
      });
  };
}

export function resetKidsHomeData() {
  return {
    type: KIDS.HOME.RESET,
  };
}

export function clearKidsHomeErrors() {
  return {
    type: KIDS.HOME.CLEAR_ERROR,
  };
}


/**********************/


/**All Shows Landing Episodes Collection ********************************************************/
export function getAllShowsEpisodesData(params, data, callback) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
      body: data,
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(KIDS.ALL_EPISODES.GET_DATA, response));
        if(callback){
          callback();
        }
      })
      .catch(error=> {
        dispatch(success(KIDS.ALL_EPISODES.ERROR, {assets: [], total_items: 0}));
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
        dispatch(success(KIDS.ALL_EPISODES.APPEND_DATA,response));
        if(params.successCallback)
          dispatch(params.successCallback);
      })
      .catch(error=>{
        if(params.failureCallback)
          dispatch(params.failureCallback);
      });
  };
}

export function clearAllShowsEpisodesData() {
  return {
    type: KIDS.ALL_EPISODES.CLEAR_DATA,
    data: {assets: [], total_items: 0},
  };
}



/**Kids Poster Route Actions ********************************************************/
export function setKidsPosterRoute(data) {
  return {
    type: KIDS.POSTER_ROUTE.EPISODES,
    data,
  };
}

export function clearKidsPosterRoute() {
  return {
    type: KIDS.POSTER_ROUTE.CLEAR_ROUTES,
  };
}

/**********************/

/**All Shows Landing Episodes Collection ********************************************************/
export function getKidsSeriesData(params, successCallback, failureCallback) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
      // body: data,
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(KIDS.SERIES.GET_DATA, response));
        if(successCallback)
          dispatch(successCallback);
      })
      .catch(error=> {
        dispatch(success(KIDS.SERIES.ERROR, {assets: [], total_items: 0}));
        if(failureCallback)
          dispatch(failureCallback);
      });
  };
}

export function clearKidsSeriesData() {
  return {
    type: KIDS.SERIES.CLEAR_DATA,
    data: {assets: [], total_items: 0},
  };
}
/**********************/

/**Kids Movies ********************************************************/

export function getKidsMoviesData(params, data, callback) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
      body: data,
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(KIDS.MOVIES.GET_DATA,response));
        if(callback)
          dispatch(callback);
      })
      .catch(error=>{
        dispatch(success(KIDS.MOVIES.GET_DATA,{assets:[], total_items:0}));
        dispatch(failure(KIDS.MOVIES.ERROR, error));
        if(callback)
          dispatch(callback);
      });
  };
}

export function appendKidsMoviesData(params, data) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
      body: data,
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(KIDS.MOVIES.APPEND_DATA,response));
        if(params.successCallback)
          dispatch(params.successCallback);
      })
      .catch(error=>{
        dispatch(failure(KIDS.MOVIES.ERROR, error));
        if(params.failureCallback)
          dispatch(params.failureCallback);
      });
  };
}

export function clearKidsMoviesData() {
  return {
    type: KIDS.MOVIES.CLEAR_DATA,
  };
}


export function clearKidsMoviesErrors() {
  return {
    type: KIDS.MOVIES.CLEAR_ERROR,
  };
}
