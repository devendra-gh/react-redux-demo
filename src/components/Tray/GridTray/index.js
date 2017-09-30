import React, {Component} from 'react';
import Slider from 'react-slick-3';
import CardTopHeading from '../../CardComponent/CardTopHeading';
import SimpleCard from '../../CardLayout/SimpleCard';
import {createRouteString} from '../../../util/routeCreater';
import {MEDIA_TYPE} from '../../../constants/media';
import {checkUrl} from '../../../util/routeCreater';


class GridTray extends Component {
  constructor(props) {
    super(props);

    this.setSliderConfig = this.setSliderConfig.bind(this);
    this.createGridTray = this.createGridTray.bind(this);
    this.createSlide = this.createSlide.bind(this);
  }

  setSliderConfig() {
    let sliderConfig = {
      dots: false,
      arrows: false,
      infinite: false,
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


  createSlide(item, index){
    return(
      <div key={index} className='card-item'>
        <SimpleCard aspectRatio={this.props.aspectRatio} onClick={()=>this.routeTo(item)} data={item} items={item} componentFlag={this.props.item.mName} />
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




  createGridTray(slide, index){
    if(index % 2 === 0){
      return(
        <div key={index}>
          {this.createSlide(slide)}
        </div>
      );
    } else {
      return(
        <div key={index}>
          <div className='slider-grid-item clearfix'>
            <div className='slider-grid-col list1'>
              {slide.list1.map(this.createSlide)}
            </div>
            <div className='slider-grid-col list2'>
              {slide.list2.map(this.createSlide)}
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    const items = this.props.item;

    let sliderConfig = this.setSliderConfig(),
      sliderItem = [],
      list = items.list,
      sliderLength = list.length,
      arrItem = [],
      fourItem = [];

    list.map(function (item, index) {
      if(index % 5 === 0){
        if(fourItem.length){
          arrItem.push(fourItem);
          fourItem = [];
        }
        arrItem.push(item);
      } else {
        if(index === (sliderLength - 1)){
          fourItem.push(item);
          arrItem.push(fourItem);
          fourItem = [];
        } else {
          fourItem.push(item);
        }
      }
    });

    arrItem.map(function (items, indexes) {
      if(indexes % 2 === 0){
        sliderItem.push(items);
      } else {
        sliderItem.push(createSubSliderItem(items));
      }
    });

    function createSubSliderItem(subSliderItem) {
      let subItem = {
        list1: [],
        list2: [],
      };
      subSliderItem.map(function (item, index) {
        if (index < 2) {
          subItem.list1.push(item);
        }
        else {
          subItem.list2.push(item);
        }
      });
      return subItem;
    }


    let gridTray = sliderItem.map(this.createGridTray);

    return (
      <div className={'section ' + (items.mName)}>
        <CardTopHeading items={items} />
        <div className='tray-container clearfix'>
          <Slider {...sliderConfig}>
            {gridTray}
          </Slider>
        </div>
      </div>
    );
  }
}

GridTray.propTypes = {
  item: React.PropTypes.object.isRequired,
  aspectRatio: React.PropTypes.string,
};

GridTray.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default GridTray;
