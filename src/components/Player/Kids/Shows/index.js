import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import Player from '../../index';
import showsEndpoints from '../../../../endpoints/shows';
import {getMediaInfo,relatedMedia} from '../../../../actions/playlist';
import {clearMediaInfo} from '../../../../actions/getMediaInfo';
import {formDataGenerator} from '../../../../util/formDataGenerator';
import {setLoader, setSmallLoader} from '../../../../actions/loader';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MetasDesc from '../../../CardComponent/MetasDesc';
import {getImageUrlMap, getSeriesValueFromListOfMapsForKey} from '../../../../util/getShowDetails';
import DefaultCard from '../../../CardLayout/DefaultCard';
import CardHeading from '../../../CardComponent/CardHeading';
import KidsRelatedMedia from '../../../AllEpisodesListing/Kids/RelatedMedia';
import clone from 'clone';
import {getMediaInfoValueByKey,createMarkup} from '../../../../util/helper';
import Loader from '../../../Loader';
import {
  episodeSearchMediaApiFilter,
  applyPageIndexFilter,
} from '../../../../util/mapingFilters';
import {getAllShowsEpisodesData, appendAllShowsEpisodesData, clearAllShowsEpisodesData} from '../../../../actions/kids';
import {KIDS} from '../../../../constants';
import {createRouteString} from '../../../../util/routeCreater';
import {dateFormat, timeFormat, episodeFormat} from '../../../../util/filters';
import {site_name, get_domain_url} from '../../../../constants/seoConstant';
import appBoyEvent from '../../../../util/appboyEvent';


const SEARCH_MEDIA_DEFAULT_FILTERS = clone(KIDS.ALL_EPISODES.SEARCH_MEDIA_DEFAULT_FILTERS);
let loadOnce = false;
class KidsShowPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: 0,
      filters: SEARCH_MEDIA_DEFAULT_FILTERS,
      seriesId: this.props.params.seriesId,
      episodeId: this.props.params.episodeId,
    };
  }

  componentWillMount() {
    this.props.clearMediaInfo();
    this.initialize(this.props);
  }

  componentDidMount = () => {
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'KidsShowPlayerPageView');

      //appboy.logCustomEvent
      //appBoyEvent.isVootKids(true);
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
        seriesId: nextProps.params.seriesId,
        episodeId: nextProps.params.episodeId,
      });
      /* Initialize component *********/
      this.initialize(nextProps);
    }
  }

  componentWillUnmount() {
    this.props.clearMediaInfo();
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
    const mediaId = props.params.episodeId;
    let params = {mediaId: mediaId};
    if (!props.loader.load) {
      props.setLoader(true);
    }
    props.getMediaInfo(params, function () {
      props.setLoader(false);
    });
    createMarkup(props);
    loadOnce = true;
  }

  routeTo = (show) => {
    const self =this, mediaId = self.state.seriesId, seriesMainTitle = getSeriesValueFromListOfMapsForKey(show.Metas, "RefSeriesTitle"),
      episodeMainTitle = getSeriesValueFromListOfMapsForKey(show.Metas, "EpisodeMainTitle"), showMediaId = show.MediaID;
    self.props.getMediaInfo({mediaId: showMediaId}, function () {
      self.context.router.push(`/kids/characters/${createRouteString(seriesMainTitle)}/${mediaId}/${createRouteString(episodeMainTitle).replace(/\?/g, '-')}/${showMediaId}`);
    });
  };

  loadMore = () => {
    const {appendAllShowsEpisodesData, setSmallLoader} = this.props;
    const {filters, toggle}=this.state;
    let filterArr = formDataGenerator(applyPageIndexFilter(filters));
    let params = showsEndpoints.searchMediaByAndOrList;
    setSmallLoader(true);
    params.successCallback = function () {
      setSmallLoader(false);
    };
    params.failureCallback = function () {
      setSmallLoader(false);
    };
    appendAllShowsEpisodesData(params, filterArr);
  };

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
    const {getAllShowsEpisodesData, smallLoader} = this.props;
    let metaObj, mediaInfo = this.props.mediaInfo.data.assets;
    let episodesCount = 0;
    let allEpisodes=this.props.allEpisodes, allEpisodesSection;
    let loadMoreEpisodes ;

    if (mediaInfo) {
      metaObj = {MediaTypeID: mediaInfo.MediaTypeID, MediaID: mediaInfo.MediaID};
      mediaInfo.Metas.map((item, index)=> {
        if (['EpisodeNo', 'ContentType', 'SBU', 'RefSeriesTitle', 'ReleaseYear', 'ContentDuration', 'ContentSynopsis', 'EpisodeMainTitle', 'TelecastDate'].indexOf(item.Key) != -1) {
          metaObj[item.Key] = item.Value;
        }
      });
      metaObj.language = getSeriesValueFromListOfMapsForKey(mediaInfo.Tags, 'Language');
      metaObj.MediaTypeID = mediaInfo.MediaTypeID;


      if (this.state.episodeId == mediaInfo.MediaID){
        if (loadOnce) {
          const seriesMainTitle = getSeriesValueFromListOfMapsForKey(mediaInfo.Metas, "RefSeriesTitle"),
            season = getSeriesValueFromListOfMapsForKey(mediaInfo.Metas, "RefSeriesSeason"),
            requestData = episodeSearchMediaApiFilter(SEARCH_MEDIA_DEFAULT_FILTERS, seriesMainTitle, season);
          getAllShowsEpisodesData(showsEndpoints.searchMediaByAndOrList, formDataGenerator(requestData));
          loadOnce = false;
        }
        if (allEpisodes.data && allEpisodes.data.length > 0) {
          let {toggle} = this.state;
          allEpisodesSection = allEpisodes.data.map((show, key) => {
            let items = {};
            if (toggle) {
              if (show.images) {
                items.mediaMainTitle = show.name;
                items.imgURLL = show.images[1].url;
                items.imgURLM = show.images[3].url;
                items.imgURLS = show.images[4].url;
                items.duration = show.metas.ContentDuration;
              }
            } else {
              if (show.Pictures) {
                items = getImageUrlMap(show.Pictures);
                items.seriesMainTitle = show.MediaName;
                items.duration = show.Duration * 1000;
              }
            }
            episodesCount = show.TotalItems;
            items.episodeNo = getSeriesValueFromListOfMapsForKey(show.Metas, "EpisodeNo");
            items.releaseYear = getSeriesValueFromListOfMapsForKey(show.Metas, "ReleaseYear");
            items.telecastDate = getSeriesValueFromListOfMapsForKey(show.Metas, "TelecastDate");
            items.language = getSeriesValueFromListOfMapsForKey(mediaInfo.Tags, 'Language');
            items.isKidsVideo = true;
            items.customTags = [
              !isNaN(items.episodeNo) ? episodeFormat(items.episodeNo) : items.episodeNo,
              (items.telecastDate ? (!isNaN(items.telecastDate) ? dateFormat(items.telecastDate) : items.telecastDate) : items.releaseYear),
              !isNaN(items.duration) ? timeFormat(items.duration) : items.duration,
            ];

            return (
              <div key={key} className='grid-view grid-2'>
                <DefaultCard aspectRatio='16x9' onClick={()=>this.routeTo(show)} data={show} key={key} items={items}
                             showPlayIcon isTitleMultiLine />
              </div>
            );
          });

          if (!smallLoader.load && allEpisodes.data.length < episodesCount) {
            loadMoreEpisodes = (
              <div className='section text-center'>
                <button className='load-more' onClick={this.loadMore}>Load More Episodes</button>
              </div>
            );
          }
        }
      }
    }

    return (
      <div className='kids-video'>
        {this.renderSeoTags()}
        {createMarkup(this.markup,"kids video page")}
        <div>
          <Loader {...this.props} />
          {mediaInfo && mediaInfo.MediaTypeName.toLowerCase() !== 'series' && <Player mediaId={this.state.episodeId} playerData={this.props.mediaInfo} appBoyLogin={this.props.login} />}
          {metaObj && <MetasDesc metas={metaObj} noShout isKids />}
        </div>
        <div className='kids-all-episodes-container'>
          <div className='top-heading'>
            <div className='heading-inner'>
              <CardHeading>
                <h2>Other Episodes</h2>
              </CardHeading>
            </div>
          </div>
          <div className='grid-container clearfix grid-shows'>
            {allEpisodesSection}
          </div>
          {loadMoreEpisodes}
          {smallLoader.load && <div className='small-loader'></div>}
        </div>

        <KidsRelatedMedia mediaId={this.state.seriesId} />
      </div>
    );
  }
}


KidsShowPlayer.need = [
  getMediaInfo,
];

KidsShowPlayer.propTypes = {
  getMediaInfo: React.PropTypes.func.isRequired,
  clearMediaInfo: React.PropTypes.func.isRequired,
  getRelatedMedia: React.PropTypes.func.isRequired,
  relatedMedia: React.PropTypes.object.isRequired,
  mediaInfo:  React.PropTypes.object.isRequired,
  setLoader: React.PropTypes.func.isRequired,
  setSmallLoader: PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
  routeParams: React.PropTypes.object,
  getAllShowsEpisodesData: PropTypes.func.isRequired,
  appendAllShowsEpisodesData: PropTypes.func.isRequired,
  clearAllShowsEpisodesData: PropTypes.func.isRequired,
  allEpisodes: PropTypes.object.isRequired,
  loader: PropTypes.object.isRequired,
  smallLoader: React.PropTypes.object.isRequired,
  location: PropTypes.object,
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMediaInfo: bindActionCreators(getMediaInfo, dispatch),
    clearMediaInfo: bindActionCreators(clearMediaInfo, dispatch),
    getRelatedMedia: bindActionCreators(relatedMedia, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
    setSmallLoader: bindActionCreators(setSmallLoader, dispatch),
    getAllShowsEpisodesData: bindActionCreators(getAllShowsEpisodesData, dispatch),
    appendAllShowsEpisodesData: bindActionCreators(appendAllShowsEpisodesData, dispatch),
    clearAllShowsEpisodesData: bindActionCreators(clearAllShowsEpisodesData, dispatch),
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    mediaInfo: state.getMediaInfo.mediaInfo,
    relatedMedia: state.playlist.getRelatedMedia,
    loader: state.loader,
    playlist: state.playlist, // for server side rendering
    allEpisodes: state.kids.allEpisodes,
    smallLoader: state.smallLoader,
  };
};
KidsShowPlayer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(KidsShowPlayer);
