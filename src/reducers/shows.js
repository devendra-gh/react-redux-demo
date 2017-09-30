import {
  SHOWS,
} from '../constants/showsActionConstants';

const initialState = {
  tvSeries: {
    carousel: {},
    showData: {
      data: [],
      totalDataCount: 0,
    },
    error: {},
  },
  vootOriginals: {
    carousel: {},
    vootOriginalData: {
      data: [],
      dataCount: 0,
    },
    error: {},
  },
  episodes: {
    allEpisodes : {
      data: [],
      totalDataCount: 0,
    },
    vootShorts: {
      curated: {
        data: [],
        totalDataCount: 0,
      },
      all: {
        data: [],
        totalDataCount: 0,
      },
    },
  },
  posterRoute:{
    episodes: '',
    allVootShorts: '',
    curatedVootShorts: '',
  },
};


const shows = function (state = initialState, action) {
  switch (action.type) {

    /**All Shows Listing Actions ********************************************************/
    case SHOWS.TV_SERIES.CAROUSEL:
      return {
        ...state,
        tvSeries: {
          ...state.tvSeries,
          carousel: action.data,
        },
      };

    case SHOWS.TV_SERIES.GET_DATA:
      return {
        ...state,
        tvSeries: {
          ...state.tvSeries,
          showData: {
            data: action.data.assets,
            dataCount: action.data.total_items,
          },
        },
      };

    case SHOWS.TV_SERIES.APPEND_DATA:
      return {
        ...state,
        tvSeries: {
          ...state.tvSeries,
          showData: {
            data: state.tvSeries.showData.data.concat(action.data.assets),
            dataCount: action.data.total_items,
          },
        },
      };

    case SHOWS.TV_SERIES.ERROR:
      return {
        ...state,
        tvSeries: {
          ...state.tvSeries,
          error: action.error,
        },
      };

    case SHOWS.TV_SERIES.CLEAR_ERROR:
      return {
        ...state,
        tvSeries: {
          ...state.tvSeries,
          error: {},
        },
      };

    case SHOWS.TV_SERIES.CLEAR_DATA:
      return {
        ...state,
        tvSeries: {
          ...state.tvSeries,
          showData: {
            data: [],
            dataCount: 0,
          },
          error :{},
        },
      };

    /**All Voot Originals Listing Actions ********************************************************/
    case SHOWS.VOOT_ORIGINALS.CAROUSEL:
      return {
        ...state,
        vootOriginals: {
          ...state.vootOriginals,
          carousel: action.data,
        },
      };

    case SHOWS.VOOT_ORIGINALS.GET_AND_APPEND_DATA:
      return {
        ...state,
        vootOriginals: {
          ...state.vootOriginals,
          vootOriginalData: {
            data: state.vootOriginals.vootOriginalData.data.concat(action.data.assets),
            dataCount: action.data.total_items,
          },
        },
      };

    case SHOWS.VOOT_ORIGINALS.ERROR:
      return {
        ...state,
        vootOriginals: {
          ...state.vootOriginals,
          error: action.error,
        },
      };

    case SHOWS.VOOT_ORIGINALS.CLEAR_ERROR:
      return {
        ...state,
        vootOriginals: {
          ...state.vootOriginals,
          error: {},
        },
      };

    case SHOWS.VOOT_ORIGINALS.CLEAR_DATA:
      return {
        ...state,
        vootOriginals: {
          ...state.vootOriginals,
          vootOriginalData: {
            data: [],
            dataCount: 0,
          },
        },
      };

    /**All Shows Landing Episodes Actions ********************************************************/
    case SHOWS.EPISODES.ALL_EPISODES.GET_DATA:
      return {
        ...state,
        episodes: {
          ...state.episodes,
          allEpisodes: {
            ...state.episodes.allEpisodes,
            data: action.data.assets,
            totalDataCount: action.data.total_items,
          },
        },
      };

    case SHOWS.EPISODES.ALL_EPISODES.APPEND_DATA:
      return {
        ...state,
        episodes: {
          ...state.episodes,
          allEpisodes: {
            ...state.episodes.allEpisodes,
            data: state.episodes.allEpisodes.data.concat(action.data.assets),
            totalDataCount: action.data.total_items,
          },
        },
      };

    case SHOWS.EPISODES.ALL_EPISODES.CLEAR_DATA:
      return {
        ...state,
        episodes: {
          ...state.episodes,
          allEpisodes: {
            data: action.data.assets,
            totalDataCount: action.data.total_items,
          },
        },
      };

    /**All Voot Shorts Actions ********************************************************/
    case SHOWS.EPISODES.VOOT_SHORTS.ALL_VOOT_SHORTS_GET_DATA:
      return {
        ...state,
        episodes: {
          ...state.episodes,
          vootShorts: {
            ...state.episodes.vootShorts,
            all: {
              ...state.episodes.vootShorts.all,
              data: action.data.assets,
              totalDataCount: action.data.total_items,
            },
          },
        },
      };

    case SHOWS.EPISODES.VOOT_SHORTS.ALL_VOOT_SHORTS_APPEND_DATA:
      return {
        ...state,
        episodes: {
          ...state.episodes,
          vootShorts: {
            ...state.episodes.vootShorts,
            all: {
              ...state.episodes.vootShorts.all,
              data: state.episodes.vootShorts.all.data.concat(action.data.assets),
              totalDataCount: action.data.total_items,
            },
          },
        },
      };

    /**Curated Voot Shorts Actions ********************************************************/
    case SHOWS.EPISODES.VOOT_SHORTS.CURATED_VOOT_SHORTS_GET_DATA:
      return {
        ...state,
        episodes: {
          ...state.episodes,
          vootShorts: {
            ...state.episodes.vootShorts,
            curated: {
              ...state.episodes.vootShorts.curated,
              data: action.data.assets,
              totalDataCount: action.data.total_items,
            },
          },
        },
      };

    case SHOWS.EPISODES.VOOT_SHORTS.CURATED_VOOT_SHORTS_APPEND_DATA:{
      let newData = [], newNestedArr = [], newObj, oldData = state.episodes.vootShorts.curated.data;
      oldData.map((data, key)=> {
        if (data.title === action.title) {
          newNestedArr = oldData[key].list.concat(action.data);
          newObj = Object.assign({}, oldData[key], {list: newNestedArr});
          newData.push(newObj);
        }
        else
          newData.push(data);
      });

      return {
        ...state,
        episodes: {
          ...state.episodes,
          vootShorts: {
            ...state.episodes.vootShorts,
            curated: {
              ...state.episodes.vootShorts.curated,
              data: newData,
            },
          },
        },
      };
    }

    /**Clearing Voot Shorts Actions (Curated + All)********************************************************/
    case SHOWS.EPISODES.VOOT_SHORTS.ALL_VOOT_CLEAR_DATA:
      return {
        ...state,
        episodes: {
          ...state.episodes,
          vootShorts: {
            curated: {
              data: [],
              totalDataCount: 0,
            },
            all: {
              data: [],
              totalDataCount: 0,
            },
          },
        },
      };

    /**Setting All(Episodes + VOOT SHORTS) Poster Routes********************************************************/
    case SHOWS.POSTER_ROUTES.EPISODES:
      return {
        ...state,
        posterRoute: {
          ...state.posterRoute,
          episodes: action.data,
        },
      };

    case SHOWS.POSTER_ROUTES.CURATED_VOOT_SHORTS:
      return {
        ...state,
        posterRoute: {
          ...state.posterRoute,
          curatedVootShorts: action.data,
        },
      };

    case SHOWS.POSTER_ROUTES.ALL_VOOT_SHORTS:
      return {
        ...state,
        posterRoute: {
          ...state.posterRoute,
          allVootShorts: action.data,
        },
      };

    case SHOWS.POSTER_ROUTES.CLEAR_ROUTES:
      return {
        ...state,
        posterRoute: {
          episodes: '',
          allVootShorts: '',
          curatedVootShorts: '',
        },
      };

    default:
      return state;
  }
};
export default shows;
