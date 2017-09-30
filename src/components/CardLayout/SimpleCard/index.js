import React, {Component} from 'react';
import CardImage from '../../CardComponent/CardImage';
import CardTitle from '../../CardComponent/CardTitle';

class SimpleCard extends Component {
  constructor(props) {
    super(props);
  }


  onClick = () =>{
    const {data,onClick}=this.props;
    onClick(data);
  };

  render() {
    const item = this.props.items,
      imageList = {
        imgURLL: item.imgURLL,
        imgURLM: item.imgURLM,
        imgURLS: item.imgURLS,
      };
    let altText = item.title!=undefined ? item.title : item.seriesMainTitle || item.name;
    return (
      <div onClick={this.onClick} className='card-holder'>
        <figure className='figure-block'>
          <CardImage aspectRatio={this.props.aspectRatio} source={imageList} alt={altText} />
        </figure>
        <div className='item-detail overlay-item'>
          <CardTitle title={item} />
        </div>
      </div>
    );
  }
}

SimpleCard.propTypes = {
  items: React.PropTypes.object.isRequired,
  aspectRatio: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired,
};

export default SimpleCard;
