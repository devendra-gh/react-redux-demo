import { getParams } from './params';
import {apiUrl} from '../constants/apiConstant';

export default({
  adultPopularSearch: {
    path: apiUrl.BASE + apiUrl.adultPopularSearch,
    method: 'GET',
    query: getParams(),
  },
  kidsPopularSearch: {
    path: apiUrl.BASE + apiUrl.kidsPopularSearch,
    method: 'GET',
    query: getParams(),
  },
  getAutoCompleteSearch: {
    path: apiUrl.BASE + apiUrl.ottGetAutoCompleteSearch,
    method: 'POST',
    query: getParams(),
  },
  adultSearch: {
    path: apiUrl.BASE + apiUrl.adultSearch,
    method: 'GET',
    query: getParams(),
  },
  kidsSearch: {
    path: apiUrl.BASE + apiUrl.kidsSearch,
    method: 'GET',
    query: getParams(),
  },
});
