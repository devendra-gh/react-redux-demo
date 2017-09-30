import React, {Component} from 'react';
import Slider from 'react-slick-3';
import HeadCard from '../../CardLayout/HeadCard';
import {MEDIA_TYPE} from '../../../constants/media';
import {createRouteString,checkUrl} from '../../../util/routeCreater';
import { browserHistory } from 'react-router';

class HeadTray extends Component {
  constructor(props) {
    super(props);

    this.setSliderConfig = this.setSliderConfig.bind(this);
    this.createHeadTray = this.createHeadTray.bind(this);
  }

  setSliderConfig() {
    let sliderConfig = {
      autoplay: true,
      infinite: true,
      swipe: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      speed: 500,
      autoplaySpeed: 3000,
      lazyLoad: false,
      vertical: false,
      verticalSwiping: false,
    };
    return sliderConfig;
  }

  externalURL(rURL){
    if(rURL.indexOf('http') ==-1 ){
      rURL = 'https://'+rURL;
    }
    return rURL;
  }

  createHeadTray(slide, index) {
    let html;
    if (slide.externalSource == 1){
      html = (<a href={this.externalURL(slide.rURL)}><HeadCard aspectRatio={this.props.aspectRatio} data={slide} items={slide} isTitleMultiLine={false} noPlayIcon={this.props.noPlayIcon} /></a>);
    }
    else
      html = <HeadCard aspectRatio={this.props.aspectRatio} onClick={()=>this.routeTo(slide)} data={slide} items={slide} isTitleMultiLine={false} noPlayIcon={this.props.noPlayIcon} />;

    return (
      <div key={index} className='card-item'>
        {html}
      </div>
    );
  }

  routeTo = (slide) => {
      if(slide.mediaType && slide.contentType && (slide.contentType !='Full Episode' && slide.mediaType==MEDIA_TYPE.EPISODE)){
        // Please don't delete this line
        this.context.router.push(`/clip/${createRouteString(slide.mediaMainTitle)}/${slide.mId}`);
        //this.context.router.push(`/shows/${createRouteString(item.refSeriesTitle)}/${createRouteString(item.refSeriesSeason)}/${createRouteString(item.refSeriesId)}/${createRouteString(item.mediaMainTitle)}/${item.mId}`);
      }else if(slide.mediaType==MEDIA_TYPE.MOVIE) {
        this.context.router.push(`/movie/${createRouteString(slide.mediaMainTitle)}/${slide.mId}`);
      }else if(slide.mediaType==MEDIA_TYPE.TV_SERIES && slide.contentType=='Series'){
        let season = slide.season;
        if(season=='undefined' || !season)
          season = slide.refSeriesSeason;

        const pathname = `/shows/${createRouteString(slide.mediaMainTitle)}/${season}/${slide.mId}`;

        const newPath = checkUrl(pathname);
        if(typeof newPath === "object" && typeof newPath.url !== "undefined" && typeof newPath.url !== "undefined" && typeof newPath.mediaId !== "undefined"){
          this.context.router.push(newPath.url);
        }else{
          this.context.router.push(pathname);
        }
      }// else {
      //   this.context.router.push(`/shows/${createRouteString(slide.mediaMainTitle)}/${slide.mId}`);
      // }
      else if(slide.mediaType && (slide.mediaType==MEDIA_TYPE.EPISODE && slide.contentType =='Full Episode')) {
        this.context.router.push(`/shows/${createRouteString(slide.refSeriesTitle)}/${createRouteString(slide.refSeriesSeason)}/${createRouteString(slide.refSeriesId)}/${createRouteString(slide.mediaMainTitle)}/${slide.mId}`);
      }

  };

  render() {
    const items = this.props.item;

    let sliderConfig = this.setSliderConfig(),
      headTray = items && items.list && items.list.map(this.createHeadTray);

    return (
      <div className={'section ' + (items.mName)}>
        <div className='tray-container clearfix'>
          {
            items.list.length === 1 ?
              headTray :
              <Slider {...sliderConfig}>
                {headTray}
              </Slider>
          }
        </div>
      </div>
    );
  }
}

HeadTray.propTypes = {
  item: React.PropTypes.object.isRequired,
  noPlayIcon: React.PropTypes.bool,
  aspectRatio: React.PropTypes.string,
};

HeadTray.contextTypes = {
  router: React.PropTypes.object.isRequired,
  aspectRatio: React.PropTypes.string,
};

export default HeadTray;
