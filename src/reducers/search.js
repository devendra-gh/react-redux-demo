import {
  SEARCH,
} from '../constants/searchActionConstants';
import clone from 'clone';

const initialState = {
  autoCompleteSuggestions : [],
  adult:{
    popularSuggestions: [],
    results : {
      tvSeries: {
        data: [],
        count: 0,
      },
      episodes: {
        data: [],
        count: 0,
      },
      clips : {
        data: [],
        count: 0,
      },
      movies : {
        data: [],
        count: 0,
      },
      kidsTvSeries: {
        data: [],
        count: 0,
      },
      kidsVideos: {
        data: [],
        count: 0,
      },
      isLoading : true,
    },
    noResult : {
      popularShows:{
        data: [],
        count: 0,
      },
      popularEpisodes:{
        data: [],
        count: 0,
      },
    },
  },
  kids: {
    popularSuggestions: [],
    results : {
      data : [],
      tvSeries: {
        data: [],
        count: 0,
      },
      episodes: {
        data: [],
        count: 0,
      },
      isLoading : true,
    },
    noResult : {
      popularShows:{
        data: [],
        count: 0,
      },
      popularEpisodes:{
        data: [],
        count: 0,
      },
    },
  },
};

const search = function (state = initialState, action) {
  switch (action.type) {

    /****************SUGGESTED SEARCH ********************/
    case SEARCH.GET_SEARCH_SUGGESTION_LIST:
      return {
        ...state,
        autoCompleteSuggestions: action.data,
      };

    /****************ADULT SEARCH ********************/
    case SEARCH.ADULT.GET_POPULAR_SEARCH:
      return {
        ...state,
        adult: {
          ...state.adult,
          popularSuggestions: action.data,
        },
      };

    case SEARCH.ADULT.SEARCH_SUCCESS:{
      const {tvSeries, episode, movies, clips, kidsTvSeries, kidsVideos}=action.data;
      return {
        ...state,
        adult: {
          ...state.adult,
          results : {
            isLoading : false,
            tvSeries: {
              data: tvSeries.assets,
              count: tvSeries.total_items,
            },
            episodes: {
              data: episode.assets,
              count: episode.total_items,
            },
            clips : {
              data: clips.assets,
              count: clips.total_items,
            },
            movies : {
              data: movies.assets,
              count: movies.total_items,
            },
            kidsTvSeries: {
              data: kidsTvSeries.assets,
              count: kidsTvSeries.total_items,
            },
            kidsVideos: {
              data: kidsVideos.assets,
              count: kidsVideos.total_items,
            },
          },
        },
      };
    }

    case SEARCH.ADULT.SEARCH_FAILURE:
      return {
        ...state,
        adult: {
          ...state.adult,
          results : {
            error : action.error,
            data : [],
          },
        },
      };

    case SEARCH.ADULT.POPULAR_SHOWS:
      return {
        ...state,
        adult: {
          ...state.adult,
          noResult : {
            ...state.adult.noResult,
            popularShows:{
              data: action.data.assets ,
              count: action.data.total_items,
            },
          },
        },
      };

    case SEARCH.ADULT.POPULAR_EPISODES:
      return {
        ...state,
        adult: {
          ...state.adult,
          noResult : {
            ...state.adult.noResult,
            popularEpisodes:{
              data: action.data.assets ,
              count: action.data.total_items,
            },
          },
        },
      };

    /****************KIDS SEARCH ********************/
    case SEARCH.KIDS.GET_POPULAR_SEARCH:
      return {
        ...state,
        kids: {
          ...state.kids,
          popularSuggestions: action.data,
        },
      };

    case SEARCH.KIDS.SEARCH_SUCCESS:{
      const {tvSeries, episode}=action.data;
      return {
        ...state,
        kids: {
          ...state.kids,
          results : {
            data : action.data,
            tvSeries: {
              data: tvSeries.assets,
              count: tvSeries.total_items,
            },
            episodes: {
              data: episode.assets,
              count: episode.total_items,
            },
            isLoading : false,
          },
        },
      };
    }

    case SEARCH.KIDS.SEARCH_FAILURE:
      return {
        ...state,
        kids: {
          ...state.kids,
          results : {
            error : action.error,
            data : [],
          },
        },
      };

    case SEARCH.KIDS.GET_IMAGES:{
      const {data, index, reducer, resultType, dataType} = action;

      let newArr = [];

      state[reducer][resultType][dataType].data.map((item, i)=>{
        if(i===index){
          let obj = clone(item);
          obj.imgURLL = data.imgURL;
          obj.imgURLM = data.imgURLM;
          obj.imgURLS = data.imgURLS;
          newArr.push(obj);

        }
        else
          newArr.push(item);
      });


      return {
        ...state,
        [reducer] :{
          ...state[reducer],
          [resultType] : {
            ...state[reducer][resultType],
            [dataType] : {
              data : newArr,
              count: state[reducer][resultType][dataType].count,
            },
          },
        },
      };
    }


    case SEARCH.KIDS.POPULAR_SHOWS:
      return {
        ...state,
        kids: {
          ...state.kids,
          noResult : {
            ...state.kids.noResult,
            popularShows:{
              data: action.data.assets ,
              count: action.data.total_items,
            },
          },
        },
      };

    case SEARCH.KIDS.POPULAR_EPISODES:
      return {
        ...state,
        kids: {
          ...state.kids,
          noResult : {
            ...state.kids.noResult,
            popularEpisodes:{
              data: action.data.assets ,
              count: action.data.total_items,
            },
          },
        },
      };


    /****************CLEAR ALL DATA FOR SEARCH RESULTS********************/
    case SEARCH.CLEAR_SEARCH:
      return {
        ...state,
        autoCompleteSuggestions : [],
        adult:{
          ...state.adult,
          results : {
            ...initialState.adult.results,
          },
        },
        kids: {
          ...state.kids,
          results : {
            ...initialState.kids.results,
          },
        },
      };

    /****************GET MEDIA INFO CALL********************/
    case SEARCH.GET_MEDIA_INFO_CALLS:{

      const {data, key, index, reducer} = action;
      let newArr = [];

      state[reducer].results[key].data.map((item, i)=>{
        if(i===index){
         let obj = clone(item);
         obj.assetsCount = data.assetsCount;
         newArr.push(obj);
        }
        else
          newArr.push(item);
      });

      return {
        ...state,
      [reducer] :{
          ...state[reducer],
          results : {
            ...state[reducer].results,
            [key] : {
              data : newArr,
              count: state[reducer].results[key].count,
            },
          },
        },
      };
    }

    /****************GET SEARCH  ASSESTS INFO CALL FOR RESULT********************/
    case SEARCH.SEARCH_ASSETS_CALLS:{

      const {data, key, index, reducer} = action;
      if(!data[0].id)
        return state;

      let newArr = [];

      state[reducer].results[key].data.map((item, i)=>{
        if(i===index){
          let obj = clone(item);
          obj.refSeriesId = data[0].id;
          newArr.push(obj);
        }
        else
          newArr.push(item);
      });

      return {
        ...state,
        [reducer]:{
          ...state[reducer],
          results : {
            ...state[reducer].results,
            [key] : {
              data : newArr,
              count: state[reducer].results[key].count,
            },
          },
        },
      };
    }

    /****************GET SEARCH  ASSESTS INFO CALL FOR NO RESULT********************/
    case SEARCH.ADULT.SEARCH_ASSEST_NO_RESULT:{

      const {data, key, index, reducer} = action;
      if(!data[0].id)
        return state;

      let newArr = [];

      state[reducer].noResult[key].data.map((item, i)=>{
        if(i===index){
          let obj = clone(item);
          obj.refSeriesId = data[0].id;
          newArr.push(obj);

        }
        else
          newArr.push(item);
      });

      return {
        ...state,
        [reducer]:{
          ...state[reducer],
          noResult : {
            ...state[reducer].noResult,
            [key] : {
              data : newArr,
              count: state[reducer].noResult[key].count,
            },
          },
        },
      };
    }


    /****************LOAD MORE CALLS FOR KIDS AND ADULTS********************/
    case SEARCH.LOAD_MORE:{
      const {key, data, reducer} = action;
      return {
        ...state,
        [reducer]: {
          ...state[reducer],
          results : {
            ...state[reducer].results,
            [key] : {
              data: state[reducer].results[key].data.concat(data),
              count: state[reducer].results[key].count,
            },
          },
        },
      };
    }

    default:
      return state;
  }
};
export default search;
