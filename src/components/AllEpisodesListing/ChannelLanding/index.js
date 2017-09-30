import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import endpoints from '../../../endpoints/channels';
import endpoints1 from '../../../endpoints/shows';
import {getChannelLanding, getMoreShows, appendMoreShows} from '../../../actions/channels';
import {getTvShowsData, appendTvShowsData, clearTvShowsErrors, clearTvSeriesData} from '../../../actions/shows';
import {setLoader} from '../../../actions/loader';
import HeadTray from '../../Tray/HeadTray';
import ChannelTray from '../../Tray/ChannelTray';
import {createRouteString} from '../../../util/routeCreater';
import {formDataGenerator} from '../../../util/formDataGenerator';
import {CHANNEL} from '../../../constants';
import {MEDIA_TYPE} from '../../../constants/media';
import EpisodeDefaultCard from '../../CardLayout/EpisodeDefaultCard';
import {applyPageIndexFilter} from '../../../util/mapingFilters';
import {Link} from 'react-router';
import {getChannels, resetChannelDetails, resetChannelShowMoreDetails} from '../../../actions/channels';

const mapSbu = (arr,sbu) => {
  arr.map((item,key)=>{
    if(item.key==='filter')
      item.value = `(and sbu='${sbu}')`;

    if(item.key==='pageIndex')
      item.value = 0;
  });
  return arr;
};

class ChannelLanding extends Component {
  constructor(props) {
    super(props);
    const {params:{channelName}} = this.props;
    this.state = {
      data: CHANNEL.LANDING.MORE_SHOWS_FILTERS1,
      channelName,
      displayChannelSlider : true,
      channelFilter: [
        // {
        //   "key": "language",
        //   "value": "Hindi, English",
        // },
        {
          "key": "sbu",
          "value": channelName,
        },
        {
          "key": "pageSize",
          "value": "6",
        },
        {
          "key": "pageIndex",
          "value": "0",
        },
        // {
        //   "key": "isVO",
        //   "value": "1",
        // },
      ],
    };
  }

  componentWillMount() {
    const {getTvShowsData,getChannelLanding, getMoreShows, getChannels, setLoader, loader, params:{channelName}, channel:{home, landing:{headCarousel, moreShows, error}}} = this.props;
    let self = this;
    setLoader(true);
    // getChannelLanding(endpoints.channelHome,{sbu:channelName});
    getTvShowsData(endpoints1.popularShowsList, formDataGenerator(this.state.channelFilter));

    // getMoreShows(endpoints.moreShows, formDataGenerator(mapSbu(this.state.data,channelName)), function () {
    //   self.setState({
    //     displayChannelSlider : true,
    //   });
    // });

    if (!home.list.length) {
      getChannels(endpoints.home);
    }

  }

  componentWillReceiveProps(nextProps) {
    const {params:{channelName}} = nextProps, self = this;

    if(this.state.channelName !== channelName){
      this.setState({
        channelName: nextProps.params.channelName,
        displayChannelSlider : true,
        channelFilter: [
          {
            "key": "sbu",
            "value": nextProps.params.channelName,
          },
          {
            "key": "pageSize",
            "value": "6",
          },
          {
            "key": "pageIndex",
            "value": "0",
          }
        ],
      });
      const {getTvShowsData,setLoader} = this.props;
      setLoader(true);
      getTvShowsData(endpoints1.popularShowsList, formDataGenerator([
        {
          "key": "sbu",
          "value": nextProps.params.channelName,
        },
        {
          "key": "pageSize",
          "value": "6",
        },
        {
          "key": "pageIndex",
          "value": "0",
        }
      ]));
      // getMoreShows(endpoints.moreShows, formDataGenerator(mapSbu(this.state.data,channelName)), function () {
      //   self.setState({
      //     displayChannelSlider : true,
      //   });
      // });
      // getChannelLanding(endpoints.channelHome,{sbu:channelName});
    }
  }

  componentWillUnmount() {
    this.props.resetChannelShowMoreDetails();
    this.props.resetChannelDetails();
    const {clearTvShowsErrors, tvSeries, clearTvSeriesData} = this.props;
    const {data, toggle}=this.state;
    if (tvSeries.error.message) {
      clearTvShowsErrors();
    }
    clearTvSeriesData();
  }


  getShowList = (moreShows) => {
    let showList = '';
    if (moreShows && moreShows.data && moreShows.data.length)
      showList = moreShows.data.map((show, key) => {
        let items = {
          mediaId:show.id,
          mediaTypeId:show.type,
          name: show.metas.SeriesMainTitle,
          metas:show.metas,
          imgURLL: show.images[1].url,
          imgURLM: show.images[3].url,
          imgURLS: show.images[4].url,
          genre: [show.metas.SBU, show.tags.Genre[0]],
          //videos: show.metas.Season,
          videos: (show.assetsCount && show.assetsCount.episode) ? show.assetsCount.episode : null,
          episodes: show.assetsCount ? show.assetsCount.episode: null,
        };

        if (show.tags.Genre[0] == 'Kids' || show.tags.Genre[0] == 'Kid')
          return (
            <EpisodeDefaultCard aspectRatio='16x9' onClick={()=> {
              this.routeChannelLandingToKidsCharacter(items);}} data={items} key={key} items={items} />
          );
        else
          return (
            <EpisodeDefaultCard aspectRatio='16x9' onClick={()=> {
              this.routeChannelLandingToShowLanding(items);}} data={items} key={key} items={items} />
          );
      });

    return showList;
  };

  routeChannelLandingToShowLanding = (item) => {
    if (item && item.mediaTypeId && item.mediaTypeId == MEDIA_TYPE.TV_SERIES) {
      this.context.router.push(`/shows/${createRouteString(item.metas.SeriesMainTitle)}/${createRouteString(item.metas.Season)}/${createRouteString(item.mediaId)}`);
    }
  };

  routeChannelLandingToKidsCharacter = (item) => {
    if (item && item.mediaTypeId && item.mediaTypeId == MEDIA_TYPE.TV_SERIES) {
      this.context.router.push(`/kids/characters/${createRouteString(item.metas.SeriesMainTitle)}/${createRouteString(item.mediaId)}`);
    }
  };

  loadMore = () => {
    const {appendTvShowsData, appendMoreShows, setLoader} = this.props;
    const {channelFilter}=this.state;
    setLoader(true);
    // appendMoreShows(endpoints.moreShows, formDataGenerator(applyPageIndexFilter(data)));
    appendTvShowsData(endpoints1.popularShowsList, formDataGenerator(applyPageIndexFilter(channelFilter)));
  };

  getSbuValue=(item)=>{
    const SBU=this.props.SBU_LIST;
    if(SBU && item){
      for (let i in SBU) {
        if (i==item.toUpperCase()) {
          let sbu=SBU[i];
          return sbu;
        }
      }
    }
  };

  render() {
    const {channel: {home, landing:{headCarousel, moreShows, error}}, params:{channelName}, loader, tvSeries:{showData}} = this.props;

    let channelsCarousel, showLoadButton = true;
    channelsCarousel = {
      list : home.list.filter(function (item) {
        if(item.sbu != channelName.toUpperCase()) {
          return true;
        }
      }),
    };

    if(showData.data.length == 0 || (showData && showData.data && showData.data.length >= showData.dataCount)) {
      showLoadButton = false;
    }

    return (
      <div className='home-container channel-landing'>
        <div className='sbuName-section'>
          <Link to='/channels'>
            <span className='left-arrow'><i className='icon-left-thin'></i></span>
          </Link>
          <h1 className='sbuName'>{this.getSbuValue(channelName)}</h1>
        </div>

        {headCarousel && headCarousel.list
          ? <HeadTray aspectRatio='16x9' item={headCarousel} />
          : false
        }

        {this.state.displayChannelSlider &&
          <div className='top-heading'>
            <div className='heading-inner'>
              <div className='tray-heading default-color'><h2>More Shows</h2></div>
            </div>
          </div>
        }

        {(!showData && !showData.data && !showData.data.length && !error.message && !loader.load) ? <div className='small-loader'></div>:
          !showData && !showData.data && !showData.data.length && error.message
          ? <div className='section text-center'>No Results Found!</div>
          : <div>
            <div className='grid-container clearfix grid-shows'>
              {this.getShowList(showData)}
            </div>

            {(!loader.load && showLoadButton === true) ?
              <div className='section text-center'>
                <button className='load-more' onClick={this.loadMore}>Load More Shows</button>
              </div> : null
            }
          </div>
        }

        {
          loader.load && <div className='small-loader'></div>
        }

        {this.state.displayChannelSlider && channelsCarousel.list.length > 0?
          <div className='channels'>
            <ChannelTray aspectRatio='1x1' item={channelsCarousel} isChannelLanding disableLazyLoading />
          </div> : false
        }

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getChannelLanding: bindActionCreators(getChannelLanding, dispatch),
    getMoreShows: bindActionCreators(getMoreShows, dispatch),
    appendMoreShows: bindActionCreators(appendMoreShows, dispatch),
    getChannels: bindActionCreators(getChannels, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
    resetChannelDetails: bindActionCreators(resetChannelDetails, dispatch),
    resetChannelShowMoreDetails: bindActionCreators(resetChannelShowMoreDetails, dispatch),
    getTvShowsData: bindActionCreators(getTvShowsData, dispatch),
    appendTvShowsData: bindActionCreators(appendTvShowsData, dispatch),
    clearTvShowsErrors: bindActionCreators(clearTvShowsErrors, dispatch),
    clearTvSeriesData: bindActionCreators(clearTvSeriesData, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    channel: state.channel,
    loader: state.loader,
    tvSeries: state.shows.tvSeries,
    SBU_LIST: state.config && state.config.config && state.config.config.assets && state.config.config.assets.SBU_LIST ?  state.config.config.assets.SBU_LIST:false,
  };
};

ChannelLanding.propTypes = {
  setLoader: PropTypes.func.isRequired,
  loader: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired,
  getChannelLanding: PropTypes.func.isRequired,
  getMoreShows: PropTypes.func.isRequired,
  resetChannelDetails: PropTypes.func.isRequired,
  resetChannelShowMoreDetails: PropTypes.func.isRequired,
  appendMoreShows: PropTypes.func.isRequired,
  sbu: React.PropTypes.string,
  SBU_LIST: React.PropTypes.object.isRequired,
  getChannels: PropTypes.func.isRequired,
  getTvShowsData: React.PropTypes.func.isRequired,
  appendTvShowsData: React.PropTypes.func.isRequired,
  clearTvShowsErrors: React.PropTypes.func.isRequired,
  clearTvSeriesData: React.PropTypes.func.isRequired,
};

ChannelLanding.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelLanding);
