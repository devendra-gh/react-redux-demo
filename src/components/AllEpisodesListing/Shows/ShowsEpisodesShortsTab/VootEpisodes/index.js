import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setLoader, setSmallLoader} from '../../../../../actions/loader';
import {getAllShowsEpisodesData, appendAllShowsEpisodesData, clearAllShowsEpisodesData,setEpisodePosterRoute} from '../../../../../actions/shows';
import {SHOWS} from '../../../../../constants/showsActionConstants';
import endpoints from '../../../../../endpoints/shows';
import {formDataGenerator} from '../../../../../util/formDataGenerator';
import {episodeSearchAssetsApiFilter, episodeSearchMediaApiFilter, applyPageIndexFilter, checkPropertyInArray} from '../../../../../util/mapingFilters';
import {getImageUrlMap} from '../../../../../util/getShowDetails';
import {createRouteString,checkUrl} from '../../../../../util/routeCreater';
import DefaultCard from '../../../../CardLayout/DefaultCard';


import clone from 'clone';
import _ from 'lodash';

const SEARCH_MEDIA_API_FILTER = clone(SHOWS.EPISODES.ALL_EPISODES.SEARCH_MEDIA_DEFAULT_FILTERS);
const SEARCH_ASSETS_API_FILTER = clone(SHOWS.EPISODES.ALL_EPISODES.SEARCH_ASSESTS_DEFAULT_FILTERS);

class VootEpisodes extends Component {
  constructor(props) {
    super(props);
    const {params:{seriesMainTitle, season, mediaId}} = this.props;
    this.state = {
      filters : SEARCH_MEDIA_API_FILTER,
      toggle: 0,
      seriesMainTitle,
      season,
      mediaId,
    };
  }

  componentWillMount() {
    const {getAllShowsEpisodesData,setSmallLoader, episodes: {data}, params: {seriesMainTitle, season, mediaId}} = this.props;
    //getAllShowsEpisodesData(endpoints.searchAssets, formDataGenerator(episodeSearchAssetsApiFilter(SEARCH_ASSETS_API_FILTER, seriesMainTitle, metas)));
    setSmallLoader(true);
    getAllShowsEpisodesData(endpoints.searchMediaByAndOrList, formDataGenerator(episodeSearchMediaApiFilter(this.state.filters, seriesMainTitle, season)), ()=>{
      const {episodes: {data}, setEpisodePosterRoute} = this.props;
      const {toggle} = this.state;
      if(!toggle){
        let show = data[0];
        let url = (`/shows/${createRouteString(seriesMainTitle)}/${season}/${mediaId}/${createRouteString(checkPropertyInArray(show.Metas, 'EpisodeMainTitle'))}/${show.MediaID}`);
        setEpisodePosterRoute(url);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const {params: {seriesMainTitle, season, mediaId}} = nextProps;
    if((seriesMainTitle!==this.state.seriesMainTitle && mediaId!==this.state.mediaId) || season!==this.state.season){
      const {getAllShowsEpisodesData, setSmallLoader, clearAllShowsEpisodesData} = this.props;
      clearAllShowsEpisodesData();
      this.setState({
        seriesMainTitle,
        season,
        mediaId,
        toggle: 0,
      });
      setSmallLoader(true);
      getAllShowsEpisodesData(endpoints.searchMediaByAndOrList,formDataGenerator(episodeSearchMediaApiFilter(SEARCH_MEDIA_API_FILTER,seriesMainTitle, season)), ()=>{
        const {episodes: {data}, setEpisodePosterRoute} = this.props;
        let show = data[0];
        let url = (`/shows/${createRouteString(seriesMainTitle)}/${season}/${mediaId}/${createRouteString(checkPropertyInArray(show.Metas, 'EpisodeMainTitle'))}/${show.MediaID}`);
        setEpisodePosterRoute(url);
      });
    }
  }

  componentWillUnmount() {
    const {clearAllShowsEpisodesData} = this.props;
    clearAllShowsEpisodesData();
  }


  orderByMostPopular = () => {
    const {toggle} = this.state;
    if(!toggle){
      const {clearAllShowsEpisodesData, getAllShowsEpisodesData, setSmallLoader, metas,  params: {seriesMainTitle}} = this.props;
      clearAllShowsEpisodesData();
      setSmallLoader(true);
      getAllShowsEpisodesData(endpoints.searchAssets, formDataGenerator(episodeSearchAssetsApiFilter(SEARCH_ASSETS_API_FILTER, seriesMainTitle, metas)));
      this.setState({
        toggle: 1,
        filters: SEARCH_ASSETS_API_FILTER,
      });
    }
  };

  orderByMostRecent = () => {
    const {toggle} = this.state;
    if(toggle) {
      const {clearAllShowsEpisodesData, getAllShowsEpisodesData, setSmallLoader, params: {seriesMainTitle, season}} = this.props;
      clearAllShowsEpisodesData();
      setSmallLoader(true);
      getAllShowsEpisodesData(endpoints.searchMediaByAndOrList, formDataGenerator(episodeSearchMediaApiFilter(SEARCH_MEDIA_API_FILTER, seriesMainTitle, season)));
      this.setState({
        toggle: 0,
        filters: SEARCH_MEDIA_API_FILTER,
      });
    }
  };

  loadMore = () => {
    const {appendAllShowsEpisodesData, setSmallLoader} = this.props;
    const {filters, toggle}=this.state;

    let filterArr = formDataGenerator(applyPageIndexFilter(filters));
    setSmallLoader(true);
    if(toggle)
      appendAllShowsEpisodesData(endpoints.searchAssets, filterArr);
    else
      appendAllShowsEpisodesData(endpoints.searchMediaByAndOrList, filterArr);
  };

  routeToAllShowsEpisodes = (show) => {
    const {params: {seriesMainTitle, season, mediaId}, episodesCount} = this.props;
    const {toggle} = this.state;
    if(toggle){
      this.context.router.push(`/shows/${createRouteString(seriesMainTitle)}/${season}/${mediaId}/${createRouteString(show.metas.EpisodeMainTitle)}/${show.id}`);
    }else {
      this.context.router.push(`/shows/${createRouteString(seriesMainTitle)}/${season}/${mediaId}/${createRouteString(checkPropertyInArray(show.Metas, 'EpisodeMainTitle'))}/${show.MediaID}`);
    }
  };

  getEpisodeList = (episodes) => {
    let episodeList = '';

    const {toggle} = this.state;
    const {params: {seriesMainTitle, season, mediaId}, setEpisodePosterRoute} = this.props;

    if (episodes.length)
      episodeList = episodes.map((show, key) => {
        let items={};
        if(toggle){
          if(show.images){
            items.mediaMainTitle = show.name;
            items.imgURLL = show.images[1].url;
            items.imgURLM = show.images[3].url;
            items.imgURLS = show.images[4].url;
            items.duration = show.metas.ContentDuration;
            items.episodeNo = show.metas.EpisodeNo;
            items.telecastDate = show.metas.TelecastDate;
          }
        }else {
          if(show.Pictures){
            items = getImageUrlMap(show.Pictures);
            items.seriesMainTitle = show.MediaName;
            items.duration = show.Duration * 1000;
            items.episodeNo = checkPropertyInArray(show.Metas, 'EpisodeNo');
            items.telecastDate = checkPropertyInArray(show.Metas, 'TelecastDate');
            items.releaseYear = checkPropertyInArray(show.Metas, 'ReleaseYear');
          }
        }

        return (
          <div key={key} className='grid-view grid-2'>
            <DefaultCard aspectRatio='16x9' onClick={()=>this.routeToAllShowsEpisodes(show)} data={show} key={key} items={items} showPlayIcon />
          </div>
        );
      });

    return episodeList;
  };

  render() {
    const {episodes: {data}, loader, episodesCount,smallLoader} = this.props;
    const {toggle} = this.state;

    return (
      <div>
        <div className='top-heading filter-center'>
          <div className='heading-inner'>
            {
              data.length ?
                <div className='section text-center'>
                  <div className='order-filter'>
                    <button className={` ${toggle ?' most-popular-btn' : 'most-popular-btn active'}`} onClick={this.orderByMostRecent}>Most Recent</button>
                    <button className={` ${toggle ? ' most-popular-btn active' : 'most-popular-btn'}`} onClick={this.orderByMostPopular}>Most Popular</button>
                  </div>
                </div> : null
            }
          </div>
        </div>
        <div className='grid-container clearfix'>
          {this.getEpisodeList(data)}
        </div>
        {!smallLoader.load  && data.length<episodesCount && data.length ?
          <div className='section text-center'>
            <button className='load-more' onClick={this.loadMore}>Load More Episodes</button>
          </div> : null
        }
        {
          smallLoader.load && <div className='small-loader'></div>
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: bindActionCreators(setLoader, dispatch),
    setSmallLoader: bindActionCreators(setSmallLoader, dispatch),
    getAllShowsEpisodesData: bindActionCreators(getAllShowsEpisodesData, dispatch),
    appendAllShowsEpisodesData: bindActionCreators(appendAllShowsEpisodesData, dispatch),
    clearAllShowsEpisodesData: bindActionCreators(clearAllShowsEpisodesData, dispatch),
    setEpisodePosterRoute: bindActionCreators(setEpisodePosterRoute, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
 // console.log('state',state);
  return {
    loader: state.loader,
    episodes : state.shows.episodes.allEpisodes,
    params: ownProps.params,
    episodesCount: ownProps.episodesCount,
    metas: ownProps.metas,
    smallLoader: state.smallLoader,
  };
};

VootEpisodes.propTypes = {
  setLoader: PropTypes.func.isRequired,
  setSmallLoader: PropTypes.func.isRequired,
  appendAllShowsEpisodesData: PropTypes.func.isRequired,
  getAllShowsEpisodesData: PropTypes.func.isRequired,
  clearAllShowsEpisodesData: PropTypes.func.isRequired,
  setEpisodePosterRoute: PropTypes.func.isRequired,
  loader: PropTypes.object.isRequired,
  smallLoader: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  episodes: PropTypes.object.isRequired,
  metas: PropTypes.array.isRequired,
  episodesCount: PropTypes.number,
};

VootEpisodes.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(VootEpisodes);
