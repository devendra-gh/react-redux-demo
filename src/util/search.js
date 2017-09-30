import {MEDIA_TYPE} from '../constants/media';
import clone from 'clone';

export const headingCreator = (heading, count) => {
  switch (heading) {
    case "tvSeries":
      return checkCount("SHOW", count);
    case "clips":
      return checkCount("VOOT SHORT", count);
    case "episode":
      return checkCount("EPISODE", count);
    case "movies":
      return checkCount("MOVIE", count);
    case "videos":
      return checkCount("VIDEO", count);
    default:
      return "";
  }
};

export const checkCount = (string , count) => {
  switch (count) {
    case 1:
      return `${string}`;
    default:
      return `${string}S`;
  }
};

export const resultCreator = (count) => {
  switch (count) {
    case 1:
      return count + " RESULT";
    default:
      return count + " RESULTS";
  }
};


export const searchActionTvSeriesLoadMoreFilter = (arr, keyword) => {
  let array = clone(arr);
  array.map((item) => {
    if (item.key === 'filter') {
      item.value = `(and (or (or name ~'${keyword}' SeriesMainTitle ~'${keyword}' keywords ~'${keyword}' ContributorList ~'${keyword}' SeriesShortTitle ~'${keyword}' Genre ~'${keyword}' Language ~'${keyword}')) (and  Genre!='Kid' Genre!='Kids'))`;
    }
    if (item.key === 'pageIndex') {
      item.value = parseInt(item.value) + 1;
    }
  });
  return array;
};

export const searchActionKidsTvSeriesLoadMoreFilter = (arr, keyword) => {
  let array = clone(arr);
  array.map((item) => {
    if (item.key === 'filter') {
      item.value = `(and (or (or name ~'${keyword}' SeriesMainTitle ~'${keyword}' SeriesShortTitle ~'${keyword}' Genre ~'${keyword}' Language ~'${keyword}')) (or  Genre='Kid' Genre='Kids'))`;
    }
    if (item.key === 'pageIndex') {
      item.value = parseInt(item.value) + 1;
    }
    if (item.key === 'pageSize') {
      item.value = 8;
    }
  });
  return array;
};

export const searchActionMoviesLoadMoreFilter = (arr, keyword) => {
  let array = clone(arr);
  array.map((item) => {
    if (item.key === 'filterTypes') {
      item.value = `${MEDIA_TYPE.MOVIE}`;
    }
    if (item.key === 'filter') {
      item.value = `(and (or (or name ~'${keyword}' MovieMainTitle ~'${keyword}' Genre ~'${keyword}' Keywords ~'${keyword}' CharacterList ~'${keyword}'  ContributorList ~'${keyword}' MovieDirector ~'${keyword}' Language ~'${keyword}')) (and  contentType='Movie'))`;
    }
    if (item.key === 'pageIndex') {
      item.value = parseInt(item.value) + 1;
    }
  });
  return array;
};


export const searchActionClipsLoadMoreFilter = (arr, keyword) => {
  let array = clone(arr);
  array.map((item) => {
    if (item.key === 'filterTypes') {
      item.value = `${MEDIA_TYPE.EPISODE}`;
    }
    if (item.key === 'filter') {
      item.value = `(and (or (or name ~'${keyword}' RefSeriesTitle ~'${keyword}' EpisodeMainTitle ~'${keyword}' Genre ~'${keyword}' SBU ~'${keyword}'  Language ~'${keyword}')) (and  contentType!='Full Episode')  (and  Genre!='Kid' Genre!='Kids'))`;
    }
    if (item.key === 'pageIndex') {
      item.value = parseInt(item.value) + 1;
    }
  });
  return array;
};

export const searchActionEpisodesLoadMoreFilter = (arr, keyword) => {
  let array = clone(arr);
  array.map((item) => {
    if (item.key === 'filterTypes') {
      item.value = `${MEDIA_TYPE.EPISODE}`;
    }
    if (item.key === 'filter') {
      item.value = `(and (or (or name ~'${keyword}' RefSeriesTitle ~'${keyword}' EpisodeMainTitle ~'${keyword}' Genre ~'${keyword}' SBU ~'${keyword}'  Language ~'${keyword}')) (and  contentType='Full Episode')  (and  Genre!='Kid' Genre!='Kids'))`;
    }
    if (item.key === 'pageIndex') {
      item.value = parseInt(item.value) + 1;
    }
  });
  return array;
};

export const searchActionKidsEpisodesLoadMoreFilter = (arr, keyword) => {
  let array = clone(arr);
  array.map((item) => {
    if (item.key === 'filterTypes') {
      item.value = `${MEDIA_TYPE.EPISODE}`;
    }
    if (item.key === 'filter') {
      item.value = `(and (or (or name ~'${keyword}' RefSeriesTitle ~'${keyword}' EpisodeMainTitle ~'${keyword}' Genre ~'${keyword}' SBU ~'${keyword}'  Language ~'${keyword}')) (or  Genre='Kid' Genre='Kids'))`;
    }
    if (item.key === 'pageIndex') {
      item.value = parseInt(item.value) + 1;
    }
  });
  return array;
};

export const searchActionSearchAssetsFilter = (arr, data) => {
  let array = clone(arr);
  array.map((item) => {
    if (item.key === 'filterTypes') {
      item.value = `${MEDIA_TYPE.TV_SERIES}`;
    }
    if (item.key === 'filter') {
      item.value = `(and SeriesMainTitle='${data.metas.RefSeriesTitle.replace(/\'/g, '%27')}' Season='${data.metas.RefSeriesSeason}')`;
    }
    if (item.key === 'pageIndex') {
      item.value = 0;
    }
  });
  return array;
};


export const searchActionSearchAssetsKidsFilter = (arr, data) => {
  let array = clone(arr);
  array.map((item) => {
    if (item.key === 'filterTypes') {
      item.value = `${MEDIA_TYPE.TV_SERIES}`;
    }

    if(data.metas.RefSeriesTitle){
      if (item.key === 'filter') {
        item.value = `(and SeriesMainTitle='${data.metas.RefSeriesTitle.replace(/\'/g, '%27')}')`;
      }
    } else if(data.metas.MovieMainTitle){
      if (item.key === 'filter') {
        item.value = `(and MovieMainTitle='${data.metas.MovieMainTitle.replace(/\'/g, '%27')}')`;
      }
    }

    if (item.key === 'pageIndex') {
      item.value = 0;
    }
  });
  return array;
};
