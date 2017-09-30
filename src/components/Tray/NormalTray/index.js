import React, {Component} from 'react';
import Slider from 'react-slick-3';
import CardTopHeading from '../../CardComponent/CardTopHeading';
import NormalCard from '../../CardLayout/NormalCard';
import {createRouteString} from '../../../util/routeCreater';
import {MEDIA_TYPE} from '../../../constants/media';
import {checkUrl} from '../../../util/routeCreater';


class NormalTray extends Component {
  constructor(props) {
    super(props);

    this.setSliderConfig = this.setSliderConfig.bind(this);
    this.createSlide = this.createSlide.bind(this);
  }

  setSliderConfig() {
    let sliderConfig = {
      dots: false,
      arrows: false,
      infinite: false,
      centerMode: true,
      centerPadding: '0px',
      speed: 500,
      slidesToShow: 1.35,
      slidesToScroll: 1,
      lazyLoad: true,
      vertical: false,
      verticalSwiping: false,
      responsive: [{
        breakpoint: 360,
        sliderConfig: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      }],
    };
    return sliderConfig;
  }

  createSlide(item, index) {
    let NormalTrayItem ={
      MediaTypeID: item.mediaType,
      RefSeriesTitle: "",
      Season: item.season,
      SeriesMainTitle: item.seriesMainTitle,
      genre: item.genre,
      imgURL: item.imgURL,
      imgURLL: item.imgURL,
      imgURLM: item.imgURLM,
      imgURLS: item.imgURLS,
      mediaId: item.mId,
      sbu: item.sbu,
      contentType:item.contentType,
    };

    return (
      <div key={index} className='card-item'>
        <NormalCard aspectRatio={this.props.aspectRatio} onClick={()=>this.routeTo(item)} data={item} item={item} isTitleMultiLine={this.props.isTitleMultiLine} />
      </div>
    );
  }

  routeTo = (item) => {
    if(item.mediaType && item.contentType && (item.contentType !='Full Episode' && item.mediaType==MEDIA_TYPE.EPISODE)){
      // Please don't delete this line
      this.context.router.push(`/clip/${createRouteString(item.mediaMainTitle)}/${item.mId}`);
      //this.context.router.push(`/shows/${createRouteString(item.refSeriesTitle)}/${createRouteString(item.refSeriesSeason)}/${createRouteString(item.refSeriesId)}/${createRouteString(item.mediaMainTitle)}/${item.mId}`);
    }else{
      if(item.mediaType && (item.mediaType==MEDIA_TYPE.EPISODE)){
        this.context.router.push(`/shows/${createRouteString(item.refSeriesTitle)}/${createRouteString(item.refSeriesSeason)}/${createRouteString(item.refSeriesId)}/${createRouteString(item.mediaMainTitle)}/${item.mId}`);
      }
      if(item.MediaTypeID && (item.MediaTypeID!=MEDIA_TYPE.TV_SERIES)){
        this.context.router.push(`/shows/${createRouteString(item.name)}/${createRouteString(item.refSeriesSeason)}/${createRouteString(item.refSeriesId)}/${createRouteString(item.mediaMainTitle)}/${item.mId}`);
      }
      if(item.mediaType && (item.mediaType==MEDIA_TYPE.TV_SERIES)){
        const pathname = `/shows/${createRouteString(item.seriesMainTitle)}/${createRouteString(item.season)}/${createRouteString(item.mId)}`;
        const newPath = checkUrl(pathname);
        if(typeof newPath === "object" && typeof newPath.url !== "undefined" && typeof newPath.url !== "undefined" && typeof newPath.mediaId !== "undefined"){
          this.context.router.push(newPath.url);
        }else{
          this.context.router.push(pathname);
        }
      }
    }
  };

  render() {
    const items = this.props.item;

    let sliderConfig = this.setSliderConfig(),
      normalTray = items.list && items.list.map && items.list.map(this.createSlide);

    return (
      <div className={'section ' + (items.mName)}>
        <CardTopHeading items={items} />
        <div className='tray-container clearfix'>
          <Slider {...sliderConfig}>
            {normalTray}
          </Slider>
        </div>
      </div>
    );
  }
}

NormalTray.propTypes = {
  item: React.PropTypes.object.isRequired,
  isTitleMultiLine: React.PropTypes.bool,
  aspectRatio: React.PropTypes.string,
};

NormalTray.contextTypes = {
  router: React.PropTypes.object.isRequired,
  aspectRatio: React.PropTypes.string,
};

export default NormalTray;
