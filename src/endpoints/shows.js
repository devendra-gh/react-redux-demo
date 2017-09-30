import { getParams } from './params';
import {apiUrl} from '../constants/apiConstant';

export default({
  tvSeriesCarousel: {
    path: apiUrl.BASE + apiUrl.tvSeries,
    method: 'GET',
    query: getParams(),
  },
  vootOriginalsCarousel:{
    path: apiUrl.BASE + apiUrl.vootOriginalTvSeries,
    method: 'GET',
    query: getParams(),
  },
  moviesCarousel: {
    path: apiUrl.BASE + apiUrl.movies,
    method: 'GET',
    query: getParams(),
  },
  initialLoadTvSeries: {
    path: apiUrl.BASE + apiUrl.showList,
    method: 'GET',
    query: getParams(),
  },
  searchAssets: {
    path: apiUrl.BASE + apiUrl.ottSearchAssets,
    method: 'POST',
    query: getParams(),
  },
  searchMediaByAndOrList: {
    path: apiUrl.BASE + apiUrl.ottSearchMediaByAndOrList,
    method: 'POST',
    query: getParams(),
  },
  vootShorts: {
    path: apiUrl.BASE + apiUrl.vootSeriesShorts,
    method: 'GET',
    query: getParams(),
  },
  showsListWithAssetsCounts: {
    path: apiUrl.BASE + apiUrl.showsListWithAssetsCounts,
    method: 'POST',
    query: getParams(),
  },
  popularShowsList: {
    path: apiUrl.BASE + apiUrl.popularShowsList,
    method: 'POST',
    query: getParams(),
  },
  getChannelMedias: {
    path: apiUrl.BASE + apiUrl.getChannelMedias,
    method: 'GET',
    query: getParams(),
  },
  // added by Sourabh Chourasiya
  customPage: {
    path: apiUrl.BASE + apiUrl.getSeasons,
    method: 'GET',
    query: getParams(),
  },
  voShowList: {
    path: apiUrl.BASE + apiUrl.voShowList,
    method: 'POST',
    query: getParams(),
  },
});
