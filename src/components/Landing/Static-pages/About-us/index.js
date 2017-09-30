import React, { Component, PropTypes} from 'react';
import Header from '../Header';
import { browserHistory } from 'react-router';

export default class AboutUS extends Component {


  componentDidMount = ()=>{
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'AboutUSPageView');
    }
  };

  goBackHandler = ()=>{
    browserHistory.goBack();
  }
  render(){
    return(
      <div className='static-pages'>
        <Header  title='About Us' onClick={this.goBackHandler} />
        <section className='static-content'>
          <div className='container'>
            <div className='row'>
              <p>Voot is a video on-demand platform, part of Viacom 18 Digital Ventures, the digital arm of Viacom 18 - one of the country’s largest growing media networks.</p>
              <p>With over 35,000 hours of exciting content for audiences with varying choices and preferences, covering Colors (Hindi), MTV, Nickelodeon, Viacom18 Motion Pictures, Colors Kannada, Colors Marathi, Colors Bangla, and Colors Gujarati, Voot offers the biggest TV Shows, Blockbuster Movies, your favorite Toons & Voot Originals, absolutely Free.</p>
              <h4>
                Voot Features
              </h4>
              <h6>Sharing and Shouts</h6>
              <p>
                The first mobile video platform with a social engagement and recommendation feature – where you can send out customized shouts for every video you watch, for everyone to see. Share Voot content across all social platforms. Go on. Tell the world how much you love us.
              </p>
              <h6>Choose Video Quality </h6>
              <p>
                Three carefully designed modes included to toggle between depending on your data plan : Data Saving, High Quality &amp; Auto.
              </p>
              <h6>Voot Picks </h6>
              <p>
                Team Voot handpicks the best and latest episodes of the most popular on-air shows and Voot Originals in this section that you will surely fall in love with.
              </p>
              <h6>Just For You</h6>
              <p>
                A personalized recommendation engine which is customized as per individual users’ likes and viewing history. So, watch TV shows that matches your interests.
              </p>
              <h6>Vooting Now</h6>
              <p>Don’t fall behind anymore with the one-stop destination to your dose on what’s trending on Voot.</p>
              <h6>Movies &amp; Shows</h6>
              <p>Watch bollywood movies, watch TV shows with Voot on the go.</p>
              <h6>Resume and Playback</h6>
              <p>The App will remember the exact point where you had stopped watching a piece of content and allow you to “resume watching” from that point, along with providing the option to “Start from the beginning”</p>

              <h6>Tablet Compatibility</h6>
              <p>Get the Best of Entertainment, now on a bigger screen!</p>
              <p>“Voot is a trademark of Viacom18 Media Private Limited. All rights reserved.”</p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

