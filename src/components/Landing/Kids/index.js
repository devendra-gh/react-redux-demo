import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setLoader} from '../../../actions/loader';
import {home} from '../../../actions/kids';
import endpoints from '../../../endpoints/kids';
import showEndpoints from '../../../endpoints/shows';
import Helmet from 'react-helmet';
import KidsTray from '../../Tray/KidsTray';
import PosterTray from '../../Tray/PosterTray';
import NormalTray from '../../Tray/NormalTray';
import CarouselTray from '../../Tray/CarouselTray';
import MultiTray from '../../Tray/MultiTray';
import TabNavigation from '../../Navigation/TabNav';
import CardHeading from '../../CardComponent/CardHeading';
import Loader from '../../Loader';
import DefaultCard from '../../CardLayout/DefaultCard';
import PaperRipple from 'react-paper-ripple';
import {getKidsHomeData, clearKidsHomeErrors, resetKidsHomeData} from '../../../actions/kids';
import EpisodeDefaultCard from '../../CardLayout/EpisodeDefaultCard';
import {getChannelMedias, clearChannelMedias} from '../../../actions/channelMediasAction';
import {createRouteString} from '../../../util/routeCreater';
import {getSeriesValueFromListOfMapsForKey} from '../../../util/getShowDetails';
import {getColorClassForKidsCircularTile} from '../../../util/kidsUtils';
import {site_name, get_domain_url} from '../../../constants/seoConstant';
import InfiniteScroll from 'react-infinite-scroller';
import appBoyEvent from '../../../util/appboyEvent';


let self;
class Kids extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCount: 0,
    };
  }

  componentWillMount = () => {
    self = this;
    const {setLoader, loader, kidsHome, getKidsHomeData, resetKidsHomeData} = this.props;
    resetKidsHomeData();
    if (!loader.load) {
      setLoader(true);
    }
    let queryParams = {pageIndex: 1}, callback = {};
    callback.successCallback = function () {
      let totalCount = self.props.kidsHome.data ? self.props.kidsHome.data[0]['total_item_count'] : 0;
      self.setState({
        totalCount: totalCount,
      });
      setLoader(false);
    };
    callback.failureCallback = function () {
      setLoader(false);
    };
    getKidsHomeData(queryParams, callback);

  };

  componentDidMount = () => {



    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'kidsPageView');


      //appboy.logCustomEvent('Voot-Kids', {'on-kids-page': 'true'});


      //appboy.logCustomEvent
      appBoyEvent.isVootKids(true);
    }
  };

  componentWillUnmount() {
    const {resetKidsHomeData} = this.props;
    resetKidsHomeData();
  }

  getKidsShowPageURI(slide){
    if(slide.seriesMainTitle && slide.mId)
      return (`/kids/characters/${createRouteString(slide.seriesMainTitle)}/${createRouteString(slide.mId)}`);
  }

  getKidsShowPlayerPageURI(slide){
    const episodeId = slide.mId, episodeMainTitle = slide.mediaMainTitle,
      seriesId = slide.refSeriesId, seriesMainTitle = slide.refSeriesTitle;
    return(`/kids/characters/${createRouteString(seriesMainTitle)}/${seriesId}/${createRouteString(episodeMainTitle).replace(/\?/g, '-')}/${episodeId}`);
  }

  getKidsMovieVideoPageURI(movie){
    return (`/kids/movie/${createRouteString(movie.mediaMainTitle)}/${movie.mId}`);
  }

  routeTo(item){
    if(item.uri){
      this.context.router.push(item.uri);
    }
  }

  routeToClusterVideoPlayer(cluster, mName){
    let queryParams = {cName : cluster.paramlink, mName : mName}, self =this;
    this.props.setLoader(true);
    this.props.getChannelMedias(queryParams, function () {
      let channelMedias = self.props.channelMedias;
      let currentMedia;
      if(channelMedias.data.list) {
        currentMedia = channelMedias.data.list['0'];
        let episodeMainTitle = getSeriesValueFromListOfMapsForKey(currentMedia.Metas, "EpisodeMainTitle"),
          mediaId = currentMedia.MediaID;
        self.context.router.push(`/kids/clusters/${cluster.paramlink}/${createRouteString(episodeMainTitle)}/${mediaId}`);
      }
    }, function () {
      self.props.setLoader(false);
    });
  }

  getHeadingSectionForTitle(heading, additionalHeadingClass) {
    let classes = additionalHeadingClass+' top-heading';
    return (
      <div className={classes}>
        <div className='heading-inner'>
          <CardHeading>
            <h2>{heading}</h2>
          </CardHeading>
        </div>
      </div>
    );
  }

  getViewAllButton(linkTitle, linkUrl) {
    let map = linkUrl ? {uri: linkUrl} : {};
    return (
      <div className='view-all-collection-h4'>
        <a className='view-all-collection' onClick={()=> {this.routeTo(map);}} >
          <PaperRipple className='ripple'>
            <span>{linkTitle}</span>
          </PaperRipple>
        </a>
      </div>
    );
  }

  getKidsCollections(list, i, mName) {
    const self = this, maxIndexCount = 3, tiles = list.map(function (item, index) {
      /* Do not show more than 4 items ***************************************************/
      if (!(index > maxIndexCount)) {
        return (
          <div key={index} className='grid-view'>
            {<DefaultCard aspectRatio='16x6' itemIndex={index} key={index} items={item} isTitleMultiLine={false}
                          componentFlag={'kidsClusters'} onClick={()=> {self.routeToClusterVideoPlayer(item, mName);}} data={item} />}
          </div>
        );
      }
    });
    return (
      <div key={i} className='section kidsZoneClusters'>
        {this.getHeadingSectionForTitle('Collections on Voot','kidsClusters')}
        <div className='grid-container clearfix'>
          {tiles}
        </div>
        {this.getViewAllButton('View All Collections', '/kids/clusters')}
      </div>
    );
  }

  getKidsShows(section, viewAllText, aspectRatio, showPlayIcon, viewAllLink = undefined) {
    let classes = 'section ' + (section.mName == 'kidsZoneCharacters' || section.mName == 'kidsZonePopularShows' ? 'kidsCharacters' : section.mName),
      heading = section.title;
    let lowercaseTitle = section.title.toString().toLowerCase(), maxIndexCount = 3;
    let tiles = section.list.map((item, index) => {
      /* Do not show more than 4 items ***************************************************/
      if(!(index > maxIndexCount)){
        let tileClasses = 'grid-view grid-2 card-item  item-' + index, uri;
        if (section.mName == 'kidsZoneCharacters' || section.mName == 'kidsZonePopularShows') {
          let itemClass = getColorClassForKidsCircularTile(index);
          tileClasses = tileClasses + ' ' + itemClass;
          viewAllLink = '/kids/shows';
          uri = this.getKidsShowPageURI(item);
        }
        else if (section.mName == 'kidsZoneVideos') {
          viewAllLink  = '/playlist/' + section.paramlink + '/' + section.mName;
          uri = this.getKidsShowPlayerPageURI(item);
        }
        else if (section.mName == 'kidsZoneMovies') {
          uri = this.getKidsMovieVideoPageURI(item);
        }
        item.uri = uri;
        return (
          <div className={tileClasses} key={index}>
            <DefaultCard items={item} aspectRatio={aspectRatio} itemIndex={index} componentFlag={item.mName}
                         showPlayIcon={showPlayIcon}
                         onClick={()=> {
                           this.routeTo(item);
                         }} data={item} />
          </div>
        );
      }
    });
    return (
      <div className={classes}>
        {this.getHeadingSectionForTitle(heading)}
        <div className='grid-container-shows clearfix grid-shows'>
          {tiles}
        </div>
        {this.getViewAllButton(viewAllText, viewAllLink)}
      </div>
    );
  }

  renderSeoTags = () => {
    const {kidsHome:{data:{assets}}} = this.props;
    let image = "https://dimg.voot.com/include/upload/web-vertical-images/compressed/kidszoneHeroAssets_4_0_image_1483523711pokemon-3.png";
    if(typeof assets !== "undefined" && assets.length && assets[0].list && assets[0].list.length && assets[0].list[0].imgURLL){
      image = assets[0].list[0].imgURLL;
    }
    const title = 'Voot Kids Zone, Videos for Kids, Kids Stories Video, Kids Learning Videos, VOOT';
    const description = 'Voot Kids Zone offers enjoyment for your little ones to get entertained and also learn their basics! Videos for Kids, Kids Stories Video, Kids Learning Videos!';
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
          content: 'Voot Kids Zone, Videos for Kids, Kids Stories Video, Kids Learning Videos, Kids Cartoon Movies, Kids Cartoon Characters, Kids Cartoon Videos, Voot',
        },
        {
          property: 'og:url',
          content: get_domain_url() + this.props.location.pathname,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:image',
          content: image,
        },
        {
          property: 'og:description',
          content: 'Free Movies Watch - Movies Videos, Movies Clips, Upcoming Movies Trailer on VOOT with Movies Genres like Action, Drama, Comedy, Romance and many more!',
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
          content: image,
        },
        {
          property: 'twitter:url',
          content: get_domain_url() + this.props.location.pathname,
        },
      ],
    };
    return (<Helmet {...props} />);
  }

  createChildComponents(){
    const {kidsHome} = this.props;
    let tray;
    if (kidsHome.data) {
      tray = kidsHome.data.map((item, index) => {
        if (item.mName == 'kidsZoneMastHead') {
          return (<KidsTray aspectRatio='1x1' key={index} item={item} />);
        }
        if (item.mName == 'kidsZoneClusters') {
          return (this.getKidsCollections(item.list, index, item.mName));
        }
        if (item.mName == 'kidsZoneCharacters') {
          return (this.getKidsShows(item, 'View All Shows', '1x1', false));
        }
        if (item.mName == 'kidsZoneVideos') {
          return (this.getKidsShows(item, 'View All Videos', '16x9', true));
        }

        /* TODO : Need 1X1 image from API, in order to show circular background*/
        if (item.mName == 'kidsZonePopularShows') {
          return (this.getKidsShows(item, 'View All Shows', '16x9', false));
        }
        if (item.mName == 'kidsZoneMovies') {
          return (this.getKidsShows(item, 'View All Movies', '2x3', true, '/kids/movies'));
        }

        return (this.getKidsShows(item, 'View All', '1x1', false));
      });
    }

    return tray;
  }

  loadMore(page) {
    let queryParams = {pageIndex: page};
    self.props.getKidsHomeData(queryParams);
  }

  render() {
    const {kidsHome} = this.props;
    let sections;
    if (this.state.totalCount > 0) {
      const size = kidsHome.data.length, totalItems = this.state.totalCount, resultantSize = kidsHome.resultantSize;
      let loaderContent = (<div className='load-more-pagination'><div className='small-loader'></div></div>);
      sections = (
        <InfiniteScroll pageStart={1} loadMore={this.loadMore} hasMore={(size != totalItems && resultantSize != 0 )} loader={loaderContent}>
          {this.createChildComponents()}</InfiniteScroll>);
    }

    return (
      <div className='kids-container'>
        {this.renderSeoTags()}
        <Loader {...this.props} />
        <TabNavigation {...this.props} />
        <div className='kids-page'>
          {sections}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: bindActionCreators(setLoader, dispatch),
    getKidsHomeData: bindActionCreators(getKidsHomeData, dispatch),
    clearKidsHomeErrors: bindActionCreators(clearKidsHomeErrors, dispatch),
    resetKidsHomeData: bindActionCreators(resetKidsHomeData, dispatch),
    getChannelMedias: bindActionCreators(getChannelMedias, dispatch),
    clearChannelMedias: bindActionCreators(clearChannelMedias, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    kidsHome: state.kids.kidsHome,
    loader: state.loader,
    channelMedias: state.channelMedias,
  };
};


Kids.need = [
  getKidsHomeData,
];

Kids.propTypes = {
  getKidsHomeData: PropTypes.func.isRequired,
  clearKidsHomeErrors: PropTypes.func.isRequired,
  kidsHome: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  setLoader: PropTypes.func.isRequired,
  loader: PropTypes.object.isRequired,
  clearChannelMedias: PropTypes.func,
  getChannelMedias: PropTypes.func,
  resetKidsHomeData: PropTypes.func,
};

Kids.contextTypes = {
  router: React.PropTypes.object.isRequired,
  clearChannelMedias: PropTypes.func,
  getChannelMedias: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Kids);
