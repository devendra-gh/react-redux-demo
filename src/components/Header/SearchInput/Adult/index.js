import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  getAdultPopularSearchSuggestionList,
  getAutoCompleteSearchSuggestionList,
  adultSearch,
  clearSearch,
} from '../../../../actions/searchAction';
import {setSmallLoader} from '../../../../actions/loader';
import endpoints from '../../../../endpoints/search';
import clone from 'clone';
import {SEARCH} from '../../../../constants/searchActionConstants';
import {formDataGenerator} from '../../../../util/formDataGenerator';
import {searchAutoSuggestFilter} from '../../../../util/mapingFilters';

const SEARCH_FILTER = clone(SEARCH.AUTO_SUGGEST_DEFAULT_FILTERS);

class SearchInputAdult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      filter: SEARCH_FILTER,
      search: false,
      keywordLength: 1,
    };
  }

  componentWillMount() {
    const {getAdultPopularSearchSuggestionList, search: {popularSuggestions}, params} = this.props;
    if (params.keyword)
      this.setState({keyword: decodeURIComponent(params.keyword)});
    if (!popularSuggestions.mostPoplr)
      getAdultPopularSearchSuggestionList(endpoints.adultPopularSearch);
  }

  componentDidMount =() => {
    this.nameInput.focus();
  };

  componentWillUnmount() {
    const {clearSearch} = this.props;
    const {search} = this.state;
    if (search)
      clearSearch();
  }

  onChangeHandler = (e) => {
    let keyword = e.target.value;
    this.setState({keyword});

    const {keywordLength} = this.state;

    if (keyword.length > keywordLength) {
      const {getAutoCompleteSearchSuggestionList} = this.props;
      const {filter} = this.state;
      let filteredKeyword = keyword.trim();
      getAutoCompleteSearchSuggestionList(endpoints.getAutoCompleteSearch, formDataGenerator(searchAutoSuggestFilter(filter, filteredKeyword)), filteredKeyword);
    }
  };

  routeToLinkAddress = (link) => {
    const {closeModal} = this.props;
    closeModal();
    this.context.router.push(`${link}`);
  };

  SbuMapping = (title) => {
    const {SBU_LIST} = this.props;
    let sbu = title;

    Object.keys(SBU_LIST).map((SBU)=>{
      if(SBU===title)
        sbu = SBU_LIST[SBU];
    });

    return sbu;
  };

  getAdultSearchSuggestionsList = (list) => {
    // please keep the below check line.
    return list && list.searchRedirectKeys && list.searchRedirectKeys.map((item, key)=> {
      return (
        <li key={key} onClick={()=>this.routeToLinkAddress(item.URL)}>
          <span className='search-title'>{item.text}</span>
          <span className='search-list'>{this.SbuMapping(item.sbu)} | {item.genre} | {item.language}</span>
        </li>
      );
    });
  };

  makeSearch = (keyword) => {
    const {closeModal, adultSearch, params, setSmallLoader} = this.props;
    const {keywordLength} = this.state;

    if (decodeURIComponent(params.keyword) === keyword) {
      closeModal();
    }
    else {
      if (keyword.length > keywordLength) {
        let queryParams = {
          searchText: decodeURIComponent(keyword),
        };
        adultSearch(endpoints.adultSearch, queryParams);
        this.setState({search: true});
        setSmallLoader(true);
        closeModal();
        this.context.router.push(`/search/${keyword}`);
      }
    }
  };

  getAutoCompleteSearchSuggestionsList = (list) => {
    return list.map((keyword, key)=> {
      return (
        <li key={key} onClick={()=>this.makeSearch(keyword)}>
          <span className='search-result-list'>{keyword}</span>
        </li>
      );
    });
  };

  _handleKeyPress = (e, keyword) => {
    if (e.key === 'Enter') {
      this.makeSearch(keyword);
    }
  };


  render() {
    const {closeModal, autoCompleteSuggestions, search: {popularSuggestions}} = this.props;
    const {keyword, keywordLength} = this.state;

    return (
      <div className='search-page'>

        <div className='search-input'>
          <span className='search-icons' onClick={()=>this.makeSearch(keyword)}><i className='icon-search'></i></span>
          <input ref={(input) => { this.nameInput = input; }}
                 className='form-control'
                 type='text'
                 placeholder='Search for series, videos or movies'
                 value={keyword}
                 onChange={this.onChangeHandler}
                 onKeyPress={(e)=>this._handleKeyPress(e, keyword)} />
          <span className='search-close' onClick={closeModal}><i className='icon-cross'></i></span>
        </div>

        {
          popularSuggestions.mostPoplr && !autoCompleteSuggestions.length || keyword.length < (keywordLength+1) ?
            <div className='search-block'>
              <div className='search-type'>{popularSuggestions.mostPoplr}</div>
              <ul className='search-result'>
                {this.getAdultSearchSuggestionsList(popularSuggestions)}
              </ul>
            </div> : null
        }
        {
          autoCompleteSuggestions.length && keyword.length > keywordLength ?
            <div className='search-block'>
              <div className='search-type'>{popularSuggestions.suggestion}</div>
              <ul className='search-result'>
                {this.getAutoCompleteSearchSuggestionsList(autoCompleteSuggestions)}
              </ul>
            </div> : null
        }

      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    search: state.search.adult,
    autoCompleteSuggestions: state.search.autoCompleteSuggestions,
    SBU_LIST: state.config && state.config.config && state.config.config.assets && state.config.config.assets.SBU_LIST ?  state.config.config.assets.SBU_LIST:false,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getAdultPopularSearchSuggestionList: bindActionCreators(getAdultPopularSearchSuggestionList, dispatch),
    getAutoCompleteSearchSuggestionList: bindActionCreators(getAutoCompleteSearchSuggestionList, dispatch),
    adultSearch: bindActionCreators(adultSearch, dispatch),
    clearSearch: bindActionCreators(clearSearch, dispatch),
    setSmallLoader: bindActionCreators(setSmallLoader, dispatch),
  };
}

SearchInputAdult.propTypes = {
  closeModal: PropTypes.func.isRequired,
  adultSearch: PropTypes.func.isRequired,
  setSmallLoader: PropTypes.func.isRequired,
  getAdultPopularSearchSuggestionList: PropTypes.func.isRequired,
  getAutoCompleteSearchSuggestionList: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  autoCompleteSuggestions: PropTypes.array.isRequired,
  SBU_LIST: React.PropTypes.object,
};

SearchInputAdult.contextTypes = {
  router: React.PropTypes.object.isRequired,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchInputAdult);
