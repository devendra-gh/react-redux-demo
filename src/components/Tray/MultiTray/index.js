import React, {Component} from 'react';
import Slider from 'react-slick-3';
import SquareCard from '../../CardLayout/SquareCard';
import NormalCard from '../../CardLayout/NormalCard';
import CardTopHeading from '../../CardComponent/CardTopHeading';
import NextArrow from '../../CardComponent/SliderArrow/NextArrow';
import PrevArrow from '../../CardComponent/SliderArrow/PrevArrow';
import {MEDIA_TYPE} from '../../../constants/media';
import {createRouteString} from '../../../util/routeCreater';

class MultiTray extends Component {
  constructor(props) {
    super(props);

    this.createSlides = this.createSlides.bind(this);
    this.setSliderConfig = this.setSliderConfig.bind(this);
    this.createSubSlides = this.createSubSlides.bind(this);
    this.setSubSliderConfig = this.setSubSliderConfig.bind(this);
    this.setTitleMultiLine = this.setTitleMultiLine.bind(this);
  }

  setSliderConfig(){
    let sliderConfig = {
      dots: false,
      infinite: false,
      arrows: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,

      touchMove: false,
      swipeToSlide: false,
      swipe: false,

      lazyLoad: true,
      vertical: false,
      verticalSwiping: false,

      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
    return sliderConfig;
  }


  setSubSliderConfig(){
    let subSliderConfig = {
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
    return subSliderConfig;
  }

  createSlides(slide, index){
    const subSliderConfig = this.setSubSliderConfig();
    let subSlides = slide.list.map(this.createSubSlides);

    return (
      <div key={index} className='card-item'>
        <div onClick={()=>this.routeToFirstVideo(slide)} data={slide} className='parent-card'>
          <SquareCard aspectRatio={this.setAspectRatio(this.props.item.mName)} items={slide} isTitleMultiLine={this.setTitleMultiLine(this.props.item.mName)} />
        </div>
        <div className='sub-card-holder'>
          <Slider {...subSliderConfig}>
            {subSlides}
          </Slider>
        </div>
      </div>
    );
  }

  createSubSlides(subSlide, index){
    return(
      <div key={index} className='card-item'>
        <NormalCard onClick={()=>this.routeToSelectedVideo(subSlide)} data={subSlide} aspectRatio={this.props.aspectRatio} item={subSlide} isTitleMultiLine={this.setTitleMultiLine(this.props.item.mName)} />
      </div>
    );
  }

  // route function for clicking on large image, will nevigate to first video in lint available.
  routeToFirstVideo = (slide) => {
    if (slide && slide.list[0] && slide.list[0].contentType != 'Full Episode' && slide.list[0].mediaType == MEDIA_TYPE.EPISODE) {
      this.context.router.push(`/clip/${createRouteString(slide.list[0].refSeriesTitle)}/${slide.list[0].mId}`);
    } else if (slide && slide.list[0] && (slide.list[0].mediaType == MEDIA_TYPE.EPISODE)) {
      this.context.router.push(`/shows/${createRouteString(slide.list[0].refSeriesTitle)}/${createRouteString(slide.list[0].refSeriesSeason)}/${createRouteString(slide.list[0].refSeriesId)}/${createRouteString(slide.list[0].mediaMainTitle)}/${slide.list[0].mId}`);
    }
  };

  // route function for clicking on selected video form list, will nevigate to selected video in lint available.
  routeToSelectedVideo = (subSlide) => {
    if (subSlide && subSlide.contentType != 'Full Episode' && subSlide.mediaType == MEDIA_TYPE.EPISODE) {
      this.context.router.push(`/clip/${createRouteString(subSlide.refSeriesTitle)}/${subSlide.mId}`);
    } else if (subSlide && (subSlide.mediaType == MEDIA_TYPE.EPISODE)) {
      this.context.router.push(`/shows/${createRouteString(subSlide.refSeriesTitle)}/${createRouteString(subSlide.refSeriesSeason)}/${createRouteString(subSlide.refSeriesId)}/${createRouteString(subSlide.mediaMainTitle)}/${subSlide.mId}`);
    }
  };

  setTitleMultiLine(flag){
    if(flag === 'celebritySpotlight'){
      return false;
    }
  }

  setAspectRatio(flag){
    if(flag === 'celebritySpotlight'){
      return '1x1';
    }
    return '16x9';
  }


  render() {
    const item = this.props.item;
    let sliderConfig = this.setSliderConfig(),
      slides = item.list.map(this.createSlides);

    return (
      <div className={'section ' + (item.mName)}>
        <CardTopHeading items={item} />
        <div className='tray-container clearfix'>
          <Slider {...sliderConfig}>
            {slides}
          </Slider>
        </div>
      </div>
    );
  }
}

MultiTray.propTypes = {
  item: React.PropTypes.object.isRequired,
  aspectRatio: React.PropTypes.string,
};

MultiTray.contextTypes = {
  router: React.PropTypes.object.isRequired,
  aspectRatio: React.PropTypes.string,
};

export default MultiTray;
