import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import endpoints from '../../../../../../endpoints/shows';
import kidsEndpoints from '../../../../../../endpoints/kids';
import {createRoutes} from '../../../../../../util/routeCreater';
import {formDataGenerator} from '../../../../../../util/formDataGenerator';
import {SEARCH} from '../../../../../../constants/searchActionConstants';
import {kidsPopularSearch, getKidsImages} from '../../../../../../actions/searchAction';
import clone from 'clone';

const FILTER = clone(SEARCH.KIDS.POPULAR_LIST_DEFAULT_FILTERS);

class KidsPopularShows extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(nextProps) {
    const {popularShows:{count}, kidsPopularSearch}=this.props;
    if(!count)
      kidsPopularSearch(endpoints.popularShowsList, formDataGenerator(FILTER), ()=>{
        const {getKidsImages, popularShows: {data}} = this.props;
        let count = 0;
        data.map((item, index)=>{
          if (count > 3)
            return;
          if(item.tags.Genre[0]=='Kid' || item.tags.Genre[0]=='Kids'){
            count += 1;
            let queryParams = {
              mId : item.id,
            };
            getKidsImages(kidsEndpoints.kidsSeriesImages, queryParams, index, 'noResult', 'popularShows', 'kids');
          }
        });
      }) ;
  }

  createRoutes = (item) => {
    let route = createRoutes(['kids','characters',`${item.metas.SeriesMainTitle}`,`${item.id}`]);
    this.context.router.push(route);
  };

  getPopularShows = (data) => {
    let count = 0;
    return data.map((item,key)=> {
      if (count > 3)
        return;

      let imageList = {
        imgURLL: item.imgURLL ? item.imgURLL : null,
        imgURLM: item.imgURLM ? item.imgURLM : null,
        imgURLS: item.imgURLS ? item.imgURLS : null,
      };

      if(item.tags.Genre[0]=='Kid' || item.tags.Genre[0]=='Kids'){
        count += 1;
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
      }
    });
  }

  render() {
    const {popularShows: {count, data}} = this.props;

    return (
      <div className='search-page'>
        {
          count ?
            <div className='search-block'>
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
    kidsPopularSearch: bindActionCreators(kidsPopularSearch, dispatch),
    getKidsImages: bindActionCreators(getKidsImages, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    popularShows: state.search.kids.noResult.popularShows,
  };
};

KidsPopularShows.propTypes = {
  popularShows: PropTypes.object.isRequired,
  kidsPopularSearch: PropTypes.func.isRequired,
  getKidsImages: PropTypes.func.isRequired,
};

KidsPopularShows.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(KidsPopularShows);
