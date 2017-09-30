import React, {Component} from 'react';
import CardImage from '../../CardComponent/CardImage';

class ChannelCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const item = this.props.data,
      imageList = {
        imgURLL: item.logo,
        imgURLM: item.logoL,
        imgURLS: item.logoS,
      };
    return (
      <div className='card-holder'>
        <figure className='figure-block'>
          <CardImage aspectRatio={this.props.aspectRatio} source={imageList} alt={item.channel_name} />
        </figure>
        <div className='item-detail'>
          <h4 title={item.sbu}>
            {item.total_item_count > 1
              ? (item.total_item_count + ' Shows')
              : (item.total_item_count > 0
                ? (item.total_item_count + ' Show')
                : 'Show')}
          </h4>
        </div>
      </div>
    );
  }
}

ChannelCard.propTypes = {
  data: React.PropTypes.object.isRequired,
  aspectRatio: React.PropTypes.string,
};

export default ChannelCard;
