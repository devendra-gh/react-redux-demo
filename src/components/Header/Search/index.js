import React, {Component, PropTypes} from 'react';
import PaperRipple from 'react-paper-ripple';
import SearchInputAdult from '../SearchInput/Adult';
import SearchInputKids from '../SearchInput/Kids';
import Modal from 'react-modal';

String.prototype.includes = function(search, start) {
  'use strict';
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > this.length) {
    return false;
  } else {
    return this.indexOf(search, start) !== -1;
  }
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  openModal=()=>{
    document.getElementsByTagName('body')[0].className = 'body-static';
    this.setState({open: true});
  };

  closeModal=()=> {
    document.getElementsByTagName('body')[0].className = '';
    this.setState({open: false});
  };

  render(){
    const {open} = this.state;
    const {location:{pathname}, params} = this.props;

    return(
      <div onClick={this.openModal}>
        <PaperRipple className='ripple'>
          <span>
            <svg xmlns='http://www.w3.org/2000/svg' xmlnsxlink='http://www.w3.org/1999/xlink' version='1.1' width='15' height='30' viewBox='0 0 32 32'>
              <path fill='#fff' d='M12.833 25.663c-7.077 0-12.833-5.756-12.833-12.831s5.756-12.832 12.833-12.832 12.83 5.756 12.83 12.832-5.756 12.831-12.83 12.831zM12.833 4.571c-0 0-0.001 0-0.001 0-4.562 0-8.26 3.698-8.26 8.26s3.698 8.26 8.26 8.26c4.562 0 8.26-3.698 8.26-8.26-0.006-4.559-3.7-8.253-8.259-8.259z' />
              <path fill='#fff' d='M29.714 32c-0.001 0-0.001 0-0.002 0-0.63 0-1.201-0.256-1.614-0.67l-9.426-9.425c-0.392-0.41-0.633-0.966-0.633-1.579 0-1.262 1.023-2.286 2.286-2.286 0.613 0 1.169 0.241 1.579 0.633l9.425 9.424c0.413 0.414 0.669 0.985 0.669 1.616 0 1.262-1.023 2.285-2.285 2.286z' />
            </svg>
          </span>
        </PaperRipple>

        <Modal
          ref='signInModal'
          isOpen={open}
          style={customStyles}
          contentLabel='Modal'>
          {
            pathname.includes('kids') ?
              <SearchInputKids closeModal={this.closeModal} params={params} /> :
              <SearchInputAdult closeModal={this.closeModal} params={params} />
          }
        </Modal>

      </div>
    );
  }
}


const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    zIndex: '999',
  },
  content: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    border: 'none',
    background: 'transparent',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '0px',
    outline: 'none',
    padding: '0px',
  },
};


Search.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Search;
