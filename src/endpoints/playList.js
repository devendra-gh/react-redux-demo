import { getParams } from './params';
import {apiUrl} from '../constants/apiConstant';

export default  ({

  getMediaInfo: {
    path: apiUrl.BASE + apiUrl.ottGetMediaInfo,
    method: 'GET',
    query:getParams(),
  },

  isFollowed: {
    path: apiUrl.BASE + apiUrl.isFollowed,
    method: 'POST',
    query:getParams(),
  },
  addFollow: {
    path: apiUrl.BASE + apiUrl.followAdd,
    method: 'POST',
    query:getParams(),
  },
  followList:{
    path: apiUrl.BASE + apiUrl.followList,
    method: 'POST',
    query:getParams(),
  },
  removeFollow: {
    path: apiUrl.BASE + apiUrl.followRemove,
    method: 'POST',
    query:getParams(),
  },

  playlist: {
    path: apiUrl.BASE + apiUrl.playList,
    method: 'GET',
    query:getParams(),
  },

  voPlaylist: {
    path: apiUrl.BASE + apiUrl.voPlayList,
    method: 'GET',
    query:getParams(),
  },
  relatedMedia: {
    path: apiUrl.BASE + apiUrl.ottGetRelatedMediasByTypes,
    method: 'POST',
    query:getParams(),
  },
  topShout: {
    path: apiUrl.BASE + apiUrl.getTopShoutCount,
    method: 'POST',
    query:getParams(),
  },
  tvSeriesTopShout: {
    path: apiUrl.BASE + apiUrl.getTvSeriesTopShout,
    method: 'POST',
    query:getParams(),
  },
  shoutList: {
    path: apiUrl.BASE + apiUrl.shoutList,
    method: 'GET',
    query:getParams(),
  },
  searchAssets: {
    path: apiUrl.BASE + apiUrl.ottSearchAssets,
    method: 'POST',
    query: getParams(),
  },
  shoutByUser: {
    path: apiUrl.BASE + apiUrl.shoutByUser,
    method: 'POST',
    query:getParams(),
  },
  makeShout: {
    path: apiUrl.BASE + apiUrl.makeShoutOnMedia,
    method: 'POST',
    query:getParams(),
  },
});


