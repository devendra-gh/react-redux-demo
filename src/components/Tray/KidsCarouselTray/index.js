import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {searchAsset} from '../../../actions/searchAssetAction';
import {setLoader} from '../../../actions/loader';
import Slider from 'react-slick-3';
import DefaultCard from '../../CardLayout/DefaultCard';
import CardTopHeading from '../../CardComponent/CardTopHeading';
import {getSeriesValueFromListOfMapsForKey, getImageUrlMap} from '../../../util/getShowDetails';
import {createRouteString} from '../../../util/routeCreater';
import {MEDIA_TYPE} from '../../../constants/media';
import showEndpoints from '../../../endpoints/shows';
import {getChannelMedias} from '../../../actions/channelMediasAction';
import {getColorClassForKidsCircularTile} from '../../../util/kidsUtils';

class KidsCarouselTray extends Component {
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

  routeToMoviePage = (slide, uri) => {
    this.context.router.push(`${uri}${createRouteString(slide.MediaName)}/${createRouteString(slide.MediaID)}`);
  };

  routeToShowPage = (slide, uri) => {
    this.context.router.push(`${uri}${createRouteString(slide.seriesMainTitle)}/${createRouteString(slide.mId)}`);
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


  createCarouselTray(slide, index) {
    let itemType = this.props.item.type, isTitleMultiLine, componentName = this.props.item.mName,
      className = (this.props.isItemIndex) ? ('card-item ' + 'item-' + index) : 'card-item', CarouselTrayItem;

    if (componentName === 'kidsCharacters' || componentName === 'kidsClusters' || componentName === 'bingeWatch')
      isTitleMultiLine = false;

    if (itemType == 'cluster') {
      CarouselTrayItem = {
        // MediaTypeID: slide.MediaTypeID,
        RefSeriesTitle: slide.name,
        // Season: getSeriesValueFromListOfMapsForKey(slide.Metas, "Season"),
        SeriesMainTitle: slide.name,
        // genre: getSeriesValueFromListOfMapsForKey(slide.Tags, "Genre"),
        imgURL: slide.imgURL,
        imgURLL: slide.imgURLL,
        imgURLM: slide.imgURLM,
        imgURLS: slide.imgURLS,
        mediaId: slide.MediaID,
        // sbu: getSeriesValueFromListOfMapsForKey(slide.Metas, "SBU"),
        // contentType: slide.contentType,
      };

      return (
        <div key={index} className={className}>
          <DefaultCard
            data={CarouselTrayItem}
            aspectRatio={this.props.aspectRatio}
            itemIndex={this.props.itemIndex}
            items={CarouselTrayItem}
            isTitleMultiLine={isTitleMultiLine}
            showPlayIcon={this.props.showPlayIcon}
            onClick={()=>this.routeToClusterVideoPlayer(slide)}
            noTags />
        </div>
      );
    } else if(slide.MediaTypeID == MEDIA_TYPE.MOVIE) {
      const pictures = getImageUrlMap(slide.Pictures), uri = '/kids/movie/';
      CarouselTrayItem = {
        MediaTypeID: slide.MediaTypeID,
        RefSeriesTitle: slide.MediaName,
        Season: getSeriesValueFromListOfMapsForKey(slide.Metas, "Season"),
        SeriesMainTitle: getSeriesValueFromListOfMapsForKey(slide.Metas, "SeriesMainTitle"),
        genre: getSeriesValueFromListOfMapsForKey(slide.Tags, "Genre"),
        // imgURL: slide.imgURL,
        imgURLL: pictures.imgURLL,
        imgURLM: pictures.imgURLM,
        imgURLS: pictures.imgURLS,
        mediaId: slide.MediaID,
        sbu: getSeriesValueFromListOfMapsForKey(slide.Metas, "SBU"),
        // contentType: slide.contentType,
      };
      if (CarouselTrayItem.genre.toString().toLowerCase() == 'kids' || CarouselTrayItem.genre.toString().toLowerCase() == 'kid')
        return (
          <div key={index} className={className}>
            <DefaultCard
              data={CarouselTrayItem}
              aspectRatio={this.props.aspectRatio}
              itemIndex={this.props.itemIndex}
              items={CarouselTrayItem}
              isTitleMultiLine={isTitleMultiLine}
              showPlayIcon={this.props.showPlayIcon}
              onClick={()=>this.routeToMoviePage(slide, uri)}
              noTags />
          </div>
        );
    } else {
      let uri = '/kids/characters/';
      let itemClass = getColorClassForKidsCircularTile(index);
      className = className + ' '+itemClass;
      CarouselTrayItem = {
        MediaTypeID: slide.MediaTypeID,
        RefSeriesTitle: slide.MediaName,
        SeriesMainTitle: slide.seriesMainTitle,
        imgURL: slide.imgURL,
        imgURLM: slide.imgURLM,
        imgURLS: slide.imgURLS,
        mediaId: slide.mId,
      };
      return (
        <div key={index} className={className}>
          <DefaultCard
            data={CarouselTrayItem}
            aspectRatio={this.props.aspectRatio}
            itemIndex={this.props.itemIndex}
            items={CarouselTrayItem}
            isTitleMultiLine={isTitleMultiLine}
            showPlayIcon={this.props.showPlayIcon}
            onClick={()=>this.routeToShowPage(slide, uri)}
            noTags />
        </div>
      );
    }
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

KidsCarouselTray.propTypes = {
  item: PropTypes.object.isRequired,
  aspectRatio: PropTypes.string,
  isTitleMultiLine: PropTypes.string,
  itemIndex: PropTypes.bool,
  noCardTopHeading: PropTypes.bool,
  showPlayIcon: PropTypes.bool,
  searchAssetData: PropTypes.object,
  isItemIndex: PropTypes.bool,
  setLoader: PropTypes.func.isRequired,
  loader: PropTypes.object.isRequired,
  channelMedias: PropTypes.object.isRequired,
  getChannelMedias: PropTypes.func,
};

KidsCarouselTray.contextTypes = {
  router: PropTypes.object.isRequired,
  aspectRatio: PropTypes.string,
  noCardTopHeading: PropTypes.bool,
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


export default connect(mapStateToProps, mapDispatchToProps)(KidsCarouselTray);
