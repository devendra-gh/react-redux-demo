import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import endpoints from '../../../../../../endpoints/shows';
import {createRoutes} from '../../../../../../util/routeCreater';
import {formDataGenerator} from '../../../../../../util/formDataGenerator';
import {SHOWS} from '../../../../../../constants/showsActionConstants';
import {adultPopularSearch} from '../../../../../../actions/searchAction';
import clone from 'clone';

const FILTER = clone(SHOWS.TV_SERIES.POPULAR_LIST_DEFAULT_FILTERS);

class PopularShows extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(nextProps) {
    const {popularShows:{count}, adultPopularSearch}=this.props;
    if(!count)
      adultPopularSearch(endpoints.popularShowsList, formDataGenerator(FILTER)) ;
  }

  createRoutes = (item) => {
    let route = createRoutes(['shows',`${item.metas.SeriesMainTitle}`,`${item.metas.Season}`,`${item.id}`]);
    this.context.router.push(route);
  };

  getPopularShows = (data) => {
    return data.map((item,key)=> {
      if (key > 3)
        return;

      let episodeCount = null;
      if (item.assetsCount.episode)
        episodeCount = item.assetsCount.episode;

      return (
        <li key={key} onClick={() => this.createRoutes(item)}>
          <div className='search-item'>
            <figure>
              <img src={item.images[4].url} alt={item.name} width='45' height='25' />
            </figure>
            <div className='search-content'>
              <span className='search-title'>{item.name}</span>
              <span className='search-list'>{`${item.metas.SeriesShortTitle} | `}
                 {item.tags.Genre[0]} {episodeCount ? ` | ${episodeCount} Episodes` : null}</span>
            </div>
          </div>
        </li>
      );
    });
  }

  render() {
    const {popularShows: {count, data}} = this.props;

    return (
      <div>
        {
          count ?
            <div className='search-category'>
              <span className='search-type'>POPULAR SHOWS</span>
              <ul className='search-result'>
                {this.getPopularShows(data)}
              </ul>
            </div> : null
        }
        {
          !count ? <div className='small-loader'></div> : null
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    adultPopularSearch: bindActionCreators(adultPopularSearch, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    popularShows: state.search.adult.noResult.popularShows,
  };
};

PopularShows.propTypes = {
  popularShows: PropTypes.object.isRequired,
  adultPopularSearch: PropTypes.func.isRequired,
};

PopularShows.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularShows);
