import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {kidsSearch, clearSearch} from '../../../../actions/searchAction';
import {setSmallLoader} from '../../../../actions/loader';
import endpoints from '../../../../endpoints/search';
import KidsTvSeries from './TvSeries';
import KidsEpisodes from './Episodes';
import KidsNoResult from './NoResult';

class KidsSearch extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const {kidsSearch, params:{keyword},  smallLoader:{load}, setSmallLoader} = this.props;
    if(!load){
      let queryParams = {
        searchText : decodeURIComponent(keyword),
      };

      setSmallLoader(true);
      kidsSearch(endpoints.kidsSearch, queryParams);
    }
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'AdultSearchView');
    }
  }

  componentWillUnmount () {
    const {clearSearch} = this.props;
    clearSearch();
  }

  render() {
    const {results:{tvSeries, episodes, isLoading}, params:{keyword}} = this.props;
    return (
      <div className='search-landing'>

        {tvSeries.count ? <KidsTvSeries keyword={decodeURIComponent(keyword)} /> : null}
        {episodes.count ? <KidsEpisodes keyword={decodeURIComponent(keyword)} /> : null}

        {isLoading ? <div className='small-loader' /> : null}
        {
          (!tvSeries.count && !episodes.count && !isLoading) ?
            <KidsNoResult keyword={decodeURIComponent(keyword)} /> : null
        }

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    kidsSearch: bindActionCreators(kidsSearch, dispatch),
    clearSearch: bindActionCreators(clearSearch, dispatch),
    setSmallLoader: bindActionCreators(setSmallLoader, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    results: state.search.kids.results,
    smallLoader: state.smallLoader,
  };
};

KidsSearch.propTypes = {
  results: PropTypes.object.isRequired,
  keyword: PropTypes.string,
  params: PropTypes.object.isRequired,
  smallLoader: PropTypes.object.isRequired,
  kidsSearch: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  setSmallLoader: PropTypes.func.isRequired,
};

KidsSearch.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(KidsSearch);
