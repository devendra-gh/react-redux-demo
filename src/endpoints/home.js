import { getParams } from './params';
import {apiUrl} from '../constants/apiConstant';

export default({
  home: {
    path: apiUrl.BASE + apiUrl.home,
    method: 'GET',
    query: getParams(),
  },
});


