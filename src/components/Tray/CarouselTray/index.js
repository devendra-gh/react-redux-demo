import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {searchAsset} from '../../../actions/searchAssetAction';
import {setLoader} from '../../../actions/loader';
import Slider from 'react-slick-3';
import Loader from '../../Loader';
import {formDataGenerator} from '../../../util/formDataGenerator';
import {MEDIA_TYPE} from '../../../constants/media';
import DefaultCard from '../../CardLayout/DefaultCard';
import CardTopHeading from '../../CardComponent/CardTopHeading';
import {createRouteString} from '../../../util/routeCreater';
import endpoint from '../../../endpoints/shows';
import {getChannelMedias} from '../../../actions/channelMediasAction';
import {getSeriesValueFromListOfMapsForKey} from '../../../util/getShowDetails';
import {getColorClassForKidsCircularTile} from '../../../util/kidsUtils';

class CarouselTray extends Component {
  constructor(props){
    super(props);

    this.setSliderConfig = this.setSliderConfig.bind(this);
    this.createCarouselTray = this.createCarouselTray.bind(this);
  }

  setSliderConfig(){
    let sliderConfig = {
      dots: false,
      arrows: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2.35,
      slidesToScroll: 2,
      lazyLoad: true,
      vertical: false,
      verticalSwiping: false,
      responsive: [{
        breakpoint: 360,
        sliderConfig: {
          slidesToShow: 1.35,
          slidesToScroll: 1,
        },
      }],
    };
    return sliderConfig;
  }

  createCarouselTray(slide, index) {
    let CarouselTrayItem={};
   if(slide && (slide.type!='relatedMedia' && slide.mediaType!=MEDIA_TYPE.EPISODE)) {
     CarouselTrayItem = {
       MediaTypeID: slide.mediaType,
       RefSeriesTitle: "",
       Season: slide.refSeriesSeason || slide.season,
       SeriesMainTitle: slide.seriesMainTitle ||slide.mediaMainTitle,
       genre: slide.genre,
       imgURL: slide.imgURL,
       imgURLL: slide.imgURL,
       imgURLM: slide.imgURLM,
       imgURLS: slide.imgURLS,
       mediaId: slide.mId,
       sbu: slide.sbu,
       contentType: slide.contentType,
     };
   }else{
     CarouselTrayItem=slide;
   }
    let isTitleMultiLine, componentName = this.props.item.mName,  classes = 'card-item';
    if(componentName === 'kidsCharacters' || componentName === 'kidsClusters' || componentName === 'bingeWatch'){
      isTitleMultiLine = false;
    }

    if(this.props.isItemIndex){
      let itemClass = getColorClassForKidsCircularTile(index);
      classes = classes +' '+ itemClass;
    }

    if(componentName === 'kidsClusters'){
      return (
        <div key={index} className={classes}>
          <DefaultCard onClick={()=>this.routeToClusterVideoPlayer(slide)} data={slide} aspectRatio={this.props.aspectRatio} itemIndex={this.props.itemIndex} items={slide} isTitleMultiLine={isTitleMultiLine} componentFlag={this.props.item.mName} showPlayIcon={this.props.showPlayIcon} />
        </div>
      );
    }else {
      return (
        <div key={index} className={classes}>
          <DefaultCard onClick={()=>this.routeTo(CarouselTrayItem)} data={CarouselTrayItem} aspectRatio={this.props.aspectRatio} itemIndex={this.props.itemIndex} items={slide} isTitleMultiLine={isTitleMultiLine} componentFlag={this.props.item.mName} showPlayIcon={this.props.showPlayIcon} />
        </div>
      );
    }
  }


  routeTo = (item) => {
    if(this.props.item.isSeason) {
       this.context.router.push(`/shows/${item.SeriesMainTitle}/${item.Season}/${item.mediaId}`);
    } else {
      // kids section routing from home page to kids video playback page.
      if (this.props.type && this.props.type == 'kidsVideos' || this.props.type =='kidsCharacters') {
        if(item.mediaType==MEDIA_TYPE.EPISODE){
          const refSeriesTitle = item.refSeriesTitle, refSeriesId = item.refSeriesId,
            mediaMainTitle = item.mediaMainTitle ? item.mediaMainTitle : (item.name ? item.name : '');
          this.context.router.push(`/kids/characters/${createRouteString(refSeriesTitle)}/${createRouteString(refSeriesId)}/${createRouteString(mediaMainTitle)}/${item.mId}`);
        }else if(item.MediaTypeID==MEDIA_TYPE.TV_SERIES || item.mediaType==MEDIA_TYPE.TV_SERIES){
          this.context.router.push(`/kids/characters/${createRouteString(item.SeriesMainTitle)}/${createRouteString(item.mediaId)}`);
        }
        // kids section routing from home page to kids video playback page.
      } else {
        if (item && item.refSeriesId || item.MediaTypeID == MEDIA_TYPE.TV_SERIES) {
          if (item && item.ContentType != 'Full Episode' && item.MediaTypeID == MEDIA_TYPE.EPISODE) {
            this.context.router.push(`/clip/${createRouteString(item.SeriesMainTitle)}/${item.mediaId}`);
          } else {

            if (item && (item.MediaTypeID == MEDIA_TYPE.TV_SERIES)) {
              this.context.router.push(`/shows/${createRouteString(item.SeriesMainTitle)}/${item.Season}/${item.mediaId}`);
            }
            if (item && item.mediaType == MEDIA_TYPE.EPISODE) {
              this.context.router.push(`/shows/${createRouteString(item.refSeriesTitle)}/${createRouteString(item.refSeriesSeason)}/${createRouteString(item.refSeriesId)}/${createRouteString(item.mediaMainTitle)}/${item.mId}`);
            }
            if (item && item.MediaTypeID == MEDIA_TYPE.EPISODE) {
              this.context.router.push(`/shows/${createRouteString(item.RefSeriesTitle)}/${createRouteString(item.Season)}/${createRouteString(item.refSeriesId)}/${createRouteString(item.SeriesMainTitle)}/${item.mediaId}`);
            }// Bigboss route URL form home page carousel,this route is creating problem for shout feature on playlist page, correction need to pass 'refSeriesId' at 3rd place on route URL.
          }
        }

        if (item && item.RefSeriesTitle != undefined) {
          let self = this;
          let data = [
            {
              "key": "filterTypes",
              "value": MEDIA_TYPE.TV_SERIES,
            },
            {
              "key": "filter",
              "value": `(and SeriesMainTitle='${item.RefSeriesTitle.replace(/'/g, '%27')}')`,
            },
          ];

          this.props.searchAsset(endpoint.searchAssets, formDataGenerator(data), () => {

            // this code is not working ,it is for more show on voot section below on videoplayback page.

            if (self.props.searchAssetData && self.props.searchAssetData.data && self.props.searchAssetData.data.assets) {
              let refSeriesId = self.props.searchAssetData.data.assets[0].id;
              // console.log(refSeriesId);

              if (item && item.ContentType != 'Full Episode' && item.MediaTypeID == MEDIA_TYPE.EPISODE) {
                this.context.router.push(`/clip/${createRouteString(item.SeriesMainTitle)}/${item.mediaId}`);
              } else {

                if (item && (item.MediaTypeID == MEDIA_TYPE.TV_SERIES)) {
                  this.context.router.push(`/shows/${createRouteString(item.SeriesMainTitle)}/${item.Season}/${item.mediaId}`);
                }
                if (item && item.mediaType == MEDIA_TYPE.EPISODE) {
                  this.context.router.push(`/shows/${createRouteString(item.name)}/${createRouteString(item.refSeriesSeason)}/${createRouteString(item.refSeriesId)}/${createRouteString(item.mediaMainTitle)}/${item.mId}`);
                }
                if (item && item.MediaTypeID == MEDIA_TYPE.EPISODE) {
                  this.context.router.push(`/shows/${createRouteString(item.RefSeriesTitle)}/${createRouteString(item.Season)}/${createRouteString(item.refSeriesId)}/${createRouteString(item.SeriesMainTitle)}/${item.mediaId}`);
                }// Bigboss route URL form home page carousel,this route is creating problem for shout feature on playlist page, correction need to pass 'refSeriesId' at 3rd place on route URL.
              }
            }
          });
        }
      }
    }
  };

  routeToClusterVideoPlayer(cluster){
    let queryParams = {cName : cluster.paramlink, mName : 'kidsClusters'}, self =this;
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

  render() {
    const items = this.props.item;

    let sliderConfig = this.setSliderConfig(),
      carouselTray = items.list.map(this.createCarouselTray);

    return (
      <div className={'section ' + (items.mName)}>
        {!this.props.noCardTopHeading ?<CardTopHeading items={items} /> : false}
        <div className='tray-container clearfix'>
          <Slider {...sliderConfig}>
            {carouselTray}
          </Slider>
        </div>
      </div>
    );
  }
}

CarouselTray.propTypes = {
  item: React.PropTypes.object.isRequired,
  aspectRatio: React.PropTypes.string,
  isTitleMultiLine: React.PropTypes.string,
  itemIndex: React.PropTypes.bool,
  showPlayIcon: React.PropTypes.bool,
  type: React.PropTypes.string,
  searchAssetData: React.PropTypes.object,
  searchAsset: React.PropTypes.func.isRequired,
  noCardTopHeading: React.PropTypes.object,
  isItemIndex: React.PropTypes.bool,
  loader: React.PropTypes.object.isRequired,
  channelMedias: React.PropTypes.object.isRequired,
  getChannelMedias: React.PropTypes.func,
  setLoader: React.PropTypes.func,
};

CarouselTray.contextTypes = {
  router: React.PropTypes.object.isRequired,
  aspectRatio: React.PropTypes.string,
  isItemIndex: React.PropTypes.string,
};


const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: bindActionCreators(setLoader, dispatch),
    searchAsset: bindActionCreators(searchAsset, dispatch),
    getChannelMedias: bindActionCreators(getChannelMedias, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    loader: state.loader,
    searchAssetData: state.searchAsset,
    channelMedias: state.channelMedias,
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CarouselTray);
