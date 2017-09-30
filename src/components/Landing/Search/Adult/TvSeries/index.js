import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import endpoints from '../../../../../endpoints/playList';
import showEndpoints from '../../../../../endpoints/shows';
import {headingCreator, resultCreator, searchActionTvSeriesLoadMoreFilter} from '../../../../../util/search';
import {createRoutes} from '../../../../../util/routeCreater';
import {formDataGenerator} from '../../../../../util/formDataGenerator';
import {SEARCH} from '../../../../../constants/searchActionConstants';
import {getMediaInfoCalls, loadMoreContent} from '../../../../../actions/searchAction';
import clone from 'clone';
import _ from 'lodash';


const FILTER = clone(SEARCH.SEARCH_ASSETS_DEFAULT_FILTER);

class TvSeries extends Component {
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
    const {tvSeries} = this.state;
    if(tvSeries.count){
      const {getMediaInfoCalls} = this.props;
      tvSeries.data.map((item,key) => {
        let queryParams = {
          mediaId: item.id,
        };
        getMediaInfoCalls(endpoints.getMediaInfo, queryParams, 'tvSeries', key, 'adult');
      });

    }
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
    if((countFilter + 1) % 2 == 1 && countFilter!==1){
      let data = searchActionTvSeriesLoadMoreFilter(filter, keyword);
      this.setState({
        load: true,
        filter: data,
      });
      loadMoreContent(showEndpoints.showsListWithAssetsCounts,formDataGenerator(data), 'tvSeries', 'adult', ()=>{
        this.setState({load: false});
      });
    }
    this.setState({
      countFilter: countFilter + 1,
    });
  };

  createRoutes = (item) => {
    let route = createRoutes(['shows',`${item.metas.SeriesMainTitle}`,`${item.metas.Season}`,`${item.id}`]);
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
      return (
        <li key={key} onClick={() => this.createRoutes(item)}>
          <div className='search-item'>
            <figure>
              <img src={item.images[4].url} alt={item.name} width='45' height='25' />
            </figure>
            <div className='search-content'>
              <span className='search-title'>{item.name}</span>
              <span className='search-list'>{item.metas.SeriesShortTitle} | {item.tags.Genre[0]} {episodeCount ? ` | ${episodeCount} Episodes` : null}</span>
            </div>
          </div>
        </li>
      );
    });
  };

  render() {
    const {tvSeries: {count, data}, countFilter, load} = this.state;

    return (
      <div className="search-inner-section">
        {
          count ?
            <div className='search-category'>
              <span className='search-type'>{headingCreator('tvSeries', count)} - {resultCreator(count)}</span>
              <ul className='search-result'>
                {this.getTvSeriesSearchResult(data, countFilter, count)}
              </ul>
            </div> : null
        }
        {
          count && 4*countFilter<count && !load ?
            <div className='section text-center'>
              <button className='load-more' onClick={this.loadMore}>See More Shows Results</button>
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
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    tvSeries: state.search.adult.results.tvSeries,
    keyword: ownProps.keyword,
  };
};

TvSeries.propTypes = {
  tvSeries: PropTypes.object.isRequired,
  keyword: PropTypes.string.isRequired,
  getMediaInfoCalls: PropTypes.func.isRequired,
  loadMoreContent: PropTypes.func.isRequired,
};

TvSeries.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TvSeries);
