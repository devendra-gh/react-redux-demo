import React, { Component, PropTypes} from 'react';

const Header = (props)=>{
  const { onClick } = props;
  return(
    <div className='static-pages-hdr'>
      <div className='sbuName-section'>
        <span className='left-arrow' onClick={onClick}><i className='icon-left-thin'></i></span>
        <h1 className='sbuName'>{props.title}</h1>
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequred,
  onClick: PropTypes.func.isRequired,
};

export default Header;
