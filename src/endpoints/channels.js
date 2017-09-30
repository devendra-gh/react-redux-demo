import { getParams } from './params';
import {apiUrl} from '../constants/apiConstant';

export default({
  home: {
    path: apiUrl.BASE + apiUrl.channelList,
    method: 'GET',
    query: getParams(),
  },
  channelHome: {
    path: apiUrl.BASE + apiUrl.channelHome,
    method: 'GET',
    query: getParams(),
  },
  moreShows: {
    //path: apiUrl.BASE + apiUrl.ottSearchAssets,
    path: apiUrl.BASE + apiUrl.showsListWithAssetsCounts,
    method: 'POST',
    query: getParams(),
  },
});


