import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {clearSearch, adultSearch} from '../../../../actions/searchAction';
import {setSmallLoader} from '../../../../actions/loader';
import endpoints from '../../../../endpoints/search';
import TvSeries from './TvSeries';
import Movies from './Movies';
import Clips from './Clips';
import Episodes from './Episodes';

import KidsTvSeries from './KidsTvSeries';
import KidsVideos from './KidsVideos';

import NoResult from './NoResult';

class AdultSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters : [],
    };
  }

  componentWillUnmount () {
    const {clearSearch} = this.props;
    clearSearch();
  }

  componentDidMount(){
    const {adultSearch, params:{keyword}, smallLoader:{load}, setSmallLoader} = this.props;
    if(!load){
      let queryParams = {
        searchText : decodeURIComponent(keyword),
      };
      setSmallLoader(true);
      adultSearch(endpoints.adultSearch, queryParams);
    }
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'AdultSearchView');
    }
  }


  render() {
    const {results:{tvSeries, episodes, clips, movies, kidsTvSeries, kidsVideos, isLoading}, params:{keyword}} = this.props;
    return (
      <div className='search-landing'>

        {tvSeries.count ? <TvSeries keyword={decodeURIComponent(keyword)} /> : null}
        {episodes.count ? <Episodes keyword={decodeURIComponent(keyword)} /> : null}
        {clips.count ? <Clips keyword={decodeURIComponent(keyword)} /> : null}
        {movies.count ? <Movies keyword={decodeURIComponent(keyword)} /> : null}

        {kidsTvSeries.count ? <KidsTvSeries keyword={decodeURIComponent(keyword)} /> : null}
        {kidsVideos.count ? <KidsVideos keyword={decodeURIComponent(keyword)} /> : null}

        {isLoading ? <div className='small-loader' /> : null}

        {
          (!tvSeries.count && !episodes.count && !clips.count && !movies.count && !kidsTvSeries.count && !kidsVideos.count && !isLoading) ?
            <NoResult keyword={decodeURIComponent(keyword)} /> : null
        }

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearSearch: bindActionCreators(clearSearch, dispatch),
    adultSearch: bindActionCreators(adultSearch, dispatch),
    setSmallLoader: bindActionCreators(setSmallLoader, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    results: state.search.adult.results,
    smallLoader: state.smallLoader,
  };
};

AdultSearch.propTypes = {
  results: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  smallLoader: PropTypes.object.isRequired,
  clearSearch: PropTypes.func.isRequired,
  adultSearch: PropTypes.func.isRequired,
  setSmallLoader: PropTypes.func.isRequired,
};

AdultSearch.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdultSearch);
