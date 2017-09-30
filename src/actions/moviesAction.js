import {MOVIES} from '../constants/moviesActionConstants';
import callApi from '../util/apiCaller';
import {success, failure, checkResponse} from '../util/response';
import { mergeDefault } from '../util/helper';
import {setLoader} from './loader';
import endpoints from '../endpoints/shows';

const errorMsg = 'No Results Found!';


/**All Movies Action Collection ********************************************************/
export function getMovieCarousel() {
  const params = endpoints.moviesCarousel;
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(MOVIES.CAROUSEL,response.assets));
        dispatch(setLoader(false));
      });
  };
}

export function getMoviesData(params, data) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
      body: data,
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(MOVIES.GET_DATA,response));
        dispatch(setLoader(false));
      })
      .catch(error=>{
        dispatch(success(MOVIES.GET_DATA,{assets:[], total_items:0}));
        dispatch(failure(MOVIES.ERROR, error));
        dispatch(setLoader(false));
      });
  };
}

export function appendMoviesData(params, data) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
      body: data,
    }).then((response)=> checkResponse(response, errorMsg))
      .then(response => {
        dispatch(success(MOVIES.APPEND_DATA,response));
        dispatch(setLoader(false));
      })
      .catch(error=>{
        dispatch(failure(MOVIES.ERROR, error));
        dispatch(setLoader(false));
      });
  };
}

export function clearMoviesData() {
  return {
    type: MOVIES.CLEAR_DATA,
  };
}


export function clearMoviesErrors() {
  return {
    type: MOVIES.CLEAR_ERROR,
  };
}

