import React, { Component, PropTypes} from 'react';
import Header from '../Header';
import { browserHistory } from 'react-router';

export default class ContactUS extends Component{

  componentDidMount = ()=>{
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'ContactUSPageView');
    }
  };

  goBackHandler = ()=>{
    browserHistory.goBack();
  }

  render(){
    return(
      <div className='static-pages'>
        <Header title='Contact Us' onClick={this.goBackHandler}  />
        <section className='static-content'>
          <div className='container'>
            <div className='row'>
              <p>
                <span>Viacom 18 Media Private Limited</span>
                Registered Office:<br />
                Zion Bizworld, Subhash Road - A,<br />
                Vile Parle (East), Mumbai - 400057,<br />
                Maharashtra, India.<br />
                Email: <a href='mailto:support@voot.com'>support@voot.com</a><br />
                <span>DIGITAL CONTENT PRODUCER<br /></span>
                <span>Suresh Amesar<br />
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
