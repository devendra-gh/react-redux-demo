import { combineReducers } from 'redux';
import authentication from './authentication';
import forgotPassword from './forgotPassword';
import loader from './loader';
import smallLoader from './smallLoader';
import country from './country';
import {home} from './home';
import {playlist} from './playlist';
import {getMediaInfo} from './mediaInfo';
import shows from './shows';
import filters from './filters';
import config from './configReducer';
import user from './user';
import deviceInfo from './deviceInfo';
import channel from './channels';
import topShout from './topShout';
import kids from './kids';
import searchAsset from './searchAssetReducer';
import {clipData} from './clipData';
import customData from './customData';
import channelMedias from './channelMediasReducer';
import search from './search';
import movies from './movies';
import {reducer as toastr} from 'react-redux-toastr';

const rootReducer = combineReducers({
  authentication,
  forgotPassword,
  home,
  playlist,
  getMediaInfo,
  loader,
  smallLoader,
  country,
  shows,
  filters,
  config,
  user,
  deviceInfo,
  kids,
  topShout,
  channel,
  searchAsset,
  clipData,
  customData,
  channelMedias,
  search,
  toastr,
  movies,
});

export default rootReducer;
