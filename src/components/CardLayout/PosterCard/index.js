import React, {Component} from 'react';
import CardImage from '../../CardComponent/CardImage';
import CardArrow from '../../CardComponent/CardArrow';

class PosterCard extends Component {
  onClick=()=>{
    const {data, onClick}=this.props;
    onClick(data);
  };

  render() {
    const poster = this.props.poster,
      imageList = {
        imgURLL: poster.imgURLL,
        imgURLM: poster.imgURLM,
        imgURLS: poster.imgURLS,
      };

    let altText = poster.title!=undefined ? poster.title : poster.MediaName;

    return (
      <div onClick={this.onClick} className={'card-holder ' + (this.props.gridClass)}>
        <figure className='figure-block'>
          <CardImage aspectRatio={this.props.aspectRatio} mName={this.props.mName} source={imageList} alt={altText} />
          <CardArrow />
        </figure>
      </div>
    );
  }
}

PosterCard.propTypes = {
  poster: React.PropTypes.object.isRequired,
  mName: React.PropTypes.string,
  data: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired,
  gridClass: React.PropTypes.string,
  aspectRatio: React.PropTypes.string,
};

export default PosterCard;
