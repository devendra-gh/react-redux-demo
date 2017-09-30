import React, { Component, PropTypes} from 'react';
import Header from '../Header';
import { browserHistory } from 'react-router';

export default class FAQ extends Component{

  componentDidMount = ()=>{
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'FAQPageView');
    }
  };

  goBackHandler = ()=>{
    browserHistory.goBack();
  }

  render(){
    return(
      <div className='static-pages faq'>
        <Header title='Frequently asked questions' onClick={this.goBackHandler}  />
        <section className='static-content'>
          <div className='container'>
            <div className='row'>
              <h6>How do I download the app?</h6>
              <p>To download the app on Play Store, just follow this link: <a href='http://tinyurl.com/hcnp2n7' target='_blank'> http://tinyurl.com/hcnp2n7</a>. You can find Voot on the App Store here: <a href='http://tinyurl.com/jftzp3x' target='_blank'>http://tinyurl.com/jftzp3x</a></p>
              <h6>How do I add the kid zone restriction pin on my app?</h6>
              <p>To add the kid zone PIN, go the Menu, then click on 'Settings'. Scroll down to see the 'Kid Zone Restrictions' section, click on the small button there, and set up the PIN.</p>
              <h6>Can I clear the 'Recently Watched' history on my app?</h6>
              <p>Yes! You can clear your 'Recently Watched' history on your app by going to 'My Profile' in the Menu, clicking on 'View More' in the 'Recently Watched' section, and then selecting 'Clear History'.</p>
              <h6>The content doesn't play even if I refresh my browser. Please help.</h6>
              <p>If you can't seem to play any content, please check your internet connection. If that doesn't work, clear your browser cache. After that, if you still can't play anything, send us an email at  <a href='mailto:support@voot.com'>support@voot.com</a>.</p>
              <h6>Are the Apple TV and the Android TV apps due?</h6>
              <p>We've got our guys burning the midnight oil on making sure those versions of the app are ready. We'll make sure to tell you the moment they're out.</p>
              <h6>Why am I unable to stream on my smartphone? Website is working.</h6>
              <p>Have you checked your internet connection? If that's functioning and you're still encountering streaming problems, try clearing the app data saved on your phone. If the problem won't go away, send us an email with accompanying screenshots at <a href='mailto:support@voot.com'>support@voot.com </a>, so we can figure this out.</p>
              <h6>Error Message: Content Unavailable. Why can I not see the content?</h6>
              <p>If you can't see content and you're using the website, refresh and clean your browser cache. If you're using the app, try restarting your phone. If nothing works, send us an email at <a href='mailto:support@voot.com'>support@voot.com</a> and we'll try to get this sorted for you.</p>
              <h6>Is there a Mobile Website available?</h6>
              <p>Why, yes, it is! Link :  <a href='http://www.voot.com' target='_blank'>www.voot.com</a></p>
              <h6>Is the streaming free? I’m getting a 403 error every time.</h6>
              <p>Most definitely free! Send us a screenshot and your issue by email to us at <a href='mailto:support@voot.com'>support@voot.com</a> and we'll try and fix this. </p>
              <h6>Why is this specific episode not working?</h6>
              <p>Yikes! Mail us the episode details to <a href='mailto:support@voot.com'>support@voot.com</a>,and we’ll try to get it to work. Stay away from spoilers while you wait!</p>
              <h6>Why is the video resolution so low?</h6>
              <p>If you feel like the video resolution is too low, try changing your video quality on the app. While playing the video, swipe right. Click on 'Quality' and then choose 'High Quality'. Still not working out right? Send us an email at <a href='mailto:support@voot.com'>support@voot.com</a> about this.</p>
              <h6>Why is my application hanging?</h6>
              <p>If you're using the website, restart your browser, or try clearing your browser cache. If you're using the app, then restart your phone, or try clearing the saved app data off your phone. If you’re still facing the same issue, send us an email at <a href='mailto:support@voot.com'>support@voot.com</a>.</p>
              <h6>Why does my application shut down automatically?</h6>
              <p>If your app is shutting down automatically, try clearing your app data, or restart your phone. If you're still facing problems, send us an email at <a href='mailto:support@voot.com'>support@voot.com</a>.</p>
              <h6>Why can't I share the content on my social media pages?</h6>
              <p>If you can't share content on your social media pages, restart your phone. If that doesn't solve the issue, mail us your mobile details at <a href='mailto:support@voot.com'>support@voot.com</a> and we'll have our nerds take a shot at it.</p>
              <h6>Why can't I register onto the app?</h6>
              <p>If you can't register on the app, restart your phone and try again. Are you still facing the same problem after that? Send us an email at <a href='mailto:support@voot.com'>support@voot.com</a>, and we'll try to fix this.</p>
              <h6>App is consuming too much data?</h6>
              <p>If the app seems to be consuming too much of your data, try changing your video quality on the app. While playing the video, swipe right. Click on 'Quality' and then choose 'Data Saving'. Did that not help? Send us an email at <a href='mailto:support@voot.com'>support@voot.com</a> about the problem.</p>
              <h6>Why is the video not loading on my application?</h6>
              <p>If the videos aren't loading on the app, try cleaning the app data off your phone. If that doesn't work, but your Internet is functioning perfectly, send us an email at <a href='mailto:support@voot.com'>support@voot.com</a>, and we'll try to help you further.</p>
              <h6>Why is my video not buffering?</h6>
              <p>If the videos aren't buffering on your app, try cleaning the app data off your phone. If that doesn't work, but your Internet is functioning perfectly, send us an email at <a href='mailto:support@voot.com'>support@voot.com</a> about this, and we'll try to find a solution. </p>
              <h6>Why is there still no support for ChromeCast?</h6>
              <p>We've already got our guys burning the midnight oil on the ChromeCast bit. We'll make sure to tell you the moment it's out.</p>
              <h6>Why is my search bar not working?</h6>
              <p>If the search bar on your app isn't working, try cleaning the app data off your phone. If that doesn't work, but your Internet is functioning perfectly, send us an email at <a href='mailto:support@voot.com'>support@voot.com</a>. We'll try and figure out a solution.</p>
              <h6>Some content available, some not in international locations. Why is this?</h6>
              <p>Unfortunately, if you're outside India, then you won't be able to access our content. We’re slowly building our reach – bear with us, we can’t wait to be a 100% available either!</p>
              <h6>Why is there no Sports content available? </h6>
              <p>Unfortunately, we only showcase content that we believe we handle best - so there's no sports. For now :) </p>
              <h6>Can we meet Sanaya? </h6>
              <p>We wish we could meet her too. You can always watch more episodes, though!</p>
              <h6>I would like more content here like xyz, abc.</h6>
              <p>It's always great to hear your feedback. Write in your suggestions about content to <a href='mailto:support@voot.com'>support@voot.com</a> and we'll see what we can do about it. :)</p>
              <h6>I would like more genres here like xyz, abc..</h6>
              <p>What a great idea! Write in your suggestions to <a href='mailto:support@voot.com'>support@voot.com</a> and we’ll try to make this happen.</p>
              <h6>Does your content air here before it does on TV? </h6>
              <p>Our original content definitely reaches Voot first. And all televised content reaches us at the smallest possible delay - promise. :) </p>
              <h6>Do you have content in different languages? </h6>
              <p>Remember those nerds in school who knew everything? We’ve hired them, so we stream in six languages. Here you go: <a href='http://www.voot.com/shows' target='_blank'>http://www.voot.com/shows</a>. Just follow the link, click on 'Languages' and select the languages you want!</p>
              <h6>Do you have music videos? </h6>
              <p>The best way to procrastinate is to watch music videos. So we made sure to provide them. Here you go: <a href='http://www.voot.com/shows' target='_blank'>http://www.voot.com/shows</a>. Just follow this link, then click on 'TV Show Genres' and then 'Music'.</p>
              <h6>Where can I catch the most recent Episode?</h6>
              <p>Wherever you go, whatever you do… it will be right here, waiting for you: <a href='http://www.voot.com/shows' target='_blank'>http://www.voot.com/shows</a>. Follow the link, then click on A-Z, and select 'Most Recent'. Enjoy!</p>
              <h6>Is the app available on tablets as well?</h6>
              <p>The tablet-compatible version of the app isn't ready yet. We've got our guys burning the midnight oil on this, however. We'll get in touch as soon as it's ready.</p>
              <h6>Is the app supported on phones running Windows? Blackberry? </h6>
              <p>All upcoming Blackberry devices are now Android-native, so they do run our app. We shall get back to you on the Windows build as soon as we hear more.</p>
              <h6>When is the app going to be available on the Windows 10 App store?</h6>
              <p>We'll get back to you about the Windows build as soon as we hear about it. Promise!</p>

            </div>
          </div>
        </section>
      </div>
    );
  }
}
