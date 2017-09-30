import React, {Component} from 'react';
import {connect} from 'react-redux';
import Hamburger from '../Hamburger';
import Logo from '../Logo';
import UserAction from '../UserAction';



class Header extends Component {

  state = {
    avatar: 'https://dimg.voot.com/include/user-images/blank-user.jpg',
  };

  componentWillMount() {
    const {login} = this.props;
    if (login.isLogin) {
      if (login.data && login.data.ImageUrl && login.data.ImageUrl != 'null') {
        let avatar = login.data.ImageUrl;

        this.setState({
          avatar,
        });
      }
    }
  }

  componentDidMount() {
    let previousScroll = 0;
    const element = document.querySelector('.header-wrapper').classList;
    window.addEventListener("scroll", function () {
      let scroll = window.pageYOffset || document.documentElement.scrollTop;
      if (scroll > previousScroll) {
        element.add('sticky-header');
      } else {
        element.remove('sticky-header');
      }
      previousScroll = Math.max(0, scroll);
    }, false);

  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.login.isLogin) {
      this.setState({
        avatar: 'https://dimg.voot.com/include/user-images/blank-user.jpg',
      });
    }
    else if (nextProps.login.data && nextProps.login.data.ImageUrl && nextProps.login.data.ImageUrl != 'null') {
      let avatar = nextProps.login.data.ImageUrl;
      this.setState({
        avatar,
      });
    }
  }

  render() {
    const {openSignInModal, closeModal} = this.props;
    let h1Text = false;
    if (typeof window != 'undefined' && window.location && window.location.pathname)
      h1Text = window.location.pathname == '/';

    return (
      <header>
        <div className='header-wrapper'>
          <Hamburger />
          <Logo closeModal={closeModal} h1Text={h1Text} />
          <UserAction avatar={this.state.avatar} openSignInModal={openSignInModal} {...this.props} />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  login: React.PropTypes.object.isRequired,
  openSignInModal: React.PropTypes.func.isRequired,
  closeModal: React.PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
  return {
    login: state.authentication.login,

  };
};

export default connect(mapStateToProps)(Header);
