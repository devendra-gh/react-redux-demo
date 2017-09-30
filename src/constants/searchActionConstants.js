import {MEDIA_TYPE} from './media';
export const SEARCH = {
  CLEAR_SEARCH: 'CLEAR_SEARCH',
  LOAD_MORE: 'LOAD_MORE',
  AUTO_SUGGEST_DEFAULT_FILTERS: [
    {
      "key": "prefixText",
      "value": "",
    },
    {
      "key": "pageSize",
      "value": "25",
    },
    {
      "key": "pageIndex",
      "value": "0",
    },
    {
      "key": "iMediaTypes",
      "value": `${MEDIA_TYPE.TV_SERIES},${MEDIA_TYPE.MOVIE},${MEDIA_TYPE.EPISODE}`,
    },
  ],
  SEARCH_ASSETS_CALLS: 'SEARCH_ASSETS_CALLS',
  GET_MEDIA_INFO_CALLS: 'GET_MEDIA_INFO_CALLS',
  SEARCH_ASSETS_DEFAULT_FILTER: [
    {
      "key": "filterTypes",
      "value": `${MEDIA_TYPE.TV_SERIES}`,
    },
    {
      "key": "filter",
      "value": "",
    },
    {
      "key": "orderBy",
      "value": "newest",
    },
    {
      "key": "pageIndex",
      "value": "0",
    },
    {
      "key": "pageSize",
      "value": "8",
    },
  ],
  GET_SEARCH_SUGGESTION_LIST: 'GET_SEARCH_SUGGESTION_LIST',
  ADULT : {
    GET_POPULAR_SEARCH: 'GET_ADULT_POPULAR_SEARCH',
    SEARCH_SUCCESS: 'ADULT_SEARCH_SUCCESS',
    SEARCH_FAILURE: 'ADULT_SEARCH_FAILURE',
    POPULAR_SHOWS: 'ADULT_POPULAR_SHOWS',
    POPULAR_EPISODES: 'ADULT_POPULAR_EPISODES',
    SEARCH_ASSEST_NO_RESULT: 'ADULT_SEARCH_ASSEST_NO_RESULT',
    SEARCH_ASSETS_POPULAR_EPISODES_DEFAULT_FILTER: [
      {
        "key": "filterTypes",
        "value": `${MEDIA_TYPE.EPISODE}`,
      },
      {
        "key": "filter",
        "value": "(and genre!='kids' genre!='kid' (or  contentType='Full Episode'))",
      },
      {
        "key": "orderBy",
        "value": "newest",
      },
      {
        "key": "pageIndex",
        "value": "0",
      },
      {
        "key": "pageSize",
        "value": "5",
      },
    ],
  },
  KIDS : {
    GET_POPULAR_SEARCH: 'GET_KIDS_POPULAR_SEARCH',
    SEARCH_SUCCESS: 'KIDS_SEARCH_SUCCESS',
    SEARCH_FAILURE: 'KIDS_SEARCH_FAILURE',
    GET_IMAGES: 'KIDS_GET_IMAGES',
    POPULAR_SHOWS: 'KIDS_POPULAR_SHOWS',
    POPULAR_EPISODES: 'KIDS_POPULAR_EPISODES',
    POPULAR_LIST_DEFAULT_FILTERS : [
      {
        "key": "language",
        "value": "Hindi, English",
      },
      {
        "key": "pageIndex",
        "value": "0",
      },
      {
        "key": "pageSize",
        "value": "50",
      },
      {
        "key": "isKids",
        "value": "1",
      },
    ],
    SEARCH_ASSETS_POPULAR_EPISODES_DEFAULT_FILTER: [
      {
        "key": "filterTypes",
        "value": `${MEDIA_TYPE.EPISODE}`,
      },
      {
        "key": "filter",
        "value": "(and (or  contentType='Full Episode') (or  Genre='Kid' Genre='Kids' ))",
      },
      {
        "key": "orderBy",
        "value": "newest",
      },
      {
        "key": "pageIndex",
        "value": "0",
      },
      {
        "key": "pageSize",
        "value": "5",
      },
    ],
  },
};
