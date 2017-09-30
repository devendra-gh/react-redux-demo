import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Player from '../index';
import LazyLoad from 'react-lazyload';
import endpoints from '../../../endpoints/playList';
import {clipDataGetInfo, clearClipMediaInfo} from '../../../actions/getClipData';
import {playlist} from '../../../actions/playlist';
import PlayList from '../PlayList';
import {formDataGenerator} from '../../../util/formDataGenerator';
import CarouselTray from '../../../components/Tray/CarouselTray';
import {setLoader} from '../../../actions/loader';
import Loader from '../../Loader';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {site_name, get_domain_url} from '../../../constants/seoConstant';
// 1
import ShowsEpisodesShortsTab from '../../../components/AllEpisodesListing/Shows/ShowsEpisodesShortsTab';
import mixPanel from '../../../util/mixPanel';

import MetasDesc from '../../CardComponent/MetasDesc';
import {scrollToTop,getMediaInfoValueByKey,createMarkup} from '../../../util/helper';
import {getImageUrlMap} from '../../../util/getShowDetails';
import SocialUnit from '../../SocialUnit';
import Modal from 'react-modal';
import SocialShare from '../../SocialShare';
import {MEDIA_TYPE} from '../../../constants/media';
import {searchAsset} from '../../../actions/searchAssetAction';
import {checkPropertyInArray} from '../../../util/mapingFilters';
// import customStyles from '../../../general/modalCustomStyle';
import {getShoutList, getShoutByUser, makeShout, resetMakeShout} from '../../../actions/topShout';
import cookie from 'react-cookie';
import {COOKIE} from '../../../constants';
import appBoyEvent from '../../../util/appboyEvent';

let refSeriesId = '', self, isCurrentVideo = false;
class ShowsPlayer extends Component {
  constructor(props) {
    super(props);
    scrollToTop();
    this.state={
      mediaId:this.props.params && this.props.params.mediaId ? this.props.params.mediaId:false,
      preMediaId:this.props.params && this.props.params.mediaId ? this.props.params.mediaId:false,
      modalIsOpen: false,
      shoutListContent : true,
      shoutByUser: {},
      openSocialModal: false,
      metaObj:{},
      refSeriesId:null,
    };
    this.markup = {};
    this.markupTVEpisode = {};

  }
  componentWillMount=()=>{
    this.props.clearClipMediaInfo();
    self = this;
    this.props.setLoader(true);
    this.props.setClipData({mediaId: this.props.params.mediaId}, function () {
      self.props.setLoader(false);
    });

    const {isLogin} = this.props.login;
    let data = [];
    if(isLogin){
      let data = [
        {
          "key": "userKey",
          "value": this.props.login.data.ID,
        },
        {
          "key": "mediaId",
          "value": this.props.params && this.props.params.mediaId ? this.props.params.mediaId:false,
        },
      ];
      this.props.getShoutByUser(endpoints.shoutByUser, formDataGenerator(data));
    }

    this.props.getShoutList(endpoints.shoutList);

    if(typeof window === "undefined"){
      // for server side rendering
      const {params:{season},playlist:{playlist}} = this.props;
      //const{mediaInfo:{data:{assets}}}=this.props.getClipData;

      const assets = this.props.getClipData &&
        this.props.getClipData.mediaInfo &&
        this.props.getClipData.mediaInfo.data &&
        this.props.getClipData.mediaInfo.data.assets;

      if(typeof assets !== "undefined") {
        this.markup = {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": getMediaInfoValueByKey(assets.Metas,"EpisodeMainTitle"),
          "description": getMediaInfoValueByKey(assets.Metas,"ContentSynopsis"),
          "duration": parseInt(getMediaInfoValueByKey(assets.Metas,"ContentDuration"))/60,
          "genre": [
            getMediaInfoValueByKey(assets.Tags,"Genre"),
          ],
          "inLanguage": getMediaInfoValueByKey(assets.Metas,"Language"),
          "thumbnail": getImageUrlMap(assets.Pictures).imgURLS,
          "thumbnailUrl": getImageUrlMap(assets.Pictures).imgURLS,
          "uploadDate": assets.CreationDate,
          "url": get_domain_url() + this.props.location.pathname,
          "contentUrl": get_domain_url() + this.props.location.pathname,
          "playerType": "HTML5 Flash",
          "releasedEvent": {
            "@type": "PublicationEvent",
            "startDate": assets.StartDate,
            "location": {
              "@type": "Country",
              "name": "IN",
            },
          },
          "potentialAction": {
            "@type": "ViewAction",
            "target": {
              "inLanguage": getMediaInfoValueByKey(assets.Metas,"Language"),
              "url": get_domain_url() + this.props.location.pathname,
              "actionPlatform": [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform",
                "http://schema.org/IOSPlatform",
                "http://schema.org/AndroidPlatform",
              ],
            },
            "expectsAcceptanceOf": {
              "@type": "Offer",
              "availabilityStarts": assets.StartDate,
              "availabilityEnds": assets.StartDate,
              "category": "free",
              "eligibleRegion": {
                "@type": "Country",
                "name": "IN",
              },
            },
          },
        };
        const current = playlist && playlist.data && playlist.data.assets && playlist.data.assets.current;
        const top = playlist && playlist.data && playlist.data.assets && playlist.data.assets.top;
        let actor = [];
        if(current && current.tags && current.tags.ContributorList) {
          actor = current.tags.ContributorList.map((val)=>({
            "@type": "Person",
            "name": val,
            "sameAs": get_domain_url() + this.props.location.pathname,
          }));
          this.markupTVEpisode = {
            "@context": "https://schema.org",
            "@type": "TVEpisode",
            "name": current.name,
            "episodeNumber": current.metas.EpisodeNo,
            "description": getMediaInfoValueByKey(assets.Metas, "ContentSynopsis"),
            "url": get_domain_url() + this.props.location.pathname,
            "sameAs": get_domain_url() + this.props.location.pathname,
            "actor": actor,
            "partOfSeason": {
              "@type": "TVSeason",
              "seasonNumber": current.metas && current.metas.RefSeriesSeason,
            },
            "partOfSeries": {
              "@type": "TVSeries",
              "name": current.metas && current.metas.RefSeriesTitle,
              "sameAs": get_domain_url() + this.props.location.pathname,
            },
            "releasedEvent": {
              "@type": "PublicationEvent",
              "name": current.metas && current.metas.RefSeriesTitle,
              "startDate": assets.StartDate,
            },
            "potentialAction": {
              "@type": "WatchAction",
              "target": {
                "@type": "EntryPoint",
                "inLanguage": getMediaInfoValueByKey(assets.Metas, "Language"),
                "url": get_domain_url() + this.props.location.pathname,
                "actionPlatform": [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform",
                  "http://schema.org/IOSPlatform",
                  "http://schema.org/AndroidPlatform",
                ],
              },
              "expectsAcceptanceOf": {
                "@type": "Offer",
                "availabilityStarts": assets.StartDate,
                "availabilityEnds": assets.StartDate,
                "category": "free",
                "eligibleRegion": {
                  "@type": "Country",
                  "name": "IN",
                },
              },
            },
            "image": {
              "@type": "ImageObject",
              "contentUrl": current.thumbnail,
            },
          };
        }
      }
    }

  };

  componentDidMount = ()=>{
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'ShowsPlayerPageView');
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.topShout.shoutList.data.list && nextProps.topShout.shoutByUser.data.assets) {
      if(nextProps.topShout.shoutByUser.data.assets.isUserShouted){
        let shoutByUser = nextProps.topShout.shoutList.data.list.filter((item) => {
          if(nextProps.topShout.shoutByUser.data.assets.shoutName === item.name){
            return item;
          }
        });
        this.setState({shoutByUser:shoutByUser[0]});
      }
      else{
        this.setState({shoutByUser:{}});
      }
    }

    if(!nextProps.login.isLogin){
      this.setState({shoutByUser:{}});
    }

    if(nextProps.topShout.makeShout.isShouted){
      this.setState({shoutListContent:true});
      this.props.resetMakeShout();
      this.closeModal();
    }

  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.mediaId != this.props.params.mediaId) {
      this.setState({
        mediaId:this.props.params && this.props.params.mediaId ? this.props.params.mediaId:false,
      });
      let data = [
        {
          "key": "mediaId",
          "value": this.props.params && this.props.params.mediaId ? this.props.params.mediaId:false,
        },
        {
          "key": "pageIndex",
          "value": 0,
        },
      ];

      this.props.setClipData({mediaId: this.props.params.mediaId}, function () {
        self.props.setLoader(false);
      });

      this.props.getPlayList({mediaId:this.props.params.mediaId});
      // condition for update shout feature if user is login and changes the new content to play.
      const {isLogin} = this.props.login;
      if(isLogin){
        let data = [
          {
            "key": "userKey",
            "value": this.props.login.data.ID,
          },
          {
            "key": "mediaId",
            "value": this.props.params && this.props.params.mediaId ? this.props.params.mediaId:false,
          },
        ];
        this.props.getShoutByUser(endpoints.shoutByUser, formDataGenerator(data));
      }
    }
  }

  componentWillUnmount = ()=>{
    this.props.clearClipMediaInfo();
    this.props.setLoader(false);
    refSeriesId = '';
  };
  whatsUpSection=()=>{

  };

  setIsCurrentVideoToTrue = () => {
    // console.log('setting to true');
    isCurrentVideo = true;
  };

  getIsCurrentVideoValue = () => {
    return isCurrentVideo ;
  };

  resetIsCurrentVideoToFalse= () => {
    // console.log('setting to false');
    isCurrentVideo = false;
  };

  playVideo = ()=> {
    const kdp = document.getElementById('kaltura_player');
    if(typeof kdp == 'undefined') {
      return false;
    }else{
      if(cookie.load(COOKIE.PLAYER)!== '0') {
        kdp.sendNotification("doPlay");
      }
      return true;
    }
  };
  pauseVideo=()=> {
    const kdp = document.getElementById('kaltura_player');
    if (typeof kdp == 'undefined') {
      return false;
    }
    else{
      if(cookie.load(COOKIE.PLAYER)!=='0') {
        kdp && kdp.sendNotification && kdp.sendNotification("doPause");
      }

      return true;
    }
  };

  openSocialModal=()=>{
    document.getElementsByTagName('body')[0].className = 'body-static';
    this.pauseVideo();
    this.setState({openSocialModal: true});
  };
  closeSocialModal=()=>{
    document.getElementsByTagName('body')[0].className = '';
    this.setState({openSocialModal: false});
    this.playVideo();
  };
  openModal = () => {
    this.pauseVideo();
    document.getElementsByTagName('body')[0].className = 'body-static';
    this.setState({modalIsOpen: true});
  };

  closeModal = () => {
    document.getElementsByTagName('body')[0].className = '';
    this.setState({modalIsOpen: false});
    this.playVideo();
  };

  shoutActionHandler = (shoutByUser)=>{
    let mediaData;
    if(this.props.getClipData.mediaInfo && this.props.getClipData.mediaInfo.data && this.props.getClipData.mediaInfo.data.assets){
      mediaData = this.props.getClipData.mediaInfo.data.assets;
    }
    const shoutName = shoutByUser && shoutByUser.name;
    mixPanel.shout(mediaData, shoutName);
    let refSeriesId='';
    if(this.props.params && this.props.params.refSeriesId && this.props.params.refSeriesId!=='undefined'){
      refSeriesId=this.props.params.refSeriesId;
    }else {
      if(this.props.getClipData.searchAssets.data && this.props.getClipData.searchAssets.data.assets){
        refSeriesId=this.props.getClipData.searchAssets.data.assets[0].id;
      }
    }
    const {login:{data:{ID, Uid}}, params:{name}} = this.props;

    const RefSeriesTitle = mediaData && mediaData.Metas && getMediaInfoValueByKey(mediaData.Metas, 'RefSeriesTitle');
    if(typeof window !== "undefined") {
      appBoyEvent.isMakeShoutOnMedia(Uid, shoutName, RefSeriesTitle);
    }

    let makeShoutData = [
      {
        "key": "userKey",
        "value": ID,
      },
      {
        "key": "shoutId",
        "value": shoutByUser.id,
      },
      {
        "key": "mediaId",
        "value": this.props.params && this.props.params.mediaId ? this.props.params.mediaId:false,
      },
      {
        "key": "tvSeriesId",
        "value": refSeriesId,
      },
    ];
    let topShoutData = [
      {
        "key": "mediaId",
        "value":this.props.params && this.props.params.mediaId ? this.props.params.mediaId:false,
      },
    ];
    let shoutByUserData = [
      {
        "key": "userKey",
        "value": ID,
      },
      {
        "key": "mediaId",
        "value": this.props.params.mediaId,
      },
    ];
    this.setState({shoutByUser});
    this.setState({shoutListContent:false});
    this.props.makeShout(endpoints.makeShout, formDataGenerator(makeShoutData),topShoutData, shoutByUserData);
  };

  shoutListHandler = (list)=>{
    if(list){
      return list.map((item)=> <li key={item.id} style={{background: item.color}} onClick={() =>this.shoutActionHandler(item)}><i className='icon-promo' style={{color: item.color}} />{item.name}</li>);
    }
  };

  renderSeoTags = () => {
    if(this.props.getClipData.mediaInfo && this.props.getClipData.mediaInfo.data && this.props.getClipData.mediaInfo.data.assets){
      const assets = this.props.getClipData.mediaInfo.data.assets;
      if(typeof assets !== "undefined") {
        const title = assets.MediaName + ' telecasted on ' + assets.StartDate + ' | Watch Online, Full Episodes and Videos of' + assets.MediaName + ', Colors Hindi TV Serial Online Free at Voot';
        const props = {
          title,
          meta: [
            {
              name: 'google-play-app',
              content: 'app-id=com.tv.v18.viola',
            },
            {
              name: 'robots',
              content: 'index, follow',
            },
            {
              name: 'title',
              content: title,
            },
            {
              name: 'description',
              content: getMediaInfoValueByKey(assets.Metas, "ContentSynopsis"),
            },
            {
              name: 'keywords',
              content: getMediaInfoValueByKey(assets.Tags, "Keywords"),
            },
            {
              property: 'og:url',
              content: get_domain_url() + this.props.location.pathname,
            },
            {
              property: 'og:title',
              content: 'Watch Full Movie ' + assets.MediaName + ' Online for Free - Voot',
            },
            {
              property: 'og:image',
              content: getImageUrlMap(assets.Pictures).imgURLS,
            },
            {
              property: 'og:description',
              content: getMediaInfoValueByKey(assets.Metas, "ContentSynopsis"),
            },
            {
              property: 'og:site_name',
              content: site_name,
            },
            {
              property: 'twitter:title',
              content: title,
            },
            {
              property: 'twitter:image',
              content: getImageUrlMap(assets.Pictures).imgURLS,
            },
            {
              property: 'twitter:url',
              content: get_domain_url() + this.props.location.pathname,
            },
          ],
        };
        return (<Helmet {...props} />);
      }
    }
    return null;
  };


  render() {

// 2
// please dont delete this commented code.

    let clipRelatedData = this.props.getClipData.relatedMedia &&
    this.props.getClipData.relatedMedia.data &&
    this.props.getClipData.relatedMedia.data.assets ?
      this.props.getClipData.relatedMedia.data.assets:false;

    let clipMediaInfo = this.props.getClipData.mediaInfo &&
    this.props.getClipData.mediaInfo.data &&
    this.props.getClipData.mediaInfo.data.assets ?
      this.props.getClipData.mediaInfo.data.assets:false;

    let clipSearchAssets = this.props.getClipData.searchAssets &&
    this.props.getClipData.searchAssets.data &&
    this.props.getClipData.searchAssets.data.assets ?
      this.props.getClipData.searchAssets.data.assets:false;


    // data to pass new component on playlist

    let data = {
      mediaId: null,
      season: '',
      seriesMainTitle: '',
    };
    let metasArray=[];

    let assetsCount={
      clipsCount:0,
      episodesCount: 0,
    };

    let metaObj = {}, mediaInfoForKalturaPlayer = {data :{assets: clipMediaInfo}},  post = {};

    if (clipMediaInfo && clipMediaInfo.Metas) {
      metasArray = clipMediaInfo.Metas;
      metaObj = {MediaTypeID: clipMediaInfo.MediaTypeID, MediaID: clipMediaInfo.MediaID};
      clipMediaInfo.Metas.map((item, index)=>{
        if(['EpisodeNo','ContentType','SBU', 'RefSeriesTitle', 'ReleaseYear', 'ContentDuration', 'ContentSynopsis', 'EpisodeMainTitle', 'TelecastDate'].indexOf(item.Key) != -1) {
          metaObj[item.Key] = item.Value;
        }
      });
      if(clipMediaInfo.Pictures){
        post = {
          imageurl:getImageUrlMap(clipMediaInfo.Pictures).imgURLL,
          description: metaObj.ContentSynopsis,
          showName: metaObj.RefSeriesTitle,
          title: metaObj.EpisodeMainTitle,
          //title: metaObj.EpisodeMainTitle,
        };
      }
    }

    if(clipSearchAssets){
      data={
        mediaId:clipSearchAssets && clipSearchAssets[0] && clipSearchAssets[0].id ?clipSearchAssets[0].id:false,
        season:clipSearchAssets && clipSearchAssets[0] && clipSearchAssets[0].metas.Season ? clipSearchAssets[0].metas.Season:false,
        seriesMainTitle:clipSearchAssets && clipSearchAssets[0] && clipSearchAssets[0].metas.SeriesMainTitle ? clipSearchAssets[0].metas.SeriesMainTitle:false,
      };
    }

    const {openSignInModal, topShout:{shoutList}} = this.props;

    const shoutListTypes = this.shoutListHandler(shoutList.data.list);

    // creation of redirection URL for clicking on show detail button on Video play back page.
    let redirectUrl='';

    if(this.props.routeParams) {
      let refSeriesSeason = '';
      let mediaMainTitle= '';

      if(clipMediaInfo && clipMediaInfo.Metas){
        clipMediaInfo.Metas && clipMediaInfo.Metas.map((item, index)=>{
          if(['RefSeriesSeason'].indexOf(item.Key) != -1) {
            refSeriesSeason = item.Value;
          }
          if(['RefSeriesTitle'].indexOf(item.Key) != -1) {
            mediaMainTitle = item.Value;
          }
        });
      }

      if(clipSearchAssets){
        refSeriesId=clipSearchAssets[0] && clipSearchAssets[0].id;
        //this.setState({refSeriesId});
      }

      if(this.props.routeParams.name && this.props.routeParams.refSeriesSeason && this.props.routeParams.refSeriesId){
        redirectUrl =`/shows/${this.props.routeParams.name}/${this.props.routeParams.refSeriesSeason}/${this.props.routeParams.refSeriesId}`;
      }else if(mediaMainTitle && refSeriesSeason && refSeriesId){
        redirectUrl =`/shows/${mediaMainTitle.replace(/ /g, "-").toLowerCase()}/${refSeriesSeason}/${refSeriesId}`;
      }
    }

      return (
        <div className='shows-video'> <Loader {...this.props} />
          {createMarkup(this.markup,"Show video page")}
          {createMarkup(this.markupTVEpisode,"Show video markupTVEpisode page")}
          {this.renderSeoTags()}
          <div>
            {clipMediaInfo && <Player mediaId={this.props.params.mediaId} playerData={mediaInfoForKalturaPlayer} appBoyLogin={this.props.login}
                                      addNowPlayingHanding resetIsCurrentVideoToFalse={this.resetIsCurrentVideoToFalse} getIsCurrentVideoValue={this.getIsCurrentVideoValue} />}
            {refSeriesId && <SocialUnit
              openSocialModal={this.openSocialModal}
              openSignInModal={openSignInModal}
              openModal={this.openModal}
              tvSeriesId={refSeriesId}
              shoutByUser={this.state.shoutByUser}
              redirectUrl={redirectUrl}
              mediaId={this.props.params.mediaId}
              seriesMainTitle={data.seriesMainTitle}
            />
            }
            <MetasDesc metas={metaObj} />
          </div>
          <div>
            <LazyLoad>
              <PlayList mId={this.props.params.mediaId} setIsCurrentVideoToTrue={this.setIsCurrentVideoToTrue} />
            </LazyLoad>
          </div>



          {/*3*/}

          {/*new section to playlist*/}
          {data.mediaId && metasArray.length > 0 && assetsCount ?
            <ShowsEpisodesShortsTab params={data} metas={metasArray} assetsCount={assetsCount} />:false
          }
          {/*<div>*/}
          {/*{item.list && <CarouselTray aspectRatio='16x9' item={item} />}*/}
          {/*</div>*/}

          <Modal isOpen={this.state.modalIsOpen} contentLabel='Modal' style={customStyles}>
            {
              this.state.shoutListContent
                ?
                <div className='filter-section shout-list-modal'>
                  <button className='modal-close' onClick={this.closeModal}><i className='icon-cross' /></button>
                  <h2>{shoutList.data.shout_list_lable}</h2>
                  <ul>
                    {
                      shoutListTypes
                    }
                  </ul>
                </div>
                :
                <div className='shout-success' style={{backgroundColor: this.state.shoutByUser.color}} >
                  <div><i className='icon-promo' style={{color: this.state.shoutByUser.color}} />{this.state.shoutByUser.name}</div>
                </div>
            }
          </Modal>
          <Modal
            isOpen={this.state.openSocialModal}
            style={customStyles}
            contentLabel='Modal'
          >
            {clipMediaInfo &&  <SocialShare
              post={post}
              closeSocialModal={this.closeSocialModal}
              openSocialModal={this.openSocialModal}
              closeModal={this.closeSocialModal}
              mId={this.props.params.mediaId}
              mediaInfo={mediaInfoForKalturaPlayer}
            />}

          </Modal>
        </div>
      );
  }
}


ShowsPlayer.propTypes = {
  clearClipMediaInfo: React.PropTypes.func.isRequired,
  playlist: React.PropTypes.object.isRequired,
  setLoader: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
  openSignInModal: React.PropTypes.func.isRequired,
  getShoutList: React.PropTypes.func.isRequired,
  topShout: React.PropTypes.object.isRequired,
  login: React.PropTypes.object.isRequired,
  getShoutByUser: React.PropTypes.func.isRequired,
  makeShout: React.PropTypes.func.isRequired,
  routeParams: React.PropTypes.object,
  resetMakeShout: React.PropTypes.func.isRequired,
  getPlayList: React.PropTypes.func,
  searchAsset: React.PropTypes.func.isRequired,
  setClipData: React.PropTypes.func.isRequired,
  getClipData: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,
};


ShowsPlayer.need = [
  clipDataGetInfo,
  playlist,
  // setClipData,
];

const mapDispatchToProps = (dispatch) => {
  return {
    getPlayList: bindActionCreators(playlist, dispatch),
    clearClipMediaInfo: bindActionCreators(clearClipMediaInfo, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
    getShoutList: bindActionCreators(getShoutList, dispatch),
    getShoutByUser: bindActionCreators(getShoutByUser, dispatch),
    makeShout: bindActionCreators(makeShout, dispatch),
    resetMakeShout: bindActionCreators(resetMakeShout, dispatch),
    searchAsset: bindActionCreators(searchAsset, dispatch),
    setClipData: bindActionCreators(clipDataGetInfo, dispatch),
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    loader: state.loader,
    topShout: state.topShout,
    login: state.authentication.login,
    searchAssetData: state.searchAsset,
    getClipData: state.clipData,
    playlist: state.playlist, // for server side rendering
  };
};

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(230, 230, 230, 0.95)',
    zIndex: '999',
  },
  content: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    border: 'none',
    background: 'transparent',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '0px',
    outline: 'none',
    padding: '0px',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowsPlayer);
