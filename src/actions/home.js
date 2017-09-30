import {HOME} from '../constants';
import callApi from '../util/apiCaller';
import {success,failure} from '../util/response';
import { mergeDefault } from '../util/helper';
import {setLoader} from './loader';
import endpoints from './../endpoints/home';

export const home=(params)=> {
  if(typeof params.query === "undefined"){
    params = endpoints.home;
  }
  return dispatch => {
    dispatch(setLoader(true));
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response))
      .then(response => {
        dispatch(success(HOME.SUCCESS,response.assets));
        dispatch(setLoader(false));
      })
      .catch(error=> {
        dispatch(failure(HOME.FAILURE,error));
        dispatch(setLoader(false));
      });
  };
};

export const paginatedHome = (params, callback)=> {
  return dispatch => {
    const homeEndpoint = endpoints.home;
    const paginationDetails = {Version: '2.0', page: params.pageIndex || 1};
    return callApi({
      path: homeEndpoint.path,
      method: homeEndpoint.method,
      query: mergeDefault(homeEndpoint.query.defaultParams, paginationDetails),
    }).then((response)=> checkResponse(response))
      .then(response => {
        dispatch(success(HOME.PAGINATED_DATA.SUCCESS, response));
        dispatch(updateHomePaginationCurrentPage(paginationDetails.page));
        if (callback && callback.successCallback) {
          dispatch(callback.successCallback);
        }
      })
      .catch(error=> {
        dispatch(failure(HOME.PAGINATED_DATA.FAILURE, error));
        if (callback && callback.failureCallback)
          dispatch(callback.failureCallback);
      });
  };
};

export function updateHomePaginationCurrentPage(pageNo) {
  return {
    type: HOME.PAGINATED_DATA.UPDATE_CURRENT_PAGE,
    data: {currentPage: pageNo},
  };
}

export function resetHomePaginatedData(){
  return{
    type:HOME.PAGINATED_DATA.RESET,
  };
}

function requestHome(){
  return{
    type:HOME.REQUEST,
  };
}
export function resetLoader(){
  return{
    type:HOME.RESET_LOADER,
  };
}
const checkResponse = (response)=>{
  if(response.responseMsg==null){
    return response;
  }else{
    let error = new Error();
    error.message = "Service not found";
    throw error;
  }
};
