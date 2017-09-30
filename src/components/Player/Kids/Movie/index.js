import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import Player from '../../index';
import playListEndpoints from '../../../../endpoints/playList';
import {getMediaInfo,relatedMedia} from '../../../../actions/playlist';
import {clearMediaInfo} from '../../../../actions/getMediaInfo';
import {clearRelatedMedia} from '../../../../actions/getRelatedMedia';
import {setLoader} from '../../../../actions/loader';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MetasDesc from '../../../CardComponent/MetasDesc';
import {getImageUrlMap, getSeriesValueFromListOfMapsForKey} from '../../../../util/getShowDetails';
import CardTopHeading from '../../../CardComponent/CardTopHeading';
import Loader from '../../../Loader';
import {getMediaInfoValueByKey,createMarkup} from '../../../../util/helper';
import KidsCarouselTray from '../../../Tray/KidsCarouselTray';
import {formDataGenerator} from '../../../../util/formDataGenerator';
import {site_name, get_domain_url} from '../../../../constants/seoConstant';
import appBoyEvent from '../../../../util/appboyEvent';


import {KIDS} from '../../../../constants';

class KidsMoviePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: 0,
      mediaId: this.props.params.mediaId,
      mediaMainTitle: this.props.params.mediaMainTitle,
    };
  }

  componentWillMount() {
    // this.props.clearMediaInfo();
    this.initialize(this.props);
  }

  componentDidMount = () => {
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'KidsMoviePlayerPageView');
    }
  };

  componentWillReceiveProps(nextProps) {
    const {mediaInfo} = nextProps;
    this.setState({
      mediaInfo,
      routeParams: nextProps.routeParams,
    });
    if(this.props.routeParams != nextProps.routeParams){
      this.setState({
        mediaId: nextProps.params.mediaId,
        mediaMainTitle: nextProps.params.mediaMainTitle,
      });
      /* Initialize component *********/
      this.initialize(nextProps);
    }
  }

  componentWillUnmount() {
    this.props.clearMediaInfo();
    this.props.clearRelatedMedia();
  }

  createMarkup(props){
    if(typeof window === "undefined"){
      // for server side rendering
      const {mediaInfo:{data:{assets}}} = props;
      this.markup = {};
      if(typeof assets !== "undefined") {
        this.markup = {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": getMediaInfoValueByKey(assets.Metas,"MovieMainTitle"),
          "description": getMediaInfoValueByKey(assets.Metas,"ContentSynopsis"),
          "duration": parseInt(getMediaInfoValueByKey(assets.Metas,"ContentDuration"))/60,
          "genre": [
            getMediaInfoValueByKey(assets.Tags,"Genre"),
          ],
          "inLanguage": getMediaInfoValueByKey(assets.Metas,"Language"),
          "thumbnail": getImageUrlMap(assets.Pictures).imgURLS,
          "thumbnailUrl": getImageUrlMap(assets.Pictures).imgURLS,
          "uploadDate": assets.CreationDate,
          "url": props.location.pathname,
          "contentUrl": props.location.pathname,
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
              "url": props.location.pathname,
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
      }
    }
  }

  initialize(props){
    const mediaId = props.params.mediaId;
    let params = {mediaId: mediaId};
    if (!props.loader.load) {
      props.setLoader(true);
    }
    props.getMediaInfo(params,function () {
      props.setLoader(false);
    });
    createMarkup(props);
    let data = [
      {
        "key": "mediaId",
        "value": mediaId,
      },
      {
        "key": "reqMediaTypes",
        "value": 390,
      },
      {
        "key": "pageSize",
        "value": 5,
      },
      {
        "key": "pageIndex",
        "value": 0,
      },
      {
        "key": "isKids",
        "value": 1,
      },
    ];
    props.getRelatedMedia(playListEndpoints.relatedMedia, formDataGenerator(data));
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

  render(){
    let metaObj, mediaInfo = this.props.mediaInfo.data.assets;
    if (mediaInfo) {
      metaObj = {MediaTypeID: mediaInfo.MediaTypeID, MediaID: mediaInfo.MediaID};
      mediaInfo.Metas.map((item, index)=> {
        if (['ContentType', 'SBU', 'ReleaseYear', 'ContentDuration', 'ContentSynopsis', 'MovieMainTitle', 'TelecastDate'].indexOf(item.Key) != -1) {
          metaObj[item.Key] = item.Value;
        }
      });
      metaObj.Genre = getSeriesValueFromListOfMapsForKey(mediaInfo.Tags, "Genre");
      metaObj.Language = getSeriesValueFromListOfMapsForKey(mediaInfo.Tags, 'Language');
      metaObj.MediaTypeID = mediaInfo.MediaTypeID;
    }
    let moreKidsMovies, moreKidsMoviesHeading ={title:'More Kids Movies', mName:'kidsAllMovies'} ;

    if(this.props.relatedMedia && this.props.relatedMedia.data && this.props.relatedMedia.data.assets){
      let map = {list : this.props.relatedMedia.data.assets, type: 'relatedMedia'};
      moreKidsMovies =  (<KidsCarouselTray aspectRatio='16x9' item={map} noCardTopHeading />);
    }

    return (
      <div className='kids-video'>
        {this.renderSeoTags()}
        <Loader {...this.props} />
        {createMarkup(this.markup,"kids movie video page")}
        <div>
          {mediaInfo && <Player mediaId={this.state.mediaId} playerData={this.props.mediaInfo} appBoyLogin={this.props.login} />}
          {metaObj && <MetasDesc metas={metaObj} noShout isKids customClass='text-danger' />}
        </div>

        <div className='more-kids-shows-container'>
          <div className='kidsCharacters'>
            <CardTopHeading items={moreKidsMoviesHeading} />
          </div>
          {moreKidsMovies}
        </div>

      </div>
    );
  }
}

KidsMoviePlayer.propTypes = {
  getMediaInfo: React.PropTypes.func.isRequired,
  clearMediaInfo: React.PropTypes.func.isRequired,
  clearRelatedMedia: React.PropTypes.func.isRequired,
  getRelatedMedia: React.PropTypes.func.isRequired,
  mediaInfo:  React.PropTypes.object.isRequired,
  setLoader: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
  routeParams: React.PropTypes.object,
  loader: PropTypes.object.isRequired,
  relatedMedia: PropTypes.object,
  location: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMediaInfo: bindActionCreators(getMediaInfo, dispatch),
    clearMediaInfo: bindActionCreators(clearMediaInfo, dispatch),
    clearRelatedMedia: bindActionCreators(clearRelatedMedia, dispatch),
    getRelatedMedia: bindActionCreators(relatedMedia, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    mediaInfo: state.getMediaInfo.mediaInfo,
    relatedMedia: state.playlist.getRelatedMedia,
    loader: state.loader,
    playlist: state.playlist, // for server side rendering
  };
};

KidsMoviePlayer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

KidsMoviePlayer.need = [
  getMediaInfo,
];

export default connect(mapStateToProps, mapDispatchToProps)(KidsMoviePlayer);
