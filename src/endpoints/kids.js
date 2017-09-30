import {getParams} from './params';
import {apiUrl} from '../constants/apiConstant';

export default({
  kidsHome: {
    path: apiUrl.BASE + apiUrl.kidsHome,
    method: 'GET',
    query: getParams(),
  },
  kidsCollection: {
    path: apiUrl.BASE + apiUrl.kidsCluster,
    method: 'GET',
    query: getParams(),
  },
  kidsSeries: {
    path: apiUrl.BASE + apiUrl.kidsSeries,
    method: 'GET',
    query: getParams(),
  },
  kidsSeriesImages: {
    path: apiUrl.BASE + apiUrl.kidsSeriesImages,
    method: 'GET',
    query: getParams(),
  },
});
