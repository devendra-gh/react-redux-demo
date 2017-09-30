import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import endpoints from '../../../../../../endpoints/shows';
import {createRoutes} from '../../../../../../util/routeCreater';
import {formDataGenerator} from '../../../../../../util/formDataGenerator';
import {SEARCH} from '../../../../../../constants/searchActionConstants';
import {adultPopularEpisodes, searchAssestInfoCallsNoResult} from '../../../../../../actions/searchAction';
import clone from 'clone';
import {episodeFormat,dateFormat,timeFormat} from '../../../../../../util/filters';
import {searchActionSearchAssetsFilter} from '../../../../../../util/search';

const FILTER = clone(SEARCH.ADULT.SEARCH_ASSETS_POPULAR_EPISODES_DEFAULT_FILTER);
const REF_SERIES_FILTER = clone(SEARCH.SEARCH_ASSETS_DEFAULT_FILTER);

class PopularEpisodes extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {popularEpisodes:{count}, adultPopularEpisodes, searchAssestInfoCallsNoResult}=this.props;
    if(!count)
      adultPopularEpisodes(endpoints.searchAssets, formDataGenerator(FILTER), ()=>{
        const {popularEpisodes:{data}} = this.props;
        data.map((item, key) => {
          if (!item.refSeriesId)
            searchAssestInfoCallsNoResult(endpoints.searchAssets, formDataGenerator(searchActionSearchAssetsFilter(clone(REF_SERIES_FILTER), item)), 'popularEpisodes', key, 'adult');
        });
      }) ;
  }

  createRoutes = (item) => {
    let route = createRoutes(['shows',`${item.metas.RefSeriesTitle}`,`${item.metas.RefSeriesSeason}`,`${item.refSeriesId}`,`${item.metas.EpisodeMainTitle}`,`${item.id}`]);
    this.context.router.push(route);
  };

  getTvSeriesSearchResult = (data) => {
    return data.map((item,key)=> {
      if (key > 3)
        return;

      return (
        <li key={key} onClick={() => this.createRoutes(item)}>
          <div className='search-item'>
            <figure>
              <img src={item.images[4].url} alt={item.name} width='45' height='25' />
            </figure>
            <div className='search-content'>
              <span className='search-title'>{item.metas.EpisodeMainTitle}</span>
              <span
                className='search-list'>{item.metas.EpisodeNo ? episodeFormat(item.metas.EpisodeNo) + ' |' : null} {item.metas.TelecastDate ? dateFormat(item.metas.TelecastDate) + ' |' : null} {timeFormat(item.metas.ContentDuration)}</span>
            </div>
          </div>
        </li>
      );
    });
  };

  render() {
    const {popularEpisodes: {count, data}} = this.props;

    return (
      <div>
        {
          count ?
            <div className='search-category'>
              <span className='search-type'>POPULAR EPISODES</span>
              <ul className='search-result'>
                {this.getTvSeriesSearchResult(data)}
              </ul>
            </div> : null
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    adultPopularEpisodes: bindActionCreators(adultPopularEpisodes, dispatch),
    searchAssestInfoCallsNoResult: bindActionCreators(searchAssestInfoCallsNoResult, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    popularEpisodes: state.search.adult.noResult.popularEpisodes,
  };
};

PopularEpisodes.propTypes = {
  popularEpisodes: PropTypes.object.isRequired,
  adultPopularEpisodes: PropTypes.func.isRequired,
  searchAssestInfoCallsNoResult: PropTypes.func.isRequired,
};

PopularEpisodes.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularEpisodes);
