import React, {Component, PropTypes} from 'react';

export default class PageNotFound extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className='section text-center page-404'>
        <h1>Page Not Found</h1>
        <span className='error-404'>404 Error</span>
        <a href='/'><i className='icon-left' /> Back To Home Page</a>
      </div>
    );
  }
}
