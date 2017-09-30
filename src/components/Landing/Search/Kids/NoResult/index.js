import React, {Component, PropTypes} from 'react';
import KidsPopularShows from './PopularShows';
import KidsPopularEpisodes from './PopularEpisodes';


class KidsNoResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {keyword} = this.props;

    return (
      <div>
        <div className='section text-center'>
          No Results Found! {keyword.toUpperCase()}
        </div>
        <KidsPopularShows />
        <KidsPopularEpisodes />
      </div>
    );
  }
}



KidsNoResult.propTypes = {
  keyword: PropTypes.string.isRequired,
};

export default KidsNoResult;
