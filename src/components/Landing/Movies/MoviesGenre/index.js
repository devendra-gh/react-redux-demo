import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addMediaType, addGenre, resetInitialGenre, updateInitialGenre,initialFilterState} from '../../../../actions/filters';
import {applyPageIndexFilter, applyLanguageGenreFilter, applyPopularLanguageGenreFilter} from '../../../../util/mapingFilters';
import clone from 'clone';
import Movies  from '../../../Landing/Movies';
import {genreUrlFilter} from '../../../../constants/genres';

export default class ShowGenre extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let genreMap= genreUrlFilter(), genreKey = this.props.location.pathname.split('/')[2];
    const filters = {genre : [genreMap[genreKey]]};
    return (
      <Movies filters={filters}  {...this.props} />
    );
  }
};
