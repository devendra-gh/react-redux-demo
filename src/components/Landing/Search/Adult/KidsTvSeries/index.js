import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import kidsEndpoints from '../../../../../endpoints/kids';
import showEndpoints from '../../../../../endpoints/shows';
import CardImage from '../../../../CardComponent/CardImage';
import {headingCreator, resultCreator, searchActionKidsTvSeriesLoadMoreFilter} from '../../../../../util/search';
import {createRoutes} from '../../../../../util/routeCreater';
import {formDataGenerator} from '../../../../../util/formDataGenerator';
import {SEARCH} from '../../../../../constants/searchActionConstants';
import {getMediaInfoCalls, loadMoreContent, getKidsImages} from '../../../../../actions/searchAction';
import clone from 'clone';
import _ from 'lodash';


const FILTER = clone(SEARCH.SEARCH_ASSETS_DEFAULT_FILTER);

class KidsTvSeries extends Component {
  constructor(props) {
    super(props);
    const {tvSeries} = this.props;
    this.state = {
      load : false,
      tvSeries,
      countFilter : 1,
      filter : FILTER,
    };
  }

  componentWillMount() {
    const {tvSeries: {data}} = this.state;
    console.log(data);
    const {getKidsImages} = this.props;
    data.map((item, index)=>{
      let queryParams = {
        mId : item.id,
      };
      getKidsImages(kidsEndpoints.kidsSeriesImages, queryParams, index, 'results', 'kidsTvSeries', 'adult');
    });

  }


  componentWillReceiveProps(nextProps) {
    const {tvSeries} = nextProps;
    if(!(_.isEqual(tvSeries, this.state.tvSeries))){
      this.setState({
        tvSeries,
        load: false,
      });
    }
  }

  loadMore = () => {
    const {loadMoreContent, keyword} = this.props;
    const {filter, countFilter} = this.state;
      let data = searchActionKidsTvSeriesLoadMoreFilter(filter, keyword);
      this.setState({
        load: true,
        filter: data,
      });
      loadMoreContent(showEndpoints.searchAssets,formDataGenerator(data), 'kidsTvSeries', 'adult', ()=>{
        this.setState({load: false});
        const {getKidsImages, tvSeries: {data}} = this.props;
        data.map((item, index)=>{
          if(!item.imgURLL){
            let queryParams = {
              mId : item.id,
            };
            getKidsImages(kidsEndpoints.kidsSeriesImages, queryParams, index, 'results', 'kidsTvSeries', 'adult');
          }
        });
      });

    this.setState({
      countFilter: countFilter + 1,
    });
  };

  createRoutes = (item) => {
    let route = createRoutes(['kids','characters',`${item.metas.SeriesMainTitle}`,`${item.id}`]);
    this.context.router.push(route);
  };

  getTvSeriesSearchResult = (data, countFilter, count) => {

    return data.map((item,key)=>{
      if(key>4*countFilter -1 || key>=count)
        return;

      let episodeCount = null;
      if(item.assetsCount)
        if(item.assetsCount.episodesCount)
          episodeCount = item.assetsCount.episodesCount;

      let imageList = {
        imgURLL: item.imgURLL ? item.imgURLL : null,
        imgURLM: item.imgURLM ? item.imgURLM : null,
        imgURLS: item.imgURLS ? item.imgURLS : null,
      };

      return (
        <li key={key} onClick={() => this.createRoutes(item)}>
          <div className='search-item'>
            <div className='kids-search-image'>
              <img src={imageList.imgURLL} alt={item.name} className='kids-original-image' />
            </div>
            <div className='image-title'><span>{item.name}</span></div>
          </div>
        </li>
      );
    });
  };

  render() {
    const {tvSeries: {count, data}, countFilter, load} = this.state;

    return (
      <div className='search-page'>
        {
          count ?
            <div className='search-block gaps'>
              <span className='search-type'>KIDS {headingCreator('tvSeries', count)} - {resultCreator(count)}</span>
              <ul className='search-result'>
                {this.getTvSeriesSearchResult(data, countFilter, count)}
              </ul>
            </div> : null
        }
        {
          count && 4*countFilter<count && !load ?
            <div className='section text-center'>
              <button className='load-more' onClick={this.loadMore}>All Kids Shows</button>
            </div> : null
        }
        {
          load ? <div className='small-loader'></div> : null
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMediaInfoCalls: bindActionCreators(getMediaInfoCalls, dispatch),
    loadMoreContent: bindActionCreators(loadMoreContent, dispatch),
    getKidsImages: bindActionCreators(getKidsImages, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    tvSeries: state.search.adult.results.kidsTvSeries,
    keyword: ownProps.keyword,
  };
};

KidsTvSeries.propTypes = {
  tvSeries: PropTypes.object.isRequired,
  keyword: PropTypes.string.isRequired,
  getMediaInfoCalls: PropTypes.func.isRequired,
  loadMoreContent: PropTypes.func.isRequired,
  getKidsImages: PropTypes.func.isRequired,
};

KidsTvSeries.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(KidsTvSeries);
