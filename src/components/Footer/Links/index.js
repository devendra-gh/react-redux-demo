import React, {Component} from 'react';
import {Link} from 'react-router';
import PaperRipple from 'react-paper-ripple';
import {links} from '../../../constants';
class Links extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links,
    };
  }

  eachLink(item, index){
    return (
      <li key={index}>
        <PaperRipple className='ripple'>
          <Link to={item.redirectUrl}>{item.menuLabel}</Link>
        </PaperRipple>
      </li>
    );
  }

  render() {
    let links = this.state.links.map(this.eachLink);
    return (
      <ul className='links'>{links}</ul>
    );
  }
}

export default Links;
