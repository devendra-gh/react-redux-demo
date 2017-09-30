import {MEDIA_TYPE} from '../constants/media';

import includes from 'array-includes';

export const filterArray = (arr, item) => {
  let newArray = [];
  if (includes(arr, item)) {
    newArray = arr.filter(function (arrItem) {
      return arrItem !== item;
    });
  } else {
    newArray = arr;
    newArray.push(item);
  }
  return newArray;
};

export const applyOrderByFilter = (arr, filter) => {
  let flag = 0;
  arr.map((item) => {
    if (item.key === 'orderBy')
      if (item.value !== filter) {
        item.value = filter;
        flag = 1;
      }
  });

  if (flag) {
    arr.map((item)=> {
      if (item.key === 'pageIndex')
        item.value = 0;
    });
    return arr;
  }

  return false;
};

export const applyPageIndexFilter = (arr) => {
  arr.map((item) => {
    if (item.key === 'pageIndex') {
      item.value = parseInt(item.value) + 1;
    }
  });

  return arr;
};

export const initializePageIndexFilter = (arr) => {
  let flag = false;
  arr.map((item) => {
    if (item.key === 'pageIndex') {
      if (parseInt(item.value) !== 0) {
        item.value = 0;
        flag = true;
      }
    }
  });

  if (flag)
    return arr;

  return flag;
};

export const filterListFormation = (itemList, itemType) => {
  let filterList = '';
  if (itemList.length > 1) {
    itemList.map((item) => {
      filterList += `${itemType}='${item}'`;
    });
  } else {
    if (itemType === 'genre') {
      if (itemList[0] === 'All') {
        return filterList;
      }
    }
    filterList = `${itemType}='${itemList}'`;
  }
  return filterList;
};

export const filterNotInGenre = (itemList, itemType) => {
  let filterList = '';
  if (itemList.length > 1) {
    itemList.map((item) => {
      filterList += `${itemType}!='${item}'`;
    });
  } else {
    filterList = `${itemType}!='${itemList}'`;
  }
  return filterList;
};

export const applyLanguageGenreFilter = (arr, genre, notInGnere, language, mediaType) => {
  let sbu = '';
  // if (typeof window != undefined) {
  //   if(mediaType===MEDIA_TYPE.TV_SERIES && window.location.pathname != '/discover'){
  //     sbu='SBU!="VOOT"';
  //   }
  // }
  arr.map((item) => {
    if (item.key === 'filter') {
      item.value = `( and (or ${filterListFormation(genre, 'genre')}) (and ${filterNotInGenre(notInGnere, 'genre')} ${sbu}) (or ${filterListFormation(language, 'language')}))`;
    }
    if (item.key === 'pageIndex') {
      item.value = 0;
    }
  });

  return arr;
};

export const applyPopularLanguageGenreFilter = (arr, genre, language) => {
  let flag = 0;
  let createNew = false;
  arr.map((item) => {
    if (item.key === 'language') {
      item.value = `${language.toString()}`;
    }
    if (item.key === 'pageIndex') {
      item.value = 0;
    }
    if (item.key === 'genre') {
      if (genre.toString() !== 'All') {
        flag = 1;
        item.value = `${genre.toString()}`;
      } else
        createNew = true;
    }
  });

  if (!flag && genre.toString() !== 'All') {
    let genreList = {
      "key": "genre",
      "value": `${genre.toString()}`,
    };

    arr.push(genreList);
  }

  if (createNew) {
    let newArray = [];
    arr.map((item)=> {
      if (item.key !== 'genre')
        newArray.push(item);
    });
    arr = newArray;
  }

  return arr;
};

export const episodeSearchAssetsApiFilter = (arr, seriesMainTitle, metas, contentType = 'Full Episode') => {
  let sbuVal = '';
  if (metas.length) {
    let sbu = checkPropertyInArray(metas, 'SBU');
    if (sbu === 'VOOT') {
      sbuVal = 'SBU=' + `'${sbu}'`;
    }
  }
  let title = (seriesMainTitle).toString().replace(/-/g, " ").replace(/'/g, '%27');

  arr.map((item) => {
    if (item.key === 'filter') {
      item.value = `(and refSeriesTitle='${title}' contentType='${contentType}' ${sbuVal})`;
      //item.value = `(and contentType='Unseen Undekha' ${sbuVal})`;
    }
    if (item.key === 'pageIndex') {
      if (contentType === 'Full Episode')
        item.value = 0;
    }
  });
  return arr;
};

export const episodeSearchMediaApiFilter = (arr, seriesMainTitle, season) => {
  let title = (seriesMainTitle).toString().replace(/-/g, " ");

  arr.map((item) => {
    if (item.key === 'andList') {
      item.value = `[{"m_sKey":"RefSeriesTitle","m_sValue":"${seriesMainTitle}"},{"m_sKey":"RefSeriesSeason","m_sValue":"${season}"},{"m_sKey":"ContentType","m_sValue":"Full Episode"}]`;
    }
    if (item.key === 'pageIndex') {
      item.value = 0;
    }
  });
  return arr;
};


export const checkPropertyInArray = (arr, property) => {
  let val = false;
  arr.map((item)=> {
    if (item.Key === property) {
      val = item.Value;
    }
  });

  return val;
};


export const vootShortsSearchAssetsApiFilter = (arr, seriesMainTitle, metas, contentType = 'Full Episode') => {
  let sbuVal = '';
  if (metas.length) {
    let sbu = checkPropertyInArray(metas, 'SBU');
    if (sbu === 'VOOT') {
      sbuVal = 'SBU=' + `'${sbu}'`;
    }
  }
  let title = (seriesMainTitle).toString().replace(/-/g, " ").replace(/'/g, '%27');

  arr.map((item) => {
    if (item.key === 'filter') {
      item.value = `(and refSeriesTitle='${title}' contentType!='${contentType}' ${sbuVal})`;
      //item.value = `(and contentType='Unseen Undekha' ${sbuVal})`;
    }
    if (item.key === 'pageIndex') {
      if (contentType === 'Full Episode')
        item.value = 0;
    }
  });
  return arr;
};


export const searchAutoSuggestFilter = (arr, keyword) => {
  arr.map((item) => {
    if (item.key === 'prefixText') {
      item.value = `${keyword}`;
    }
  });
  return arr;
};
