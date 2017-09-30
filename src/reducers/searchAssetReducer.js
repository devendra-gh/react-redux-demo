import {
  SEARCH_ASSET,
} from '../constants/searchAssetConstant';

const initialState = {
  data: {},
  error: {},
};

const searchAsset = function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_ASSET.SUCCESS:
      return {
        ...state,
        data: action.data,
        error: {},
      };
    case SEARCH_ASSET.FAILURE:
      return {
        ...state,
        data: {},
        error: action.error,
      };

    default:
      return state;
  }
};

export default searchAsset;
