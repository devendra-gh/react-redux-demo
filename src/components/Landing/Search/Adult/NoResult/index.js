import React, {Component, PropTypes} from 'react';
import PopularShows from './PopularShows';
import PopularEpisodes from './PopularEpisodes';


class NoResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {keyword} = this.props;

    return (
      <div>
        <div  className='section text-center'>
          No Results Found! {keyword.toUpperCase()}
        </div>
        <PopularShows />
        <PopularEpisodes />
      </div>
    );
  }
}

NoResult.propTypes = {
  keyword: PropTypes.string.isRequired,
};

export default NoResult;
