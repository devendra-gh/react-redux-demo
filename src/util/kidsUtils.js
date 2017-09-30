export const getLandingPageSectionInRequiredSequence = (list) => {
  let kidsZoneMastHead, kidsZoneClusters, kidsZoneCharacters, kidsZoneVideos;
  list.map((item, index) => {
    if (item.mName === 'kidsZoneMastHead')
      kidsZoneMastHead = item;
    else if (item.mName === 'kidsZoneClusters')
      kidsZoneClusters = item;
    else if (item.mName === 'kidsZoneCharacters')
      kidsZoneCharacters = item;
    else if (item.mName === 'kidsZoneVideos')
      kidsZoneVideos = item;
  });

  return ([kidsZoneMastHead, kidsZoneClusters, kidsZoneCharacters, kidsZoneVideos]);
};

export const getColorClassForKidsCircularTile = (index) => {
  let colorClass;
  switch (index % 4) {
    case 0 :
      colorClass = 'item-pink';
      break;
    case 1 :
      colorClass = 'item-purple';
      break;
    case 2 :
      colorClass = 'item-orange';
      break;
    case 3 :
      colorClass = 'item-green';
      break;
  }

  return colorClass;
};
