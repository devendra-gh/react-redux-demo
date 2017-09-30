import React, {Component} from 'react';
import {dateFormat, timeFormat, episodeFormat, seriesFormat, sbuFormat} from '../../../util/filters';
import CardImage from '../../CardComponent/CardImage';
import CardTitle from '../../CardComponent/CardTitle';
import CardTagList from '../../CardComponent/CardTagList';
import CardArrow from '../../CardComponent/CardArrow';
import {connect} from 'react-redux';

class DefaultCard extends Component {
  constructor(props) {
    super(props);

    this.createTags = this.createTags.bind(this);
  }

  createTags(item){
    let duration = !isNaN(item.duration) ? timeFormat(item.duration) : item.duration,
      releaseYear = item.releaseYear!='' ? item.releaseYear : false,
      tags;
    if(!item.isKidsVideo){
      let seriesSeason = !isNaN(item.refSeriesSeason) ? seriesFormat(item.refSeriesSeason) : item.refSeriesSeason,
        episodeNo = !isNaN(item.episodeNo) ? episodeFormat(item.episodeNo) : item.episodeNo,
        // dont delete this code of telecast date please ask to sourabh chourasiya before making any changes.
        telecastDate = item.telecastDate!='0'?!isNaN(item.telecastDate) ? dateFormat(item.telecastDate) : item.telecastDate:false,
        sbu = item.sbu, //? this.getSbuValue(item.sbu) : false,
        genre = item.genre;
        tags = [seriesSeason, episodeNo,releaseYear, telecastDate, duration, sbu, genre].filter((item) => {
          if (item) {
            return item;
          }
        });
    }
    else {
      tags = item.customTags;
    }

    return tags;
  }

  // getSbuValue=(item)=>{
  //   const SBU=this.props.SBU_LIST;
  //   if(SBU && item){
  //     for (let i in SBU) {
  //       if (i==item) {
  //         let sbu=SBU[i];
  //          return sbu;
  //       }
  //     }
  //   }
  // };

  onClick = () => {
    if(this.props.data && this.props.onClick){
      const {data,onClick} = this.props;
      onClick(data);
    }
  };

  render() {
    const item = this.props.items,
      imageList = {
        imgURLL: item.imgURLL,
        imgURL: item.imgURL,
        imgURLM: item.imgURLM,
        imgURLS: item.imgURLS,
      };
    let altText = item.title!=undefined ? item.title : item.seriesMainTitle || item.name || item.SeriesMainTitle;
    let tags = this.createTags(item);
    let showPlayIcon = this.props.showPlayIcon ? this.props.showPlayIcon : false,
      classes = this.props.customClass ? ('card-holder '+this.props.customClass):'card-holder';
    return (
      <div onClick={this.onClick} className={classes}>
        <figure className='figure-block'>
          <CardImage aspectRatio={this.props.aspectRatio} source={imageList} alt={altText} />
          {showPlayIcon ? <CardArrow /> :false}
        </figure>
        <div className='item-detail'>
          <CardTitle title={item} isTitleMultiLine={this.props.isTitleMultiLine} componentFlag={this.props.componentFlag} />
          {!this.props.noTags ? <CardTagList tagLists={tags} /> : false}
        </div>
      </div>
    );
  }
}

DefaultCard.propTypes = {
  items: React.PropTypes.object.isRequired,
  data: React.PropTypes.object,
  onClick: React.PropTypes.func,
  componentFlag: React.PropTypes.string,
  isTitleMultiLine: React.PropTypes.bool,
  aspectRatio: React.PropTypes.string,
  SBU_LIST: React.PropTypes.object,
  showPlayIcon: React.PropTypes.bool,
  noTags: React.PropTypes.bool,
  customClass: React.PropTypes.string,
};



const mapStateToProps = (state, ownProps) => {
  return {
    SBU_LIST: state.config && state.config.config && state.config.config.assets && state.config.config.assets.SBU_LIST ?  state.config.config.assets.SBU_LIST:false,
  };
};

export default connect(mapStateToProps)(DefaultCard);


//export default DefaultCard;
