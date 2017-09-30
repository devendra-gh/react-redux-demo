import React, {Component, PropTypes} from 'react';
// import Player from '../index';
import endpoints from '../../../endpoints/playList';
// import {getMediaInfo,relatedMedia, playlist} from '../../../actions/topShout';
import {getTopShout, getTvSeriesTopShout} from '../../../actions/topShout';
// import PlayList from '../PlayList';
import {formDataGenerator} from '../../../util/formDataGenerator';
// import CarouselTray from '../../../components/Tray/CarouselTray';
import {setLoader} from '../../../actions/loader';
import Loader from '../../Loader';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import MetasDesc from '../../CardComponent/MetasDesc';
import {scrollToTop} from '../../../util/helper';


class TopShout extends Component {
  constructor(props) {
    super(props);
    this.state={
      mediaId:this.props.mediaId,
      color: [],
    };
  }
  componentWillMount=()=>{
    let data;
    if(this.props.tvSeries) {
      data = [
        {
          "key": "tvSeriesId",
          "value": this.props.mediaId,
        },
      ];
    }
   else{
     data = [
        {
          "key": "mediaId",
          "value": this.props.mediaId,
        },
      ];
    }
    //this.props.setLoader(true);
    if(typeof window !== "undefined")
      this.props.tvSeries ? this.props.getTvSeriesTopShout(endpoints.tvSeriesTopShout, formDataGenerator(data)): this.props.getTopShout(endpoints.topShout, formDataGenerator(data));
  };

  componentWillReceiveProps(nextProps) {
    let item = [];
    if(nextProps.shoutList.data && nextProps.shoutList.data.list && nextProps.topShout.data.assets && this.props.shoutList && this.props.shoutList.data){
      item=nextProps.shoutList.data.list.filter((item)=>{
        if(item.id == nextProps.topShout.data.assets.TopShoutDetails.topId) {
          return item;
        }
      });
      this.setState({
        color: item[0].color,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if ( prevState.mediaId != this.props.mediaId) {
      this.setState({
        mediaId:this.props.mediaId,
      });
      let data;
      if(this.props.tvSeries) {
        data = [
          {
            "key": "tvSeriesId",
            "value": this.props.mediaId,
          },
        ];
      }
      else{
        data = [
          {
            "key": "mediaId",
            "value": this.props.mediaId,
          },
        ];
      }
      this.props.tvSeries ? this.props.getTvSeriesTopShout(endpoints.tvSeriesTopShout, formDataGenerator(data)): this.props.getTopShout(endpoints.topShout, formDataGenerator(data));
    }
  }

  render() {
    scrollToTop();
    let shoutDetails, shoutColor;
    if(this.props.topShout && this.props.topShout.data && this.props.topShout.data.assets && !this.props.tvSeries) {
      shoutDetails = this.props.topShout.data.assets.TopShoutDetails;
      shoutColor = this.state.color;
    }
    else if(this.props.tvSeries && this.props.tvSeriesTopShout && this.props.tvSeriesTopShout.data && this.props.tvSeriesTopShout.data.assets) {
      shoutDetails = this.props.tvSeriesTopShout.data.assets;
      shoutColor = shoutDetails.color;
    }

    return (
      <div className='shows-shout'>
        {shoutDetails && shoutDetails.topName?
          <div className='popular-shout' style={{background: shoutColor}} >
            <i className='icon-promo' style={{color: shoutColor}} />
            <div className='left-align-content'>
              <span>TOP SHOUT</span>
              <span className='shout-name'>{shoutDetails.topName}</span>
            </div>
          </div> : false}
        <span className='shout-count'> {shoutDetails ? `${shoutDetails.topCount} SHOUTS`: false} </span>
      </div>
    );
  }
}

TopShout.propTypes = {
  getTopShout: React.PropTypes.func.isRequired,
  getTvSeriesTopShout: PropTypes.func.isRequired,
  setLoader: React.PropTypes.func.isRequired,
  params: React.PropTypes.object,
  mediaId: React.PropTypes.string.isRequired,
  topShout: React.PropTypes.object.isRequired,
  tvSeriesTopShout: React.PropTypes.object.isRequired,
  shoutList: React.PropTypes.object.isRequired,
  tvSeries: React.PropTypes.bool.isRequired,

};
const mapDispatchToProps = (dispatch) => {
  return {
    getTopShout: bindActionCreators(getTopShout, dispatch),
    getTvSeriesTopShout:  bindActionCreators(getTvSeriesTopShout, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    topShout: state.topShout.topShout,
    shoutList: state.topShout.shoutList,
    // relatedMedia: state.playlist.getRelatedMedia,
    // playlist: state.playlist.playlist,
    loader: state.loader,
    tvSeriesTopShout: state.topShout.getTvSeriesTopShout,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopShout);
