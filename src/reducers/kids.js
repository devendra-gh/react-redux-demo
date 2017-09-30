import {
  KIDS,
} from '../constants';

const initialState = {
  kidsCluster: {
    kidsData: {
      data: [],
      dataCount: 0,
    },
    error: {},
  },
  kidsHome :{
    data : [],
    resultantSize: 0,
    error : {},
  },
  allEpisodes : {
    data: [],
    totalDataCount: 0,
  },
  kidsSeries : {
    data: [],
    totalDataCount: 0,
  },
  moviesData: {
    data: [],
    dataCount: 0,
  },
  posterRoute: {
    episodes: '',
  },
};


const kids = function (state = initialState, action) {
  let output = [];
  switch (action.type) {
    case KIDS.CLUSTER.GET_DATA:
      return {
        ...state,
        kidsCluster: {
          kidsData: {
            data: action.data.assets,
            dataCount: action.data.total_items,
          },
          error : {},
        },
      };

    case KIDS.CLUSTER.ERROR:
      return {
        ...state,
        kidsCluster: {
          kidsData : state.kidsCluster.kidsData,
          error: action.error,
        },
      };

    case KIDS.CLUSTER.CLEAR_ERROR:
      return {
        ...state,
        kidsCluster: {
          kidsData : state.kidsCluster.kidsData,
          error: {},
        },
      };
    case KIDS.CLUSTER.CLEAR_DATA:
      return {
        ...state,
        kidsCluster: {
          kidsData: {
            data: action.data.assets,
            dataCount: action.data.total_items,
          },
          error : {},
        },
      };

    /* Kids Home page*/
    case KIDS.HOME.GET_DATA:
      if (state.kidsHome.data != [] && state.kidsHome.data != null) {
        if (action.data.assets != [] && action.data.assets != null) {
          output = state.kidsHome.data.concat(action.data.assets);
        }
        else
          output = state.kidsHome.data;
      }
      else if (action.data.assets != [] && action.data.assets != null) {
        output = action.data.assets;
      }
      return {
        ...state,
        kidsHome: {
          data: output,
          resultantSize: action.data.assets != null ? action.data.assets.length : 0,
          error: {},
        },
      };

    case KIDS.HOME.ERROR:
      return {
        ...state,
        kidsHome: {
          data : state.kidsHome.data,
          resultantSize: 0,
          error: action.error,
        },
      };

    case KIDS.HOME.RESET:
      return {
        ...state,
        kidsHome: {
          data : [],
          resultantSize: 0,
          error: {},
        },
      };

    case KIDS.HOME.CLEAR_ERROR:
      return {
        ...state,
        kidsHome: {
          data : state.kidsHome.data,
          error: {},
        },
      };

    /**All Shows Landing Episodes Actions ********************************************************/
    case KIDS.ALL_EPISODES.GET_DATA:
      return {
        ...state,
        allEpisodes : {
          data: action.data.assets,
          totalDataCount: action.data.total_items,
        },
      };

    case KIDS.ALL_EPISODES.APPEND_DATA:
      return {
        ...state,
        allEpisodes: {
          data: state.allEpisodes.data.concat(action.data.assets),
          totalDataCount: action.data.total_items,
        },
      };

    case KIDS.ALL_EPISODES.CLEAR_DATA:
      return {
        ...state,
        allEpisodes: {
          data: action.data.assets,
          totalDataCount: action.data.total_items,
        },
      };

    case KIDS.ALL_EPISODES.ERROR:
      return {
        ...state,
        allEpisodes: {
          data: action.data.assets,
          totalDataCount: action.data.total_items,
        },
      };

    /**Kids Series Actions ********************************************************/
    case KIDS.SERIES.GET_DATA:
      return {
        ...state,
        kidsSeries : {
          data: action.data.assets,
          totalDataCount: action.data.total_items,
        },
      };

    case KIDS.SERIES.CLEAR_DATA:
      return {
        ...state,
        kidsSeries: {
          data: action.data.assets,
          totalDataCount: action.data.total_items,
        },
      };

      /** Kids Movies Actions *****************************************************/

    case KIDS.MOVIES.GET_DATA:
      return {
        ...state,
        moviesData: {
          data: action.data.assets,
          dataCount: action.data.total_items,
        },
      };
    case KIDS.MOVIES.APPEND_DATA:
      return {
        ...state,
        moviesData: {
          data: state.moviesData.data.concat(action.data.assets),
          dataCount: action.data.total_items,
        },
      };

    case KIDS.MOVIES.ERROR:
      return {
        ...state,
        error: action.error,
      };

    case KIDS.MOVIES.CLEAR_ERROR:
      return {
        ...state,
        error: {},

      };

    case KIDS.MOVIES.CLEAR_DATA:
      return {
        ...state,
        moviesData: {
          data: [],
          dataCount: 0,
        },
      };


    /** Kids Route Poster Actions *****************************************************/
    case KIDS.POSTER_ROUTE.EPISODES:
      return {
        ...state,
        posterRoute: {
          episodes: action.data,
        },
      };

    case KIDS.POSTER_ROUTE.CLEAR_ROUTES:
      return {
        ...state,
        posterRoute: {
          episodes: '',
        },
      };

    default:
      return state;
  }
};
export default kids;
