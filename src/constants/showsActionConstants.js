import {MEDIA_TYPE} from './media';

export const SHOWS = {
  TV_SERIES: {
    CAROUSEL: 'TV_SERIES_CAROUSEL',
    GET_DATA: 'TV_SERIES_GET_DATA',
    APPEND_DATA: 'TV_SERIES_APPEND_DATA',
    ERROR: 'TV_SERIES_ERROR',
    CLEAR_ERROR: 'TV_SERIES_CLEAR_ERROR',
    CLEAR_DATA: 'TV_SERIES_CLEAR_DATA',
    SHOWLIST_ASSET_COUNT_DEFAULT_FILTERS: [
      {
        "key": "filter",
        "value": "(and genre!='kid' genre!='kids' (or language='hindi' language='english' ))",
      },
      {
        "key": "orderBy",
        "value": "a_to_z",
      },
      {
        "key": "pageIndex",
        "value": "0",
      },
      {
        "key": "pageSize",
        "value": "10",
      },
    ],
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
        "value": "10",
      },
      {
        "key": "isKids",
        "value": "0",
      },
      {
        "key": "isVO",
        "value": "1",
      },
    ],
  },
  VOOT_ORIGINALS: {
    CAROUSEL: 'VOOT_ORIGINALS_CAROUSEL',
    GET_AND_APPEND_DATA: 'VOOT_ORIGINALS_GET_AND_APPEND_DATA',
    ERROR: 'VOOT_ORIGINALS_ERROR',
    CLEAR_ERROR: 'VOOT_ORIGINALS_CLEAR_ERROR',
    CLEAR_DATA: 'VOOT_ORIGINALS_CLEAR_DATA',
    DEFAULT_FILTERS: [
      {
        "key": "pageIndex",
        "value": "0",
      },
      {
        "key": "pageSize",
        "value": "10",
      },
    ],
  },
  EPISODES : {
    ALL_EPISODES : {
      GET_DATA: 'ALL_EPISODES_GET_DATA',
      APPEND_DATA: 'ALL_EPISODES_APPEND_DATA',
      CLEAR_DATA: 'ALL_EPISODES_CLEAR_DATA',
      ERROR: 'ALL_EPISODES_ERROR',
      SEARCH_ASSESTS_DEFAULT_FILTERS : [
        {
          "key": "filterTypes",
          "value": `${MEDIA_TYPE.EPISODE}`,
        },
        {
          "key": "filter",
          "value": "(and contentType='Full Episode')",
        },
        {
          "key": "orderBy",
          "value": "views",
        },
        {
          "key": "pageIndex",
          "value": "0",
        },
        {
          "key": "pageSize",
          "value": "10",
        },
      ],
      SEARCH_MEDIA_DEFAULT_FILTERS: [
        {
          "key": "filterTypes",
          "value": `${MEDIA_TYPE.EPISODE}`,
        },
        {
          "key": "andList",
          "value": "",
        },
        {
          "key": "pageIndex",
          "value": "0",
        },
        {
          "key": "pageSize",
          "value": "10",
        },
        {
          "key": "orderBy",
          "value": "META",
        },
        {
          "key": "orderDir",
          "value": "DESC",
        },
        {
          "key": "orderMeta",
          "value": "EpisodeNo",
        },
        {
          "key": "exact",
          "value": "true",
        },
      ],
    },
    VOOT_SHORTS : {
      CURATED_VOOT_SHORTS_GET_DATA: 'CURATED_VOOT_SHORTS_GET_DATA',
      ALL_VOOT_SHORTS_GET_DATA: 'ALL_VOOT_SHORTS_GET_DATA',
      CURATED_VOOT_SHORTS_APPEND_DATA: 'CURATED_VOOT_SHORTS_APPEND_DATA',
      ALL_VOOT_SHORTS_APPEND_DATA: 'ALL_VOOT_SHORTS_APPEND_DATA',
      ALL_VOOT_CLEAR_DATA: 'ALL_VOOT_CLEAR_DATA',
      SEARCH_ASSESTS_DEFAULT_FILTERS : [
        {
          "key": "filterTypes",
          "value": `${MEDIA_TYPE.EPISODE}`,
        },
        {
          "key": "filter",
          "value": " ",
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
          "value": "6",
        },

      ],
    },
  },
  POSTER_ROUTES: {
    EPISODES: 'ALL_EPISODES_SET_POSTER_ROUTES',
    ALL_VOOT_SHORTS: 'ALL_VOOT_SHORTS_SET_POSTER_ROUTES',
    CURATED_VOOT_SHORTS: 'CURATED_VOOT_SHORTS_SET_POSTER_ROUTES',
    CLEAR_ROUTES: 'CLEAR_ALL_POSTER_ROUTES',
  },
};
