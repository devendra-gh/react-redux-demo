import React, { Component, PropTypes } from 'react';

const ChangePasswordSection = (props)=>{
  const { openChangePasswordModal } = props;
  return(
    <div onClick={openChangePasswordModal} className='change-password'>
      <h4>
        Change Password <i className='icon-right-thin' />
      </h4>
    </div>
  );
};

ChangePasswordSection.propTypes = {
  openChangePasswordModal : PropTypes.func.isRequired,
};

export default ChangePasswordSection;

