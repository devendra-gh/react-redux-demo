import React, {Component} from 'react';
import PaperRipple from 'react-paper-ripple';
import cookie from 'react-cookie';
import {COOKIE} from '../../../constants';

class Hamburger extends Component {
  constructor(props) {
    super(props);
  }

  playVideo = ()=> {
    const kdp = document.getElementById('kaltura_player');
    //console.log('kdp',kdp);
    if(typeof kdp === 'undefined' || kdp === null) {
      return false;
    }else{
      if(cookie.load(COOKIE.PLAYER)!== '0') {
        kdp.sendNotification("doPlay");
      }
      return true;
    }
  };
  pauseVideo=()=> {
    const kdp = document.getElementById('kaltura_player');
    //console.log('kdp',kdp);
    if (typeof kdp === 'undefined' || kdp === null) {
      return false;
    }
    else{
      if(cookie.load(COOKIE.PLAYER)!== '0') {
        kdp && kdp.sendNotification && kdp.sendNotification("doPause");
      }
      return true;
    }
  };


  sideNavOpener =() => {
    this.pauseVideo();
    document.body.className = "open-nav";
  };

  /*sideNavCloser = ()=> {
   document.body.className = "";
   };*/

  render(){
    return (
      <div className='hamburger-container'>
        {/*<span onClick={this.sideNavCloser} className='body-close'></span>*/}
        <div className='body-pusher'>
          <PaperRipple className='ripple'>
            <button onClick={this.sideNavOpener}>
              <svg xmlns='http://www.w3.org/2000/svg' xmlnsxlink='http://www.w3.org/1999/xlink' version='1.1' width='20' height='30' viewBox='0 0 45 32'>
                <path fill='#fff' d='M42.667 5.334h-40c-1.473 0-2.667-1.194-2.667-2.667s1.194-2.667 2.667-2.667h40c1.473 0 2.667 1.194 2.667 2.667s-1.194 2.667-2.667 2.667z' />
                <path fill='#fff' d='M42.667 18.666h-40c-1.473 0-2.667-1.194-2.667-2.667s1.194-2.667 2.667-2.667h40c1.473 0 2.667 1.194 2.667 2.667s-1.194 2.667-2.667 2.667z' />
                <path fill='#fff' d='M42.667 32h-40c-1.473 0-2.667-1.194-2.667-2.667s1.194-2.667 2.667-2.667h40c1.473 0 2.667 1.194 2.667 2.667s-1.194 2.667-2.667 2.667z' />
              </svg>
            </button>
          </PaperRipple>
        </div>
      </div>
    );
  }
}

export default Hamburger;
