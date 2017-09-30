import React, {Component} from 'react';
import Link from './Links';
import Social from './Social';
import AppStore from './AppStore';

class Footer extends Component {
  render(){
    return (
      <footer>
        <Link />
        <Social />
        <AppStore />
        <div className='copy-rights'>&copy; 2017 Viacom 18 Media Pvt. Ltd. All Rights Reserved.</div>
      </footer>
    );
  }
}

export default Footer;
