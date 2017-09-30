import React, {Component} from 'react';

import Logo from '../Logo';

class LoginHeader extends Component {
  render(){
    const { closeModal } = this.props;
    return (
      <header>
        <Logo closeModal={closeModal} />
      </header>
    );
  }
}
LoginHeader.propTypes = {
  closeModal: React.PropTypes.func.isRequired,
};
export default LoginHeader;
