import React, {Component, PropsTypes} from 'react';

const Header = ({list}) => {
  return(
    <div className='top-heading my-voot-shows-following-header'>
      <div className='heading-inner'>
        <div className='tray-heading'>
          {
            list && list.length > 0 ? <h4>Shows Following</h4> : <h4>No Followed Shows</h4>
          }
        </div>
      </div>
    </div>
  );
};

export default Header;
