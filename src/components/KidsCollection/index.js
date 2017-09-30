import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setLoader} from '../../actions/loader';
import Loader from '../Loader';
import TabNavigation from '../Navigation/TabNav';
import endpoints from '../../endpoints/kids';
import showEndpoints from '../../endpoints/shows';
import {KIDS} from '../../constants';
import {getKidsClusterData, appendKidsClusterData, clearKidsClusterErrors, clearKidsClusterData} from '../../actions/kids';
import {formDataGenerator} from '../../util/formDataGenerator';
import {clearFilters} from '../../actions/filters';
import CardHeading from '../CardComponent/CardHeading';
import DefaultCard from '../CardLayout/DefaultCard';
import {getChannelMedias, clearChannelMedias} from '../../actions/channelMediasAction';
import {createRouteString} from '../../util/routeCreater';
import {getSeriesValueFromListOfMapsForKey} from '../../util/getShowDetails';
import {getPaginatedData} from '../../util/pagination';
import {site_name, get_domain_url} from '../../constants/seoConstant';
import appBoyEvent from '../../util/appboyEvent';


class KidsCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: KIDS.CLUSTER.DEFAULT_FILTERS,
      toggle: 0,
      pagination : {
        pageSize : 10,
        pageIndex: 0,
        currentArray : [],
        completeArray : [],
      },
    };
  }

  componentWillMount() {
    const {setLoader, loader, kidsCluster, getKidsClusterData} = this.props;
    const {pagination} = this.state;
    let self = this;
    if (kidsCluster.kidsData.data != []){
      let params = endpoints.kidsCollection;
      if (!loader.load){
        setLoader(true);
      }
      getKidsClusterData(params, function () {
        if (self.props.kidsCluster.kidsData.data && self.props.kidsCluster.kidsData.data.list) {
          let kidsDataList = self.props.kidsCluster.kidsData.data.list;
          let paginatedData = getPaginatedData(kidsDataList, pagination.pageIndex, pagination.pageSize);
           self.setState({
             pagination : {
               pageSize : pagination.pageSize,
               pageIndex: paginatedData.pageIndex,
               currentArray : paginatedData.resultantArray,
               completeArray : kidsDataList,
             },
           });
        }
        setLoader(false);
      }, function () {
        setLoader(false);
      });
    }
  }

  componentDidMount = () => {
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'KidsCollectionPageView');

      //appboy.logCustomEvent
      //appBoyEvent.isVootKids(true);
    }
  };

  componentWillUnmount() {
    const {clearKidsClusterData, kidsCluster, filters, clearFilters} = this.props;
    clearKidsClusterData();

    if (filters.language || filters.genre)
      clearFilters();
  }

  loadMore(){
    let paginatedData = this.state.pagination;
    let output = getPaginatedData(paginatedData.completeArray, paginatedData.pageIndex, paginatedData.pageSize);
    this.setState({
      pagination : {
        pageSize : paginatedData.pageSize,
        completeArray : paginatedData.completeArray,
        pageIndex: output.pageIndex,
        currentArray : output.resultantArray,
      },
    });
  }

  routeToClusterVideoPlayer(cluster){
    let queryParams = {cName : cluster.paramlink, mName : 'kidsClusters'}, self =this;
    this.props.setLoader(true);
    this.props.getChannelMedias(queryParams, function () {
      let channelMedias = self.props.channelMedias;
      let currentMedia;
      if(channelMedias.data.list) {
        currentMedia = channelMedias.data.list['0'];
        let episodeMainTitle = getSeriesValueFromListOfMapsForKey(currentMedia.Metas, "EpisodeMainTitle"),
          mediaId = currentMedia.MediaID;
        self.context.router.push(`/kids/clusters/${cluster.paramlink}/${createRouteString(episodeMainTitle)}/${mediaId}`);
      }
    }, function () {
      self.props.setLoader(false);
    });
  }


  render() {
    let paginatedData = this.state.pagination, tiles, loadMoreCollections, self = this;
    if(paginatedData.currentArray.length > 0){
      tiles = paginatedData.currentArray.map(function (item, index) {
        return (
          <div key={index} className='grid-view'>
            <DefaultCard aspectRatio='16x6' itemIndex={index} key={index} items={item} isTitleMultiLine={false}
                         componentFlag={'kidsClusters'} onClick={()=>self.routeToClusterVideoPlayer(item)} data={item} />
          </div>
        );
      });
      if (paginatedData.currentArray.length < paginatedData.completeArray.length) {
        loadMoreCollections = (
          <div className='section text-center'>
            <button className='load-more' onClick={()=>this.loadMore()}>Load More</button>
          </div>
        );
      }
    }

    return (
      <div className='home-container'>
        <Loader {...this.props} />
        <div className='kids-collection-page margin-t15'>
          <div className='top-heading'>
            <div className='heading-inner'>
              <CardHeading>
                <h1>All Kids Collection on Voot</h1>
                <span></span>
              </CardHeading>
            </div>
          </div>

          <div className='grid-container clearfix'>
            {tiles}
          </div>
          {loadMoreCollections}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: bindActionCreators(setLoader, dispatch),
    getKidsClusterData: bindActionCreators(getKidsClusterData, dispatch),
    appendKidsClusterData: bindActionCreators(appendKidsClusterData, dispatch),
    clearFilters: bindActionCreators(clearFilters, dispatch),
    clearKidsClusterErrors: bindActionCreators(clearKidsClusterErrors, dispatch),
    clearKidsClusterData: bindActionCreators(clearKidsClusterData, dispatch),
    getChannelMedias: bindActionCreators(getChannelMedias, dispatch),
    clearChannelMedias: bindActionCreators(clearChannelMedias, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    kidsCluster: state.kids.kidsCluster,
    loader: state.loader,
    filters: state.filters,
    channelMedias: state.channelMedias,
  };
};

KidsCollection.propTypes = {
  getKidsClusterData: PropTypes.func.isRequired,
  appendKidsClusterData: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  clearKidsClusterData: PropTypes.func.isRequired,
  kidsCluster: PropTypes.object.isRequired,
  setLoader: PropTypes.func.isRequired,
  loader: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  clearChannelMedias: PropTypes.func,
  getChannelMedias: PropTypes.func,
};

KidsCollection.contextTypes = {
  router: React.PropTypes.object.isRequired,
  clearChannelMedias: PropTypes.func,
  getChannelMedias: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(KidsCollection);
