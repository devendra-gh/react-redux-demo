import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import endpoints from '../../../../../endpoints/kids';
import {getKidsSeriesData, clearKidsSeriesData} from '../../../../../actions/kids';
import {setLoader} from '../../../../../actions/loader';
import {Link} from 'react-router';
import {createRouteString} from '../../../../../util/routeCreater';
import DefaultCard from '../../../../CardLayout/DefaultCard';
import CardHeading from '../../../../CardComponent/CardHeading';
import Loader from '../../../../Loader';
import {getPaginatedData} from '../../../../../util/pagination';
import {getColorClassForKidsCircularTile} from '../../../../../util/kidsUtils';
import appBoyEvent from '../../../../../util/appboyEvent';

class ViewAllKidsShows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination : {
        pageSize : 10,
        pageIndex: 0,
        currentArray : [],
        completeArray : [],
      },
    };
  }

  componentWillMount() {
    const {setLoader, loader,getKidsSeriesData} = this.props;
    const {pagination} = this.state;
    let params = endpoints.kidsSeries, self = this;
    if (!loader.load){
      setLoader(true);
    }
    getKidsSeriesData(params, function () {
      if(self.props.kidsSeries.totalDataCount > 0){
        let kidsSeriesList = self.props.kidsSeries.data;
        let paginatedData = getPaginatedData(kidsSeriesList, pagination.pageIndex, pagination.pageSize);
        self.setState({
          pagination : {
            pageSize : pagination.pageSize,
            pageIndex: paginatedData.pageIndex,
            currentArray : paginatedData.resultantArray,
            completeArray : kidsSeriesList,
          },
        });
      }
      setLoader(false);
    }, function () {
      setLoader(false);
    });
  }

  componentDidMount = () => {
    if(typeof window !== "undefined") {
      //appboy.logCustomEvent
      //appBoyEvent.isVootKids(true);
    }
  };

  componentWillUnmount() {
    const {clearKidsSeriesData} = this.props;
    clearKidsSeriesData();
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

  routeToShowPage(item){
    this.context.router.push(`/kids/characters/${createRouteString(item.seriesMainTitle)}/${createRouteString(item.mId)}`);
  }

  render() {
    let paginatedData = this.state.pagination, tiles, loadMoreSeries, self = this;
    if(paginatedData.currentArray.length > 0){
      tiles = paginatedData.currentArray.map(function (item, index) {
        let itemClass = getColorClassForKidsCircularTile(index), tileClasses = 'grid-view grid-2 ' + itemClass;
        return (
          <div className={tileClasses} key={index}>
            <DefaultCard items={item} aspectRatio='1x1' itemIndex={index} componentFlag={item.mName}
                         onClick={()=>{self.routeToShowPage(item);}} data={item} />
          </div>
        );
      });
      if (paginatedData.currentArray.length < paginatedData.completeArray.length) {
        loadMoreSeries = (
          <div className='section text-center'>
            <button className='load-more' onClick={()=>this.loadMore()}>Load More</button>
          </div>
        );
      }
    }

    return (
      <div className='view-all-kids-shows-page margin-t15'>
        <Loader {...this.props} />
        <div className='top-heading'>
          <div className='heading-inner'>
            <CardHeading>
              <h1>All Kids Shows on Voot</h1>
              <span></span>
            </CardHeading>
          </div>
        </div>

        <div className='grid-container clearfix grid-shows kidsCharacters'>
          {tiles}
        </div>
        {loadMoreSeries}
      </div>
    );
  }
}

ViewAllKidsShows.propTypes = {
  router: PropTypes.object.isRequired,
  getKidsSeriesData: PropTypes.func.isRequired,
  clearKidsSeriesData: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  kidsSeries: PropTypes.object.isRequired,
  loader: React.PropTypes.object.isRequired,
  setLoader: React.PropTypes.func.isRequired,
};

ViewAllKidsShows.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
const mapDispatchToProps = (dispatch) => {
  return {
    getKidsSeriesData: bindActionCreators(getKidsSeriesData, dispatch),
    clearKidsSeriesData: bindActionCreators(clearKidsSeriesData, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    kidsSeries: state.kids.kidsSeries,
    loader: state.loader,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllKidsShows);
