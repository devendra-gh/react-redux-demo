import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setLoader, setSmallLoader} from '../../../../../actions/loader';
import {getAllVootShortsData, appendAllVootShortsData, clearVootShortsData, setAllVootShortsPosterRoute} from '../../../../../actions/shows';
import endpoints from '../../../../../endpoints/shows';
import {formDataGenerator} from '../../../../../util/formDataGenerator';
import DefaultCard from '../../../../CardLayout/DefaultCard';
import {createRouteString} from '../../../../../util/routeCreater';
import {vootShortsSearchAssetsApiFilter, applyPageIndexFilter} from '../../../../../util/mapingFilters';
import {SHOWS} from '../../../../../constants/showsActionConstants';
import _ from 'lodash';
import clone from 'clone';

const SEARCH_ASSETS_API_FILTER = clone(SHOWS.EPISODES.VOOT_SHORTS.SEARCH_ASSESTS_DEFAULT_FILTERS);

class AllVootShorts extends Component {
  constructor(props) {
    super(props);
    const {params: {mediaId, seriesMainTitle}} = this.props;
    this.state = {
      data: clone(SEARCH_ASSETS_API_FILTER),
      mediaId,
      seriesMainTitle,
    };
  }

  componentWillMount() {
    const {getAllVootShortsData, setSmallLoader,  metas,  params: {seriesMainTitle}} = this.props;
    const {data} = this.state;
    setSmallLoader(true);
    getAllVootShortsData(endpoints.searchAssets,formDataGenerator(vootShortsSearchAssetsApiFilter(data, seriesMainTitle, metas)), ()=>{
      const{posterRoute:{episodes, curatedVootShorts}} = this.props;
      if(!episodes && !curatedVootShorts){
        const {vootShorts: {data}, setAllVootShortsPosterRoute} = this.props;
        let short = data[0];
        let url = `/clip/${createRouteString(short.metas.EpisodeMainTitle)}/${short.id}`;
        setAllVootShortsPosterRoute(url);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const {params: {seriesMainTitle, mediaId}, metas, setSmallLoader} = nextProps;
    if(mediaId!==this.state.mediaId || seriesMainTitle!==this.state.seriesMainTitle){
      this.setState({
        mediaId,
        seriesMainTitle,
        data: clone(SEARCH_ASSETS_API_FILTER),
      });
      const {getAllVootShortsData} = this.props;
      setSmallLoader(true);
      getAllVootShortsData(endpoints.searchAssets,formDataGenerator(vootShortsSearchAssetsApiFilter(clone(SEARCH_ASSETS_API_FILTER), seriesMainTitle, metas)), ()=>{
        const {vootShorts: {data}, setAllVootShortsPosterRoute} = this.props;
        let short = data[0];
        let url = `/clip/${createRouteString(short.metas.EpisodeMainTitle.replace(/\?/g, '-'))}/${short.id}`;
        setAllVootShortsPosterRoute(url);
      });
    }
  }

  componentWillUnmount() {
    const {clearVootShortsData} = this.props;
    clearVootShortsData();
  }

  loadMore = () => {
    const {appendAllVootShortsData, setSmallLoader} = this.props;
    const {data}=this.state;

    let filterArr = formDataGenerator(applyPageIndexFilter(data));
    setSmallLoader(true);
    appendAllVootShortsData(endpoints.searchAssets, filterArr);
  };

  routeToVideoPlayPage = (short) => {
    this.context.router.push(`/clip/${createRouteString(short.metas.EpisodeMainTitle.replace(/\?/g, '-'))}/${short.id}`);
  };

  getAllVootShorts = (vootShorts) => {
    let vootShortsList = '';
    if (vootShorts.length)
      vootShortsList = vootShorts.map((show, key) => {
        let items={};

        if (show.images) {
          items.mediaMainTitle = show.metas.EpisodeMainTitle;
          items.imgURLL = show.images[1].url;
          items.imgURLM = show.images[3].url;
          items.imgURLS = show.images[4].url;
          items.duration = show.metas.ContentDuration;
        }

        return (
          <div key={key} className='grid-view grid-2'>
            <DefaultCard aspectRatio='16x9' onClick={()=>this.routeToVideoPlayPage(show)} data={show} items={items} showPlayIcon />
          </div>
        );
      });

    return vootShortsList;
  };

  render() {
    const {vootShorts: {data}, smallLoader, clipsCount} = this.props;

    return (
      <div>
        {!smallLoader.load && data.length ?
          <div className='top-heading'>
            <div className='heading-inner'>
              <div className='tray-heading'>
                <h2 className='default-color'>All Voot Shorts</h2>
              </div>
            </div>
          </div> : null
        }
        <div className='grid-container clearfix grid-shows'>
          {this.getAllVootShorts(data)}
        </div>
        {!smallLoader.load  && data.length<clipsCount && data.length ?
          <div className='section text-center'>
            <button className='load-more' onClick={this.loadMore}>Load More Voot Shorts</button>
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
    setSmallLoader: bindActionCreators(setSmallLoader, dispatch),
    getAllVootShortsData : bindActionCreators(getAllVootShortsData, dispatch),
    appendAllVootShortsData : bindActionCreators(appendAllVootShortsData, dispatch),
    clearVootShortsData : bindActionCreators(clearVootShortsData, dispatch),
    setAllVootShortsPosterRoute : bindActionCreators(setAllVootShortsPosterRoute, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    smallLoader: state.smallLoader,
    params: ownProps.params,
    metas: ownProps.metas,
    clipsCount: ownProps.clipsCount,
    vootShorts : state.shows.episodes.vootShorts.all,
    posterRoute : state.shows.posterRoute,
  };
};

AllVootShorts.propTypes = {
  setSmallLoader: PropTypes.func.isRequired,
  getAllVootShortsData: PropTypes.func.isRequired,
  appendAllVootShortsData: PropTypes.func.isRequired,
  clearVootShortsData: PropTypes.func.isRequired,
  setAllVootShortsPosterRoute: PropTypes.func.isRequired,
  smallLoader: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  vootShorts: PropTypes.object,
  metas: PropTypes.array.isRequired,
  posterRoute: PropTypes.object.isRequired,
  clipsCount: PropTypes.number,
};

AllVootShorts.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllVootShorts);
