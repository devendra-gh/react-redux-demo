import { CONFIG } from '../constants/index';

const initialState = {
  config:{},
  isLoading:false,
};

export default function(state=initialState, action){

  switch (action.type) {
    case CONFIG.SUCCESS:
      return {...state, config: action.data,isLoading:false, error: {}};
    case CONFIG.REQUEST:
      return {...state, config:{},isLoading:true};
    case CONFIG.FAILURE :
      return {...state, config: {},isLoading:false, error: action.error};
    default:
      return state;
  }
}
