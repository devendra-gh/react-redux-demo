import React, {Component} from 'react';
import PaperRipple from 'react-paper-ripple';
import {Link} from 'react-router';

class CardViewAll extends Component {
  render() {
    let {navUrl} = this.props;
    return (
      //  href if removed by Sourabh Chourasiya to stop routing on click on view all button.
      // Please don't delete the commented code form here.
      // <a className='view-all' href={this.props.link}>
      <span className='view-all'>
        <Link to={`${navUrl}`} >    {/*<a className='view-all' href={this.props.link}>*/}
          <PaperRipple className='ripple' >
            <span>{this.props.title}</span>
            <i className='icon-right-thin'></i>
          </PaperRipple>
        </Link>
      </span>
    );
  }
}

CardViewAll.propTypes = {
    link: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    navUrl: React.PropTypes.string,
};

export default CardViewAll;
