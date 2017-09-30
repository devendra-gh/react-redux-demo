import React, {Component} from 'react';
import {Link} from 'react-router';
import CardImage from '../../CardComponent/CardImage';
import EpisodeTitle from '../../CardComponent/EpisodeTitle';
import CardTagList from '../../CardComponent/CardTagList';

class EpisodeDefaultCard extends Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    const {data, onClick}=this.props;
    onClick(data);
  };

  render() {
    const {items} = this.props;
    const imageList = {
      imgURLL: items.imgURLL,
      imgURLM: items.imgURLM,
      imgURLS: items.imgURLS,
    };
    return (
      <div onClick={this.onClick} className='grid-view grid-2'>
        <figure className='figure-block'>
          <CardImage aspectRatio={this.props.aspectRatio} source={imageList} alt={items.name} />
        </figure>
        <div className='item-detail'>
          <EpisodeTitle title={items.name} />

          {items.slugName!='season' &&
            <CardTagList tagLists={items.genre} />}

          <span className='episode-video'>
            {(items.videos == 0 || items.videos == null) ? ('0 Episodes') : (items.videos == 1 ? ('1 Episode') : items.videos + ' Episodes')}
          </span>
        </div>
      </div>
    );
  }
}

EpisodeDefaultCard.propTypes = {
  items: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func,
  aspectRatio: React.PropTypes.string,
};

export default EpisodeDefaultCard;
