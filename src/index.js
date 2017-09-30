/* eslint-disable no-console */
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/';
import routes from './routes';
import ReactGA from 'react-ga';
import {COOKIE} from './constants/index';
import mixPanel from './util/mixPanel';
import googleTagManager from './util/gtm'
import {checkUrl,getMediaId} from './util/routeCreater';
import cookie from 'react-cookie';

import appConfigs from './appConfig';
let appConfig = appConfigs.default;

let store = configureStore(window.__INITIAL_STATE__);

let app = document.getElementById('app');
ReactGA.initialize('UA-75234699-1', {
  debug: false,
});

if(window && window.mixpanel){
  window.firstLoad = true;
  window.mixpanel.init(appConfig.mixPanelToken, {
    debug: false,
    /*loaded: function(mixpanel) {
      let distinct_id = mixpanel.get_distinct_id() ? mixpanel.get_distinct_id() : '';
      cookie.save(COOKIE.MIXPANEL_DISTINCT_ID,JSON.stringify(distinct_id));
    },*/
  });
}

function logPageView() {
  if(window.google_tag_params){
    window.google_tag_params.dynx_itemid=  "";
    window.google_tag_params.dynx_itemid2 = "";
    window.google_tag_params.dynx_pagetype= "";
    window.google_tag_params.dynx_totalvalue= "";
  }
  window.scrollTo(0, 0);
  const pathname = window.location.pathname;
  const newPath = checkUrl(pathname);
  if(typeof newPath === "object" && typeof newPath.url !== "undefined" && typeof newPath.url !== "undefined" && typeof newPath.mediaId !== "undefined"){
    browserHistory.replace(newPath.url);
  }
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
  if(typeof mixPanel.mixPanelPageViewEvent == 'function') {mixPanel.mixPanelPageViewEvent();}
  let firstTimeLoad = window.firstLoad;
  if(firstTimeLoad){
    window.firstLoad = false;
  }
  else{
    googleTagManager.sendPageView();
  }
}

render(
  <Provider store={store}>
    <Router onUpdate={() =>logPageView()} history={browserHistory}>
      {routes}
    </Router>
  </Provider> , app);

