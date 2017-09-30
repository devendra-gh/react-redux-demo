import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import Player from '../../index';
import showEndpoints from '../../../../endpoints/shows';
import {getChannelMedias, clearChannelMedias} from '../../../../actions/channelMediasAction';
import {setLoader} from '../../../../actions/loader';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getImageUrlMap, getSeriesValueFromListOfMapsForKey} from '../../../../util/getShowDetails';
import {getMediaInfoValueByKey,createMarkup} from '../../../../util/helper';
import MetasDesc from '../../../CardComponent/MetasDesc';
import CardHeading from '../../../CardComponent/CardHeading';
import DefaultCard from '../../../CardLayout/DefaultCard';
import clone from 'clone';
import KidsCarouselTray from '../../../Tray/KidsCarouselTray';
import {dateFormat, timeFormat, episodeFormat} from '../../../../util/filters';
import {KIDS} from '../../../../constants';
import {createRouteString} from '../../../../util/routeCreater';
import MoreKidsCluster from '../../../AllEpisodesListing/Kids/MoreKidsCluster';
import {getPaginatedData} from '../../../../util/pagination';
import Loader from '../../../Loader';
import {site_name, get_domain_url} from '../../../../constants/seoConstant';
import appBoyEvent from '../../../../util/appboyEvent';

let isCurrentVideo = false;
class KidsClusterPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: 0,
      cName : this.props.params.cName,
      episodeMainTitle : this.props.params.episodeMainTitle,
      mediaId : this.props.params.mediaId,
      currentMedia : undefined,
      pagination : {
        pageSize : 10,
        pageIndex: 0,
        currentArray : [],
        completeArray : [],
      },
      sectionTitle :'',
      mName : 'kidsClusters',
    };
  }

  componentWillMount() {
    this.initialize(this.props);
  }

  componentDidMount = () => {
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'KidsClusterPlayerPageView');

      //appboy.logCustomEvent
      //appBoyEvent.isVootKids(true);
    }
  };

  componentWillReceiveProps(nextProps) {
    if(this.props.routeParams != nextProps.routeParams){
      this.setState({
        cName : nextProps.params.cName,
        episodeMainTitle : nextProps.params.episodeMainTitle,
        mediaId : nextProps.params.mediaId,
        sectionTitle :'',
      });
      /* Initialize component *********/
      this.initialize(nextProps);
    }
  }

  componentWillUnmount(){
    this.props.clearChannelMedias();
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
    const queryParams = {cName : props.params.cName, mName : this.state.mName}, self = this;
    if (!props.loader.load) {
      props.setLoader(true);
    }
    props.getChannelMedias(queryParams, function () {
      const {channelMedias, loader} = self.props;
      let currentMedia, channelMediaList,array =[], array2 = [], allChannelMedia;
      self.setState({
        pagination : {
          pageSize : 10,
          pageIndex: 0,
          currentArray : [],
          completeArray : [],
        },
      });
      if(channelMedias.data.list){
        channelMediaList = channelMedias.data.list;
        for(let k in channelMediaList){
          let current = channelMediaList[k];
          if(currentMedia){
            array.push(current);
          }else {
            if(current.MediaID == self.state.mediaId){
              array.push(current);
              currentMedia = current;
            }
            else
              array2.push(current);
          }
        }
        allChannelMedia = array.concat(array2);

        let paginatedData = getPaginatedData(allChannelMedia, self.state.pagination.pageIndex, self.state.pagination.pageSize);
        self.setState({
          currentMedia : currentMedia,
          sectionTitle : channelMedias.data.title,
          pagination : {
            pageSize : self.state.pagination.pageSize,
            pageIndex: paginatedData.pageIndex,
            currentArray : paginatedData.resultantArray,
            completeArray : allChannelMedia,
          },
        });
      }
      props.setLoader(false);
    }, function () {
      props.setLoader(false);
    });
  }

  setIsCurrentVideoToTrue = () => {
    isCurrentVideo = true;
  };

  getIsCurrentVideoValue = () => {
    return isCurrentVideo ;
  };

  resetIsCurrentVideoToFalse= () => {
    isCurrentVideo = false;
  };

  routeTo(show, isCurrent) {
    if (isCurrent){
      this.setIsCurrentVideoToTrue();
    }
    const cName = this.state.cName, mediaId = show.MediaID,
      episodeMainTitle = getSeriesValueFromListOfMapsForKey(show.Metas, "EpisodeMainTitle");
    this.context.router.push(`/kids/clusters/${cName}/${createRouteString(episodeMainTitle)}/${mediaId}`);
  }

  loadMore(){
    let paginatedData = this.state.pagination;
    let output = getPaginatedData(paginatedData.completeArray, paginatedData.pageIndex, paginatedData.pageSize);
    this.setState({
      pagination : {
        pageSize : paginatedData.pageSize,
        completeArray : paginatedData.completeArray,
        pageIndex: output.pageIndex,
        currentArray : output.resultantArray,
      },
    });
  }

  renderSeoTags = () => {
    const {channelMedias} = this.props;
    let list;
    if(channelMedias && channelMedias.data && channelMedias.data.list){
      list = channelMedias.data.list;
    }
    if(typeof list !== "undefined" && list.length && list[0]) {
      const assets = list[0];
      const title = assets.MediaName + 'Nursery Rhymes (E) Episode 1 | Watch Full Videos of ' + getMediaInfoValueByKey(assets.Metas, "RefSeriesTitle") +'Yoboho Serial Online Free at Voot';
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

  render(){
    const {loader} = this.props;
    const {toggle} = this.state;
    let paginatedData = this.state.pagination, currentMedia = this.state.currentMedia, currentMetaObj,
      sectionTitle = this.state.sectionTitle, otherMediaForCluster, loadMoreEpisodes;
    if(currentMedia){
      currentMetaObj = {MediaTypeID: currentMedia.MediaTypeID, MediaID: currentMedia.MediaID};
      currentMedia.Metas.map((item, index)=> {
        if (['EpisodeNo', 'ContentType', 'SBU', 'RefSeriesTitle', 'ReleaseYear', 'ContentDuration', 'ContentSynopsis', 'EpisodeMainTitle', 'TelecastDate'].indexOf(item.Key) != -1) {
          currentMetaObj[item.Key] = item.Value;
        }
      });
      currentMetaObj.language = getSeriesValueFromListOfMapsForKey(currentMedia.Tags, 'Language');

      otherMediaForCluster = paginatedData.currentArray.map((show, index) => {
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
        items.episodeNo = getSeriesValueFromListOfMapsForKey(show.Metas, "EpisodeNo");
        items.releaseYear = getSeriesValueFromListOfMapsForKey(show.Metas, "ReleaseYear");
        items.telecastDate = getSeriesValueFromListOfMapsForKey(show.Metas, "TelecastDate");
        items.language = getSeriesValueFromListOfMapsForKey(show.Tags, 'Language');
        items.isKidsVideo = true;
        if(items.telecastDate.toString() == '0') {
          items.customTags = [
            !isNaN(items.episodeNo) ? episodeFormat(items.episodeNo) : items.episodeNo,
            !isNaN(items.duration) ? timeFormat(items.duration) : items.duration,
          ];
        }else {
          items.customTags = [
            !isNaN(items.episodeNo) ? episodeFormat(items.episodeNo) : items.episodeNo,
            (items.telecastDate ? (!isNaN(items.telecastDate) ? dateFormat(items.telecastDate) : items.telecastDate) : items.releaseYear),
            !isNaN(items.duration) ? timeFormat(items.duration) : items.duration,
          ];
        }


        if(index == 0)
          return (
            <div id='current-video-holder' key={index} className='grid-view grid-2'>
              <DefaultCard aspectRatio='16x9' onClick={()=>this.routeTo(show, true)} data={show} key={index} items={items}
                           showPlayIcon isTitleMultiLine customClass='current-video' />
            </div>
          );
        else
          return (
            <div key={index} className='grid-view grid-2'>
              <DefaultCard aspectRatio='16x9' onClick={()=>this.routeTo(show, false)} data={show} key={index} items={items}
                           showPlayIcon isTitleMultiLine />
            </div>
          );
      });

      if (!loader.load && paginatedData.currentArray.length < paginatedData.completeArray.length) {
        loadMoreEpisodes = (
          <div className='section text-center'>
            <button className='load-more' onClick={()=>this.loadMore()}>Load More</button>
          </div>
        );
      }
    }

    let mediaInfoForKalturaPlayer = {data :{assets: currentMedia}};

    return (
      <div id='cluster-player-page' className='kids-video'>
        {this.renderSeoTags()}
        <Loader {...this.props} />
        <div>
          {currentMedia && <Player mediaId={currentMedia.MediaID} playerData={mediaInfoForKalturaPlayer} appBoyLogin={this.props.login}
                                   addNowPlayingHanding resetIsCurrentVideoToFalse={this.resetIsCurrentVideoToFalse} getIsCurrentVideoValue={this.getIsCurrentVideoValue} />}
          {currentMetaObj && <MetasDesc metas={currentMetaObj} noShout isKids />}
        </div>

        <div className='kids-all-episodes-container'>
          <div className='top-heading'>
            <div className='heading-inner'>
              <CardHeading>
                <h4>{sectionTitle}</h4>
              </CardHeading>
            </div>
          </div>
          <div className='grid-container clearfix grid-shows'>
            {otherMediaForCluster}
          </div>

          {loadMoreEpisodes}
          {loader.load && <div className='small-loader'></div>}
        </div>

        <MoreKidsCluster />
      </div>
    );
  }
}

KidsClusterPlayer.need = [
  getChannelMedias,
];

KidsClusterPlayer.propTypes = {
  getChannelMedias: PropTypes.func.isRequired,
  clearChannelMedias: PropTypes.func.isRequired,
  channelMedias: PropTypes.object.isRequired,
  aspectRatio: PropTypes.string,
  params: PropTypes.object.isRequired,
  routeParams: React.PropTypes.object,
  loader: React.PropTypes.object.isRequired,
  location: React.PropTypes.object,
};

KidsClusterPlayer.contextTypes = {
  router: PropTypes.object.isRequired,
  clearChannelMedias: PropTypes.func,
  getChannelMedias: PropTypes.func,
  setLoader: PropTypes.func,
  loader: PropTypes.object,
};
const mapDispatchToProps = (dispatch) => {
  return {
    getChannelMedias: bindActionCreators(getChannelMedias, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
    clearChannelMedias: bindActionCreators(clearChannelMedias, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    channelMedias: state.channelMedias,
    loader: state.loader,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(KidsClusterPlayer);
