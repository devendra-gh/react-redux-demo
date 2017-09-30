import {isset} from './common';
import cookie from 'react-cookie';
import {COOKIE, MEDIA_TYPE} from '../constants';

import {MEDIA_TYPE as MediaType} from '../constants/media';

import {convertToMinute, getPlayerData} from '../util/filters';

let isActive = false;
let timerCallKalturaFirstTime;

function addBlankToString() {}

let mixPanel = {

  webTapSignIn: function (userType, signInType) {
    if (isActive)
      return false;
    let registerProperty = {};
    let peopleProperty = {};
    let trackProperty = {};
    if (isset(userType)) {
      registerProperty['User Type'] = userType;
      peopleProperty['User Type'] = userType;
    }

    if (isset(signInType)) {
      trackProperty['Sign In Type'] = signInType;
    }

    let userInfo = cookie.load(COOKIE.USER_ID) && cookie.load(COOKIE.USER_ID) === 'undefined' ? false : cookie.load(COOKIE.USER_ID);
      if(typeof window != 'undefined' && window.mixpanel !=undefined) {
        window.mixpanel.register(registerProperty);
        window.mixpanel.people.set(peopleProperty);
      }

// mixpanel.track('Tap Sign in',trackProperty);
  },
  authenticated: function (userType, email, userAuthenticated, LR_Birthdate, gender, LR_Country, age, firstLogin, noOfLogins,Uid) {
    if (isActive)
      return false;
    let registerProperty = {};
    let peopleProperty = {};
    let trackProperty = {};
    if (isset(userType)) {
      registerProperty['User Type'] = userType;
      peopleProperty['User Type'] = userType;
    }

    if (isset(email)) {
      registerProperty['Email'] = email;
      // peopleProperty['Email'] = email;
      peopleProperty['$email'] = email;
    }

    if (isset(userAuthenticated)) {
      peopleProperty['User Authenticated?'] = userAuthenticated;
      trackProperty['User Authenticated?'] = userAuthenticated;
    }

    if (isset(LR_Birthdate)) {
      registerProperty['LR_Birthdate'] = LR_Birthdate;
      peopleProperty['LR_Birthdate'] = LR_Birthdate;
    }

    if (isset(gender)) {
      registerProperty['Gender'] = gender;
      peopleProperty['Gender'] = gender;
    }

    if (isset(LR_Country)) {
      registerProperty['LR_Country'] = LR_Country;
      peopleProperty['LR_Country'] = LR_Country;
    }

    if (isset(age)) {
      registerProperty['LR_Age'] = age;
      peopleProperty['LR_Age'] = age;
    }

    if (isset(firstLogin)) {
      registerProperty['First Login'] = firstLogin;
      peopleProperty['First Login'] = firstLogin;
    }

    if (isset(noOfLogins)) {
      registerProperty['No Of Logins'] = noOfLogins;
      peopleProperty['No Of Logins'] = noOfLogins;
    }

    if (isset(Uid)) {
      if(typeof window !== "undefined") {
        window.mixpanel.identify(Uid);
      }
    } else {
      // mixpanel.identify(mixpanelNonLoggedInUserId);
    }
    /*if(isset(Uid) && isset(email)){
      window.appboy.changeUser(Uid);
     window.appboy.getUser().setEmail(email);
    }*/

    if(typeof window != 'undefined' && window.mixpanel !=undefined) {
      window.mixpanel.register(registerProperty);
      window.mixpanel.people.set(peopleProperty);
      window.mixpanel.track('Authenticated', trackProperty);
    }
  },
  singIn: function (userType, signInType) {
    if (isActive)
      return false;
    let registerProperty = {};
    let peopleProperty = {};
    let trackProperty = {};
    if (isset(userType)) {
      registerProperty['User Type'] = userType;
      peopleProperty['User Type'] = userType;
    }

    if (isset(signInType)) {
      trackProperty['Sign In Type'] = signInType;
    }
    if(typeof window !== "undefined") {
      window.mixpanel.register(registerProperty);
      window.mixpanel.people.set(peopleProperty);
      // window.mixpanel.track('Tap Sign in',trackProperty);
    }
  },
  accountCreated: function (userType, email, firstName, lastName, UID, country, dateOfBirth, userCreated, firstLogin, gender, age) {
    if (isActive)
      return false;
    let registerProperty = {};
    let peopleProperty = {};
    let trackProperty = {};
    if (isset(userType)) {
      registerProperty['User Type'] = userType;
      peopleProperty['User Type'] = userType;
    }

    if (isset(email)) {
      registerProperty['Email'] = email;
      peopleProperty['$email'] = email;
    }

    if (isset(firstName)) {
      registerProperty['First Name'] = firstName;
      peopleProperty['$first_name'] = firstName;
    }

    if (isset(lastName)) {
      registerProperty['Last Name'] = lastName;
      peopleProperty['$last_name'] = lastName;
    }

    if (isset(UID)) {
      registerProperty['UID'] = UID;
      peopleProperty['UID'] = UID;
    }

    if (isset(country)) {
      registerProperty['Country'] = country;
      peopleProperty['Country'] = country;
    }

    if (isset(dateOfBirth)) {
      /*registerProperty['LR_DOB'] = dateOfBirth;
       peopleProperty['LR_DOB'] = dateOfBirth; */
      registerProperty['LR_Birthdate'] = dateOfBirth;
      peopleProperty['LR_Birthdate'] = dateOfBirth;
    }

    if (isset(gender)) {
      registerProperty['Gender'] = gender;
      peopleProperty['Gender'] = gender;
    }

    if (isset(age)) {
      registerProperty['Age'] = age;
      peopleProperty['Age'] = age;
    }

    if (isset(userCreated)) {
      trackProperty['User Created'] = userCreated;
    }

    if (isset(firstLogin)) {
      registerProperty['First Login'] = firstLogin;
      peopleProperty['First Login'] = firstLogin;
    }
    // mixpanel.alias(UID);

    // mixpanel.identify(mixpanel.get_distinct_id());
    if(typeof window !== "undefined") {
      window.mixpanel.identify(UID);
      window.mixpanel.register(registerProperty);
      window.mixpanel.people.set(peopleProperty);
      window.mixpanel.track('Account Created', trackProperty);
    }
  },
  webPageViewed: function (pageType, identify, Uid) {
    let todayTime = new Date();
    if (isActive)
      return false;
    if (identify == true) {
      if (isset(Uid)) {
        if(typeof window !== "undefined") {
          window.mixpanel.identify(Uid);
        }
      } else {
        // mixpanel.identify(mixpanelNonLoggedInUserId);
      }
    }

    let hourOfDay = new Date().getHours();
    let dayOfWeek = new Date().getDay() + 1;
    // vootMixPanel.incrementalSuperProperty('Count of Pageviews');
    if(typeof window !== "undefined") {
      window.mixpanel.track('Page Viewed', {
        'Hour of Day': hourOfDay,
        'Day of Week': dayOfWeek,
        'Page Type': pageType,
      });
      window.mixpanel.register_once({
        'DATE': todayTime .getDate() + "/" + (todayTime .getMonth() + 1) + "/" + todayTime .getFullYear(),
      });
    }
  },
  mixPanelPageViewEvent: function () {

    let userInfo = cookie.load(COOKIE.USER_ID) && cookie.load(COOKIE.USER_ID) === 'undefined' ? false : cookie.load(COOKIE.USER_ID);
    let userProvider = '', Uid = '';
    if (userInfo && userInfo.Provider) {
      userProvider = userInfo.Provider;
      Uid = userInfo.Uid;
    }
    let userType = '';
    let platform = 'Mobile Web';
    userType = 'Guest';
    if (userProvider == "" || userProvider == undefined) {
      userType = "Guest";
    } else if (userProvider == "RAAS") {
      userType = "Traditional";
    } else if (userProvider == "facebook") {
      userType = "FB";
    } else if (userProvider == "google") {
      userType = "G+";
    }

    let firstTimeUser = this.checkFirstTimeUser();
    if(typeof window !== "undefined") {
      this.webRegister(platform, userType, firstTimeUser);
    }
    let identify = true;
    if (location.pathname === "/") {
      this.webPageViewed("Home", identify, Uid);
    } else if (location.pathname === "/shows") {
      this.webPageViewed("Shows", identify, Uid);
    } else if (location.pathname === "/movies") {
      this.webPageViewed("Movies", identify, Uid);
    } else if (location.pathname.match(/\/movies\/.*/)) {
      this.webPageViewed("Movies", identify, Uid);
    } else if (location.pathname === "/kids") {
      this.webPageViewed("Kids", identify, Uid);
    } else if (location.pathname == "/myvoot") {
      this.webPageViewed("My Voot", identify, Uid);
    } else if (location.pathname.match(/\/kids\/movie\/.*\/\d+/g)) {
      this.webPageViewed("Kids Movie", identify, Uid);
    } else if (location.pathname.match(/\/kids\/shows/)) {
      this.webPageViewed("Kids Shows", identify, Uid);
    } else if (location.pathname.match(/\/movie\/.*\/\d+/g)) {
      this.webPageViewed("Movie Detail", identify, Uid);
    } else if (location.pathname.match(/\/shows\/voot-originals\//)) {
      this.webPageViewed("Voot Original", identify, Uid);
    } else if (location.pathname.match(/\/shows\/.*\/\d+\/\d+\/.*\/\d+/g)) {
      this.webPageViewed("Episode Detail", identify, Uid);
    } else if (location.pathname.match(/\/shows\/.*\/\d+\/\d+/g)) {
      this.webPageViewed("Show Detail", identify, Uid);
    } else if (location.pathname.match(/\/shows\/.*/g)) {
      this.webPageViewed("Show Detail", identify, Uid);
    } else if (location.pathname.match(/\/clip\/.*\/\d+/g)) {
      this.webPageViewed("Clip Detail", identify, Uid);
    } else if (location.pathname.match(/\/search\/kids\//)) {
      this.webPageViewed("Kids Search", identify), Uid;
    } else if (location.pathname.match(/\/search\//)) {
      this.webPageViewed("Adult Search", identify, Uid);
    } else if (location.pathname.match(/\/about-us/)) {
      this.webPageViewed("About Us", identify, Uid);
    } else if (location.pathname.match(/\/terms-of-use/)) {
      this.webPageViewed("Terms Of Use", identify, Uid);
    } else if (location.pathname.match(/\/privacy-policy/)) {
      this.webPageViewed("Privacy Policy", identify, Uid);
    } else if (location.pathname.match(/\/faq/)) {
      this.webPageViewed("faq", identify, Uid);
    } else if (location.pathname.match(/\/contact-us/)) {
      this.webPageViewed("Contact Us", identify, Uid);
    } else if (location.pathname.match(/\/welcome/)) {
      this.webPageViewed("Welcome", identify, Uid);
    } else if (location.pathname.match(/\/playlist/)) {
      this.webPageViewed("Playlist", identify, Uid);
    } else if (location.pathname.match(/\/playlist\/.*\/\d+\/.*\/\d+/g)) {
      this.webPageViewed("Playlist Detail", identify, Uid);
    } else if (location.pathname.match(/\/celebrity/)) {
      this.webPageViewed("Celebrity", identify, Uid);
    } else if (location.pathname.match(/\/discover/)) {
      this.webPageViewed("Discover", identify, Uid);
    } else if (location.pathname.match(/\/kids\/characters\/.*\/\d+\/.*\/\d+/g)) {
      this.webPageViewed("Kids Episode", identify, Uid);
    } else if (location.pathname.match(/\/kids\/characters\/.*\/\d+/g)) {
      this.webPageViewed("Kids characters", identify, Uid);
    } else if (location.pathname.match(/\/kids\/clusters/)) {
      this.webPageViewed("Kids Clusters", identify, Uid);
    } else if (location.pathname.match(/\/kids\/clusters\/.*\/\d+/g)) {
      this.webPageViewed("Kids Clusters", identify, Uid);
    } else if (location.pathname.match(/\/channels/)) {
      this.webPageViewed("Channels", identify, Uid);
    } else if (location.pathname.match(/\/channels\/.*/g)) {
      this.webPageViewed("Channels Detail", identify, Uid);
    } else {
      this.webPageViewed("Home", identify, Uid);
    }
  },
  addToHomeAction: function () {
    let date = new Date(), timestamp = date.getTime();
    timestamp = parseInt(timestamp / 1000);
    if(typeof window !== "undefined") {
      window.mixpanel.register({
        'Clicked Plus': true
      });
      window.mixpanel.people.set({
        'Clicked Plus': true
      });

      window.mixpanel.track('Clicked Plus Icon', {
        'Clicked Plus': true,
        'timestamp': timestamp
      });
    }

  },
    isLaunchFromPWA: function () {
        if(typeof window !== "undefined") {
            window.mixpanel.track('PWA Icon Launch', {
                'Launched from PWA Icon': true
            });
        }
    },
  webRegister: function (platform, userType , firstTimeUser) {
    if (isActive)   return false;
    let checkUser = '';
    /*Condition to check firsttimeUser Undefined*/
    if(firstTimeUser == false)
    {
      checkUser = 'FALSE';
    }
    else if(typeof firstTimeUser == "undefined")
    {
      checkUser = 'FALSE';
    }
    else
    {
      checkUser = 'TRUE';
    }
    window.mixpanel.unregister('Current URL');
    window.mixpanel.register({
      'Platform': platform,
      'User Type': userType,
      'First Time': checkUser
    });
    window.mixpanel.people.set({
      'User Type': userType
    });
  },

  /*
   contentOpened: function (seriesTitle, movieTitle, contentName, SBU, contentType, Genre, showDuration, mediaID, previousPage, language) {
   if (isActive)
   return false;
   let registerProperty = {};
   let peopleProperty = {};
   let trackProperty = {};
   if (isset(seriesTitle)) {
   trackProperty['Series Title'] = seriesTitle;
   }

   if (isset(movieTitle)) {
   trackProperty['Movie Title'] = movieTitle;
   }

   if (isset(contentName)) {
   trackProperty['Content Name'] = contentName;
   }

   if (isset(SBU)) {
   trackProperty['SBU'] = SBU;
   }

   if (isset(contentType)) {
   trackProperty['Content Type'] = contentType;
   }

   if (isset(Genre)) {
   trackProperty['Genre'] = Genre.join(',');
   }

   if (isset(showDuration)) {
   trackProperty['Show Duration'] = showDuration;
   }

   if (isset(mediaID)) {
   trackProperty['Media ID'] = mediaID;
   }

   if (isset(previousPage)) {
   trackProperty['Previous Page'] = previousPage;
   }

   if (isset(language)) {
   trackProperty['Language'] = language;
   }


   window.mixpanel.track('Content Opened', trackProperty);
   },
   */
  /*  contentOpenedView: function(contentParams) {
   let userInfo = cookie.load(COOKIE.USER_ID) && cookie.load(COOKIE.USER_ID) === 'undefined'? false : cookie.load(COOKIE.USER_ID);
   let userProvider = '',Uid = '';
   if(userInfo && userInfo.Provider){
   userProvider = userInfo.Provider;
   Uid = userInfo.Uid;
   }
   let userType = '';
   userType = 'Guest';
   if (userProvider == "" || userProvider == undefined) {
   userType = "Guest";
   } else if (userProvider == "RAAS") {
   userType = "Traditional";
   } else if (userProvider == "facebook") {
   userType = "FB";
   } else if (userProvider == "google") {
   userType = "G+";
   }

   //vootMixpanel.webRegister(platform, userType);
   let identify = true;
   if (location.pathname  === ("/home" || location.pathname.match(/\/about-us/) || location.pathname.match(/\/privacy-policy/) || location.pathname.match(/\/faq/) || location.pathname.match(/\/contact-us/) || location.pathname.match(/\/welcome/))) {
   return;
   } else {
   this.contentOpened(contentParams);
   }
   },*/

  //getPlayerData: getPlayerData(contentObject),

  callFirstPlay: function(contentObject,timerCallKaltura) {
    let that = this;
    timerCallKalturaFirstTime = timerCallKaltura;
    that.firstPlay(contentObject);
    if(timerCallKalturaFirstTime)
    {
      var playerPlayHeadEventFired = false;
      let kdp = document.getElementById('kaltura_player');
      kdp.kUnbind('playerUpdatePlayhead');
      kdp.kBind("playerUpdatePlayhead", function(event)
      {
        if(!playerPlayHeadEventFired)
        {
          if(event >= 10 && event <= 11)
          {
            playerPlayHeadEventFired = true;
            that.callPlayerPlayHead(contentObject);
          }
        }
      });
      //service.timerCallKaltura();
    }
    timerCallKalturaFirstTime           = false;
    /* Added DBM Pixel code on first play event*/
    /*var axel = Math.random() + "";
    var a = axel * 10000000000000;
    angular.element('body').find('#DBM-Pixel').remove();
    angular.element('body').prepend('<iframe id="DBM-Pixel" src="https://5451438.fls.doubleclick.net/activityi;src=5451438;type=invmedia;cat=lmcx8fqv;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');*/

  },

  callPlayerPlayHead: function(contentObject){
    this.playerPlayHead(contentObject);
  },

  firstPlay: function (contentObject) {
    if(document.getElementById('DBM-Pixel'))document.getElementById('DBM-Pixel').remove();
    document.querySelector('body').insertAdjacentHTML('beforeend', '<iframe id="DBM-Pixel" src="https://5451438.fls.doubleclick.net/activityi;src=5451438;type=invmedia;cat=lmcx8fqv;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=' + Math.random() + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');

    let userInfo = cookie.load(COOKIE.USER_ID) && cookie.load(COOKIE.USER_ID) === 'undefined' ? false : cookie.load(COOKIE.USER_ID);
    let Uid = userInfo && userInfo.Uid;

    let registerProperty = {};
    let peopleProperty = {};
    let trackProperty = {};
    let returnObject = getPlayerData(contentObject);
    let seriesTitle = returnObject.seriesTitle;
    let movieTitle = returnObject.movieTitle;
    let contentName = returnObject.contentName;
    let sbu = returnObject.sbu;
    let contentType = returnObject.contentType;
    let genre = returnObject.genre;
    let duration = returnObject.duration;
    let mediaid = returnObject.mediaid;
    let previousPage = returnObject.previousPage;
    let language = returnObject.language;
    let durationInSeconds = returnObject.durationInSeconds;


    if (isset(seriesTitle)) {
      trackProperty['Series Title'] = seriesTitle;
    }

    if (isset(movieTitle)) {
      trackProperty['Movie Title'] = movieTitle;
    }

    if (isset(contentName)) {
      trackProperty['Content Name'] = contentName;
    }

    if (isset(sbu)) {
      trackProperty['SBU'] = sbu;
    }

    if (isset(contentType)) {
      trackProperty['Content Type'] = contentType;
    }

    if (isset(genre)) {
      trackProperty['Genre'] = genre.join(',');
    }

    if (isset(duration)) {
      trackProperty['Show Duration'] = duration;
    }

    if (isset(mediaid)) {
      trackProperty['Media ID'] = mediaid;
    }

    if (isset(previousPage)) {
      trackProperty['Previous Page'] = previousPage;
    }

    if (isset(language)) {
      trackProperty['Language'] = language;
    }

    if (isset($("#kalturaPlayerURL").attr("src"))) {
      trackProperty['Player URL'] = $("#kalturaPlayerURL").attr("src");
    }

    let date = new Date();
    let timestamp = date.getTime();
    timestamp = parseInt(timestamp / 1000);
    trackProperty['Timestamp'] = timestamp;

    /*if (isset($cookies.get('Uid'))) {
     if(isset(mediaid) && isset(seriesTitle)){
     appboy.getUser().addToCustomAttributeArray('Last Episodes Watched',mediaid);
     }
     if(isset(sbu)){
     appboy.getUser().addToCustomAttributeArray('Last SBU watched',sbu);
     }
     if(isset(seriesTitle)){
     appboy.getUser().addToCustomAttributeArray('Last Show Watched',seriesTitle);
     }
     if(isset(returnObject.genre[0])){
     appboy.getUser().addToCustomAttributeArray('Last Genres Watched',returnObject.genre[0]);
     }
     if(isset(language)){
     appboy.getUser().addToCustomAttributeArray('Last Languages of Content Viewed',language);
     }
     if(isset(mediaid) && isset(movieTitle)){
     appboy.getUser().addToCustomAttributeArray('Last Movies Watched',mediaid);
     }
     mixpanel.identify($cookies.get('Uid'));
     } else {
     // mixpanel.identify(mixpanelNonLoggedInUserId);
     }*/
    //.toString()
    /*seriesTitle =  $filter('addBlankToString')(seriesTitle);
     movieTitle = $filter('addBlankToString')(movieTitle);
     contentName = $filter('addBlankToString')(contentName);
     let percentagePlayVideo = 1;
     if(isset(returnObject.genre[0]) && returnObject.genre[0]!='Kids'){
     if(movieTitle!=''){
     appboy.logCustomEvent('Video-Watched', {'Video Completed':percentagePlayVideo,'Genre': returnObject.genre[0],'Language': language,'Movie-Name': movieTitle,'SBU': sbu});
     }else{
     appboy.logCustomEvent('Video-Watched', {'Video Completed':percentagePlayVideo,'Episode-Name': contentName,'Genre': returnObject.genre[0],'Language': language,'SBU': sbu,'Show-Name':seriesTitle });
     }
     }
     if(isset(returnObject.genre[0]) && returnObject.genre[0]=='Kids'){
     appboy.logCustomEvent('Kids Video Watched', {'Video Completed':percentagePlayVideo,'Episode-Name': contentName,'Genre': returnObject.genre[0],'SBU': sbu,'Show-Name': seriesTitle });
     }*/
    if(typeof window !== "undefined")
      window.mixpanel.track('First Play', trackProperty);
  },
  signOutMix: function () {
    if (isActive)
      return false;
    if(typeof window !== "undefined") {
      window.mixpanel.track('Sign Out');
      window.mixpanel.unregister('Email');
      window.mixpanel.unregister('First Name');
      window.mixpanel.unregister('Last Name');
      window.mixpanel.unregister('LR_Birthdate');
      window.mixpanel.unregister('UID');
      window.mixpanel.unregister('Country');
      window.mixpanel.unregister('LR_Country');
      window.mixpanel.unregister('DOB');
      window.mixpanel.unregister('LR_DOB');
      window.mixpanel.unregister('Gender');
      window.mixpanel.unregister('Age');
      window.mixpanel.unregister('LR_Age');
      window.mixpanel.unregister('First Login');
      window.mixpanel.unregister('No Of Logins');
      window.mixpanel.unregister('User Authenticated?');
      window.mixpanel.unregister('User Type');
      window.mixpanel.unregister('Count of Pageviews');

      window.mixpanel.register({
        'User Type': 'Guest',
      });
    }
  },
  Follow: function (showFavorited, totalUserFavorite) {
    if (isActive)
      return false;
    if(typeof window !== "undefined") {
      window.mixpanel.track('Follow', {
        'Show Followed': showFavorited,
        'Total User Favorited': totalUserFavorite,
      });
    }
  },
  shareInitiated: function (contentShared, shareId, shareChannel) {
    if (isActive)
      return false;
    if(typeof window !== "undefined") {
      window.mixpanel.track('Share Initiated', {
        'Content Shared': contentShared,
        'Share Id': shareId,
        'Share Channel': shareChannel,
      });
    }
  },
  shareCompleted: function (shareChannel, contentShared, totalShares) {
    if (isActive)
      return false;
    if(typeof window !== "undefined") {
      window.mixpanel.track('Share Initiated', {
        'Share Channel': shareChannel,
        'Content Shared': contentShared,
        'Total Shares': totalShares,
      });
    }
  },
  shout: function (contentObject, shoutName) {
    if (isActive)
      return false;
    let userInfo = cookie.load(COOKIE.USER_ID) && cookie.load(COOKIE.USER_ID) === 'undefined' ? false : cookie.load(COOKIE.USER_ID);
    let Uid = userInfo && userInfo.Uid;
    let registerProperty = {};
    let peopleProperty = {};
    let trackProperty = {};
    let seriesTitle, movieTitle, contentName, sbu, contentType, genre, language, duration, mediaid;
    if (isset(contentObject) && isset(contentObject.Metas)) {
      contentObject.Metas.map(function (media, idx) {
        contentObject.Metas[media.Key] = media.Value;
      });
    }

    /* for tags data */
    if (isset(contentObject) && isset(contentObject.Tags)) {
      contentObject.Tags.map(function (media, idx) {
        contentObject.Tags[media.Key] = media.Value.split("|");
      });
    }
    // console.log('here2');
    if (isset(contentObject) && contentObject.MediaTypeID == MediaType.EPISODE) {
      seriesTitle = (isset(contentObject.Metas.RefSeriesTitle) ? contentObject.Metas.RefSeriesTitle : '');
      movieTitle = null;
      //contentName =  (isset(contentObject.Metas.EpisodeMainTitle)?contentObject.Metas.EpisodeMainTitle:'');
      contentName = (isset(contentObject.MediaName) ? contentObject.MediaName : '');
      sbu = (isset(contentObject.Metas.SBU) ? contentObject.Metas.SBU : '');
      contentType = (isset(contentObject.Metas.ContentType) ? contentObject.Metas.ContentType : '');
      genre = (isset(contentObject.Tags.Genre) ? contentObject.Tags.Genre : '');
      language = (isset(contentObject.Tags.Language) ? contentObject.Tags.Language[0] : '');
      if (isset(contentObject.Metas.ContentDuration)) {
        duration = convertToMinute(contentObject.Metas.ContentDuration);
      } else {
        duration = '';
      }
      mediaid = (isset(contentObject.MediaID) ? contentObject.MediaID : '');
    } else if (isset(contentObject) && contentObject.MediaTypeID == MediaType.MOVIE) {
      seriesTitle = null;
      movieTitle = (isset(contentObject.Metas.MovieMainTitle) ? contentObject.Metas.MovieMainTitle : '');
      contentName = (isset(contentObject.MediaName) ? contentObject.MediaName : '');
      sbu = (isset(contentObject.Metas.SBU) ? contentObject.Metas.SBU : '');
      contentType = (isset(contentObject.Metas.ContentType) ? contentObject.Metas.ContentType : '');
      genre = (isset(contentObject.Tags.Genre) ? contentObject.Tags.Genre : '');
      language = (isset(contentObject.Tags.Language) ? contentObject.Tags.Language[0] : '');
      if (isset(contentObject.Metas.ContentDuration)) {
        duration = convertToMinute(contentObject.Metas.ContentDuration);
      } else {
        duration = '';
      }
      mediaid = (isset(contentObject.MediaID) ? contentObject.MediaID : '');
    } else if (isset(contentObject) && contentObject.type == MediaType.EPISODE) {
      seriesTitle = (isset(contentObject.metas.RefSeriesTitle) ? contentObject.metas.RefSeriesTitle : '');
      movieTitle = null;
      contentName = (isset(contentObject.name) ? contentObject.name : '');
      sbu = (isset(contentObject.metas.SBU) ? contentObject.metas.SBU : '');
      contentType = (isset(contentObject.metas.ContentType) ? contentObject.metas.ContentType : '');
      genre = (isset(contentObject.tags.Genre) ? contentObject.tags.Genre : '');
      language = (isset(contentObject.tags.Language) ? contentObject.tags.Language[0] : '');
      if (isset(contentObject.metas.ContentDuration)) {
        duration = convertToMinute(contentObject.Metas.ContentDuration);
      } else {
        duration = '';
      }
      mediaid = (isset(contentObject.id) ? contentObject.id : '');
    } else if (isset(contentObject) && contentObject.type == MediaType.MOVIE) {
      seriesTitle = null;
      movieTitle = (isset(contentObject.metas.MovieMainTitle) ? contentObject.metas.MovieMainTitle : '');
      contentName = (isset(contentObject.name) ? contentObject.name : '');
      sbu = (isset(contentObject.metas.SBU) ? contentObject.metas.SBU : '');
      contentType = (isset(contentObject.metas.ContentType) ? contentObject.metas.ContentType : '');
      genre = (isset(contentObject.tags.Genre) ? contentObject.tags.Genre : '');
      language = (isset(contentObject.tags.Language) ? contentObject.tags.Language[0] : '');
      if (isset(contentObject.metas.ContentDuration)) {
        duration = convertToMinute(contentObject.Metas.ContentDuration);
      } else {
        duration = '';
      }
      mediaid = (isset(contentObject.id) ? contentObject.id : '');
    } else {
      seriesTitle = '';
      movieTitle = '';
      contentName = '';
      sbu = '';
      contentType = '';
      genre = '';
      duration = '';
      mediaid = '';
      language = '';
    }

    if (isset(seriesTitle)) {
      trackProperty['Series Title'] = seriesTitle;
    }

    if (isset(movieTitle)) {
      trackProperty['Movie Title'] = movieTitle;
    }

    if (isset(contentName)) {
      trackProperty['Content Name'] = contentName;
    }

    if (isset(sbu)) {
      trackProperty['SBU'] = sbu;
    }

    if (isset(contentType)) {
      trackProperty['Content Type'] = contentType;
    }

    if (isset(genre)) {
      trackProperty['Genre'] = genre.join(',');
    }

    if (isset(mediaid)) {
      trackProperty['Media ID'] = mediaid;
    }

    if (isset(language)) {
      trackProperty['Language'] = language;
    }

    if (isset(shoutName)) {
      trackProperty['Shout Name'] = shoutName;
    }

     if (isset(Uid)) {
       window.mixpanel.identify(Uid);
     } else {
       // mixpanel.identify(mixpanelNonLoggedInUserId);
     }
    if(typeof window !== "undefined") {
      window.mixpanel.track('Shout', trackProperty);
    }
  },
  search: function (searchString, totalCount) {
    if (isActive)
      return false;
    let trackProperty = {};
    if (isset(searchString)) {
      trackProperty['Search String'] = searchString;
      trackProperty['Number of Search Results'] = totalCount;
    }
    if(typeof window !== "undefined") {
      window.mixpanel.track('Search', trackProperty);
    }
  },
  videoStart: function (viewSource, contentType,loginData) {
    if (isActive)
      return false;
    let Uid = loginData && loginData.data && loginData.data.Uid
    let registerProperty = {};
    let peopleProperty = {};
    let trackProperty = {};
    if (isset(viewSource)) {
      trackProperty['View Source'] = viewSource;
    }

    if (isset(contentType)) {
      trackProperty['Content Type'] = contentType;
    }
    if (isset($("#kalturaPlayerURL").attr("src"))) {
      trackProperty['Player URL'] = $("#kalturaPlayerURL").attr("src");
    }

    if(typeof window !== "undefined") {
      if (isset(Uid)) {
        window.mixpanel.identify(Uid);
      } else {
        // window.mixpanel.identify(mixpanelNonLoggedInUserId);
      }

      window.mixpanel.track('Video Start', trackProperty);
    }
  },

   videoPlayed: function (contentObject,loginData) {
     if (isActive)
       return false;
     let Uid = loginData && loginData.data && loginData.data.Uid;
     let registerProperty = {};
     let peopleProperty = {};
     let trackProperty = {};
     let returnObject = getPlayerData(contentObject);
     let seriesTitle = returnObject.seriesTitle;
     let movieTitle = returnObject.movieTitle;
     let contentName = returnObject.contentName;
     let sbu = returnObject.sbu;
     let contentType = returnObject.contentType;
     let genre = returnObject.genre;
     let duration = returnObject.duration;
     let mediaid = returnObject.mediaid;
     let previousPage = returnObject.previousPage;
     let language = returnObject.language;
     if (isset(seriesTitle)) {
       trackProperty['Series Title'] = seriesTitle;
     }

     if (isset(movieTitle)) {
       trackProperty['Movie Title'] = movieTitle;
     }

     if (isset(contentName)) {
       trackProperty['Content Name'] = contentName;
     }

     if (isset(sbu)) {
       trackProperty['SBU'] = sbu;
     }

     if (isset(contentType)) {
       trackProperty['Content Type'] = contentType;
     }

     if (isset(genre)) {
       trackProperty['Genre'] = genre.join(',');
     }

     if (isset(duration)) {
       trackProperty['Show Duration'] = duration;
     }

     if (isset(mediaid)) {
       trackProperty['Media ID'] = mediaid;
     }

     if (isset(previousPage)) {
       trackProperty['Previous Page'] = previousPage;
     }

     if (isset(language)) {
       trackProperty['Language'] = language;
     }

     if (isset($("#kalturaPlayerURL").attr("src"))) {
       trackProperty['Player URL'] = $("#kalturaPlayerURL").attr("src");
     }
     if(typeof window !== "undefined") {
       if (isset(Uid)) {
         window.mixpanel.identify(Uid);
       } else {
         // window.mixpanel.identify(mixpanelNonLoggedInUserId);
       }
       window.mixpanel.track('Video Played', trackProperty);
     }

   },
  videoPaused: function (contentObject,loginData) {
   if (isActive)
   return false;
   let Uid = loginData && loginData.data && loginData.data.Uid;
   let registerProperty = {};
   let peopleProperty = {};
   let trackProperty = {};
   let returnObject = getPlayerData(contentObject);
   let seriesTitle = returnObject.seriesTitle;
   let movieTitle = returnObject.movieTitle;
   let contentName = returnObject.contentName;
   let sbu = returnObject.sbu;
   let contentType = returnObject.contentType;
   let genre = returnObject.genre;
   let duration = returnObject.duration;
   let mediaid = returnObject.mediaid;
   let previousPage = returnObject.previousPage;
   let language = returnObject.language;
   if (isset(seriesTitle)) {
   trackProperty['Series Title'] = seriesTitle;
   }

   if (isset(movieTitle)) {
   trackProperty['Movie Title'] = movieTitle;
   }

   if (isset(contentName)) {
   trackProperty['Content Name'] = contentName;
   }

   if (isset(sbu)) {
   trackProperty['SBU'] = sbu;
   }

   if (isset(contentType)) {
   trackProperty['Content Type'] = contentType;
   }

   if (isset(genre)) {
   trackProperty['Genre'] = genre.join(',');
   }

   if (isset(duration)) {
   trackProperty['Show Duration'] = duration;
   }

   if (isset(mediaid)) {
   trackProperty['Media ID'] = mediaid;
   }

   if (isset(previousPage)) {
   trackProperty['Previous Page'] = previousPage;
   }

   if (isset(language)) {
   trackProperty['Language'] = language;
   }

   if (isset($("#kalturaPlayerURL").attr("src"))) {
   trackProperty['Player URL'] = $("#kalturaPlayerURL").attr("src");
   }

    if(typeof window !== "undefined") {
      if (isset(Uid)) {
        window.mixpanel.identify(Uid);
      } else {
        // mixpanel.identify(mixpanelNonLoggedInUserId);
      }
      window.mixpanel.track('Video Paused', trackProperty);
    }

   },
   videoPlayEnd: function (contentObject,loginData) {
   if (isActive)
   return false;
   let Uid = loginData && loginData.data && loginData.data.Uid;
   let registerProperty = {};
   let peopleProperty = {};
   let trackProperty = {};
   let returnObject = this.getPlayerData(contentObject);
   let seriesTitle = returnObject.seriesTitle;
   let movieTitle = returnObject.movieTitle;
   let contentName = returnObject.contentName;
   let sbu = returnObject.sbu;
   let contentType = returnObject.contentType;
   let genre = returnObject.genre;
   let duration = returnObject.duration;
   let mediaid = returnObject.mediaid;
   let previousPage = returnObject.previousPage;
   let language = returnObject.language;
   if (isset(seriesTitle)) {
   trackProperty['Series Title'] = seriesTitle;
   }

   if (isset(movieTitle)) {
   trackProperty['Movie Title'] = movieTitle;
   }

   if (isset(contentName)) {
   trackProperty['Content Name'] = contentName;
   }

   if (isset(sbu)) {
   trackProperty['SBU'] = sbu;
   }

   if (isset(contentType)) {
   trackProperty['Content Type'] = contentType;
   }

   if (isset(genre)) {
   trackProperty['Genre'] = genre.join(',');
   }

   if (isset(duration)) {
   trackProperty['Show Duration'] = duration;
   }

   if (isset(mediaid)) {
   trackProperty['Media ID'] = mediaid;
   }

   if (isset(previousPage)) {
   trackProperty['Previous Page'] = previousPage;
   }

   if (isset(language)) {
   trackProperty['Language'] = language;
   }

   if (isset($("#kalturaPlayerURL").attr("src"))) {
   trackProperty['Player URL'] = $("#kalturaPlayerURL").attr("src");
   }
     if(typeof window !== "undefined") {
       if (isset(Uid)) {
         window.mixpanel.identify(Uid);
       } else {
         // window.mixpanel.identify(mixpanelNonLoggedInUserId);
       }
       window.mixpanel.track('Video Play End',trackProperty);
     }

   },
   /*videoPercentageComplete: function (percentageComplete, duration, showDuration, seriesTitle, contentName, mediaID, contentType, SBU) {
   if (isActive)
   return false;
   let trackProperty = {
   'Percentage Complete': percentageComplete,
   'Duration': duration,
   'Show Duration': showDuration,
   'Series Title': seriesTitle,
   'Content Name': contentName,
   'Media ID': mediaID,
   'Content Type': contentType,
   'SBU': SBU,
   };
   if (isset($("#kalturaPlayerURL").attr("src"))) {
   trackProperty['Player URL'] = $("#kalturaPlayerURL").attr("src");
   }
   window.mixpanel.track('Video Percentage Complete', trackProperty);
   },*/
   doPlay: function (contentObject, loginData) {
   let Uid = loginData && loginData.data && loginData.data.Uid;
   let registerProperty = {};
   let peopleProperty = {};
   let trackProperty = {};
   let returnObject = getPlayerData(contentObject);

   let seriesTitle = returnObject.seriesTitle;
   let movieTitle = returnObject.movieTitle;
   let contentName = returnObject.contentName;
   let sbu = returnObject.sbu;
   let contentType = returnObject.contentType;
   let genre = returnObject.genre;
   let duration = returnObject.duration;
   let mediaid = returnObject.mediaid;
   let previousPage = returnObject.previousPage;
   let language = returnObject.language;
   if (isset(seriesTitle)) {
   trackProperty['Series Title'] = seriesTitle;
   }

   if (isset(movieTitle)) {
   trackProperty['Movie Title'] = movieTitle;
   }

   if (isset(contentName)) {
   trackProperty['Content Name'] = contentName;
   }

   if (isset(sbu)) {
   trackProperty['SBU'] = sbu;
   }

   if (isset(contentType)) {
   trackProperty['Content Type'] = contentType;
   }

   if (isset(genre)) {
   trackProperty['Genre'] = genre.join(',');
   }

   if (isset(duration)) {
   trackProperty['Show Duration'] = duration;
   }

   if (isset(mediaid)) {
   trackProperty['Media ID'] = mediaid;
   }

   if (isset(previousPage)) {
   trackProperty['Previous Page'] = previousPage;
   }

   if (isset(language)) {
   trackProperty['Language'] = language;
   }

   if (isset($("#kalturaPlayerURL").attr("src"))) {
   trackProperty['Player URL'] = $("#kalturaPlayerURL").attr("src");
   }
     if(typeof window !== "undefined") {
       if (isset(Uid)) {
         window.mixpanel.identify(Uid);
       }

       window.mixpanel.track('Do Play',trackProperty);
     }

   },
   relatedVideoSelect: function (contentObject,loginData) {
   let Uid = loginData && loginData.data && loginData.data.Uid;
   let registerProperty = {};
   let peopleProperty = {};
   let trackProperty = {};
   let returnObject = getPlayerData(contentObject);

   let seriesTitle = returnObject.seriesTitle;
   let movieTitle = returnObject.movieTitle;
   let contentName = returnObject.contentName;
   let sbu = returnObject.sbu;
   let contentType = returnObject.contentType;
   let genre = returnObject.genre;
   let duration = returnObject.duration;
   let mediaid = returnObject.mediaid;
   let previousPage = returnObject.previousPage;
   let language = returnObject.language;
   if (isset(seriesTitle)) {
   trackProperty['Series Title'] = seriesTitle;
   }

   if (isset(movieTitle)) {
   trackProperty['Movie Title'] = movieTitle;
   }

   if (isset(movieTitle)) {
   trackProperty['Movie Title'] = movieTitle;
   }

   if (isset(contentName)) {
   trackProperty['Content Name'] = contentName;
   }

   if (isset(sbu)) {
   trackProperty['SBU'] = sbu;
   }

   if (isset(contentType)) {
   trackProperty['Content Type'] = contentType;
   }

   if (isset(genre)) {
   trackProperty['Genre'] = genre.join(',');
   }

   if (isset(duration)) {
   trackProperty['Show Duration'] = duration;
   }

   if (isset(mediaid)) {
   trackProperty['Media ID'] = mediaid;
   }

   if (isset(previousPage)) {
   trackProperty['Previous Page'] = previousPage;
   }

   if (isset(language)) {
   trackProperty['Language'] = language;
   }
     if(typeof window !== "undefined") {
       if (isset(Uid)) {
         window.mixpanel.identify(Uid);
       }
       if (isset($("#kalturaPlayerURL").attr("src"))) {
         trackProperty['Player URL'] = $("#kalturaPlayerURL").attr("src");
       }
       window.mixpanel.track('Related Video Select', trackProperty);
     }
   },
   playerReady: function (contentObject,loginData) {
   let Uid = loginData && loginData.data && loginData.data.Uid;
   let registerProperty = {};
   let peopleProperty = {};
   let trackProperty = {};
   let returnObject = getPlayerData(contentObject);
   let seriesTitle = returnObject.seriesTitle;
   let movieTitle = returnObject.movieTitle;
   let contentName = returnObject.contentName;
   let sbu = returnObject.sbu;
   let contentType = returnObject.contentType;
   let genre = returnObject.genre;
   let duration = returnObject.duration;
   let mediaid = returnObject.mediaid;
   let previousPage = returnObject.previousPage;
   let language = returnObject.language;
   if (isset(seriesTitle)) {
   trackProperty['Series Title'] = seriesTitle;
   }

   if (isset(movieTitle)) {
   trackProperty['Movie Title'] = movieTitle;
   }

   if (isset(contentName)) {
   trackProperty['Content Name'] = contentName;
   }

   if (isset(sbu)) {
   trackProperty['SBU'] = sbu;
   }

   if (isset(contentType)) {
   trackProperty['Content Type'] = contentType;
   }

   if (isset(genre)) {
   trackProperty['Genre'] = genre.join(',');
   }

   if (isset(duration)) {
   trackProperty['Show Duration'] = duration;
   }

   if (isset(mediaid)) {
   trackProperty['Media ID'] = mediaid;
   }

   if (isset(previousPage)) {
   trackProperty['Previous Page'] = previousPage;
   }

   if (isset(language)) {
   trackProperty['Language'] = language;
   }

   if (isset($("#kalturaPlayerURL").attr("src"))) {
   trackProperty['Player URL'] = $("#kalturaPlayerURL").attr("src");
   }
     if(typeof window !== "undefined") {
       if (isset(Uid)) {
         window.mixpanel.identify(Uid);
       }
       window.mixpanel.track('Player Ready', trackProperty);
     }
   },
   mediaReady: function (contentObject,loginData) {
   let Uid = loginData && loginData.data && loginData.data.Uid;
   let registerProperty = {};
   let peopleProperty = {};
   let trackProperty = {};
   let returnObject = getPlayerData(contentObject);

   let seriesTitle = returnObject.seriesTitle;
   let movieTitle = returnObject.movieTitle;
   let contentName = returnObject.contentName;
   let sbu = returnObject.sbu;
   let contentType = returnObject.contentType;
   let genre = returnObject.genre;
   let duration = returnObject.duration;
   let mediaid = returnObject.mediaid;
   let previousPage = returnObject.previousPage;
   let language = returnObject.language;
   if (isset(seriesTitle)) {
   trackProperty['Series Title'] = seriesTitle;
   }

   if (isset(movieTitle)) {
   trackProperty['Movie Title'] = movieTitle;
   }

   if (isset(contentName)) {
   trackProperty['Content Name'] = contentName;
   }

   if (isset(sbu)) {
   trackProperty['SBU'] = sbu;
   }

   if (isset(contentType)) {
   trackProperty['Content Type'] = contentType;
   }

   if (isset(genre)) {
   trackProperty['Genre'] = genre.join(',');
   }

   if (isset(duration)) {
   trackProperty['Show Duration'] = duration;
   }

   if (isset(mediaid)) {
   trackProperty['Media ID'] = mediaid;
   }

   if (isset(previousPage)) {
   trackProperty['Previous Page'] = previousPage;
   }

   if (isset(language)) {
   trackProperty['Language'] = language;
   }

   if (isset($("#kalturaPlayerURL").attr("src"))) {
   trackProperty['Player URL'] = $("#kalturaPlayerURL").attr("src");
   }

   let date = new Date();
   let timestamp = date.getTime();
   timestamp = parseInt(timestamp / 1000);
   trackProperty['Timestamp'] = timestamp;
     if(typeof window !== "undefined") {
       if (isset(Uid)) {
         window.mixpanel.identify(Uid);
       } else {
         // mixpanel.identify(mixpanelNonLoggedInUserId);
       }
       window.mixpanel.track('Media Ready', trackProperty);
     }
   },
   firstPlayEvent: function (contentObject, loginData) {
   let Uid = loginData && loginData.data && loginData.data.Uid;
   let registerProperty = {};
   let peopleProperty = {};
   let trackProperty = {};
   let returnObject = this.getPlayerData(contentObject);
   let seriesTitle = returnObject.seriesTitle;
   let movieTitle = returnObject.movieTitle;
   let contentName = returnObject.contentName;
   let sbu = returnObject.sbu;
   let contentType = returnObject.contentType;
   let genre = returnObject.genre;
   let duration = returnObject.duration;
   let mediaid = returnObject.mediaid;
   let previousPage = returnObject.previousPage;
   let language = returnObject.language;
   if (isset(seriesTitle)) {
   trackProperty['Series Title'] = seriesTitle;
   }

   if (isset(movieTitle)) {
   trackProperty['Movie Title'] = movieTitle;
   }

   if (isset(contentName)) {
   trackProperty['Content Name'] = contentName;
   }

   if (isset(sbu)) {
   trackProperty['SBU'] = sbu;
   }

   if (isset(contentType)) {
   trackProperty['Content Type'] = contentType;
   }

   if (isset(genre)) {
   trackProperty['Genre'] = genre.join(',');
   }

   if (isset(duration)) {
   trackProperty['Show Duration'] = duration;
   }

   if (isset(mediaid)) {
   trackProperty['Media ID'] = mediaid;
   }

   if (isset(previousPage)) {
   trackProperty['Previous Page'] = previousPage;
   }

   if (isset(language)) {
   trackProperty['Language'] = language;
   }

   if (isset($("#kalturaPlayerURL").attr("src"))) {
   trackProperty['Player URL'] = $("#kalturaPlayerURL").attr("src");
   }

   let date = new Date();
   let timestamp = date.getTime();
   timestamp = parseInt(timestamp / 1000);
   trackProperty['Timestamp'] = timestamp;
     if(typeof window !== "undefined") {
       if (isset(Uid)) {
         window.mixpanel.identify(Uid);
       } else {
         // mixpanel.identify(mixpanelNonLoggedInUserId);
       }
       //.toString()
       seriesTitle = addBlankToString(seriesTitle);
       movieTitle = addBlankToString(movieTitle);
       contentName = addBlankToString(contentName);
       let percentagePlayVideo = 1;
       /*if(isset(lastSeekBarPosition) && isset(totalVideoDuration) && lastSeekBarPosition>1 && totalVideoDuration>1 ){
        console.log('-----------Video Completed-------------');
        let percentagePlayVideo = Math.round((lastSeekBarPosition/(totalVideoDuration/1000))*100);
        console.log('-----------Video Completed-------------');
        }*/
       window.mixpanel.track('First Play', trackProperty);
     }
   },
   noSourcesCustomError: function (contentObject,loginData) {
   let Uid = loginData && loginData.data && loginData.data.Uid;
   let registerProperty = {};
   let peopleProperty = {};
   let trackProperty = {};
   let returnObject = getPlayerData(contentObject);

   let seriesTitle = returnObject.seriesTitle;
   let movieTitle = returnObject.movieTitle;
   let contentName = returnObject.contentName;
   let sbu = returnObject.sbu;
   let contentType = returnObject.contentType;
   let genre = returnObject.genre;
   let duration = returnObject.duration;
   let mediaid = returnObject.mediaid;
   let previousPage = returnObject.previousPage;
   let language = returnObject.language;
   if (isset(seriesTitle)) {
   trackProperty['Series Title'] = seriesTitle;
   }

   if (isset(movieTitle)) {
   trackProperty['Movie Title'] = movieTitle;
   }

   if (isset(contentName)) {
   trackProperty['Content Name'] = contentName;
   }

   if (isset(sbu)) {
   trackProperty['SBU'] = sbu;
   }

   if (isset(contentType)) {
   trackProperty['Content Type'] = contentType;
   }

   if (isset(genre)) {
   trackProperty['Genre'] = genre.join(',');
   }

   if (isset(duration)) {
   trackProperty['Show Duration'] = duration;
   }

   if (isset(mediaid)) {
   trackProperty['Media ID'] = mediaid;
   }

   if (isset(previousPage)) {
   trackProperty['Previous Page'] = previousPage;
   }

   if (isset(language)) {
   trackProperty['Language'] = language;
   }

   if (isset($("#kalturaPlayerURL").attr("src"))) {
   trackProperty['Player URL'] = $("#kalturaPlayerURL").attr("src");
   }
     if(typeof window !== "undefined") {
       if (isset(Uid)) {
         window.mixpanel.identify(Uid);
       } else {
         // mixpanel.identify(mixpanelNonLoggedInUserId);
       }


       window.mixpanel.track('No Sources Custom Error', trackProperty);
     }
   },
   mediaError: function (contentObject,loginData) {
   let Uid = loginData && loginData.data && loginData.data.Uid;
   let registerProperty = {};
   let peopleProperty = {};
   let trackProperty = {};
   let returnObject = getPlayerData(contentObject);
   // console.log(returnObject);

   let seriesTitle = returnObject.seriesTitle;
   let movieTitle = returnObject.movieTitle;
   let contentName = returnObject.contentName;
   let sbu = returnObject.sbu;
   let contentType = returnObject.contentType;
   let genre = returnObject.genre;
   let duration = returnObject.duration;
   let mediaid = returnObject.mediaid;
   let previousPage = returnObject.previousPage;
   let language = returnObject.language;
   if (isset(seriesTitle)) {
   trackProperty['Series Title'] = seriesTitle;
   }

   if (isset(movieTitle)) {
   trackProperty['Movie Title'] = movieTitle;
   }

   if (isset(contentName)) {
   trackProperty['Content Name'] = contentName;
   }

   if (isset(sbu)) {
   trackProperty['SBU'] = sbu;
   }

   if (isset(contentType)) {
   trackProperty['Content Type'] = contentType;
   }

   if (isset(genre)) {
   trackProperty['Genre'] = genre.join(',');
   }

   if (isset(duration)) {
   trackProperty['Show Duration'] = duration;
   }

   if (isset(mediaid)) {
   trackProperty['Media ID'] = mediaid;
   }

   if (isset(previousPage)) {
   trackProperty['Previous Page'] = previousPage;
   }

   if (isset(language)) {
   trackProperty['Language'] = language;
   }

   if (isset($("#kalturaPlayerURL").attr("src"))) {
   trackProperty['Player URL'] = $("#kalturaPlayerURL").attr("src");
   }
     if(typeof window !== "undefined") {
       if (isset(Uid)) {
         window.mixpanel.identify(Uid);
       } else {
         // mixpanel.identify(mixpanelNonLoggedInUserId);
       }


       window.mixpanel.track('Media Error', trackProperty);
     }
   },
   embedPlayerError: function (contentObject,loginData) {
   let Uid = loginData && loginData.data && loginData.data.Uid;
   let registerProperty = {};
   let peopleProperty = {};
   let trackProperty = {};
   let returnObject = getPlayerData(contentObject);
   // console.log(returnObject);

   let seriesTitle = returnObject.seriesTitle;
   let movieTitle = returnObject.movieTitle;
   let contentName = returnObject.contentName;
   let sbu = returnObject.sbu;
   let contentType = returnObject.contentType;
   let genre = returnObject.genre;
   let duration = returnObject.duration;
   let mediaid = returnObject.mediaid;
   let previousPage = returnObject.previousPage;
   let language = returnObject.language;
   if (isset(seriesTitle)) {
   trackProperty['Series Title'] = seriesTitle;
   }

   if (isset(movieTitle)) {
   trackProperty['Movie Title'] = movieTitle;
   }

   if (isset(contentName)) {
   trackProperty['Content Name'] = contentName;
   }

   if (isset(sbu)) {
   trackProperty['SBU'] = sbu;
   }

   if (isset(contentType)) {
   trackProperty['Content Type'] = contentType;
   }

   if (isset(genre)) {
   trackProperty['Genre'] = genre.join(',');
   }

   if (isset(duration)) {
   trackProperty['Show Duration'] = duration;
   }

   if (isset(mediaid)) {
   trackProperty['Media ID'] = mediaid;
   }

   if (isset(previousPage)) {
   trackProperty['Previous Page'] = previousPage;
   }

   if (isset(language)) {
   trackProperty['Language'] = language;
   }

   if (isset($("#kalturaPlayerURL").attr("src"))) {
   trackProperty['Player URL'] = $("#kalturaPlayerURL").attr("src");
   }
     if(typeof window !== "undefined") {
       if (isset(Uid)) {
         window.mixpanel.identify(Uid);
       } else {
         // mixpanel.identify(mixpanelNonLoggedInUserId);
       }


       window.mixpanel.track('Embed Player Error', trackProperty);
     }
   },
   playbackComplete: function (contentObject,loginData) {
   let Uid = loginData && loginData.data && loginData.data.Uid;
   let registerProperty = {};
   let peopleProperty = {};
   let trackProperty = {};
   let returnObject = getPlayerData(contentObject);
   // console.log(returnObject);

   let seriesTitle = returnObject.seriesTitle;
   let movieTitle = returnObject.movieTitle;
   let contentName = returnObject.contentName;
   let sbu = returnObject.sbu;
   let contentType = returnObject.contentType;
   let genre = returnObject.genre;
   let duration = returnObject.duration;
   let mediaid = returnObject.mediaid;
   let previousPage = returnObject.previousPage;
   let language = returnObject.language;
   if (isset(seriesTitle)) {
   trackProperty['Series Title'] = seriesTitle;
   }

   if (isset(movieTitle)) {
   trackProperty['Movie Title'] = movieTitle;
   }

   if (isset(contentName)) {
   trackProperty['Content Name'] = contentName;
   }

   if (isset(sbu)) {
   trackProperty['SBU'] = sbu;
   }

   if (isset(contentType)) {
   trackProperty['Content Type'] = contentType;
   }

   if (isset(genre)) {
   trackProperty['Genre'] = genre.join(',');
   }

   if (isset(duration)) {
   trackProperty['Show Duration'] = duration;
   }

   if (isset(mediaid)) {
   trackProperty['Media ID'] = mediaid;
   }

   if (isset(previousPage)) {
   trackProperty['Previous Page'] = previousPage;
   }

   if (isset(language)) {
   trackProperty['Language'] = language;
   }

   if (isset($("#kalturaPlayerURL").attr("src"))) {
   trackProperty['Player URL'] = $("#kalturaPlayerURL").attr("src");
   }
     if(typeof window !== "undefined") {
       if (isset(Uid)) {
         window.mixpanel.identify(Uid);
       } else {
         // mixpanel.identify(mixpanelNonLoggedInUserId);
       }


       // window.mixpanel.track('Playback Complete', trackProperty);
     }
   },
   mediaHit: function (contentObject,loginData) {
   let Uid = loginData && loginData.data && loginData.data.Uid;
   let registerProperty = {};
   let peopleProperty = {};
   let trackProperty = {};
   let returnObject = getPlayerData(contentObject);

   let seriesTitle = returnObject.seriesTitle;
   let movieTitle = returnObject.movieTitle;
   let contentName = returnObject.contentName;
   let sbu = returnObject.sbu;
   let contentType = returnObject.contentType;
   let genre = returnObject.genre;
   let duration = returnObject.duration;
   let mediaid = returnObject.mediaid;
   let previousPage = returnObject.previousPage;
   let language = returnObject.language;
   if (isset(seriesTitle)) {
   trackProperty['Series Title'] = seriesTitle;
   }

   if (isset(movieTitle)) {
   trackProperty['Movie Title'] = movieTitle;
   }

   if (isset(contentName)) {
   trackProperty['Content Name'] = contentName;
   }

   if (isset(sbu)) {
   trackProperty['SBU'] = sbu;
   }

   if (isset(contentType)) {
   trackProperty['Content Type'] = contentType;
   }

   if (isset(genre)) {
   trackProperty['Genre'] = genre.join(',');
   }

   if (isset(duration)) {
   trackProperty['Show Duration'] = duration;
   }

   if (isset(mediaid)) {
   trackProperty['Media ID'] = mediaid;
   }

   if (isset(previousPage)) {
   trackProperty['Previous Page'] = previousPage;
   }

   if (isset(language)) {
   trackProperty['Language'] = language;
   }

   if (isset($("#kalturaPlayerURL").attr("src"))) {
   trackProperty['Player URL'] = $("#kalturaPlayerURL").attr("src");
   }
   let date = new Date();
   let timestamp = date.getTime();
   timestamp = parseInt(timestamp / 1000);
   trackProperty['Timestamp'] = timestamp;
     if(typeof window !== "undefined") {
       if (isset(Uid)) {
         window.mixpanel.identify(Uid);
       }
       window.mixpanel.track('Media Hit', trackProperty);
     }
   },

  checkFirstTimeUser : function(){
    var now = new Date();
    var expireDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    let distinctCookieLoad = cookie.load(COOKIE.MIXPANEL_DISTINCT_ID);
    let distinct_id = distinctCookieLoad ? JSON.parse(distinctCookieLoad) : '';

    if(distinct_id == ""){
      let mixpanel_distinct_id = window && window.mixpanel && window.mixpanel.get_distinct_id && window.mixpanel.get_distinct_id() ? window.mixpanel.get_distinct_id() : '';
      cookie.save(COOKIE.MIXPANEL_DISTINCT_ID,JSON.stringify(mixpanel_distinct_id),{
        'expires': expireDate
      });
      let userInfo = cookie.load(COOKIE.USER_ID);
      let Uid = userInfo && userInfo.Uid;
      if(isset(Uid)){
        return false;
      }
      return true;
    }else{
      return false;
    }
  },
  playerPlayHead: function (contentObject) {

    let userInfo = cookie.load(COOKIE.USER_ID) && cookie.load(COOKIE.USER_ID) === 'undefined' ? false : cookie.load(COOKIE.USER_ID);
    let Uid = userInfo && userInfo.Uid;
    let registerProperty = {};
    let peopleProperty = {};
    let trackProperty = {};
    let returnObject = getPlayerData(contentObject);
    // console.log(returnObject);

    let seriesTitle = returnObject.seriesTitle;
    let movieTitle = returnObject.movieTitle;
    let contentName = returnObject.contentName;
    let sbu = returnObject.sbu;
    let contentType = returnObject.contentType;
    let genre = returnObject.genre;
    let duration = returnObject.duration;
    let mediaid = returnObject.mediaid;
    let previousPage = returnObject.previousPage;
    let language = returnObject.language;
    let durationInSeconds = returnObject.durationInSeconds;
    if (isset(seriesTitle)) {
      trackProperty['Series Title'] = seriesTitle;
    }

    if (isset(movieTitle)) {
      trackProperty['Movie Title'] = movieTitle;
    }

    if (isset(contentName)) {
      trackProperty['Content Name'] = contentName;
    }

    if (isset(sbu)) {
      trackProperty['SBU'] = sbu;
    }

    if (isset(contentType)) {
      trackProperty['Content Type'] = contentType;
    }

    if (isset(genre)) {
      trackProperty['Genre'] = genre.join(',');
    }

    if (isset(duration)) {
      trackProperty['Show Duration'] = duration;
    }

    if (isset(mediaid)) {
      trackProperty['Media ID'] = mediaid;
    }

    if (isset(previousPage)) {
      trackProperty['Previous Page'] = previousPage;
    }

    if (isset(language)) {
      trackProperty['Language'] = language;
    }

    let date = new Date();
    let timestamp = date.getTime();
    timestamp = parseInt(timestamp / 1000);
    trackProperty['Timestamp'] = timestamp;
    if(typeof window !== "undefined") {
      if (isset(Uid)) {
        window.mixpanel.identify(Uid);
      }
      if (isset($("#kalturaPlayerURL").attr("src"))) {
        trackProperty['Player URL'] = $("#kalturaPlayerURL").attr("src");
      }
      window.mixpanel.track('Ten Seconds', trackProperty);
    }
  },
   playerPlayEnd: function (contentObject,loginData, playBackTime, timerCallType) {
    /*if(!(isset(playBackTime) && playBackTime > 0)) return false;    // if timer is not set then it should not play
    playBackTime    = $filter('convertToSecond')(playBackTime);
    if(playBackTime > 18000) return false;  // to identify if record is grreater than 5hrs*/
     let Uid = loginData && loginData.data && loginData.data.Uid;
    let registerProperty = {};
    let peopleProperty = {};
    let trackProperty = {};
    let returnObject = getPlayerData(contentObject);
    let seriesTitle = returnObject.seriesTitle;
    let movieTitle = returnObject.movieTitle;
    let contentName = returnObject.contentName;
    let sbu = returnObject.sbu;
    let contentType = returnObject.contentType;
    let genre = returnObject.genre;
    let duration = returnObject.duration;
    let mediaid = returnObject.mediaid;
    let previousPage = returnObject.previousPage;
    let language = returnObject.language;
    let durationInSeconds = returnObject.durationInSeconds;
    if (isset(seriesTitle)) {
      trackProperty['Series Title'] = seriesTitle;
    }

    if (isset(movieTitle)) {
      trackProperty['Movie Title'] = movieTitle;
    }

    if (isset(contentName)) {
      trackProperty['Content Name'] = contentName;
    }

    if (isset(sbu)) {
      trackProperty['SBU'] = sbu;
    }

    if (isset(contentType)) {
      trackProperty['Content Type'] = contentType;
    }

    if (isset(genre)) {
      trackProperty['Genre'] = genre.join(',');
    }

    if (isset(duration)) {
      trackProperty['Show Duration'] = duration;
    }

    if (isset(mediaid)) {
      trackProperty['Media ID'] = mediaid;
    }

    if (isset(previousPage)) {
      trackProperty['Previous Page'] = previousPage;
    }

    if (isset(language)) {
      trackProperty['Language'] = language;
    }

    if (isset(playBackTime)) {
      trackProperty['PlayBack Time'] = playBackTime;
    }

    if (isset($("#kalturaPlayerURL").attr("src"))) {
      trackProperty['Player URL'] = $("#kalturaPlayerURL").attr("src");
    }
    let date = new Date();
    let timestamp = date.getTime();
    timestamp = parseInt(timestamp / 1000);
    trackProperty['Timestamp'] = timestamp;
     if(typeof window !== "undefined") {
       if (isset(Uid)) {
         window.mixpanel.identify(Uid);
       }
       window.mixpanel.track('Video Watched', trackProperty);
     }
    /*if (timerCallType == 1) {
      window.mixpanel.track('Video Watched', trackProperty);
    } else if (timerCallType == 2) {
      window.mixpanel.track('Video Watched', trackProperty);
      $rootScope.playerPlayEnd = 1;
      playbackCounter = 0;
    } else if (timerCallType == 3) {
      if ($rootScope.playerIndicator == true) {
        window.mixpanel.track('Video Watched', trackProperty);
      }
    }
    $rootScope.totalVideoTime = 0;*/
  },
  setMediaInfo: function(id, title) {
    if(title != "") {
      window.mixpanel.people.set({
        'Media ID': id,
        'Series Title': title,
      });
    }
  },
};

export default mixPanel;
