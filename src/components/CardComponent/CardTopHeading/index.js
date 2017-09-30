import React, {Component} from 'react';
import CardHeading from '../../CardComponent/CardHeading';
import CardViewAll from '../../CardComponent/CardViewAll';
import {MEDIA_TYPE} from '../../../constants/media';

class CardTopHeading extends Component {
  render() {
    let items = this.props.items, navigatingUrl;
    if(items.isSeason) {
      navigatingUrl= '/shows/bigg-boss';
    }
    else if (items.paramlink) {
      if((/kidsCharacters/g).test(items.mName))
        navigatingUrl = '/kids/shows';
      else
        navigatingUrl = '/playlist/' + items.paramlink + '/' + items.mName;
    }
    else if(this.props.items.list && (this.props.items.list[0].MediaTypeID == MEDIA_TYPE.TV_SERIES || this.props.items.list[0].MediaTypeID == MEDIA_TYPE.EPISODE) && this.props.items.list[0].sbu != 'VOOT'){
      navigatingUrl= '/shows';
    }
    else if(this.props.items.list && (this.props.items.list[0].MediaTypeID == MEDIA_TYPE.TV_SERIES || this.props.items.list[0].MediaTypeID == MEDIA_TYPE.EPISODE ) && this.props.items.list[0].sbu == 'VOOT'){
      navigatingUrl= '/shows/voot-originals';
    }
    else if(this.props.items.list && this.props.items.list[0].mediaType == MEDIA_TYPE.MOVIE) {
      navigatingUrl = '/movies';
    }
    else if (items.mName == 'kidsAllCluster' || items.mName =='kidsClusters') {
      navigatingUrl = '/kids/clusters';
    }
    else if (items.mName == 'kidsAllShows') {
      navigatingUrl = '/kids/shows';
    }
    else if (items.mName == 'kidsAllMovies') {
      navigatingUrl = '/kids/movies';
    }
    if(items.title && items.title != ''){
      return (
        <div className='top-heading'>
          <div className='heading-inner'>
            <CardHeading>
              <h2>{items.title}</h2>
              {items.mLabel &&
                <h3>{items.mLabel}</h3>
              }
            </CardHeading>
            <CardViewAll title='View All' link='view-all' navUrl={navigatingUrl} />
          </div>
        </div>
      );
    }
  }
}

CardTopHeading.propTypes = {
  items: React.PropTypes.object.isRequired,
};

export default CardTopHeading;
