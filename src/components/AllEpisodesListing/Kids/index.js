import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import showsEndpoints from '../../../endpoints/shows';
import {KIDS} from '../../../constants';
import {getMediaInfo, clearMediaInfo} from '../../../actions/getMediaInfo';
import {formDataGenerator} from '../../../util/formDataGenerator';
import {setLoader, setSmallLoader} from '../../../actions/loader';
import Loader from '../../Loader';
import clone from 'clone';
import {getAllShowsEpisodesData, appendAllShowsEpisodesData, clearAllShowsEpisodesData, setKidsPosterRoute, clearKidsPosterRoute} from '../../../actions/kids';
import EpisodeHeadCard from '../../../components/CardLayout/EpisodeHeadCard';
import DefaultCard from '../../../components/CardLayout/DefaultCard';
import {
  getImageUrlMap,
  getShowDescription,
  getKidsShowMetaTags,
  getSeriesValueFromListOfMapsForKey,
} from '../../../util/getShowDetails';
import CardHeading from '../../CardComponent/CardHeading';
import KidsRelatedMedia from '../../AllEpisodesListing/Kids/RelatedMedia';
import {createRouteString} from '../../../util/routeCreater';
import {
  episodeSearchMediaApiFilter,
  applyPageIndexFilter,
} from '../../../util/mapingFilters';
import {timeFormat} from '../../../util/filters';
import {site_name, get_domain_url} from '../../../constants/seoConstant';
import {getMediaInfoValueByKey,createMarkup} from '../../../util/helper';
import appBoyEvent from '../../../util/appboyEvent';


const SEARCH_MEDIA_DEFAULT_FILTERS = clone(KIDS.ALL_EPISODES.SEARCH_MEDIA_DEFAULT_FILTERS);
let loadOnce;
class KidsAllShowsEpisodes extends Component {
  constructor(props) {
    super(props);
    const {routeParams: {mediaId}} = this.props;
    this.state = {
      toggle: 0,
      filters: SEARCH_MEDIA_DEFAULT_FILTERS,
      mediaId,
      mediaInfo: {},
    };
  }

  componentWillMount() {
    this.initialize(this.props);
  }

  componentDidMount = () => {
    if(typeof window !== "undefined") {
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
        mediaID : '',
        mediaInfo : {},
      });
      /***Clearing previous poster route for new data*******/
      const {clearKidsPosterRoute} = this.props;
      clearKidsPosterRoute();
      /***Initialize component *********/
      this.initialize(nextProps);
    }
  }

  componentWillUnmount() {
    const {clearAllShowsEpisodesData, clearKidsPosterRoute, clearMediaInfo} = this.props;
    this.setState({
      toggle : 0,
      mediaId : null,
      mediaInfo : {},
    });
    clearMediaInfo();

    clearAllShowsEpisodesData();
    /***Clearing poster route*******/
    clearKidsPosterRoute();
  }

  initialize(props){
    const {getMediaInfo, loader, setLoader, routeParams: {mediaId}, mediaInfo,clearAllShowsEpisodesData} = props;
    let queryParams = {mediaId}, self = this;
    // clearAllShowsEpisodesData();
    if (!loader.load){
      setLoader(true);
      queryParams.successCallback = function () {
        setLoader(false);
      };
      queryParams.failureCallback = function () {
        setLoader(false);
      };
    }
    this.setState({
      // filters : self.state.filters,
      toggle : self.state.toggle,
      mediaId,
      mediaInfo : getMediaInfo(queryParams),
    });
    loadOnce = true;
  }

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

  routeTo = (show) => {
    const mediaId = this.state.mediaId, seriesMainTitle = getSeriesValueFromListOfMapsForKey(show.Metas, "RefSeriesTitle"),
      episodeMainTitle = getSeriesValueFromListOfMapsForKey(show.Metas, "EpisodeMainTitle"), showMediaId = show.MediaID;
    this.context.router.push(`/kids/characters/${createRouteString(seriesMainTitle)}/${mediaId}/${createRouteString(episodeMainTitle).replace(/\?/g, '-')}/${showMediaId}`);
  };

  renderSeoTags = () => {
    const {mediaInfo:{data:{assets}}} = this.props;
    if(typeof assets !== "undefined") {
      const title = assets.MediaName+ ' | Watch Full Videos of  ' + getMediaInfoValueByKey(assets.Metas, "SeriesMainTitle") + ' , Nickelodeon Serial Online Free at Voot';
      const description = 'Watch ' + getMediaInfoValueByKey(assets.Metas, "SeriesMainTitle") + ' Online. Get Episode story & videos of all Episodes of ' + assets.MediaName + ', Nickelodeon Serial Online Free at Voot';
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
            content: description,
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
            content: getMediaInfoValueByKey(assets.Metas, "SeriesSynopsis"),
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
    return null;
  };

  routeToFirstPlayableContent = (route) => {
    const {episodes} = route;

    if(episodes)
      this.context.router.push(episodes);
  };

  render() {
    const {smallLoader, routeParams: {mediaId}, getAllShowsEpisodesData} = this.props;
    const {mediaInfo: {data}}=this.state;

    let items = {}, mediaTypeID = "", metas = [], episodesCount = 0, relatedMediaSection, mediaInfoAssests = false,
      allEpisodes=this.props.allEpisodes, allEpisodesSection, allEpisodesHeading = {title: 'All Episodes'},
      loadMoreEpisodes ;

    if (data && data.assets!=undefined) {
      if(this.state.mediaId && (this.state.mediaId == data.assets.MediaID)){
        mediaInfoAssests = data.assets;
        mediaTypeID = data.assets.mediaTypeID;
        items = getImageUrlMap(mediaInfoAssests.Pictures);
        items.desc = getShowDescription(mediaInfoAssests.Metas);
        items.seriesMainTitle = mediaInfoAssests.MediaName;
        items.tags = getKidsShowMetaTags(mediaInfoAssests);
        metas = mediaInfoAssests.Metas;
        episodesCount = mediaInfoAssests.assetsCount ? mediaInfoAssests.assetsCount.episodesCount : 0;
        if (loadOnce) {
          const seriesMainTitle = getSeriesValueFromListOfMapsForKey(mediaInfoAssests.Metas, "SeriesMainTitle"),
            season = getSeriesValueFromListOfMapsForKey(mediaInfoAssests.Metas, "Season"),
            requestData = episodeSearchMediaApiFilter(SEARCH_MEDIA_DEFAULT_FILTERS, seriesMainTitle, season);
          getAllShowsEpisodesData(showsEndpoints.searchMediaByAndOrList, formDataGenerator(requestData), ()=>{
            const {allEpisodes:{data}, setKidsPosterRoute} = this.props;
            if(data && data[0]) {
              let show = data[0];
              const mediaId = this.state.mediaId, seriesMainTitle = getSeriesValueFromListOfMapsForKey(show.Metas, "RefSeriesTitle"),
                episodeMainTitle = getSeriesValueFromListOfMapsForKey(show.Metas, "EpisodeMainTitle"), showMediaId = show.MediaID;
              let url =(`/kids/characters/${createRouteString(seriesMainTitle)}/${mediaId}/${createRouteString(episodeMainTitle).replace(/\?/g, '-')}/${showMediaId}`);
              setKidsPosterRoute(url);
            }
          });
          loadOnce = false;
        }

        relatedMediaSection= <KidsRelatedMedia mediaId={this.props.routeParams.mediaId} />;

        if(allEpisodes.data && allEpisodes.data.length >0){
          const {toggle} = this.state;
          allEpisodesSection = allEpisodes.data.map((show, key) => {
            let items={};
            if(toggle){
              if(show.images){
                items.mediaMainTitle = getSeriesValueFromListOfMapsForKey(show.Metas, "EpisodeMainTitle");
                items.imgURLL = show.images[1].url;
                items.imgURLM = show.images[3].url;
                items.imgURLS = show.images[4].url;
                items.duration = show.metas.ContentDuration;
                items.episodeNo = getSeriesValueFromListOfMapsForKey(show.Metas, "EpisodeNo");
                items.telecastDate =getSeriesValueFromListOfMapsForKey(show.Metas, "ReleaseYear");
              }
            }else {
              if(show.Pictures){
                items = getImageUrlMap(show.Pictures);
                items.seriesMainTitle = getSeriesValueFromListOfMapsForKey(show.Metas, "EpisodeMainTitle");
                items.duration = show.Duration * 1000;
                items.episodeNo = getSeriesValueFromListOfMapsForKey(show.Metas, "EpisodeNo");
                items.telecastDate = getSeriesValueFromListOfMapsForKey(show.Metas, "ReleaseYear");
              }
            }
            items.isKidsVideo = true;
            items.language = getSeriesValueFromListOfMapsForKey(mediaInfoAssests.Metas, "Language");
            items.customTags = [
              items.language, !isNaN(items.duration) ? timeFormat(items.duration) : items.duration,
            ];
            return (
              <div key={key} className='grid-view grid-2'>
                <DefaultCard aspectRatio='16x9' onClick={()=>this.routeTo(show)} data={show} key={key} items={items} showPlayIcon isTitleMultiLine />
              </div>
            );
          });

          if(!smallLoader.load  && allEpisodes.data.length < episodesCount){
            loadMoreEpisodes = (
              <div className='section text-center'>
                <button className='load-more' onClick={this.loadMore}>Load More Episodes</button>
              </div>
            );
          }
        }
      }
    }

    const {posterRoute} = this.props;
    let playIcon = false;
    if(posterRoute.episodes)
      playIcon = true;
    else
      playIcon = false;

    return (
      <div className='shows-landing clearfix'>
        {this.renderSeoTags()}
        <Loader {...this.props} />
        <div className='section tray-container'>
          <EpisodeHeadCard aspectRatio='16x9' items={items} noPlayIcon={playIcon} isTitleMultiLine={false} mediaId={mediaId}
                           noSocialIcons isKidsShowPage noShout
                           data={posterRoute}
                           onClick={this.routeToFirstPlayableContent} />
        </div>

        <div className='kids-all-episodes-container'>
          <div className='top-heading'>
            <div className='heading-inner'>
              <CardHeading>
                <h2>All Episodes</h2>
              </CardHeading>
            </div>
          </div>
          <div className='grid-container clearfix grid-shows'>
            {allEpisodesSection}
          </div>
          {loadMoreEpisodes}
          {
            smallLoader.load && <div className='small-loader'></div>
          }
        </div>
        {relatedMediaSection}
      </div>
    );
  }
}


KidsAllShowsEpisodes.need = [
  getMediaInfo,
];

const mapDispatchToProps = (dispatch) => {
  return {
    getMediaInfo: bindActionCreators(getMediaInfo, dispatch),
    clearMediaInfo: bindActionCreators(clearMediaInfo, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
    setSmallLoader: bindActionCreators(setSmallLoader, dispatch),
    getAllShowsEpisodesData: bindActionCreators(getAllShowsEpisodesData, dispatch),
    appendAllShowsEpisodesData: bindActionCreators(appendAllShowsEpisodesData, dispatch),
    clearAllShowsEpisodesData: bindActionCreators(clearAllShowsEpisodesData, dispatch),
    setKidsPosterRoute: bindActionCreators(setKidsPosterRoute, dispatch),
    clearKidsPosterRoute: bindActionCreators(clearKidsPosterRoute, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    params: ownProps.params,
    loader: state.loader,
    smallLoader: state.smallLoader,
    mediaInfo: state.getMediaInfo.mediaInfo,
    allEpisodes: state.kids.allEpisodes,
    posterRoute: state.kids.posterRoute,
  };
};

KidsAllShowsEpisodes.propTypes = {
  params: PropTypes.object.isRequired,
  routeParams: React.PropTypes.object,
  loader: PropTypes.object.isRequired,
  smallLoader: PropTypes.object.isRequired,
  mediaInfo: PropTypes.object.isRequired,
  getMediaInfo: PropTypes.func.isRequired,
  clearMediaInfo: PropTypes.func.isRequired,
  setLoader: PropTypes.func.isRequired,
  setSmallLoader: PropTypes.func.isRequired,
  getAllShowsEpisodesData: PropTypes.func.isRequired,
  appendAllShowsEpisodesData: PropTypes.func.isRequired,
  clearAllShowsEpisodesData: PropTypes.func.isRequired,
  setKidsPosterRoute: PropTypes.func.isRequired,
  clearKidsPosterRoute: PropTypes.func.isRequired,
  allEpisodes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  posterRoute: PropTypes.object.isRequired,
};


KidsAllShowsEpisodes.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(KidsAllShowsEpisodes);
