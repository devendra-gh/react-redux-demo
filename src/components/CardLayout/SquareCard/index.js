import React, {Component} from 'react';
import CardImage from '../../CardComponent/CardImage';
import CardTitle from '../../CardComponent/CardTitle';
import CardTagList from '../../CardComponent/CardTagList';
import {videoFormat} from '../../../util/filters';

class SquareCard extends Component {
  constructor(props) {
    super(props);

    this.createTags = this.createTags.bind(this);
  }

  createTags(item){
    let
      desc = item.desc,
      listCount = !isNaN(item.listCount) ? videoFormat(item.listCount) : item.listCount,
      tags = [desc, listCount].filter((item) => {
        if (item) {
          return item;
        }
      });

      return tags;
  }

  render() {
    const item = this.props.items,
      imageList = {
        imgURLL: item.imgURLL,
        imgURLM: item.imgURLM,
        imgURLS: item.imgURLS,
      };

    let tags = this.createTags(item);

    return (
      <div className='card-holder'>
        <figure className='figure-block'>
          <CardImage aspectRatio={this.props.aspectRatio} source={imageList} alt={item.title} />
        </figure>
        <div className='item-detail'>
          <CardTitle title={item} isTitleMultiLine={this.props.isTitleMultiLine} />
          <CardTagList tagLists={tags} />
        </div>
      </div>
    );
  }
}

SquareCard.propTypes = {
  items: React.PropTypes.object.isRequired,
  isTitleMultiLine: React.PropTypes.bool,
  aspectRatio: React.PropTypes.string,
};

export default SquareCard;
