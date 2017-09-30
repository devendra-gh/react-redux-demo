import React, {Component} from 'react';
import {ENV, COOKIE}from '../constants';
import  querystring from 'querystring';
import  _merge from 'lodash/merge';
import cookie from 'react-cookie';
import mixPanel from './mixPanel';
import appBoyEvent from '../util/appboyEvent';


export function getApiUrl(env) {
  switch (env) {
    case ENV.DEVELOPMENT:
      return 'http://auth.voot.com/ws';
    case ENV.PRODUCTION:
      return 'http://auth.voot.com/ws';
  }
}

export function flatternObj(obj) {
  return querystring.stringify(obj);
}

export function mergeDefault(parent, child) {
  let emptyObj=Object.create(null);
  return Object.assign(emptyObj, parent, child);
}

export function getUserProfileData(userInfo) {
  mixpanelAunticate(userInfo);
 let imgUrl;
  if (userInfo.ImageUrl) {
    imgUrl=userInfo.ImageUrl.replace('http:', 'https:');
  }
  return {
    "ID": userInfo.ID,
    "Uid": userInfo.Uid,
    "emailid": userInfo && userInfo.Email ?  userInfo.Email[0].Value :  userInfo.emailid ? userInfo.emailid : '',
    "ImageUrl": imgUrl,
    "FirstName": userInfo.FirstName,
    "MiddleName": userInfo.MiddleName,
    "LastName": userInfo.LastName,
    "Languages": userInfo.Languages,
    "Provider": userInfo.Provider,
    "FirstLogin": userInfo.FirstLogin,
    "NoOfLogins": userInfo.NoOfLogins,
    "Country" : userInfo.Country,
    "BirthDate": userInfo.BirthDate,
    "Gender": userInfo.Gender,
  };
}

function mixpanelAunticate(userInfo){
  let provider = userInfo && userInfo.Provider;
  let userType = 'Guest';
  let providerType = '';
  if (provider == "" || provider == undefined) {
    userType = "Guest";
  } else if (provider == "RAAS") {
    userType = 'Traditional';
    providerType = 'Traditional';
  } else if (provider == "facebook") {
    userType = 'FB';
    providerType = 'FB';
  } else if (provider == "google") {
    userType = 'G+';
    providerType = 'G+';
  }
  let firstLogin = userInfo && userInfo.FirstLogin;
  let myEmailName = userInfo && userInfo.Email ?  userInfo.Email[0].Value :  userInfo.emailid ? userInfo.emailid : '';
  let birthDate = userInfo && userInfo.BirthDate;
  let gender = userInfo && userInfo.Gender;
  let countryMix = userInfo && userInfo.Country && userInfo.Country.Name;
  let age = userInfo && userInfo.Age;
  let noOfLogins = userInfo && userInfo.NoOfLogins;
  let Uid = userInfo && userInfo.Uid;

  let first_Login = firstLogin ? 'T' : 'F';

  mixPanel.webTapSignIn(userType, providerType);
  mixPanel.authenticated(userType, myEmailName, 'T', birthDate, gender, countryMix, age, first_Login, noOfLogins,Uid);

  if(typeof window !== "undefined"){
    appBoyEvent.isAuthenticated(myEmailName, Uid);
  }

}

export function scrollToTop() {
  /* Do not un-comment the following line -------*/
  // window.scrollTo(0, 0);
}

export function createMarkup(markup, comment = 'Home page') {
  comment = "<!--" + comment + "->";
  let addMarkup = {__html: JSON.stringify(markup)};
  return (
    <div id='seoJsonData'>
      {''}
      <script type='application/ld+json' dangerouslySetInnerHTML={addMarkup} />
    </div>
  );
}


export function getMediaInfoValueByKey(arr, value) {
  if (arr && arr.length) {
    let target = arr.filter((obj)=> obj.Key == value);
    return target[0] && target[0].Value;
  } else {
    return "";
  }
}

export function setRemarketingData(mediaInfo){
  let google_tag_params = {};
  if(typeof mediaInfo === "object" && typeof mediaInfo.assets === "object" && typeof mediaInfo.assets.AdvertisingParameters === "object"){
    let genre = getMediaInfoValueByKey(mediaInfo.assets.AdvertisingParameters,"Genre");
    let title = getMediaInfoValueByKey(mediaInfo.assets.Metas,"SeriesMainTitle") || getMediaInfoValueByKey(mediaInfo.assets.Metas,"RefSeriesTitle");
    let EpisodeMainTitle = getMediaInfoValueByKey(mediaInfo.assets.Metas,"EpisodeMainTitle");
    let MediaID = mediaInfo.assets.MediaID, mediaTitle = title;
    if(mediaInfo.assets.MediaTypeName == "Episode"){
      google_tag_params.dynx_itemid = getMediaInfoValueByKey(mediaInfo.assets.Metas,"RefSeriesTitle") && MediaID;
      mediaTitle= getMediaInfoValueByKey(mediaInfo.assets.Metas,"RefSeriesTitle");
      google_tag_params.dynx_itemid2 = title + " - " + EpisodeMainTitle;
      google_tag_params.dynx_totalvalue = 200;
      google_tag_params.dynx_pagetype = genre;
    } else if(mediaInfo.assets.MediaTypeName == "Series" && (typeof window !== "undefined" && !window.google_tag_params.dynx_itemid)){
      google_tag_params.dynx_itemid = "";
      google_tag_params.dynx_itemid2 = mediaInfo.assets.MediaName;
      google_tag_params.dynx_totalvalue = 200;
      google_tag_params.dynx_pagetype = genre;
      mediaTitle= mediaInfo.assets.MediaName;
    }else if(mediaInfo.assets.MediaTypeName == "Movie"){
      google_tag_params.dynx_itemid = MediaID;
      google_tag_params.dynx_itemid2 = mediaInfo.assets.MediaName;
      google_tag_params.dynx_totalvalue = 200;
      google_tag_params.dynx_pagetype = genre;
      mediaTitle = mediaInfo.assets.MediaName;
    }
    mixPanel.setMediaInfo(MediaID, mediaTitle);
  }
  if(typeof window !== "undefined" && google_tag_params.dynx_pagetype){
    window.google_tag_params = google_tag_params;
    document.querySelector("#remarketingData script").innerHTML = `
    let google_tag_params = {};
    google_tag_params.dynx_itemid : "${google_tag_params.dynx_itemid}",
    google_tag_params.dynx_itemid2 : "${google_tag_params.dynx_itemid2}",
    google_tag_params.dynx_totalvalue : "${google_tag_params.dynx_totalvalue}",
    google_tag_params.dynx_pagetype : "${google_tag_params.dynx_pagetype}",
    `;
  }
  return google_tag_params;
}

