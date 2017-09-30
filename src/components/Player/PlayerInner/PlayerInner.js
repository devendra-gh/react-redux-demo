import React, {Component} from 'react';
import {connect} from 'react-redux';
import {COOKIE} from '../../../constants';
import {isset} from '../../../util/common';
import '../style.scss';
import {getSeriesValueFromListOfMapsForKey} from '../../../util/getShowDetails';
import mixPanel from '../../../util/mixPanel';
import appboyEvent from '../../../util/appboyEvent';
import cookie from 'react-cookie';
import {getPlayerData} from '../../../util/filters';

let loadOnce = false, changeMedia = false,firstPlayChangedData, timerCallKalturaFirstTime = true,bingeShow;
class PlayerInner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaHit : 0,
    };
    if(typeof window !== "undefined") {
      window.fbq('track', 'ViewContent', {
        content_type: 'product',
        content_ids: props.mediaId,
      });
    }
  }

  pausePlay = () => {
    const kdp = document.getElementById('kaltura_player');
    if (document.hidden) {
      kdp && kdp.sendNotification && kdp.sendNotification("doPause");
    }
  }

  componentDidMount(){
    if(this.props.playerData.data.assets && this.props.playerData.data.assets.MediaID && !loadOnce){
      loadOnce = true;
      this.playVideo(this.props.mediaId, this.props.playerData);
    }
    document.addEventListener("visibilitychange", this.pausePlay);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playerData.data.assets && nextProps.playerData.data.assets.MediaID) {
      if (!loadOnce) {
        loadOnce = true;
        this.playVideo(nextProps.mediaId, nextProps.playerData);
      } else if (this.props.mediaId != nextProps.mediaId) {
        changeMedia = true;

        if(changeMedia && nextProps.mediaId == nextProps.playerData.data.assets.MediaID){
          changeMedia = false;
          this.switchMedia(nextProps.mediaId, nextProps.playerData);

        }
        // this.switchMedia(nextProps.mediaId, nextProps.playerData);
      }
      else if(changeMedia && nextProps.mediaId == nextProps.playerData.data.assets.MediaID){
        changeMedia = false;
        this.switchMedia(nextProps.mediaId, nextProps.playerData);
      }
      else if (nextProps.addNowPlayingHanding && nextProps.resetIsCurrentVideoToFalse()) {
        this.switchMedia(nextProps.mediaId, nextProps.playerData);
      }
    }
  }

  componentWillUnmount() {
    loadOnce = false;
    document.removeEventListener("visibilitychange", this.pausePlay);
  }

  findSBU = data => {
    const media = data && data.data && data.data.assets;
    let SUB = null;
    if(media){
      SUB = media.Metas.find((item) => {
        return item.Key === "SBU";

      });
    }
    return SUB.Value;
  };


  getSBUImage = () => {
    const {config} = this.props;
    if(config && config.config && config.config.assets && config.config.assets.SBU_IMAGE){
      return config.config.assets.SBU_IMAGE.IMG;
    }
    return {};
  };

  setChannelLogo = () => {
    const { config, playerData } = this.props;
    const SBU = this.findSBU(playerData);
    const SBUImages = this.getSBUImage();
    const playerElem = $('#kaltura_player_ifp').contents();

    if(SBU && SBUImages[SBU]){
      if(playerElem.find('.comp.watermark').length === 1)
      {
        const watermarkCloneObject = playerElem.find('.comp.watermark').clone();
        watermarkCloneObject.removeClass('topRight').addClass('bottomLeft');
        watermarkCloneObject.find('img').attr('src',SBUImages[SBU]).css('opacity','0.4');
        playerElem.find('.comp.watermark').after(watermarkCloneObject);
      }
      else
      {
        playerElem.find('.comp.watermark').last().find('img').attr('src',SBUImages[SBU]);
      }
    }
    else if(playerElem.find('.comp.watermark').length > 1){
      playerElem.find('.comp.watermark').last().remove();
    }
  };

  getMetaOrTagData=(mediaDetail,value)=>{
    if(getSeriesValueFromListOfMapsForKey(mediaDetail.Metas,value)){
      return getSeriesValueFromListOfMapsForKey(mediaDetail.Metas,value);
    }
    else {
      return getSeriesValueFromListOfMapsForKey(mediaDetail.Tags,value);
    }
  };

  createPrerollURL = (mediaDetail, midroll) => {
    if(mediaDetail !=undefined) {
      let mediaId = mediaDetail.MediaID;
      let VAST_LANGUAGE = "";
      let VAST_GENRE = "";
      VAST_LANGUAGE = this.getMetaOrTagData(mediaDetail,'Language');
      VAST_GENRE = this.getMetaOrTagData(mediaDetail, 'Genre');
      let akamaiMediaAnalyticShowName = '';
      if (isset(mediaDetail.MediaTypeID) && (isset(this.getMetaOrTagData(mediaDetail, 'RefSeriesTitle')) || isset(this.getMetaOrTagData(mediaDetail, 'SeriesMainTitle')))) {
        akamaiMediaAnalyticShowName = this.getMetaOrTagData(mediaDetail, 'RefSeriesTitle') ? this.getMetaOrTagData(mediaDetail, 'RefSeriesTitle')  :this.getMetaOrTagData(mediaDetail, 'SeriesMainTitle');
      } else if (isset(getSeriesValueFromListOfMapsForKey(mediaDetail.Metas, 'MovieMainTitle')) && getSeriesValueFromListOfMapsForKey(mediaDetail.Metas, 'MovieMainTitle') != '') {
        akamaiMediaAnalyticShowName =this.getMetaOrTagData(mediaDetail, 'MovieMainTitle');
      }
      let akamaiMediaAnalyticCategory = this.getMetaOrTagData(mediaDetail, 'ContentType');
      let VAST_SBU = isset(mediaDetail.Metas) && isset(getSeriesValueFromListOfMapsForKey(mediaDetail.Metas, 'SBU')) ? getSeriesValueFromListOfMapsForKey(mediaDetail.Metas, 'SBU') : 'COG';
      // if (isset($rootScope.configSetting)) {
      let lowerAkamaiMediaAnalyticShowName = akamaiMediaAnalyticShowName.toLowerCase();

      // if (isset($rootScope.configSetting.RANDOM_SBU)) {
      //   $.each($rootScope.configSetting.RANDOM_SBU, function (key, obj) {
      //     if (lowerAkamaiMediaAnalyticShowName == obj.seriesName.toLowerCase()) {
      //       VAST_SBU = obj.SBU[Math.floor(Math.random() * obj.SBU.length)];
      //     }
      //   });
      // }
      // }
      if(midroll == 1 && typeof midroll != 'undefined')
        akamaiMediaAnalyticCategory = "VAST";
      let prerollURL = '//in-viacom18.videoplaza.tv/proxy/distributor/v2?s=' + VAST_SBU + '&t=Language%3D' + encodeURI(VAST_LANGUAGE) + ',Series%20Title%3D' + encodeURI(akamaiMediaAnalyticShowName) + ',Genre%3D' + encodeURI(VAST_GENRE) + ',Content%20Type%3D' + encodeURI(akamaiMediaAnalyticCategory) + ',Media%20ID%3D' + encodeURI(mediaId) + '&tt=';
      return prerollURL;
    }
  };

  midrollPeriodicData=(mediaData)=> {
    let midrollPeriodicMediaDetail  = [];
    if(mediaData != undefined && typeof mediaData.Tags != 'undefined' && mediaData.Tags != 'undefined' &&  mediaData.Tags != null && mediaData.Tags != '')
    {
      mediaData.Tags.forEach(function(k,$tag) {
        if((k.Key).indexOf('AdCueTime') ==0)
        {
          midrollPeriodicMediaDetail[k.Key.replace('AdCueTime','')-1] = k.Value;
        }
      });
    }
    return midrollPeriodicMediaDetail;
  };
  //To be moved to mixpanel code
  // checkFirstTimeUser=()=>{
  //   let now = new window.Date();
  //   let expireDate = new window.Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
  //   if(typeof getCookie('distinctId') == "undefined"){
  //     setCookie('distinctId',distinct_id,expireDate);
  //     return typeof getCookie('Uid') != 'undefined';
  //   }else{
  //       return false;
  //   }
  // };
  callMediaHit =  (contentObject,loginData) => {
    if(this.state.mediaHit==0){
      const mediaHit = this.state.mediaHit + 1;
      this.setState({mediaHit:mediaHit});

      mixPanel.mediaHit(contentObject,loginData);
    }
  };

  switchMedia =  (mediaId, mediaData) => {
    firstPlayChangedData = mediaData.data.assets;
    this.setState({mediaHit:0});
    var kdp = document.getElementById('kaltura_player');
    let currentMediaDetail = mediaData.data.assets,
      curMedDetail = getPlayerData(currentMediaDetail);


    if(isset(curMedDetail.seriesTitle)){
      if(bingeShow === curMedDetail.seriesTitle){
        appboyEvent.isBingShow(curMedDetail.seriesTitle);
        bingeShow = '';
      }else{
        bingeShow = curMedDetail.seriesTitle;
      }
    }


    let prerollURL = this.createPrerollURL(currentMediaDetail);
    let midrollRandomURL = this.createPrerollURL(currentMediaDetail,1) +'m&rt=vast_2.0&rnd='+Math.random() + "&pf=html5";
    prerollURL += 'p&rt=vast_2.0&rnd='+Math.random() + "&pf=html5";
    let DomainID = 0, udId='', siteGuid='';
    if (cookie.load(COOKIE.KALTURA_PLAYER_CONFIG_IDS) != '' && isset(cookie.load(COOKIE.KALTURA_PLAYER_CONFIG_IDS))) {
      let kalturaCookie = cookie.load(COOKIE.KALTURA_PLAYER_CONFIG_IDS);
      if (kalturaCookie.DomainId != '' && isset(kalturaCookie.DomainId))
        DomainID = kalturaCookie.DomainId;
      else
        DomainID = 0;

      if (kalturaCookie.UDID != '' && isset(kalturaCookie.UDID))
        udId = kalturaCookie.UDID;
      else
        udId = "";

      if (kalturaCookie.SiteGuid != '' && isset(kalturaCookie.SiteGuid))
        siteGuid = kalturaCookie.SiteGuid;
      else
        siteGuid = "";
    }
    let thumbval = currentMediaDetail.Pictures && currentMediaDetail.Pictures[2] ? currentMediaDetail.Pictures[2].URL: currentMediaDetail.Pictures[0].URL;
    this.setChannelLogo();
    kdp.setKDPAttribute("doubleClick","prerollUrl",prerollURL);
    kdp.setKDPAttribute("midrollPeriodic","tags",this.midrollPeriodicData(currentMediaDetail));
    kdp.setKDPAttribute("midrollPeriodic","sourceUrl",midrollRandomURL);
    kdp.setKDPAttribute("mediaProxy.entry","thumbnailUrl",thumbval);
    kdp.setKDPAttribute("youbora","param2",mediaId);
    // kdp.setKDPAttribute("youbora","extraparam3",mediaId);
    kdp.sendNotification("changeMedia", {
      "entryId": mediaData.data.assets.EntryId,
      "proxyData": {
        "initObj": {
          "Locale": {
            "LocaleLanguage": "",
            "LocaleCountry": "",
            "LocaleDevice": "",
            "LocaleUserState": "Unknown",
          },
          "Platform": "Web",
          "SiteGuid": siteGuid,
          "DomainID": DomainID,
          "UDID": udId,
          "ApiUser": "tvpapi_225",
          "ApiPass": "11111",
        },
        "MediaID": mediaId,
        "iMediaID": mediaId,
        "picSize": "900x1600",
        "mediaType": 0,
        "withDynamic": false,
        "config": {
          "flavorassets": {
            "filters": {
              "include": {
                "Format": [
                  "Web New",
                ],
              },
            },
          },
        },
      },
    });
  };

  playVideo = (mediaId, mediaData)=> {
    if (typeof window !== "undefined") {
      window.mw.setConfig("EmbedPlayer.DisableContextMenu", false);
      window.mw.setConfig('forceMobileHTML5', true);
    }
    let appBoyLogin=this.props.appBoyLogin;
    let prerollURL=this.createPrerollURL(mediaData.data.assets);

    let newFileVersion = '';
    let midrollRandomURL = this.createPrerollURL(mediaData.data.assets,1)+'m&rt=vast_2.0&rnd='+Math.random() + "&pf=html5";
    prerollURL += 'p&rt=vast_2.0&rnd='+Math.random() + "&pf=html5";

    let DomainID = 0, udId='', siteGuid='';
    const playerData = mediaData.data.assets;
    firstPlayChangedData = playerData;

    if (cookie.load(COOKIE.KALTURA_PLAYER_CONFIG_IDS) != '' && isset(cookie.load(COOKIE.KALTURA_PLAYER_CONFIG_IDS))) {
      let kalturaCookie = cookie.load(COOKIE.KALTURA_PLAYER_CONFIG_IDS);
      if (kalturaCookie.DomainId != undefined && kalturaCookie.DomainId != '' && isset(kalturaCookie.DomainId))
        DomainID = kalturaCookie.DomainId;
      else
        DomainID = 0;

      if (kalturaCookie.UDID != undefined && kalturaCookie.UDID != '' && isset(kalturaCookie.UDID))
        udId = kalturaCookie.UDID;
      else
        udId = "";

      if (kalturaCookie.SiteGuid != undefined && kalturaCookie.SiteGuid != '' && isset(kalturaCookie.SiteGuid))
        siteGuid = kalturaCookie.SiteGuid;
      else
        siteGuid = "";
    }

    let that =this;

    let distinctCookieLoad = cookie.load(COOKIE.MIXPANEL_DISTINCT_ID, JSON);
    let distinct_id = distinctCookieLoad ? JSON.parse(distinctCookieLoad) : '';

    let thumbval = mediaData.data.assets.Pictures && mediaData.data.assets.Pictures[2] ? mediaData.data.assets.Pictures[2].URL: mediaData.data.assets.Pictures[0].URL;

    let youboraObject = {
        "username": distinct_id,
        "extraParams":{
            "param1": "PWA",
            "param2": mediaId,
            "param3": distinct_id,
        }

        // "param1": "PWA",
        // "param2": mediaId,
        // "param3": distinct_id,
        // "param4": mediaId,
        // "extraparam1": "PWA",
        // "extraparam3": mediaId,
      };
      // if(process.env.NODE_ENV != 'production' && process.env.NODE_ENV != 'uat' ){
      //   youboraObject.accountName =  "viacom18dev"
      // }

      if(process.env.NODE_ENV != 'production'){
        youboraObject.accountCode =  "viacom18dev"
      }


    if (typeof window !== "undefined") {
      window.kWidget.embed({
        "targetId": "kaltura_player",
        "wid": "_",
        "uiconf_id": "32626763",
        "googleAnalytics": {
          "plugin": true,
          "position": "before",
          "urchinCode": "UA-75234699-1",
          "trackEventMonitor": "trackFunc",
          "customEvent": "firstPlay,doPlay,doStop,doSeek,changeMedia, relatedVideoSelect,playerReady,NoSourcesCustomError,mediaError,embedPlayerError,playbackComplete",
          "trackingCategory": "Video Playback Events",
          "optionalLabel": "{mediaProxy.entry.referenceId}|{mediaProxy.entry.name}|{mediaProxy.entry.id}|{configProxy.kw.id}|{configProxy.kw.uiConfId}",
          "anonymizeIp": false,
          "relativeTo": "video",
          "mediaErrorCategory": "Error events",
          "mediaErrorAction": "MediaError event",
          "embedPlayerErrorCategory": "Error events",
          "embedPlayerErrorAction": "Streaming Error",
          "sendRefId": true,
        },
        "flashvars": {
          "scrubber": {
            "plugin": true,
            "sliderPreview": true,
            "showOnlyTime": false
          },
          "doubleClick": {
            prerollUrl: prerollURL,
          },
          "EmbedPlayer.WebKitPlaysInline": true,
          'mediaProxy' : {
            'entry': {
              "thumbnailUrl": thumbval,
            },
          },
          "midrollPeriodic": {
            "tags": this.midrollPeriodicData(mediaData.data.assets),
            "sourceUrl": midrollRandomURL,
          },
          "audioSelector": {
            "plugin": false,
          },
          'autoPlay': false,
          'isLive': false,
          "youbora": youboraObject,
          "proxyData": {
            "initObj": {
              "Locale": {
                "LocaleLanguage": "",
                "LocaleCountry": "",
                "LocaleDevice": "",
                "LocaleUserState": "Unknown",

              },
              "Platform": "Web",
              "SiteGuid": siteGuid,
              "DomainID": DomainID,
              "UDID": udId,
              "ApiUser": "tvpapi_225",
              "ApiPass": "11111",
            },
            "MediaID": mediaId,
            "iMediaID": mediaId,
            "picSize": "900x1600",
            "mediaType": 0,
            "withDynamic": false,
            "config": {
              "flavorassets": {
                "filters": {
                  "include": {
                    "Format": [
                      "Tablet Main",
                    ],
                  },
                },
              },
            },
          },
        },
        "entry_id": mediaId,
        readyCallback:  (playerId) => {
          let kdp = document.getElementById(playerId);
          let kiframe = document.getElementById(playerId + '_ifp');
          let hola_script = document.createElement('script');
          hola_script.src = '//client.h-cdn.com/loader.js?customer=viacom_ind';
          hola_script.type = 'text/javascript';
          kiframe.contentWindow.document.head.appendChild(hola_script);
          kdp.addJsListener( 'firstPlay', (event) => {
            if(typeof window !== "undefined") {
              window.fbq('track', 'AddToCart', {
                content_type: 'product',
                content_ids: this.props.mediaId,
              });
              mixPanel.callFirstPlay(firstPlayChangedData,timerCallKalturaFirstTime);
              appboyEvent.isFirstPlay(firstPlayChangedData, appBoyLogin);
            }
          });

          kdp.kBind( 'playerReady', (event) => {
            $("#kaltura_player_ifp") && $("#kaltura_player_ifp").contents().find(".watermark") ? $("#kaltura_player_ifp").contents().find(".watermark").attr("style","width:60px !important"): false;
            this.setChannelLogo();
            cookie.save(COOKIE.PLAYER, JSON.stringify(0));
          });

          kdp.addJsListener("MediaHit", function(){
            that.callMediaHit(firstPlayChangedData,appBoyLogin);
          });
          kdp.kBind( 'playerPlayEnd', function(event){
            $("#current-video-holder").nextAll('.card-item').first().click();
            cookie.save(COOKIE.PLAYER,JSON.stringify(0));
            // mixPanel.videoPlayEnd(playerData,appBoyLogin);
            // mixPanel.playerPlayEnd(playerData,appBoyLogin);
          });
          kdp.kBind( 'doPlay', function(event){
           cookie.save(COOKIE.PLAYER,JSON.stringify(1));
           // mixPanel.doPlay(playerData, appBoyLogin);
          });
           // kdp.kBind( 'playerReady', function(event){
           // // mixPanel.playerReady(playerData,appBoyLogin);
           // cookie.save(COOKIE.PLAYER,JSON.stringify(0));
           // });
          kdp.kBind( 'embedPlayerError', function(event){
            cookie.save(COOKIE.PLAYER,JSON.stringify(0));
            // mixPanel.embedPlayerError(playerData,appBoyLogin);
          });
          kdp.kBind( 'onAdPlay', function(event){
            cookie.save(COOKIE.PLAYER,JSON.stringify(1));
          });

           /*kdp.kBind( 'mediaReady', function(event){
           mixPanel.mediaReady(playerData,appBoyLogin);
           });
           kdp.kBind( 'relatedVideoSelect', function(event){
           mixPanel.relatedVideoSelect(playerData,appBoyLogin);
           });
           kdp.kBind( 'noSourcesCustomError', function(event){
           mixPanel.noSourcesCustomError(playerData,appBoyLogin);
           });
           kdp.kBind( 'mediaError', function(event){
           mixPanel.mediaError(playerData,appBoyLogin);
           });*/
           kdp.kBind( 'embedPlayerError', function(event){
           cookie.save(COOKIE.PLAYER,JSON.stringify(0));
           //mixPanel.embedPlayerError(playerData,appBoyLogin);
           });
           /*kdp.kBind( 'playbackComplete', function(event){
           mixPanel.playbackComplete(playerData,appBoyLogin);
           });
           kdp.kBind( 'playerPaused', function(event){
           mixPanel.videoPaused(playerData,appBoyLogin);
           });
           kdp.kBind( 'playerUpdatePlayhead', function(event){
           //mixPanel.playerPlayHead(playerData,appBoyLogin);
           });
           kdp.addJsListener("playbackComplete", function(){
           mixPanel.playbackComplete(playerData,appBoyLogin);
           });*/


           /*let ContentTypeMetas = getSeriesValueFromListOfMapsForKey(playerData.Metas, 'ContentType');
           mixPanel.videoStart(playerData.URL,ContentTypeMetas,appBoyLogin);*/

        },
      });
    }
  };


  render() {
    return (
      <div className='player-wrapper'>
        <div id='kaltura_player' >
        </div>
        {/*This is hidden data to render player component when the user click any new video form the play list
         and more show/movie on voot section form video playback page.*/}
        <div className='hiddenDiv'>
          {this.props.mediaId}
        </div>
      </div>
    );
  }
}

PlayerInner.propTypes = {
  mediaId: React.PropTypes.string.isRequired,
  playerData: React.PropTypes.object.isRequired,
  data: React.PropTypes.object,
  appBoyLogin: React.PropTypes.object,
  config: React.PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const mapStateToProps = (state, ownProps,) => {
  return {
    config: state.config
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(PlayerInner);
