import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import PaperRipple from 'react-paper-ripple';
import {navigation} from '../../../constants';
class TabNavigation extends Component {
  constructor() {
    super();
    this.state = {
      navigation,
    };

    this.createNavigation = this.createNavigation.bind(this);
  }

  createNavigation(nav, index) {
    return (
      <li key={index}>
        <PaperRipple className='ripple'>
          <Link onlyActiveOnIndex  activeClassName='active' to={nav.redirectUrl}>
            <span className='nav-icon' dangerouslySetInnerHTML={{__html:nav.svg}}></span>
            <span className='text'>{nav.name}</span>
          </Link>
        </PaperRipple>
      </li>
    );
  }

  render() {
    let navigation = this.state.navigation.map(this.createNavigation);
    return (
      <ul className='navigation clearfix'>{navigation}</ul>
    );
  }
}

TabNavigation.propTypes = {
  location: PropTypes.object.isRequired,
};

export default TabNavigation;
