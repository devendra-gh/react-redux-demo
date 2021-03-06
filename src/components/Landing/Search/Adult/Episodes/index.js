import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import endpoints from '../../../../../endpoints/playList';
import showEndpoints from '../../../../../endpoints/shows';
import {headingCreator, resultCreator, searchActionSearchAssetsFilter, searchActionEpisodesLoadMoreFilter} from '../../../../../util/search';
import {episodeFormat,dateFormat,timeFormat} from '../../../../../util/filters';
import {createRoutes} from '../../../../../util/routeCreater';
import {formDataGenerator} from '../../../../../util/formDataGenerator';
import {SEARCH} from '../../../../../constants/searchActionConstants';
import {loadMoreContent, searchAssestInfoCalls} from '../../../../../actions/searchAction';
import clone from 'clone';
import _ from 'lodash';


const FILTER = clone(SEARCH.SEARCH_ASSETS_DEFAULT_FILTER);

class Episodes extends Component {
  constructor(props) {
    super(props);
    const {episodes} = this.props;
    this.state = {
      load : false,
      episodes,
      countFilter : 1,
      filter : FILTER,
    };
  }

  componentWillMount() {
    const {episodes} = this.state;
    if(episodes.count){
      const {searchAssestInfoCalls} = this.props;
      episodes.data.map((item,key) => {
        searchAssestInfoCalls(endpoints.searchAssets, formDataGenerator(searchActionSearchAssetsFilter(clone(FILTER), item)), 'episodes', key, 'adult');
      });

    }
  }

  componentWillReceiveProps(nextProps) {
    const {episodes} = nextProps;
    if(!(_.isEqual(episodes, this.state.episodes))){
      this.setState({
        episodes,
        load: false,
      });
    }
  }

  loadMore = () => {
    const {loadMoreContent, keyword} = this.props;
    const {filter, countFilter} = this.state;
      let data = searchActionEpisodesLoadMoreFilter(filter, keyword);
      this.setState({
        load: true,
        filter: data,
      });
      loadMoreContent(showEndpoints.searchAssets,formDataGenerator(data), 'episodes', 'adult', ()=>{
        const {episodes} = this.state;
        const {searchAssestInfoCalls} = this.props;
        this.setState({load: false});
        episodes.data.map((item, key) => {
          if (!item.refSeriesId){
            searchAssestInfoCalls(endpoints.searchAssets, formDataGenerator(searchActionSearchAssetsFilter(clone(FILTER), item)), 'episodes', key, 'adult');
          }

        });
      });

    this.setState({
      countFilter: countFilter + 1,
    });
  };

  createRoutes = (item) => {
      let route = createRoutes(['shows',`${item.metas.RefSeriesTitle}`,`${item.metas.RefSeriesSeason}`,`${item.refSeriesId}`,`${item.metas.EpisodeMainTitle}`,`${item.id}`]);
      this.context.router.push(route);
  };

  getTvSeriesSearchResult = (data, countFilter, count) => {

    return data.map((item,key)=>{
      if(key>4*countFilter -1 || key>=count)
        return;

      return (
        <li key={key} onClick={() => this.createRoutes(item)}>
          <div className='search-item'>
            <figure>
              <img src={item.images[4].url} alt={item.name} width='45' height='25' />
            </figure>
            <div className='search-content'>
              <span className='search-title'>{item.metas.EpisodeMainTitle}</span>
              <span className='search-list'>{item.metas.EpisodeNo ? episodeFormat(item.metas.EpisodeNo) + ' |' : null}  {item.metas.TelecastDate ? dateFormat(item.metas.TelecastDate) + ' |' : null} {timeFormat(item.metas.ContentDuration)}</span>
            </div>
          </div>
        </li>
      );
    });
  };

  render() {
    const {countFilter, load} = this.state;
    const {episodes: {count, data}} = this.props;
    return (
      <div className="search-inner-section">
        {
          count ?
            <div className='search-category'>
              <span className='search-type'>{headingCreator('episode', count)} - {resultCreator(count)}</span>
              <ul className='search-result'>
                {this.getTvSeriesSearchResult(data, countFilter, count)}
              </ul>
            </div> : null
        }
        {
          count && 4*countFilter<count && !load ?
            <div className='section text-center'>
              <button className='load-more' onClick={this.loadMore}>See More Episode Results</button>
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
    searchAssestInfoCalls: bindActionCreators(searchAssestInfoCalls, dispatch),
    loadMoreContent: bindActionCreators(loadMoreContent, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    episodes: state.search.adult.results.episodes,
    keyword: ownProps.keyword,
  };
};

Episodes.propTypes = {
  episodes: PropTypes.object.isRequired,
  keyword: PropTypes.string.isRequired,
  searchAssestInfoCalls: PropTypes.func.isRequired,
  loadMoreContent: PropTypes.func.isRequired,
};

Episodes.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Episodes);
