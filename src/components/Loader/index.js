import React, {Component} from 'react';

class Loader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.loader && this.props.loader.load ?
          <div className='loader-block'><div className='loader'></div></div> :
          ''
        }
      </div>
    );
  }
}

Loader.propTypes = {
  loader: React.PropTypes.object.isRequired,
};

export default Loader;
