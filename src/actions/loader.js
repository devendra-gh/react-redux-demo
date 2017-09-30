import {
  LOADER,
  SMALL_LOADER,
} from '../constants';

export function setLoader(state) {
  return {
    type: LOADER,
    state,
  };
}

export function setSmallLoader(state){
  return{
    type:SMALL_LOADER,
    state,
  };
}
