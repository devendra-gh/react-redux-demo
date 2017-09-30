export const getImageUrlMap = (pictureList) => {

  let small = "320X180", medium = "512X288", large = "768X432";
  let map = {};
  for (let i = 0; i <= (pictureList.length - 1); i = i + 1) {
    switch (pictureList[i].PicSize) {
      case small:
        map.imgURLS = pictureList[i].URL;
        break;
      case medium:
        map.imgURLM = pictureList[i].URL;
        break;
      case large:
        map.imgURLL = pictureList[i].URL;
        break;
    }
  }
  return map;
};

export const getSocialShareImageUrl = (pictureList) =>{
  let size ="1280X720";
  for (let i = 0; i <= (pictureList.length - 1); i = i + 1) {
    if (pictureList[i].PicSize == size)
      return pictureList[i].URL;
  }
  return "";
};

export const getShowDescription = (metaInformation) => {
  for (let i = 0; i <= (metaInformation.length - 1); i = i + 1) {
    if (metaInformation[i].Key == "SeriesSynopsis")
      return metaInformation[i].Value;
  }
  return "";
};

export const getSeriesValueFromListOfMapsForKey = (list, key) => {
  for (let i = 0; i <= (list.length - 1); i = i + 1) {
    if (list[i].Key == key)
      return list[i].Value;
  }
  return "";
};

export const getShowMetaTags = (showInformation) => {
  let sbu, genre, language;

  showInformation.Metas.forEach(function (arrayItem) {
    if (arrayItem.Key == "SBU")
      sbu = arrayItem.Value;
    else if (arrayItem.Key == "Language")
      language = arrayItem.Value;
  });

  showInformation.Tags.forEach(function (arrayItem) {
    if (arrayItem.Key == "Genre")
      genre = arrayItem.Value;
  });

  return [sbu,genre,language];
};


export const getKidsShowMetaTags = (showInformation) => {
  let genre, language;

  showInformation.Metas.forEach(function (arrayItem) {
    if (arrayItem.Key == "Language")
      language = arrayItem.Value;
  });

  showInformation.Tags.forEach(function (arrayItem) {
    if (arrayItem.Key == "Genre")
      genre = arrayItem.Value;
  });

  return [genre,language];
};
