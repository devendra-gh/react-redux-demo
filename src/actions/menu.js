import {MENU, FOOTER,TABMENU} from '../constants';
import callApi from '../util/apiCaller';
import {success,failure} from '../util/response';
import { mergeDefault } from '../util/helper';

export default function fetchMenu(params) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response))
      .then(menu => dispatch(success(MENU.SUCCESS,menu.assets)))
      .catch(error=> dispatch(failure(MENU.FAILURE,error)));
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


export function fetchFooterMenu(params) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response))
      .then(footerMenu => dispatch(success(FOOTER.SUCCESS,footerMenu.assets)))
      .catch(error=> dispatch(failure(FOOTER.FAILURE,error)));
  };
}


export function fetchTabMenu(params) {
  return dispatch => {
    return callApi({
      path: params.path,
      method: params.method,
      query: mergeDefault(params.query.defaultParams),
    }).then((response)=> checkResponse(response))
      .then(tabMenu => dispatch(success(TABMENU.SUCCESS,tabMenu.assets)))
      .catch(error=> dispatch(failure(TABMENU.FAILURE,error)));
  };
}
