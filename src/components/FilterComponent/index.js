import React, {Component} from 'react';
import Modal from 'react-modal';

export default class FilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
  }

  openModal = () => {
    document.getElementsByTagName('body')[0].className = 'body-static';
    this.setState({modalIsOpen: true});
  };

  closeModal = () => {
    document.getElementsByTagName('body')[0].className = '';
    this.setState({modalIsOpen: false});
  };

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        closeModal: this.closeModal,
      })
    );
      if(typeof document !== "undefined" && typeof window !== "undefined" && typeof window.location !== "undefined" && typeof window.location.pathname !== "undefined" && window.location.pathname != '/discover') {
        document.onscroll = function() {
          if(document.getElementsByClassName(' no-result')[0] != undefined) {
            document.getElementsByClassName('locale-filter-btn')[0].style.display = 'block';
          }
          else if(document.getElementsByClassName('locale-filter-btn')[0] != undefined && document.getElementsByClassName('locale-filter-btn')[0]) {
            if (window.scrollY > 200 && window.innerHeight + window.scrollY < (document.body.clientHeight - 350)) {
              document.getElementsByClassName('locale-filter-btn')[0].style.display = 'block';
            }
            else if(document.getElementsByClassName('grid-shows')[0] && document.getElementsByClassName('grid-shows')[0].offsetHeight <= 300) {
              document.getElementsByClassName('locale-filter-btn')[0].style.display = 'block';
            }
            else {
              document.getElementsByClassName('locale-filter-btn')[0].style.display = 'none';
            }
          }
        };
      }
    else if (typeof document !== "undefined" && document.getElementsByClassName('locale-filter-btn')[0] != undefined && document.getElementsByClassName('locale-filter-btn')[0] &&  window.location.pathname == '/discover'){
        document.getElementsByClassName('locale-filter-btn')[0].style.display = 'block';
      }

    return (
      <div>
        <button className='locale-filter-btn' onClick={this.openModal}>
          <i className='icon-filter'></i>
        </button>
        <Modal isOpen={this.state.modalIsOpen} style={customStyles} contentLabel='Modal'>
          <div className='filter-section'>
            <button className='modal-close' onClick={this.closeModal}><i className='icon-cross'></i></button>
            {childrenWithProps}
          </div>
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
    backgroundColor: 'rgba(230, 230, 230, 0.95)',
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

FilterComponent.propTypes = {
  children: React.PropTypes.node.isRequired,
  modalClass: React.PropTypes.string,
};
