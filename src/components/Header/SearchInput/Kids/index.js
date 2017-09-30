import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  getKidsPopularSearchSuggestionList,
  getAutoCompleteSearchSuggestionList,
  kidsSearch,
  clearSearch,
} from '../../../../actions/searchAction';
import {setSmallLoader} from '../../../../actions/loader';
import endpoints from '../../../../endpoints/search';
import clone from 'clone';
import {SEARCH} from '../../../../constants/searchActionConstants';
import {formDataGenerator} from '../../../../util/formDataGenerator';
import {searchAutoSuggestFilter} from '../../../../util/mapingFilters';

const SEARCH_FILTER = clone(SEARCH.AUTO_SUGGEST_DEFAULT_FILTERS);

class SearchInputKids extends Component {
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
    const {getKidsPopularSearchSuggestionList, search: {popularSuggestions}, params} = this.props;
    //console.log("endpoints.adultPopularSearchendpoints.adultPopularSearch",endpoints.adultPopularSearch);
    if (params.keyword)
      this.setState({keyword: decodeURIComponent(params.keyword)});
    if (!popularSuggestions.mostPoplr)
      getKidsPopularSearchSuggestionList(endpoints.kidsPopularSearch);
  }

  componentDidMount() {
    this.nameInput.focus();
  }

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

  getKidsSearchSuggestionsList = (list) => {
    //console.log('-------',list.searchRedirectKeys);
    if(list.searchKeys){
      return list.searchKeys.map((item, key)=> {
        return (
          <li key={key} onClick={()=>this.makeSearch(item.title)}>
            <div className='search-item'>
              <div className='kids-search-image'><img src={item.imgURL} alt={item.title} style={{borderRadius: '50%', width:"50", height:"50"}} /></div>
              <div className='image-title'><span>{item.title}</span></div>
            </div>
          </li>
        );
      });
    }
  };

  makeSearch = (keyword) => {
    const {closeModal, kidsSearch, params, setSmallLoader} = this.props;
    const {keywordLength} = this.state;
    if (decodeURIComponent(params.keyword) === keyword) {
      closeModal();
    }
    else {
      if (keyword.length > keywordLength) {
        let queryParams = {
          searchText: decodeURIComponent(keyword),
        };
        kidsSearch(endpoints.kidsSearch, queryParams);
        this.setState({search: true});
        setSmallLoader(true);
        closeModal();
        this.context.router.push(`/search/kids/${keyword}`);
      }
    }
  };

  getAutoCompleteSearchSuggestionsList = (list) => {
    //console.log('-------',list);
    return list.map((keyword, key)=> {
      return (
        <li key={key} onClick={()=>this.makeSearch(keyword)}>
          <div>{keyword}</div>
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
    const {closeModal, search: {popularSuggestions}, autoCompleteSuggestions} = this.props;
    const {keyword, keywordLength} = this.state;

    return (
      <div className='search-page'>
        <div className='search-input'>
          <span className='search-icons' onClick={()=>this.makeSearch(keyword)}><i className='icon-search'></i></span>
          <input ref={(input) => { this.nameInput = input; }}
                 className='form-control' type='text'
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
              <ul  className='search-result'>
                {this.getKidsSearchSuggestionsList(popularSuggestions)}
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
    search: state.search.kids,
    autoCompleteSuggestions: state.search.autoCompleteSuggestions,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getKidsPopularSearchSuggestionList: bindActionCreators(getKidsPopularSearchSuggestionList, dispatch),
    getAutoCompleteSearchSuggestionList: bindActionCreators(getAutoCompleteSearchSuggestionList, dispatch),
    kidsSearch: bindActionCreators(kidsSearch, dispatch),
    clearSearch: bindActionCreators(clearSearch, dispatch),
    setSmallLoader: bindActionCreators(setSmallLoader, dispatch),
  };
}

SearchInputKids.propTypes = {
  closeModal: PropTypes.func.isRequired,
  kidsSearch: PropTypes.func.isRequired,
  setSmallLoader: PropTypes.func.isRequired,
  getKidsPopularSearchSuggestionList: PropTypes.func.isRequired,
  getAutoCompleteSearchSuggestionList: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  autoCompleteSuggestions: PropTypes.array.isRequired,
};

SearchInputKids.contextTypes = {
  router: React.PropTypes.object.isRequired,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchInputKids);
