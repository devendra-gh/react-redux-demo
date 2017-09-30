import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import endpoints from '../../../endpoints/shows';
import {customPageAction, clearCustomPageData} from '../../../actions/customPageAction';
import {relatedMedia} from '../../../actions/playlist';
import EpisodeHeadCard from '../../../components/CardLayout/EpisodeHeadCard';
import CarouselTray from '../../../components/Tray/CarouselTray';
import {setLoader} from '../../../actions/loader';
import {createRouteString,checkUrl} from '../../../util/routeCreater';
import {formDataGenerator} from '../../../util/formDataGenerator';
import {MEDIA_TYPE} from '../../../constants/media';
// import URL from '../../../constants/URL';
import EpisodeDefaultCard from '../../CardLayout/EpisodeDefaultCard';
import Modal from 'react-modal';
import Loader from '../../Loader';
import SocialShare from '../../SocialShare';
import Follow from '../../AllEpisodesListing/Shows/Follow';
import Helmet from 'react-helmet';
import {site_name, get_domain_url} from '../../../constants/seoConstant';



class CustomLandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaId: this.props.params.mediaId,
      modalIsOpen: false,
      openSocialModal: false,
      shoutListContent: true,
      shoutByUser: {},
    };
  }

  componentWillMount() {
    let self = this;
    this.props.setLoader(true);
    let callback = {};
    callback.successCallback = function () {
      let customLandingData = self.props.getCustomLandingData.data.assets;
      if(customLandingData.seasonDetails){
        let data = [
          {
            "key": "language",
            "value": customLandingData.seasonDetails.language,
          },
          {
            "key": "genre",
            "value": customLandingData.seasonDetails.genre,
          },
          {
            "key": "pageSize",
            "value": 4,
          },
          {
            "key": "pageIndex",
            "value": 0,
          },
          {
            "key": "sbu",
            "value":  customLandingData.seasonDetails.sbu,
          },
          {
            "key": "isKids",
            "value": ((customLandingData.seasonDetails.sbu == 'Kids' || customLandingData.seasonDetails.sbu == 'Kid') ? 1 : 0),
          },
        ];
        self.props.getRelatedMedia(endpoints.popularShowsList,formDataGenerator((data)));
      }
    };

    this.props.setCustomLandingData(this.props.slugName, callback);
  }

  componentDidMount = ()=>{
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'CustomLandingPageView');
    }
  };

  componentWillUnmount = ()=>{
    this.props.clearCustomPageData();
  };

  openSocialModal = () => {
    document.getElementsByTagName('body')[0].className = 'body-static';
    this.setState({openSocialModal: true});
  };

  closeSocialModal = () => {
    document.getElementsByTagName('body')[0].className = '';
    this.setState({openSocialModal: false});
  };

  getSeasonList = (moreShows) => {
    let showList = '';

    if (moreShows && moreShows.list && moreShows.list.length)
      showList = moreShows.list.map((show, key) => {
        let items = {
          slugName:'season',
          mediaId:show.id,
          mediaTypeId:show.type,
          name: show.name,
          metas:show.metas,
          imgURLL: show.images[1].url,
          imgURLM: show.images[3].url,
          imgURLS: show.images[4].url,
          genre: [show.metas.SBU, show.tags.Genre[0]],
          videos: show.assetsCount ? show.assetsCount.episode : 0,
          episodes: show.assetsCount ? show.assetsCount.episode : 0,
        };
        // listing on season on custom landing page.
        return (
          <EpisodeDefaultCard aspectRatio='16x9' onClick={()=>{this.routeCustomPageToShowLanding(items);}}
                              data={items} key={key} items={items} noShout />
        );
      });

    return showList;
  };

  routeCustomPageToShowLanding = (item) => {
    if(item && item.mediaTypeId && item.mediaTypeId==MEDIA_TYPE.TV_SERIES){
      let url=`/shows/${createRouteString(item.metas.SeriesMainTitle)}/${createRouteString(item.metas.Season)}/${createRouteString(item.mediaId)}`;
      let route=checkUrl(url);
      if(route.url!=null){
       this.context.router.push(route.url);
      }else{
        this.context.router.push(`/shows/${createRouteString(item.metas.SeriesMainTitle)}/${createRouteString(item.metas.Season)}/${createRouteString(item.mediaId)}`);
      }
    }
  };

  renderSeoTags = () => {
    const customLandingData = this.props.getCustomLandingData.data ? this.props.getCustomLandingData.data.assets : false, pathName = this.props.location.pathname;
    if(customLandingData && customLandingData.seasonDetails){
      let seasonDetails = customLandingData.seasonDetails;
      const title = seasonDetails.title + ' | Watch ' + seasonDetails.title + ' Latest Episodes & Videos - Voot';
      const description = 'Watch latest ' + seasonDetails.title + '. Read latest ' + seasonDetails.title + ' news and check out new events and updates only on Voot';
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
            content: seasonDetails.title, /* not getting keywords field from api, therefore passing title for now */
          },
          {
            property: 'og:url',
            content: get_domain_url() + pathName,
          },
          {
            property: 'og:title',
            content: title,
          },
          {
            property: 'og:image',
            content: seasonDetails.imgURLS,
          },
          {
            property: 'og:description',
            content: seasonDetails.desc,
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
            content: seasonDetails.imgURLS,
          },
          {
            property: 'twitter:url',
            content: get_domain_url() + pathName,
          },
        ],
      };

      return (<Helmet {...props} />);
    }
  };

  render() {
    let title='More Shows on Voot';

    // if(this.props.getClipData.mediaInfo.data && this.props.getClipData.mediaInfo.data.assets){
    //   if(this.props.getClipData.mediaInfo.data.assets.Metas.length){
    //     if(checkPropertyInArray(this.props.getClipData.mediaInfo.data.assets.Metas, 'SBU') =='VOOT')
    //       title = 'More Voot Originals';
    //   }
    // }

    let item = {
      mName: 'shows',
      title: 'More Shows on Voot',
      list: [],
    };
    let imgURLS=[];
    imgURLS = this.props.relatedMedia.data && this.props.relatedMedia.data.assets && this.props.relatedMedia.data.assets.map((item,index)=>{

        let metaData =  {
          type:'relatedMedia',
          MediaName:item.name,
          //refSeriesId:this.props.params.refSeriesId,
          ContentType:item.MediaTypeName,
          EpisodeMainTitle:item.name,
          SeriesMainTitle:item && item.metas ? item.metas.SeriesMainTitle:false,
          Season:item && item.metas ? item.metas.Season:false,
          MediaTypeID:item.type,
          mediaId:item.id,
          imgURLL:item && item.images && item.images[1] ? item.images[1].url:false,
          imgURLM:item && item.images && item.images[3] ? item.images[1].url:false,
          imgURLS:item && item.images && item.images[4] ? item.images[1].url:false,
          sbu:item && item.metas ? item.metas.SBU:false,
          genre: item && item.tags && item.tags.Genre ? item.tags.Genre[0] : '',
          RefSeriesTitle:'',
          Language:item && item.metas && item.metas.Language,
        };
        if(item && item.Metas){
          item.Metas.map((item, index)=>{
            if(['SBU'].indexOf(item.Key) != -1) {
              metaData.sbu = item.Value;
            }
            // if(['ContentType'].indexOf(item.Key) != -1) {
            //   metaData.ContentType = item.Value;
            // }
            if(['RefSeriesTitle'].indexOf(item.Key) != -1) {
              metaData.RefSeriesTitle = item.Value;
            }
            if(['EpisodeMainTitle'].indexOf(item.Key) != -1) {
              metaData.EpisodeMainTitle = item.Value;
            }
            if(['SeriesMainTitle'].indexOf(item.Key) != -1) {
              metaData.SeriesMainTitle = item.Value;
            }
            if(['RefSeriesSeason'].indexOf(item.Key) != -1) {
              metaData.RefSeriesSeason = item.Value;
            }
            if(['Season'].indexOf(item.Key) != -1) {
              metaData.Season = item.Value;
            }
            if(['Language'].indexOf(item.Key) != -1) {
              metaData.Language = item.Value;
            }
          });
          item.Tags.map((item, index)=>{
            if(['Genre'].indexOf(item.Key) != -1) {
              metaData.genre = item.Value;
            }
          });
        }
        return metaData;
      });

    item.list = imgURLS;





    const customData = this.props.getCustomLandingData.data && this.props.getCustomLandingData.data.assets ?this.props.getCustomLandingData.data.assets:false;
    {/*const {channel: {home, landing:{headCarousel, moreShows, error}}, params:{channelName}, loader} = this.props;*/}

    // let channelsCarousel;
    //
    // channelsCarousel = customData.list.map(this.getSeasonTray);


    let post = {};
    if (customData && customData.seasonDetails) {
      post = {
        imageurl: 'http://kimg.voot.com/kimg/bd84922ef3a249579e7b2fb223317bde_512X288.jpg',//getImageUrlMap(mediaInfo.Pictures).imgURLL,
        description: customData.seasonDetails.desc,
        showName: customData.title,
        title: '',
        //title: customData.title,
      };
    }

     return (
       <div className='home-container season-landing'><Loader {...this.props} />
         {this.renderSeoTags()}
         {customData && customData.seasonDetails &&
           <div className='section tray-container'>
             <EpisodeHeadCard aspectRatio='16x9' openSignInModal={this.props.openSignInModal} openSocialModal={this.openSocialModal} items={customData.seasonDetails} noPlayIcon={false} isTitleMultiLine={false} />
           </div>}

         <div className='top-heading'>
           <div className='heading-inner'>
             {customData ? <div className='tray-heading default-color'><h2>All Seasons ({customData && customData.list && customData.list.length})</h2></div>:false}
           </div>
         </div>
         {customData &&
           <div className='grid-container clearfix grid-shows'>
             {this.getSeasonList(customData)}
           </div>}
         <div>
           {item.list && <CarouselTray aspectRatio='16x9' item={item} />}
         </div>

         {/*Modal for social share*/}
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
             />
           </div>
         </Modal>
         {/*Modal for social share*/}
       </div>
     );
  }
}


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



CustomLandingPage.need = [
  customPageAction,
];

CustomLandingPage.propTypes = {
  loader: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  relatedMedia: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  setCustomLandingData: PropTypes.func.isRequired,
  clearCustomPageData: PropTypes.func.isRequired,
  openSignInModal: PropTypes.func.isRequired,
  getRelatedMedia: PropTypes.func.isRequired,
  setLoader: PropTypes.func.isRequired,
  getCustomLandingData: PropTypes.object.isRequired,
  mediaInfo: PropTypes.object.isRequired,
  slugName: PropTypes.string.isRequired,
};

CustomLandingPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: bindActionCreators(setLoader, dispatch),
    getRelatedMedia: bindActionCreators(relatedMedia, dispatch),
    setCustomLandingData: bindActionCreators(customPageAction, dispatch),
    clearCustomPageData: bindActionCreators(clearCustomPageData, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    getCustomLandingData: state.customData,
    loader: state.loader,
    relatedMedia: state.playlist.getRelatedMedia,
    mediaInfo: state.getMediaInfo.mediaInfo,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomLandingPage);
