import {isset} from './common';
import cookie from 'react-cookie';

let googleTagManager = {

  sendPageView: function () {
    window.dataLayer = window.dataLayer || [];
    if(typeof window !== "undefined") {
      let path = (window.location && window.location.pathname) ? window.location.pathname : null;
      let pageUrl = (window.location && window.location.href) ? window.location.href : null;
      let pagePath = (window.location && window.location.pathname) ? window.location.pathname : null;
      let pageType = path =='/' ? 'home' : getPageTypefromUrl(path);
      let data = {
        event: 'tvc_pageChange',
        tvc_pageType: pageType,
        tvc_pageUrl: pageUrl,
        tvc_pagePath: pagePath,
      };
      window.dataLayer.push(data);
    }
  }

};

function getPageTypefromUrl(pathname){
  let returnpath;
  let data = pathname.split('/');
  let firstElement = data[1] ? data[1] : '';
  let secondElement = data[2] ? data[2] : '';

  if(firstElement!=""){
    returnpath = firstElement
  }

  if(secondElement!=''){
    secondElement = secondElement.split('-').join('_');
    returnpath = returnpath +'_'+ secondElement;
  }

  return returnpath;
}

export default googleTagManager;
