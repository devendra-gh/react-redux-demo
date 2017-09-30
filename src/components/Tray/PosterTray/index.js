import React, {Component} from 'react';
import Slider from 'react-slick-3';
import CardTopHeading from '../../CardComponent/CardTopHeading';
import PosterCard from '../../CardLayout/PosterCard';
import {createRouteString} from '../../../util/routeCreater';
import {getMediaInfo} from '../../../actions/playlist';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setLoader} from '../../../actions/loader';

let self;
class PosterTray extends Component {
  constructor(props) {
    super(props);

    this.setSliderConfig = this.setSliderConfig.bind(this);
    this.createPosterSlide = this.createPosterSlide.bind(this);
    self = this;
  }

  setSliderConfig() {
    let sliderConfig = {
      dots: false,
      arrows: false,
      infinite: false,
      centerMode: true,
      centerPadding: '0px',
      speed: 500,
      slidesToShow: 1.5,
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

  createPosterSlide(poster, index) {
    return (
      <div key={index} className='card-item'>
        <PosterCard
          aspectRatio={this.props.aspectRatio}
          onClick={()=>this.routeTo(poster, this.props.item.mName)}
          data={poster}
          mName={this.props.item.mName}
          mediaType={poster.mediaType}
          poster={poster} />
      </div>
    );
  }

  routeTo = (poster, mName) => {
    if(mName != 'kidsMovies') {
      self.props.setLoader(true);
      self.props.getMediaInfo({mediaId: poster.mId}, function () {
        self.context.router.push(`/movie/${createRouteString(poster.mediaMainTitle || poster.MediaName)}/${poster.mId}`);
      });
    }
    else {
      this.context.router.push(`kids/movie/${createRouteString(poster.mediaMainTitle || poster.MediaName)}/${poster.mId}`);
    }
  };


  render() {
    const posterItem = this.props.item,
      sliderConfig = this.setSliderConfig();

    let posterTray = posterItem.list && posterItem.list.map(this.createPosterSlide);

    return (
      <div className={'section ' + (posterItem.mName)}>
        <CardTopHeading items={posterItem} />
        <div className='tray-container clearfix'>
          <Slider {...sliderConfig}>
            {posterTray}
          </Slider>
        </div>
      </div>
    );
  }
}

PosterTray.propTypes = {
  item: React.PropTypes.object.isRequired,
  aspectRatio: React.PropTypes.string,
  getMediaInfo: React.PropTypes.func.isRequired,
  setLoader: React.PropTypes.func.isRequired,
  loader: React.PropTypes.object.isRequired,
};

PosterTray.contextTypes = {
  router: React.PropTypes.object.isRequired,
  aspectRatio: React.PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMediaInfo: bindActionCreators(getMediaInfo, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    loader: state.loader,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PosterTray);
