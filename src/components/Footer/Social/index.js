import React, {Component} from 'react';
import PaperRipple from 'react-paper-ripple';

class Social extends Component {
  constructor() {
    super();

    this.createSocial = this.createSocial.bind(this);
  }

  createSocial(item, index) {
    return (
      <li key={index}>
        <PaperRipple className='ripple'>
          <a href={item.redirectUrl} rel='noopener' className={item.name} title={item.title} target='_blank' >
            <span dangerouslySetInnerHTML={{__html:item.svg}}></span>
          </a>
        </PaperRipple>
      </li>
    );
  }

  render() {
    const socialList = [
          {
            name: 'facebook',
            iconName: 'icon-fb',
            title: 'facebook',
            svg: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="45" height="26" viewBox="0 0 16 32">
                  <path fill="#fff" d="M15.62 11.086h-4.749v-3.16c0.348-2.988 5.283-2.425 5.283-2.425v-5.131c-0.17-0.040-9.818-2.33-11.734 5.013v0.005l-0.012 0.048c-0.303 0.918-0.281 5.123-0.277 5.651h-4.131v5.622h4.375v15.291h6.37v-15.292h4.873l0.548-5.622z"></path>
                  </svg>`,
            redirectUrl: 'https://www.facebook.com/voot/',
          },
          {
            name: 'twitter',
            iconName: 'icon-twitter',
            title: 'twitter',
            svg: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="45" height="20" viewBox="0 0 39 32">
                  <path fill="#fff" d="M39.376 3.788c-1.351 0.615-2.918 1.063-4.561 1.264 1.593-1.004 2.848-2.557 3.458-4.404-1.46 0.835-3.179 1.515-5.010 1.886-1.582-1.555-3.676-2.534-5.999-2.534-4.465 0-8.085 3.62-8.085 8.085 0 0.651 0.077 1.283 0.222 1.889-6.74-0.403-12.658-3.601-16.627-8.455-0.719 1.123-1.124 2.523-1.124 4.018 0 2.791 1.413 5.253 3.563 6.708-1.321-0.025-2.576-0.394-3.671-1.012 0.040 0.055 0.040 0.088 0.040 0.122 0.001 3.896 2.758 7.148 6.428 7.912-0.584 0.189-1.316 0.293-2.071 0.293-0.539 0-1.066-0.053-1.575-0.153 1.116 3.241 4.076 5.547 7.586 5.619-2.719 2.156-6.207 3.458-9.999 3.458-0.006 0-0.013 0-0.019 0-0.002 0-0.005 0-0.008 0-0.678 0-1.346-0.041-2.002-0.121 3.573 2.284 7.848 3.637 12.44 3.637 0.008 0 0.015 0 0.023 0 14.856 0 22.983-12.309 22.983-22.986q0-0.525-0.023-1.045c1.588-1.156 2.926-2.542 3.995-4.124z"></path>
                  </svg>`,
            redirectUrl: 'https://twitter.com/justvoot',
          },
          {
            name: 'googlePlus',
            title: 'googlePlus',
            svg: `<img src="data:image/png;base64,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" />`,
            redirectUrl: 'https://plus.google.com/+JustVoot',
          },
        ];
    let social = socialList.map(this.createSocial);
    return (
      <ul className='social'>{social}</ul>
    );
  }
}

export default Social;