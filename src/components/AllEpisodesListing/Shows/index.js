import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import endpoints from '../../../endpoints/playList';
import {getMediaInfo, clearMediaInfo} from '../../../actions/getMediaInfo';
import {clearRelatedMedia} from '../../../actions/getRelatedMedia';
import {playlist} from '../../../actions/playlist';
import {setLoader} from '../../../actions/loader';
import Loader from '../../Loader';
import EpisodeHeadCard from '../../../components/CardLayout/EpisodeHeadCard';
import ShowsEpisodesShortsTab from './ShowsEpisodesShortsTab';
import {scrollToTop, createMarkup, getMediaInfoValueByKey} from '../../../util/helper';
import {checkUrl, createRouteString, getMediaId} from '../../../util/routeCreater';
import SocialShare from '../../../components/SocialShare';
import {
  getImageUrlMap,
  getShowDescription,
  getShowMetaTags,
  getSocialShareImageUrl,
} from '../../../util/getShowDetails';
import Modal from 'react-modal';
import {site_name, get_domain_url} from '../../../constants/seoConstant';
import Helmet from 'react-helmet';
import clone from 'clone';

class VootAllShowsEpisodes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaInfo: {},
      modalIsOpen: false,
      params: this.props.params,
      openSignInModal: false,
    };
    this.markup = {};
  }

  componentWillMount() {
    if (this.props.params && !this.props.params.mediaId) {
      let url = "";
      if (this.props.params.season) {
        url = `/shows/${createRouteString(this.props.params.seriesMainTitle)}/${createRouteString(this.props.params.season)}`;
      } else {
        url = `/shows/${createRouteString(this.props.params.seriesMainTitle)}`;
      }
      let ObjMediaId = getMediaId(url);
      if (ObjMediaId && ObjMediaId.mediaId != null) {
        this.newMediaId = ObjMediaId.mediaId;
      }
    }
    const {getMediaInfo, clearMediaInfo, mediaInfo: {data}, setLoader} = this.props;
    let {params: {mediaId}} = this.props;
    if (typeof mediaId === "undefined") {
      this.props.params.mediaId = this.newMediaId;
      mediaId = this.newMediaId;
      if(this.newMediaId === undefined){
        this.context.router.push('/shows');
      }
    }

    let queryParams = {
      mediaId,
    };

    if (data && data.assets) {
      if (data.assets.MediaID !== mediaId) {
        clearMediaInfo();
        setLoader(true);
        getMediaInfo(queryParams);
      }
    }
    else {
      setLoader(true);
      getMediaInfo(queryParams);
    }


    if (typeof window === "undefined") {
      // for server side rendering
      const {mediaInfo:{data:{assets}}, params:{season}} = this.props;
      if (typeof assets !== "undefined") {
        this.markup = {
          "@context": "https://schema.org",
          "@type": "TVSeries",
          "name": assets.MediaName,
          "genre": [
            getMediaInfoValueByKey(assets.Tags, "Genre"),
          ],
          "description": getMediaInfoValueByKey(assets.Metas, "SeriesSynopsis"),
          "inLanguage": getMediaInfoValueByKey(assets.Metas, "Language"),
          "image": {
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "contentUrl": getImageUrlMap(assets.Pictures).imgURLS,
          },
          "containsSeason": {
            "@context": "https://schema.org",
            "@type": "TVSeason",
            "numberOfEpisodes": assets.assetsCount.episodesCount,
            "name": assets.MediaName,
            "seasonNumber": season,
          },
        };
      }
    }
  }

  componentWillUnmount() {
    this.props.clearRelatedMedia();
  }

  openModal = () => {
    document.getElementsByTagName('body')[0].className = 'body-static';
    this.setState({modalIsOpen: true});
  };

  closeModal = () => {
    document.getElementsByTagName('body')[0].className = '';
    this.setState({modalIsOpen: false});
  };

  renderSeoTags = () => {
    const {mediaInfo:{data:{assets}}} = this.props;
    if (typeof assets !== "undefined") {
      const title = assets.MediaName + ' | Watch ' + assets.MediaName + ' Latest Episodes & Videos - Voot';
      const description = 'Watch latest ' + assets.MediaName + '. Read latest ' + assets.MediaName + ' news and check out new events and updates only on Voot';
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
            content: title,
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

  routeToFirstPlayableContent = (routes) => {
    const {episodes, curatedVootShorts, allVootShorts} = routes;
    if(episodes)
      this.context.router.push(episodes);
    else if(curatedVootShorts)
      this.context.router.push(curatedVootShorts);
    else if(allVootShorts)
      this.context.router.push(allVootShorts);
  };

  render() {
    let newParams = clone(this.props.params);
    if (this.props.params && !this.props.params.mediaId) {

      let url = "";
      if (this.props.params.season) {
        url = `/shows/${createRouteString(this.props.params.seriesMainTitle)}/${createRouteString(this.props.params.season)}`;
      } else {
        url = `/shows/${createRouteString(this.props.params.seriesMainTitle)}`;
      }
      let ObjMediaId = getMediaId(url);
      if (ObjMediaId && ObjMediaId.mediaId != null) {
        this.newMediaId = ObjMediaId.mediaId;
        newParams.mediaId = ObjMediaId.mediaId;
      }
    }

    const {openSignInModal} = this.props;
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
    scrollToTop();
    let mediaInfoAssests = false;
    let items = {};
    let mediaTypeID = "";
    let metas = [];
    let assetsCount = {
      clipsCount: 0,
      episodesCount: 0,
    };

    const {params: {mediaId}, mediaInfo: {data}, posterRoute} = this.props;

    if (data && !data.assets) {
      return <Loader {...this.props} />;
    } else if (data && data.assets) {
      mediaInfoAssests = data.assets;
      mediaTypeID = data.assets.mediaTypeID;
      items = getImageUrlMap(mediaInfoAssests.Pictures);
      items.desc = getShowDescription(mediaInfoAssests.Metas);
      items.seriesMainTitle = mediaInfoAssests.MediaName;
      items.tags = getShowMetaTags(mediaInfoAssests);
      metas = mediaInfoAssests.Metas;
//      assetsCount=mediaInfoAssests.assetsCount;
    }
    const post = {
      imageurl: mediaInfoAssests ? getSocialShareImageUrl(mediaInfoAssests.Pictures) : false,
      description: mediaInfoAssests ? mediaInfoAssests.Description || getMediaInfoValueByKey(mediaInfoAssests.Metas, "SeriesSynopsis") : false,
      showName: mediaInfoAssests ? mediaInfoAssests.MediaName : false,
      title: '',
      //title: mediaInfoAssests ? mediaInfoAssests.MediaName : false,
    };

    let noPlayIcon = false;
    if(posterRoute.episodes || posterRoute.curatedVootShorts || posterRoute.allVootShorts)
      noPlayIcon = true;

    return (
      <div className='shows-landing clearfix'>
        {this.renderSeoTags()}
        <Loader {...this.props} />
        {createMarkup(this.markup, "Show landing page")}
        <div className='section tray-container'>
          <EpisodeHeadCard aspectRatio='16x9' items={items} noPlayIcon={noPlayIcon} isTitleMultiLine={false}
                           mediaId={this.newMediaId ||( this.props.params && this.props.params.mediaId)} openModal={this.openModal} openSignInModal={openSignInModal}
                           openSocialModal={this.openModal}
                           data={posterRoute}
                           onClick={this.routeToFirstPlayableContent} />
        </div>
        <ShowsEpisodesShortsTab params={newParams} metas={metas} assetsCount={assetsCount} stopCall={true} />
        <Modal isOpen={this.state.modalIsOpen} style={customStyles} contentLabel='Modal' className='filter-section'>
          <SocialShare post={post} className='filter-section' closeModal={this.closeModal} mId={this.newMediaId ||( this.props.params && this.props.params.mediaId)}  mediaInfo={this.props.mediaInfo} />
        </Modal>
      </div>
    );
  }
}


VootAllShowsEpisodes.need = [
  playlist,
  getMediaInfo,
];

const mapDispatchToProps = (dispatch) => {
  return {
    getMediaInfo: bindActionCreators(getMediaInfo, dispatch),
    clearMediaInfo: bindActionCreators(clearMediaInfo, dispatch),
    clearRelatedMedia: bindActionCreators(clearRelatedMedia, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    params: ownProps.params,
    loader: state.loader,
    mediaInfo: state.getMediaInfo.mediaInfo,
    login: state.authentication.login,
    posterRoute : state.shows.posterRoute,
  };
};

VootAllShowsEpisodes.propTypes = {
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  loader: PropTypes.object.isRequired,
  mediaInfo: PropTypes.object.isRequired,
  posterRoute: PropTypes.object.isRequired,
  getMediaInfo: PropTypes.func.isRequired,
  clearMediaInfo: PropTypes.func.isRequired,
  clearRelatedMedia: PropTypes.func.isRequired,
  setLoader: PropTypes.func.isRequired,
  openSignInModal: PropTypes.func.isRequired,
};


VootAllShowsEpisodes.contextTypes = {
  router: React.PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(VootAllShowsEpisodes);
