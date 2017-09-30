import {MEDIA_TYPE} from './media';

export const MOVIES = {
  CAROUSEL: 'MOVIES_CAROUSEL',
  GET_DATA: 'MOVIES_GET_DATA',
  APPEND_DATA: 'MOVIES_APPEND_DATA',
  ERROR: 'MOVIES_ERROR',
  CLEAR_ERROR: 'MOVIES_CLEAR_ERROR',
  CLEAR_DATA: 'MOVIES_CLEAR_DATA',
  DEFAULT_FILTERS: [
    {
      "key": "filterTypes",
      "value": `${MEDIA_TYPE.MOVIE}`,
    },
    {
      "key": "filter",
      "value": "(and (or language='english' language='hindi') genre!='kids' genre!='kid')",
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
};
