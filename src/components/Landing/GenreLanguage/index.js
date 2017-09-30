import React, {Component, PropTypes} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PaperRipple from 'react-paper-ripple';
import {applyLanguageGenreFilter, applyPopularLanguageGenreFilter} from '../../../util/mapingFilters';
import {formDataGenerator} from '../../../util/formDataGenerator';
import endpoints from '../../../endpoints/shows';
import {updateLanguage, clearFilters} from '../../../actions/filters';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SHOWS} from '../../../constants/showsActionConstants';
import {MEDIA_TYPE} from '../../../constants/media';
import Loader from '../../Loader';
import {filterArray} from '../../../util/mapingFilters';
import {languages} from '../../../constants/languages';
import {genreList} from '../../../constants/genres';
import clone from 'clone';
import includes from 'array-includes';

const POPULAR_FILTER = clone(SHOWS.TV_SERIES.POPULAR_LIST_DEFAULT_FILTERS);

class GenreLanguage extends Component {
  constructor(props) {
    super(props);
    this.state={
      currentFilters: this.props.currentFilters,
      initialFilters: this.props.initialFilters,
      languageList: languages,
      genreList: genreList(this.props.mediaType),
      onSubmit: false,
      applyFilter : false,
    };
  }

  componentDidMount = () => {
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'GenreLanguagePageView');
    }
  };

  componentWillUnmount(){
    const {applyFilter} = this.state;
    if(!applyFilter){
      const {clearFilters} = this.props;
      clearFilters();
    }
  }

  addLanguageList = (languageItem) => {
    let currentFilters = clone(this.state.currentFilters);
    const languageList= currentFilters.language;
    let updatedLang =filterArray(languageList, languageItem);
    let newFilter={language: updatedLang, genre : currentFilters.genre};
    this.setState({
      currentFilters : newFilter,
    });
  };

  getLanguage = (language, languageList) => {
    if (language.length)
      return language.map((languageItem, index)=> {
        if(!includes(languageList, languageItem.name))
          return (
            <li key={index} onClick={()=>this.addLanguageList(languageItem.name)}>
              <PaperRipple className='ripple'>
                <span className='language-btn'>{languageItem.name}</span>
              </PaperRipple>
            </li>
          );
        else
          return (
            <li key={index} onClick={()=>this.addLanguageList(languageItem.name)}>
              <PaperRipple className='ripple'>
                <span className='language-btn active'>{languageItem.name}</span>
              </PaperRipple>
            </li>
          );
      });
  };

  addGenreList = (genreItem) => {
    let currentFilters = clone(this.state.currentFilters);
    const genreList= currentFilters.genre;
    let arr=[];
    if(genreItem==='All'){
      arr=[];
    }
    else
      genreList.map((genre)=>{
        if(genre!=='All')
          arr.push(genre);
      });

    let updatedGenre =filterArray(arr, genreItem);
    let newFilter={language: currentFilters.language, genre : updatedGenre};
    this.setState({
      currentFilters : newFilter
    });
  };

  getGenre = (genre, genreList) => {
    if (genre.length)
      return genre.map((genreItem, index)=> {
        if (!includes(genreList, genreItem))
          return (
            <li key={index} onClick={()=>this.addGenreList(genreItem)}>
              <PaperRipple className='ripple'>
                <span className='language-btn'>{genreItem}</span>
              </PaperRipple>
            </li>
          );
        else
          return (
            <li key={index} onClick={()=>this.addGenreList(genreItem)}>
              <PaperRipple className='ripple'>
                <span className='language-btn active'>{genreItem}</span>
              </PaperRipple>
            </li>
          );
      });
  };

  reInitializeData(genre, language) {
    let {applyGenreAndLanguage, closeModal, setLoader} = this.props;
    applyGenreAndLanguage(genre, language);
    this.setState({applyFilter: true});
    const {data, toggle, mediaType, notInGenre, getData, clearData} = this.props;
    setLoader(true);
    clearData();
    if (mediaType === MEDIA_TYPE.TV_SERIES) {
      if (toggle)
        getData(endpoints.showsListWithAssetsCounts, formDataGenerator(applyLanguageGenreFilter(data, genre, notInGenre, language, mediaType)));
      else
        getData(endpoints.popularShowsList, formDataGenerator(applyPopularLanguageGenreFilter(data, genre, language)));
    } else
      getData(endpoints.searchAssets, formDataGenerator(applyLanguageGenreFilter(data, genre, notInGenre, language)));

    closeModal();
  }

  applyFilters = () => {
    let {currentFilters:{genre, language}} = this.state;
    if (genre.length && language.length) {
      this.reInitializeData(genre, language);
    }
  };

  resetFilters = () => {
    let {initialFilters:{genre, language}} = this.state;
    if (genre.length && language.length) {
      this.reInitializeData(genre, language);
    }
  };

  render() {
    const mediaType = this.props.mediaType;
    let {currentFilters:{genre,language}} = this.state;
    const {languageList, genreList}= this.state;
    const {onSubmit} = this.state;
    return (
      <div className='home-container'>
        <Tabs className='tab-section'>
          <TabList>
            <Tab><h2><PaperRipple className='ripple'>Language <span className='badge'>{language.length}</span></PaperRipple></h2></Tab>
            <Tab><h2><PaperRipple className='ripple'>Genre <span className='badge'>{genre.length}</span></PaperRipple></h2></Tab>
          </TabList>
          <TabPanel>
            <div className='language-item'>
              <Loader {...this.props} />
              <ul className='clearfix'>
                {this.getLanguage(languageList, language)}
              </ul>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='language-item genre-list'>
              <Loader {...this.props} />
              <ul className='clearfix'>
                {this.getGenre(genreList,genre)}
              </ul>
            </div>
          </TabPanel>
        </Tabs>

        <div className='section text-center'>
          <button className='btn-default reset' onClick={this.resetFilters}>Reset</button>
          <button className='btn-danger apply' onClick={this.applyFilters}>Apply</button>
          {onSubmit && (!genre.length || !language.length) &&
            <div className='section text-center color-red'>
                Please select at least one language and one genre
            </div>
          }
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    updateLanguage: bindActionCreators(updateLanguage, dispatch),
    clearFilters: bindActionCreators(clearFilters, dispatch),
  };
};
GenreLanguage.propTypes = {
  getData: PropTypes.func.isRequired,
  clearData: PropTypes.func.isRequired,
  closeModal: PropTypes.func,
  clearFilters: PropTypes.func.isRequired,
  setLoader: PropTypes.func.isRequired,
  loader: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  updateLanguage: PropTypes.func,
  toggle: PropTypes.number.isRequired,
};
export default connect(null, mapDispatchToProps)(GenreLanguage);
