export const getCardTitle = (list, componentFlag) => {

  let title = '';

  if(list.title && list.title!=''){
   return list.title;
  }

  if (list.mediaMainTitle && list.mediaMainTitle != '') {
    title = list.mediaMainTitle;
  }else if (list.MovieMainTitle && list.MovieMainTitle != '') {
    title = list.MovieMainTitle;
  } else if (list.EpisodeMainTitle && list.EpisodeMainTitle != '') {
    title = list.EpisodeMainTitle;
  } else if ((componentFlag === 'bingeWatch') && list.season && list.season != '') {
    title = `Season ${list.season}`;
  } else if (componentFlag ==='kidsClusters' && list.name && list.name != '') {
    title = list.name;
  } else if (list.seriesMainTitle && list.seriesMainTitle != '') {
    title = list.seriesMainTitle;
  } else if (list.label && list.label != '' ) {
    title = list.label;
  } else if (list.RefSeriesTitle && list.RefSeriesTitle != '' && list.type!='relatedMedia') {
    title = list.RefSeriesTitle;
  } else if (list.MediaName && list.MediaName != '' && list.type =='relatedMedia') {
    title = list.MediaName;
  } else if (list.SeriesMainTitle && list.SeriesMainTitle != '' ) {
    title = list.SeriesMainTitle;
  }else if (list.title && list.title != '' && list.mName=='seriesSeasonMastHead' ) {
    title = list.title;
  }
  return title;
};
