import React, {Component} from 'react';
import {dateFormat, timeFormat, episodeFormat, seriesFormat, sbuFormat} from '../../../util/filters';
import CardImage from '../../CardComponent/CardImage';
import CardArrow from '../../CardComponent/CardArrow';
import CardTitle from '../../CardComponent/CardTitle';
import CardTagList from '../../CardComponent/CardTagList';

class NormalCard extends Component {
  constructor(props) {
    super(props);

    this.createTags = this.createTags.bind(this);
  }

  createTags(item){
    let
      duration = !isNaN(item.duration) ? timeFormat(item.duration) : item.duration,
      seriesSeason = !isNaN(item.refSeriesSeason) ? seriesFormat(item.refSeriesSeason) : item.refSeriesSeason,
      episodeNo = !isNaN(item.episodeNo) ? episodeFormat(item.episodeNo) : item.episodeNo,
      telecastDate = !isNaN(item.telecastDate) && item.telecastDate != 0 ? dateFormat(item.telecastDate) : item.telecastDate != 0 ? item.telecastDate : '',
      sbu = (item.sbu != undefined) ? sbuFormat(item.sbu) : item.sbu,
      genre = item.genre,
      tags = [seriesSeason, episodeNo, telecastDate, duration, sbu, genre].filter((item) => {
        if (item) {
          return item;
        }
      });

    return tags;
  }

  onClick = () =>{
    const {data,onClick}=this.props;
    onClick(data);
  };

  render() {
    const item = this.props.item,
      imageList = {
        imgURLL: item.imgURLM,
        imgURLM: item.imgURLS,
        imgURLS: item.imgURLS,
      };
    let tags = this.createTags(item),
      altText = item.title!=undefined ? item.title : item.seriesMainTitle || item.name;
    return (
      <div onClick={this.onClick} className='card-holder'>
        <figure className='figure-block'>
          <CardImage aspectRatio={this.props.aspectRatio} mId={item.mId} source={imageList} alt={altText} />
          <CardArrow />
        </figure>
        <div className='item-detail'>
          <CardTitle title={item} isTitleMultiLine={this.props.isTitleMultiLine} componentFlag={this.props.componentFlag} />
          <CardTagList tagLists={tags} />
        </div>
      </div>
    );
  }
}

NormalCard.propTypes = {
  item: React.PropTypes.object.isRequired,
  isTitleMultiLine: React.PropTypes.bool,
  componentFlag: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired,
  aspectRatio: React.PropTypes.string,
};

export default NormalCard;
