import React, {Component} from 'react';
import {dateFormat,timeFormat, episodeFormat, seriesFormat} from '../../../util/filters';
import CardTitle from  '../CardTitle';
import CardTagList from '../CardTagList';
import CardImage from '../CardImage';
import CardArrow from '../CardArrow';

class CardRectangular extends Component {
  constructor(props) {
    super(props);
  }

  onClick=()=>{
    const {data, onClick}=this.props;
    if (data && onClick)
      onClick(data);
  };
  render() {
    let cardContent = this.props.cardContent && this.props.cardContent.metas;
    let duration, seriesSeason, episodeNo, telecastDate, tagListArr, imageList,releaseYear;
    if(cardContent && cardContent.ContentDuration){
      duration = !isNaN(cardContent.ContentDuration) ? timeFormat(cardContent.ContentDuration) : cardContent.ContentDuration;
    }
    if(cardContent && cardContent.RefSeriesSeason) {
      seriesSeason = !isNaN(cardContent.RefSeriesSeason) ? seriesFormat(cardContent.RefSeriesSeason) : cardContent.RefSeriesSeason;
    }
    if(cardContent && cardContent.EpisodeNo) {
      episodeNo = !isNaN(cardContent.EpisodeNo) ? episodeFormat(cardContent.EpisodeNo) : cardContent.EpisodeNo;
    }
    if(cardContent && cardContent.TelecastDate) {
      //keep it like this ---by Sourabh Chourasiya.
      //telecastDate = !isNaN(cardContent.TelecastDate) ? dateFormat(cardContent.TelecastDate) : cardContent.TelecastDate;
      telecastDate = cardContent.telecastDate!='0'? !isNaN(cardContent.telecastDate) ? dateFormat(cardContent.telecastDate) : cardContent.telecastDate:false;
    }
    // if(cardContent && cardContent.ReleaseYear) {
    //   releaseYear = !isNaN(cardContent.ReleaseYear) ? cardContent.ReleaseYear : cardContent.ReleaseYear;
    // }
    tagListArr = [episodeNo, telecastDate, duration]; //releaseYear,seriesSeason

    imageList = {
      imgURLL: this.props.cardContent  && this.props.cardContent.thumbnail ?this.props.cardContent.thumbnail:false,
      imgURLM: this.props.cardContent  && this.props.cardContent.thumbnail ?this.props.cardContent.thumbnail:false,
      imgURLS: this.props.cardContent && this.props.cardContent.thumbnail ?this.props.cardContent.thumbnail:false,
    };

    let classes = 'figure-block '+(this.props.className!=undefined ? this.props.className: '');
    return (
      <div onClick={this.onClick} className='card-rectangular card-holder clearfix'>
        <figure className={classes}>
          <CardImage aspectRatio={this.props.aspectRatio} source={imageList} alt={cardContent && cardContent.RefSeriesTitle} />
          <CardArrow />
        </figure>
        <div className='item-detail'>
          <CardTitle title={{EpisodeMainTitle : cardContent && cardContent.EpisodeMainTitle}} isTitleMultiLine={this.props.isTitleMultiLine} />
          <CardTagList tagLists={tagListArr} />
        </div>
      </div>
    );
  }
}

CardRectangular.propTypes = {
  cardContent: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
  isTitleMultiLine: React.PropTypes.bool,
  aspectRatio: React.PropTypes.string,
};

export default CardRectangular;
