import React, {Component} from 'react';
import PaperRipple from 'react-paper-ripple';
import Search from '../Search';
import CardImage from '../../CardComponent/CardImage';
import {Link} from 'react-router';
import mixPanel from '../../../util/mixPanel';

class UserAction extends Component {
    constructor(props) {
        super(props);
        this.clearSetTimeout = null;
    }

    addToHomeHandler = () => {
        mixPanel.addToHomeAction();
        document.body.className = 'open-add-to-home';
        this.clearSetTimeout = setTimeout(() => {
            this.addToHomeCloser();
        }, 300000);
    };

    addToHomeCloser = () => {
        document.body.className = '';
        clearTimeout(this.clearSetTimeout);
    };

    render() {
        const {openSignInModal} = this.props;
        let buttonForAndroid, byInstallButton = true, showHomePageIcon =true;
        let obj = this.props.routes.filter(function ( obj ) {
          return obj.hasOwnProperty('onVideoPage');
        });
        
        if(obj.length > 0) showHomePageIcon = false;
        if (typeof window != 'undefined') {
            buttonForAndroid = window && window.navigator && window.navigator.userAgent
            && window.navigator.userAgent.match(/android/i)
            && (window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1) ? true : false;

            if (window && window.matchMedia('(display-mode: standalone)').matches) {
                byInstallButton = false;

                if(typeof(Storage) !== "undefined") {
                    if (!sessionStorage.isLaunchFromPWA) {
                        sessionStorage.isLaunchFromPWA = true;
                        mixPanel.isLaunchFromPWA();
                    }
                }

            }
        }

        return (
            <ul className='nav-right'>
                {
                    (buttonForAndroid && byInstallButton && showHomePageIcon) &&
                    <li>
                        <span className='add-to-home' onClick={this.addToHomeHandler}>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="30"
                                 viewBox="0 0 438.536 438.536">
                                <path fill="#fff" d="M414.41,24.123C398.333,8.042,378.963,0,356.315,0H82.228C59.58,0,40.21,8.042,24.126,24.123
                                    C8.045,40.207,0.003,59.576,0.003,82.225v274.084c0,22.647,8.042,42.018,24.123,58.102c16.084,16.084,35.454,24.126,58.102,24.126
                                    h274.084c22.648,0,42.018-8.042,58.095-24.126c16.084-16.084,24.126-35.454,24.126-58.102V82.225
                                    C438.532,59.576,430.49,40.204,414.41,24.123z M365.449,237.539c0,4.948-1.811,9.236-5.421,12.847
                                    c-3.621,3.614-7.905,5.428-12.854,5.428H255.82v91.358c0,4.948-1.817,9.232-5.432,12.847c-3.61,3.62-7.897,5.427-12.847,5.427
                                    h-36.543c-4.948,0-9.231-1.807-12.847-5.427c-3.617-3.614-5.426-7.898-5.426-12.847v-91.358H91.363
                                    c-4.948,0-9.229-1.813-12.847-5.428c-3.615-3.61-5.424-7.898-5.424-12.847v-36.547c0-4.948,1.809-9.231,5.424-12.847
                                    c3.617-3.617,7.898-5.426,12.847-5.426h91.363V91.36c0-4.949,1.809-9.233,5.426-12.847c3.616-3.618,7.898-5.428,12.847-5.428
                                    h36.543c4.949,0,9.236,1.81,12.847,5.428c3.614,3.614,5.432,7.898,5.432,12.847v91.36h91.354c4.948,0,9.232,1.809,12.854,5.426
                                    c3.613,3.615,5.421,7.898,5.421,12.847V237.539z"/>
                              </svg>
                          </span>
                        <div className='popup-add-to-home'>
                            <div className='popup-inner'>

                                <div className='curve-arrow'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="35"
                                         viewBox="0 0 87.5 64.782">
                                        <path fill="#fff"
                                              d="M668.008,272.5c12.556,0.515,24.5-8.155,25.307-20.569l-12.8,3.99,20.953-38.505,22.387,37.8-13.113-3.621c-3.138,17.8-18.623,31.416-37.387,30.555-20.559-.935-37.27-18.414-37.013-38.944C638.963,258.887,651.691,271.824,668.008,272.5Z"
                                              transform="translate(-636.344 -217.406)"/>
                                    </svg>
                                </div>

                                <div className='popup-section'>
                                    <h3>Add Voot Lite to your Homescreen</h3>
                                    <div className='add-to-home-step-1'>
                                        <p>Step 1</p>
                                        <img src="/addtohome-step-1.png"/>
                                        <p>
                                            Tap
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                 viewBox="0 0 408 408">
                                                <path fill="#fff" d="M204,102c28.05,0,51-22.95,51-51S232.05,0,204,0s-51,22.95-51,51S175.95,102,204,102z M204,153c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S232.05,153,204,153z M204,306c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S232.05,306,204,306z"/>
                                            </svg>
                                            to bring up your browser menu
                                        </p>
                                    </div>
                                    <div className='add-to-home-step-2'>
                                        <p>Step 2</p>
                                        <img src="/addtohome-step-2.png"/>
                                        <p>Select <strong>'Add to Homescreen'</strong> to pin the Voot Lite</p>
                                    </div>
                                    <button className='btn-danger' onClick={this.addToHomeCloser}>GOT IT!</button>
                                </div>
                            </div>
                        </div>
                    </li>
                }
                <li>
                  <span className='user-pic'>
                        {
                            this.props.login.isLogin
                                ?
                                <Link to='/myvoot'>
                                    <PaperRipple className='ripple'>
                                        <img src={this.props.avatar}/>
                                        {/*<CardImage className='icon-profile' source={this.props.avatar} />*/}
                                    </PaperRipple>
                                </Link>
                                : <div onClick={openSignInModal}>
                                    <svg xmlns='http://www.w3.org/2000/svg' xmlnsxlink='http://www.w3.org/1999/xlink'
                                         version='1.1' width='14' height='30' viewBox='0 0 28 32'>
                                        <path fill='#fff'
                                              d='M13.777 16.062c-4.436 0-8.032-3.596-8.032-8.032s3.596-8.032 8.032-8.032c4.436 0 8.032 3.596 8.032 8.032-0.005 4.434-3.598 8.027-8.031 8.032zM13.777 4.571c-1.911 0-3.46 1.549-3.46 3.46s1.549 3.46 3.46 3.46c1.911 0 3.46-1.549 3.46-3.46-0.002-1.91-1.55-3.457-3.459-3.46z'/>
                                        <path fill='#fff'
                                              d='M25.268 32h-22.982c-0 0-0.001 0-0.001 0-1.262 0-2.285-1.023-2.285-2.285 0-0 0-0.001 0-0.001 0-7.597 6.181-13.777 13.777-13.777s13.777 6.18 13.777 13.777c0 0 0 0.001 0 0.001 0 1.262-1.023 2.285-2.285 2.285-0.001 0-0.001 0-0.002 0zM4.86 27.429h17.834c-1.054-4.009-4.646-6.918-8.917-6.918s-7.864 2.909-8.903 6.854z'/>
                                    </svg>
                                </div>
                        }
                  </span>
                </li>
                <li><Search {...this.props} /></li>
            </ul>
        );
    }
}

UserAction.propTypes = {
    avatar: React.PropTypes.string,
    openSignInModal: React.PropTypes.func.isRequired,
    login: React.PropTypes.object,
};
export default UserAction;
