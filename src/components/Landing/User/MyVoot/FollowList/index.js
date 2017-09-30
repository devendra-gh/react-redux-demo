import React, {Component, PropTypes} from 'react';
import CardImage from '../../../../CardComponent/CardImage';
import CardTitle from '../../../../CardComponent/CardTitle';
import CardTagList from '../../../../CardComponent/CardTagList';
import {dateFormat, timeFormat, episodeFormat, seriesFormat, sbuFormat} from '../../../../../util/filters';

const FollowListItem = (props) => {
  const item = props.item,
    imageList = {
      imgURLL: item.imgURLL,
      imgURLM: item.imgURLM,
      imgURLS: item.imgURLS,
    };
  let tags = createTags(item);
  return(
    <div className='box-container'>
      <div className='card-holder' onClick={props.onClick}>
        <figure className='figure-block'>
          <CardImage aspectRatio={props.aspectRatio} mId={item.mId} source={imageList} alt={item.title} />
        </figure>
        <div className='item-detail'>
          <div style={{color:'red'}}>
            {
              item.totalEpisodesToWatch + item.totalShortsToWatch > 0 ? `Newly Added: ${item.totalEpisodesToWatch > 0 ? item.totalEpisodesToWatch + " Episodes" :''} ${item.totalShortsToWatch > 0 ? `& ${item.totalShortsToWatch} Shorts`:''} `:''
            }
          </div>
          <div className='follow-user-module'>
            <i className='icon-fav-fill' />
          </div>
          <CardTitle title={item} isTitleMultiLine={props.isTitleMultiLine} />
          <CardTagList tagLists={tags} />
        </div>
      </div>
    </div>
  );
};

const createTags= (item)=>{
  let sbu = (item.sbu != undefined) ? item.sbu : item.sbu,
    genre = item.genre,
    totalEpisodes = `${item.totalEpisodes} Episodes`,tags;
    tags = [sbu, genre,totalEpisodes].filter((item) => {
      if (item) {
        return item;
      }
    });

  return tags;
};

FollowListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  aspectRatio:  PropTypes.string.isRequired,
  isTitleMultiLine: PropTypes.bool.isRequired,
};

export default FollowListItem;
