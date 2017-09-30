import React, {Component} from 'react';
import Slider from 'react-slick-3';
import CardVerticleTitle from '../../CardComponent/CardVerticleTitle';
import CardImage from '../../CardComponent/CardImage';
import {createRouteString} from '../../../util/routeCreater';
import {resetChannelShowMoreDetails, resetChannelDetails} from '../../../actions/channels';
import {clearTvSeriesData} from '../../../actions/shows';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class ChannelTray extends Component {
  constructor(props){
    super(props);

    this.setSliderConfig = this.setSliderConfig.bind(this);
    this.getChannel = this.getChannel.bind(this);
  }

  setSliderConfig(){
    let sliderConfig = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 2,
      autoplay: true,
      lazyLoad: false,
      vertical: false,
      verticalSwiping: false,
      responsive: [
        {breakpoint: 320, settings: {slidesToShow: 2}},
        {breakpoint: 480, settings: {slidesToShow: 3}},
        {breakpoint: 540, settings: {slidesToShow: 4}},
        {breakpoint: 650, settings: {slidesToShow: 5}},
        {breakpoint: 780, settings: {slidesToShow: 6}},
      ],
    };
    return sliderConfig;
  }

  routeToChannelLanding = (channel) => {
    if(this.props.isChannelLanding){
      this.props.clearTvSeriesData();
      this.props.resetChannelShowMoreDetails();
      this.props.resetChannelDetails();
    }
    this.context.router.push(`/channels/${createRouteString(channel.sbu)}`);
  };

  getChannel(channel, index){
    let imageList = {
        imgURLL: channel.logo,
        imgURLM: channel.logoL,
        imgURLS: channel.logoS,
      };

    return(
      <div key={index} onClick={()=>this.routeToChannelLanding(channel)} data={channel} className='card-item'>
        <figure className='figure-block'>
          <CardImage aspectRatio={this.props.aspectRatio} source={imageList} alt={channel.channelName} disableLazyLoading={this.props.disableLazyLoading} />
        </figure>
      </div>
    );
  }

  render() {
    const items = this.props.item;

    let sliderConfig = this.setSliderConfig(),
      channel = items.list.map(this.getChannel);

    return (
      <div className={'section ' + (items.mName)}>
        <div className='tray-container lang-section clearfix'>
          <CardVerticleTitle title={items.title || 'Channels'} />
          <Slider {...sliderConfig}>
            {channel}
          </Slider>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    resetChannelDetails: bindActionCreators(resetChannelDetails, dispatch),
    resetChannelShowMoreDetails: bindActionCreators(resetChannelShowMoreDetails, dispatch),
    clearTvSeriesData: bindActionCreators(clearTvSeriesData, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {};
};


ChannelTray.propTypes = {
  item: React.PropTypes.object.isRequired,
  aspectRatio: React.PropTypes.string,
  resetChannelDetails: React.PropTypes.func.isRequired,
  resetChannelShowMoreDetails: React.PropTypes.func.isRequired,
  isChannelLanding: React.PropTypes.bool,
  disableLazyLoading: React.PropTypes.bool,
  clearTvSeriesData: React.PropTypes.func.isRequired,
};

ChannelTray.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelTray);
