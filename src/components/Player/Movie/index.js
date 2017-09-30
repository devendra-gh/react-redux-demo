import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Player from '../index';
import endpoints from '../../../endpoints/playList';
import {getMediaInfo, relatedMedia} from '../../../actions/playlist';
import {clearMediaInfo} from '../../../actions/getMediaInfo';
import {clearRelatedMedia} from '../../../actions/getRelatedMedia';
import {formDataGenerator} from '../../../util/formDataGenerator';
import {COOKIE} from '../../../constants';
import cookie from 'react-cookie';
import {scrollToTop, getMediaInfoValueByKey, createMarkup} from '../../../util/helper';
import PosterTray from '../../Tray/PosterTray';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MetasDesc from '../../CardComponent/MetasDesc';
import {setLoader} from '../../../actions/loader';
import Loader from '../../Loader';
import {getShoutList, getShoutByUser, makeShout,resetMakeShout} from '../../../actions/topShout';
import Modal from 'react-modal';
import SocialShare from '../../SocialShare';
import {getImageUrlMap} from '../../../util/getShowDetails';
import {site_name, get_domain_url} from '../../../constants/seoConstant';
import mixPanel from '../../../util/mixPanel';
import appBoyEvent from '../../../util/appboyEvent';

let self;

class MoviePlayer extends Component {
  constructor(props) {
    super(props);
    scrollToTop();
    this.state = {
      mediaId: this.props.params.mediaId,
      modalIsOpen: false,
      openSocialModal: false,
      shoutListContent: true,
      shoutByUser: {},
    };
    if (typeof window === "undefined") {
      // for server side rendering
      const {mediaInfo:{data:{assets}}, params:{season}} = this.props;
      if (typeof assets !== "undefined") {
        this.markup = {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": assets.MediaName,
          "description": getMediaInfoValueByKey(assets.Metas, "ContentSynopsis"),
          "duration": parseInt(getMediaInfoValueByKey(assets.Metas, "ContentDuration")) / 60,
          "url": get_domain_url() + this.props.location.pathname,
          "dateCreated": assets.StartDate,
          "genre": [
            getMediaInfoValueByKey(assets.Tags, "Genre"),
          ],
          "inLanguage": getMediaInfoValueByKey(assets.Metas, "Language"),
          "sameAs": get_domain_url() + this.props.location.pathname,
          "thumbnail": getImageUrlMap(assets.Pictures).imgURLS,
          "thumbnailUrl": getImageUrlMap(assets.Pictures).imgURLS,
          "uploadDate": assets.CreationDate,
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
        };
        // const current = playlist && playlist.data && playlist.data.assets && playlist.data.assets.current;
        // const top = playlist && playlist.data && playlist.data.assets && playlist.data.assets.top;
        let actor = [];
        let Character = getMediaInfoValueByKey(assets.Tags, "CharacterList");
        let CharacterList = Character.split && Character.split("|");
        if (CharacterList && CharacterList.length) {
          actor = CharacterList.map((val)=>({
            "@type": "Person",
            "name": val,
            "sameAs": get_domain_url() + this.props.location.pathname,
          }));
        }
        this.markupMoive = {
          "@context": "https://schema.org",
          "@type": "Movie",
          "name": assets.MediaName,
          "episodeNumber": "",
          "description": getMediaInfoValueByKey(assets.Metas, "ContentSynopsis"),
          "duration": parseInt(getMediaInfoValueByKey(assets.Metas, "ContentDuration")) / 60,
          "image": getImageUrlMap(assets.Pictures).imgURLS,
          "url": get_domain_url() + this.props.location.pathname,
          "dateCreated": assets.StartDate,
          "sameAs": get_domain_url() + this.props.location.pathname,
          "actor": actor,
          "director": [
            {
              "@type": "Person",
              "name": getMediaInfoValueByKey(assets.Tags, "MovieDirector"),
              "sameAs": get_domain_url() + this.props.location.pathname,
            },
          ],
          "releasedEvent": {
            "@type": "PublicationEvent",
            "name": "",
            "startDate": assets.StartDate,
          },
          "potentialAction": {
            "@type": "WatchAction",
            "target": {
              "@type": "EntryPoint",
              "inLanguage": getMediaInfoValueByKey(assets.Tags, "Language"),
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
          "thumbnailUrl": get_domain_url() + this.props.location.pathname,
        };
      }
    }
  }

  componentWillMount = () => {
    // this.props.clearMediaInfo();
    self = this;
    const {isLogin} = this.props.login;
    let data = [
      {
        "key": "mediaId",
        "value": this.state.mediaId,
      },
      {
        "key": "pageIndex",
        "value": 0,
      },
    ];
    if (isLogin) {
      let data = [
        {
          "key": "userKey",
          "value": this.props.login.data.ID,
        },
        {
          "key": "mediaId",
          "value": this.props.params.mediaId,
        },
      ];
      this.props.getShoutByUser(endpoints.shoutByUser, formDataGenerator(data));
    }
    if(!this.props.mediaInfo.data.assets || this.props.mediaInfo.data.assets.MediaID != this.props.params.mediaId){
      if(!this.props.loader)
        this.props.setLoader(true);
      this.props.getMediaInfo({mediaId: this.props.params.mediaId}, function () {
        self.props.setLoader(false);
      });
    }else {
      if(this.props.loader)
        this.props.setLoader(false);
    }
    this.props.getRelatedMedia(endpoints.relatedMedia, formDataGenerator(data));
    this.props.getShoutList(endpoints.shoutList);
  };

  componentDidMount = ()=>{
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'MoviePlayerPageView');
    }
  };

  componentWillReceiveProps(nextProps) {
    if(this.props.routeParams != nextProps.routeParams){
      this.setState({
        mediaId: nextProps.params.mediaId,
      });
      let data = [
        {
          "key": "mediaId",
          "value": nextProps.params.mediaId,
        },
        {
          "key": "pageIndex",
          "value": 0,
        },
      ];

      if(!this.props.mediaInfo.data.assets || this.props.mediaInfo.data.assets.MediaID != nextProps.params.mediaId){
        this.props.getMediaInfo({mediaId: nextProps.params.mediaId}, function () {
          self.props.setLoader(false);
        });
      }else {
        self.props.setLoader(false);
      }
      this.props.getRelatedMedia(endpoints.relatedMedia, formDataGenerator(data));
      const {isLogin} = nextProps.login;
      if(isLogin){
        let data = [
          {
            "key": "userKey",
            "value": nextProps.login.data.ID,
          },
          {
            "key": "mediaId",
            "value": nextProps.params.mediaId,
          },
        ];
        nextProps.getShoutByUser(endpoints.shoutByUser, formDataGenerator(data));
      }
    }

    if (nextProps.topShout.shoutList.data.list && nextProps.topShout.shoutByUser.data.assets) {
      if (nextProps.topShout.shoutByUser.data.assets.isUserShouted) {
        let shoutByUser = nextProps.topShout.shoutList.data.list.filter((item) => {
          if (nextProps.topShout.shoutByUser.data.assets.shoutName === item.name) {
            return item;
          }
        });
        this.setState({shoutByUser: shoutByUser[0]});
      }
      else{
        this.setState({shoutByUser:{}});
      }
    }

    if (nextProps.topShout.makeShout.isShouted) {
      this.setState({shoutListContent:true});
      this.props.resetMakeShout();
      this.closeModal();
    }
  }

  componentWillUnmount() {
    this.props.clearMediaInfo();
    this.props.clearRelatedMedia();
  }

  playVideo = ()=> {
    const kdp = document.getElementById('kaltura_player');
    if(typeof kdp === 'undefined' || kdp === null) {
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
    if (typeof kdp === 'undefined' || kdp === null) {
      return false;
    }
    else{
      if(cookie.load(COOKIE.PLAYER)!== '0') {
        kdp && kdp.sendNotification && kdp.sendNotification("doPause");
      }
      return true;
    }
  };

  openModal = () => {
    document.getElementsByTagName('body')[0].className = 'body-static';
    this.setState({modalIsOpen: true});
  };

  closeModal = () => {
    document.getElementsByTagName('body')[0].className = '';
    this.setState({modalIsOpen: false});
  };

  openSocialModal = () => {
    document.getElementsByTagName('body')[0].className = 'body-static';
    this.pauseVideo();
    this.setState({openSocialModal: true});
  };

  closeSocialModal = () => {
    document.getElementsByTagName('body')[0].className = '';
    this.setState({openSocialModal: false});
    this.playVideo();
  };

  shoutActionHandler = (item) => {
    const mediaData = this.props && this.props.mediaInfo && this.props.mediaInfo.data && this.props.mediaInfo.data.assets;
    const shoutName = item && item.name;
    mixPanel.shout(mediaData, shoutName);
    const {login:{data:{ID, Uid}}, params:{mediaMainTitle}} = this.props;

    const mediaName = mediaData && mediaData.MediaName;
    if(typeof window !== "undefined") {
      appBoyEvent.isMakeShoutOnMedia(Uid, mediaName, shoutName);
    }

    let makeShoutData = [
      {
        "key": "userKey",
        "value": ID,
      },
      {
        "key": "shoutId",
        "value": item.id,
      },
      {
        "key": "mediaId",
        "value": this.props.params.mediaId,
      },
    ];
    let topShoutData = [
      {
        "key": "mediaId",
        "value":this.props.params.mediaId,
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
    this.setState({shoutByUser: item});
    this.setState({shoutListContent:false});
    this.props.makeShout(endpoints.makeShout, formDataGenerator(makeShoutData), topShoutData, shoutByUserData);
  };

  shoutListHandler(list) {
    if (list) {
      return list.map((item) =>
        <li key={item.id}
            style={{background: item.color}}
            onClick={() => this.shoutActionHandler(item)}>
          <i className='icon-promo' style={{color: item.color}} />
          {item.name}
      </li>);
    }
  }

  renderSeoTags = () => {
    const {mediaInfo:{data:{assets}}} = this.props;
    if(typeof assets !== "undefined") {
      const props = {
        title: 'Watch Full Movie ' + assets.MediaName + ' Online for Free - Voot',
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
            content: 'Watch Full Movie ' + assets.MediaName + ' Online for Free - Voot',
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
            content: 'Watch Full Movie ' + assets.MediaName + ' Online for Free - Voot',
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
    return null;
  };

  render() {
    let metaObj = {}, toggleArr;
    if (typeof document !== "undefined") {
      toggleArr = document.getElementsByClassName('show-data').length;
    }
    let item = {
      mName: 'featuredMovies',
      title: 'More Movies on Voot',
      list: [],
    };
    let imgURLS = [];
    imgURLS = this.props.relatedMedia.data.assets && this.props.relatedMedia.data.assets.map((item, index) => {
        return {
          mId: item.MediaID,
          mediaType: item.MediaTypeID,
          imgURLL: item && item.Pictures && item.Pictures[11] && item.Pictures[11].URL,
          imgURLM: item && item.Pictures && item.Pictures[12] && item.Pictures[12].URL,
          imgURLS: item && item.Pictures && item.Pictures[13] && item.Pictures[13].URL,
          MediaName: item.MediaName,
        };
      });

    item.list = imgURLS;

    let mediaInfo = this.props.mediaInfo.data.assets;
    if (mediaInfo) {
      metaObj = {MediaTypeID: mediaInfo.MediaTypeID, MediaID: mediaInfo.MediaID};
      mediaInfo.Metas.map((item, index) => {
        if (['MovieMainTitle', 'ReleaseYear', 'ContentDuration', 'ContentSynopsis'].indexOf(item.Key) != -1) {
          metaObj[item.Key] = item.Value;
        }
      });
      mediaInfo.Tags.map((item, index) => {
        if (['Genre', 'Language'].indexOf(item.Key) != -1) {
          metaObj[item.Key] = item.Value;
        }
      });
    }
    const {openSignInModal, login:{isLogin}, topShout:{shoutList}} = this.props;
    const shoutListTypes = this.shoutListHandler(shoutList.data.list);
    let post = {};
    if (mediaInfo && mediaInfo.Pictures) {
      post = {
        imageurl: getImageUrlMap(mediaInfo.Pictures).imgURLL,
        description: metaObj.ContentSynopsis,
        showName: metaObj.RefSeriesTitle || mediaInfo.MediaName,
        title: '',
        //title: metaObj.RefSeriesTitle || mediaInfo.MediaName,
      };
    }
    // console.log('this.props.mediaInfo',this.props.mediaInfo);
    return (
      <div className='movie-video'><Loader {...this.props} />
        {this.renderSeoTags()}
        {createMarkup(this.markup, "Movie video page")}
        {createMarkup(this.markupMoive, "Movie video markupMoive page")}

        <div>
          {this.props.mediaInfo.data.assets && <Player mediaId={this.props.params.mediaId} playerData={this.props.mediaInfo} appBoyLogin={this.props.login} />}
          {metaObj &&  <MetasDesc
            metas={metaObj}
            isLogin={isLogin}
            openSignInModal={openSignInModal}
            openSocialModal={this.openSocialModal}
            openModal={this.openModal}
            shoutByUser={this.state.shoutByUser}
          />}
        </div>

        <div>
          {
            item.list &&
            <PosterTray aspectRatio='2x3' item={item} />
          }
        </div>

        <Modal isOpen={this.state.modalIsOpen} style={customStyles} contentLabel='Modal'>
          {
            this.state.shoutListContent
              ?
              <div className='filter-section shout-list-modal'>
                <button className='modal-close' onClick={this.closeModal}><i className='icon-cross'></i></button>
                <h2>{shoutList.data.shout_list_lable}</h2>
                <ul>
                  {
                    shoutListTypes
                  }
                </ul>
              </div>
              :
              <div className='shout-success' style={{backgroundColor: this.state.shoutByUser.color}}>
                <div>
                  <i className='icon-promo' style={{color: this.state.shoutByUser.color}} />
                  {this.state.shoutByUser.name}</div>
              </div>
          }
        </Modal>
        <Modal
          isOpen={this.state.openSocialModal}
          style={customStyles}
          contentLabel='Modal'
        >
          <div className='filter-section'>
            <SocialShare
              post={post}
              closeSocialModal={this.closeSocialModal}
              openSocialModal={this.openSocialModal}
              closeModal={this.closeSocialModal}
              mId={this.props.params && this.props.params.mediaId}
              mediaInfo={this.props.mediaInfo}
              isMovie
            />
          </div>
        </Modal>
      </div>
    );
  }
}

MoviePlayer.propTypes = {
  getMediaInfo: React.PropTypes.func.isRequired,
  clearMediaInfo: React.PropTypes.func.isRequired,
  clearRelatedMedia: React.PropTypes.func.isRequired,
  getRelatedMedia: React.PropTypes.func.isRequired,
  relatedMedia: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,
  mediaInfo: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  loader: React.PropTypes.object.isRequired,
  setLoader: React.PropTypes.func.isRequired,
  login: React.PropTypes.object.isRequired,
  topShout: React.PropTypes.object.isRequired,
  routeParams: React.PropTypes.object.isRequired,
  getShoutList: React.PropTypes.func.isRequired,
  makeShout: React.PropTypes.func.isRequired,
  openSignInModal: React.PropTypes.func.isRequired,
  getShoutByUser: React.PropTypes.func.isRequired,
  resetMakeShout: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMediaInfo: bindActionCreators(getMediaInfo, dispatch),
    clearMediaInfo: bindActionCreators(clearMediaInfo, dispatch),
    clearRelatedMedia: bindActionCreators(clearRelatedMedia, dispatch),
    getRelatedMedia: bindActionCreators(relatedMedia, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
    getShoutList: bindActionCreators(getShoutList, dispatch),
    getShoutByUser: bindActionCreators(getShoutByUser, dispatch),
    makeShout: bindActionCreators(makeShout, dispatch),
    resetMakeShout: bindActionCreators(resetMakeShout, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    mediaInfo: state.getMediaInfo.mediaInfo,
    relatedMedia: state.playlist.getRelatedMedia,
    loader: state.loader,
    login: state.authentication.login,
    topShout: state.topShout,
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

MoviePlayer.need = [
  getMediaInfo,
];

export default connect(mapStateToProps, mapDispatchToProps)(MoviePlayer);
