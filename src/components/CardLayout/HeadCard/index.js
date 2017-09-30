import React, {Component} from 'react';
import TextTruncate from 'react-text-truncate';
import CardImage from '../../CardComponent/CardImage';
import CardArrow from '../../CardComponent/CardArrow';
import CardLabel from '../../CardComponent/CardLabel';
import CardTitle from '../../CardComponent/CardTitle';
import CardDescription from '../../CardComponent/CardDescription';
import {MEDIA_TYPE} from '../../../constants/media';
class HeadCard extends Component {
  constructor(props) {
    super(props);
  }

  onClick=()=>{
    const {data, onClick}=this.props;
    if(data && onClick)
      onClick(data);
  };

  render() {

    let item = this.props.items,
      noPlayIcon = this.props.noPlayIcon,
      imageList = {
        imgURLL: item.imgURLL,
        imgURLM: item.imgURLM,
        imgURLS: item.imgURLS,
      },
      movieCarousel=false,
      h1Text=false;
    if(typeof window!='undefined' && window.location && window.location.pathname ){
      h1Text = window.location.pathname != '/';
      if(window.location.pathname.search(/movies/i) > 0) {
        movieCarousel=true;
      }
      else {
        movieCarousel=false;
      }
    }

    let desc = this.props.customDesc != undefined ? this.props.customDesc : item.desc;
    return (
      <div onClick={this.onClick} className='card-holder'>

        <figure className='figure-block'>
          <CardImage aspectRatio={this.props.aspectRatio} source={imageList} alt={item.title} />
          {!noPlayIcon && (item.mediaType == MEDIA_TYPE.EPISODE || item.mediaType == MEDIA_TYPE.MOVIE) && <CardArrow />}
        </figure>

        <div className='item-detail'>
          {item.label && !movieCarousel &&
            <CardLabel title={item.label} />
          }

          {/*<CardTitle title={item} label={item.title} isTitleMultiLine={this.props.isTitleMultiLine} h1Text={h1Text} />*/}
          <CardTitle title={item} isTitleMultiLine={this.props.isTitleMultiLine} h1Text={h1Text} />

          {/*{item.contentType && item.mediaType==MEDIA_TYPE.TV_SERIES && item.label &&*/}
            {/*<CardLabel title={item.contentType} />*/}
          {/*}*/}
          {item.label && movieCarousel &&
            <CardLabel title={item.label} />
          }

          {item.contentType && item.mediaType==MEDIA_TYPE.TV_SERIES && item.sbu &&
            <CardLabel title={item.sbu} />
          }


          {/*commented by sourabh chourasiya, please ask me before uncomment it.*/}
          {/*{item.contentType && item.contentType =='Movie' && item.label &&*/}
            {/*<CardLabel title={item.label} />*/}
          {/*}*/}

          {desc &&
            <CardDescription>
              <TextTruncate line={2} text={desc} truncateText={'...'} />
            </CardDescription>
          }
        </div>
      </div>
    );
  }
}

HeadCard.propTypes = {
  items: React.PropTypes.object.isRequired,
  isTitleMultiLine: React.PropTypes.bool,
  data: React.PropTypes.object,
  onClick: React.PropTypes.func,
  noPlayIcon: React.PropTypes.bool,
  aspectRatio: React.PropTypes.string,
  customDesc: React.PropTypes.string,
};

export default HeadCard;
