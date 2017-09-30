import React, {Component} from 'react';
import Slider from 'react-slick-3';
import KidsHeadCard from '../../CardLayout/KidsHeadCard';
import {MEDIA_TYPE} from '../../../constants/media';
import {createRouteString} from '../../../util/routeCreater';
import NextArrow from '../../CardComponent/SliderArrow/NextArrow';
import PrevArrow from '../../CardComponent/SliderArrow/PrevArrow';

class KidsTray extends Component {
  constructor(props) {
    super(props);

    this.setSliderConfig = this.setSliderConfig.bind(this);
    this.createHeadTray = this.createHeadTray.bind(this);
  }

  setSliderConfig() {
    let sliderConfig = {
      autoplay: false,
      infinite: true,
      swipe: true,
      arrows: true,
      lazyLoad: true,
      vertical: false,
      verticalSwiping: false,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
    return sliderConfig;
  }

  createHeadTray(slide, index) {
    const customDescription = slide.episodeCount != undefined ? (slide.desc + " | " + slide.episodeCount + ' Videos') : slide.desc,
      tray = (<KidsHeadCard aspectRatio={this.props.aspectRatio} onClick={()=>this.routeTo(slide)} data={slide} items={slide}
                           isTitleMultiLine={false} customDesc={customDescription}
                           noPlayIcon={slide.mediaType == MEDIA_TYPE.TV_SERIES} />),
      html = (slide.externalSource == 1) ? (<a href={slide.rURL}>{tray}</a>) : tray;

    return (
      <div key={index} className='card-item'>
        {html}
      </div>
    );
  }

  routeTo = (slide) => {
    if (slide.externalSource != 1){
      if(slide.mediaType == MEDIA_TYPE.TV_SERIES){
        this.context.router.push(`/kids/characters/${createRouteString(slide.mediaMainTitle)}/${createRouteString(slide.mId)}`);
      }else{
        const refSeriesId = slide.refSeriesId, seriesMainTitle = slide.refSeriesTitle,
          episodeMainTitle = slide.mediaMainTitle, mId = slide.mId;
        this.context.router.push(`/kids/characters/${createRouteString(seriesMainTitle)}/${refSeriesId}/${createRouteString(episodeMainTitle).replace(/\?/g, '-')}/${mId}`);
      }
    }
  };

  render() {
    const items = this.props.item;

    let sliderConfig = this.setSliderConfig(),
      headTray = items && items.list && items.list.map(this.createHeadTray);

    return (
      <div className={'section ' + (items.mName)}>
        <div className='tray-container clearfix'>
          <Slider {...sliderConfig}>
            {headTray}
          </Slider>
        </div>
      </div>
    );
  }
}

KidsTray.propTypes = {
  item: React.PropTypes.object.isRequired,
  noPlayIcon: React.PropTypes.bool,
  aspectRatio: React.PropTypes.string,
};

KidsTray.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default KidsTray;
