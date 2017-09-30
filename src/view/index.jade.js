// Exporting jade template as string for further compilation
// is a hack to work around webpack's serverside bundling
module.exports = `
doctype html
html(class="no-js", lang="")
  head
    meta(charset="utf-8")
    
    // meta(http-equiv='cache-control', content='no-cache') 
    // meta(http-equiv='expires', content='0')
    // meta(http-equiv='pragma', content='no-cache')
    
    meta(http-equiv='Expires', content='-1')
    
    meta(http-equiv="x-ua-compatible", content="ie=edge")
    meta(name='viewport', content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no")
    meta(http-equiv='x-dns-prefetch-control', content='on')
    link(rel='dns-prefetch', href='//cdn.loginradius.com')
    link(rel='dns-prefetch', href='//player-as.ott.kaltura.com')
    link(rel='dns-prefetch', href='//cdn.mxpnl.com')
    link(rel='dns-prefetch', href='//cdn.chuknu.sokrati.com')
    link(rel='dns-prefetch', href='//facebook.com')
    link(rel='dns-prefetch', href='//connect.facebook.net')
    link(rel='dns-prefetch', href='//googleadservices.com')
    link(rel='dns-prefetch', href='//share.loginradius.com')
    link(rel='dns-prefetch', href='//googleads.g.doubleclick.net')
    style.
      *{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}h1,h4{color:#272c31;line-height:1.2}body,h1,h4{margin:0}.tray-heading h2,h1,h4{font-weight:400}html{position:relative;min-height:100%;font-size:10px;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}body{margin-bottom:372px;overflow-y:scroll;display:block;font-family:'Rubik',sans-serif;font-size:14px;line-height:1.42857143;color:#333;font-weight:300;background-color:#fff;height:100%;-webkit-transition:all .3s;-moz-transition:all .3s;-ms-transition:all .3s;-o-transition:all .3s;transition:all .3s}.container{width:100%;height:100%;max-width:100%;max-height:100%;overflow:hidden}h1{font-size:18px;width:100%;display:block}h4{font-size:13px}a{color:#000;text-decoration:none}ul{list-style:none;margin-top:0;margin-bottom:0;padding-left:0}.lrshare_evenmorepoup,.lrshare_smallpopupevenmore{display:none}.navigation li a span{display:block;color:#7962a6}.navigation li:after{content:'';position:absolute;top:22%;left:100%;width:1px;bottom:22%;background-color:rgba(255,255,255,.3)}.top-heading,h1 .ripple{padding:10px}.tray-heading{padding-left:5px;border-left:5px solid #0096ff;width:80%;display:inline-block}.default-color{border-left-color:#fa42a2}.tray-heading h2{margin:0;font-size:18px;color:#000;text-align:left}.navigation li a.active span{color:#fff}.navigation,header{text-align:center}.top-heading .heading-inner{position:relative}.side-nav-container{position:fixed;top:0;left:0;right:0;bottom:0;z-index:0;background:#401f80;background:-moz-linear-gradient(left,#401f80 0,#7e0dfd 100%);background:-webkit-linear-gradient(left,#401f80 0,#7e0dfd 100%);background:linear-gradient(to right,#401f80 0,#7e0dfd 100%);filter:progid: DXImageTransform.Microsoft.gradient(startColorstr='#401f80',endColorstr='#7e0dfd',GradientType=1)}.main-container{width:100%;height:100%;z-index:1;background-color:#ffff;-webkit-overflow-scrolling:touch}.body-close{position:fixed;top:0;left:0;z-index:0;width:100%;height:100%;background:#fff}.container .content-container{z-index:1;width:100%;background-color:#fff}header,header .header-wrapper{height:40px;background-color:#401f80}header{position:relative;z-index:999}header .header-wrapper{position:fixed;top:0;left:0;right:0;width:100%;z-index:100;-moz-transition:all .3s ease-in-out;-o-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.body-pusher,.nav-right{position:absolute;top:0}.hamburger-container,.nav-right{display:block}.body-pusher{left:0;padding:5px}.body-pusher button{padding:0;width:30px;height:30px;cursor:pointer;border:0;background-color:transparent;border-radius:50%}.icon-wrapper{width:100px;height:40px;display:inline-block;font-size:20px;line-height:1.5}.nav-right{right:0}.nav-right li{float:left}.navigation{background-color:#401f80}.navigation li{float:left;width:20%;position:relative}.navigation li a{padding:10px 0;display:block}.navigation li a span path{fill:#7962a6}.navigation li a.active span path{fill:#fff}.navigation .nav-icon{width:40px;height:25px;line-height:25px;margin:auto;font-size:18px;display:block}.navigation .text{font-size:11px;text-transform:capitalize}.clearfix{display:block}.clearfix:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0}.home-page{border-top:3px solid #ff254b}footer{position:absolute;bottom:0;width:100%;height:372px}footer .copy-rights{padding:10px 15px;text-align:center;color:#272c31;font-size:11px;background-color:#fff}.appStore{padding:10px 5px;text-align:center;background-color:#f2f2f2}.appStore ul{text-align:center;margin:auto}.appStore li{padding:5px;display:inline-block;vertical-align:top}.appStore li a{display:block;height:40px}.appStore li a span{display:block;width:100%;height:100%}.links{text-align:center;background-color:#f2f2f2}.links li{border-top:1px solid #fff}.links li a{padding:10px 15px;text-transform:uppercase;display:inline-block;font-size:12px}.social{padding:5px 0;text-align:center;background-color:#e6e6e6}.social li{padding:8px;display:inline-block;vertical-align:top}.social li a{display:block;width:45px;height:45px;line-height:45px;text-align:center;border-radius:50%;font-size:22px}.social li a.facebook{background-color:#3c5a98}.social li a.facebook span{width:45px;height:45px;display:block;padding:7px 0}.social li a.twitter{background-color:#55acee}.social li a.twitter span{width:45px;height:45px;display:block;padding:4px 0}.social li a.googlePlus{background-color:#fff}.social li a.googlePlus span{width:45px;height:45px;display:block}.social li a.googlePlus span img{width:100%;display:block}.tab-section .ReactTabs__TabList{position:relative;display:flex;flex-wrap:wrap;border-bottom:0;margin:0;padding:0;background-color:#f2f2f2}.tab-section .ReactTabs__TabList .ReactTabs__Tab.ReactTabs__Tab--selected{color:#fff;background-color:#670edb}.tab-section .ReactTabs__TabList .ReactTabs__Tab{flex:1;cursor:pointer;text-align:center;color:#798993;font-size:13px;font-weight:400;bottom:0;border:0;border-radius:0;padding:0;width:50%;display:inline-block;position:relative;list-style:none}.tab-section .ReactTabs__TabList h2{font-size:13px;color:#798993}.tab-section .ReactTabs__TabList .ReactTabs__Tab.ReactTabs__Tab--selected h2{color:#fff;font-size:13px}.most-popular-btn.active{color:#fff;background-color:#401f80}.grid-container{padding:5px}.nav-right li span .icon-search,.nav-right li span img{width:30px;height:30px;display:inline-block;line-height:30px;border-radius:50%;vertical-align:top}.grid-container .grid-channel{padding:5px;float:left;width:33.33%}.grid-container .grid-channel .card-holder{box-shadow:0 0 5px rgba(0,0,0,.25)}.grid-container .grid-channel figure{background:0 0;position:relative}.item-detail{padding:10px;overflow:hidden;background-color:#fff;box-shadow:0 0 5px rgba(0,0,0,.25)}.tags-social-container{margin-top:10px;margin-bottom:10px;float:left;width:80%}.item-detail .tag-list{min-height:28px}.tag-list li{float:left;padding:0 5px;margin-top:5px;color:#798993;line-height:.9;font-size:11px}.tags-social-container span{color:#ff254b}.tag-list li span{display:block}.social-right{float:right;width:20%;text-align:right;margin-top:5px}.social-right .share-show{width:25px;height:25px;display:inline-block;text-align:center}.hidden-data{height:auto;max-height:30px;transition:max-height .15s ease-out;overflow:hidden;position:relative;clear:both}.toggleButton{text-align:center;margin:10px 0 15px}.movie-video .meta-desc,.shows-video .meta-desc,.kids-video .meta-desc{padding:10px}.tags-section .tag-list li{color:#ff254b}.description-tray{font-size:11px}.player-section .placeholder-image{display:block;width:100%}.movie-video .meta-desc h4,.shows-video .meta-desc h4,.kids-video .meta-desc h4{font-size:18px;font-weight:400}.shows-video h1,.kids-video h1{font-size:14px;display:block;width:auto;font-weight:400;padding:0 0 10px}.movie-video .meta-desc .tags-section,.shows-video .meta-desc .tags-section,.kids-video .meta-desc .tags-section{color:#ff254b;padding:10px 0}.player-wrapper{width:100%;height:269px;position:absolute;top:0;left:0;z-index:1}#kaltura_player{width:100%;height:100%;background-color:#000}.hiddenDiv{display:none}.social-unit{background:#f2f2f2;padding:13px;margin-bottom:20px}.social-unit li{display:inline-block;width:25%;height:40px;text-align:center;color:#909da5;font-size:12px}.social-unit i{display:block;font-size:15px;padding-bottom:6px;color:#909da5}.follow-module i,.follow-user-module i{font-size:15px;color:#909da5}.grid-container .grid-channel .item-detail{box-shadow:none;position:relative;background-color:#fff;padding:0 10px 10px;overflow:hidden}.grid-container .grid-channel .item-detail h4{padding-top:10px;border-top:2px solid #f2f2f2;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;color:#848484}.order-filter{position:absolute;right:0;top:-1px;padding:2px;border:1px solid #dbd8d8;border-radius:20px}.most-popular-btn{padding:2px 10px;border:0;border-radius:20px;background-color:#fff;font-size:12px}.channel-container{padding:10px 0;border-top:3px solid #ff254b}.nav-right li span{display:block;width:35px;height:40px;line-height:26px;font-size:15px;padding:5px;height:100%}.add-to-home svg{animation-name:shake-with-delay;animation-duration:4s;animation-iteration-count:infinite}@keyframes shake-with-delay{from,16%,to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}1.6%,4.8%,8%,11.2%,14.4%{-webkit-transform:translate3d(-3px,0,0);transform:translate3d(-3px,0,0)}3.2%,6.4%,9.6%,12.8%{-webkit-transform:translate3d(3px,0,0);transform:translate3d(3px,0,0)}}.popup-add-to-home{-webkit-transform:translateX(100%);transform:translateX(100%);position:fixed;top:0;left:0;width:100%;height:100%;z-index:999;background-color:rgba(64,31,128,0.95);-webkit-transition:.3s all;-moz-transition:.3s all;-ms-transition:.3s all;-o-transition:.3s all;transition:.3s all}.open-add-to-home{position:fixed;overflow:hidden;.popup-add-to-homedisplay:block}.popup-inner{width:90%;margin:auto;color:#fff;.curve-arrowtext-align:right}h3{margin-top:10px;color:#fff}p{margin:5px 0 20px}button{display:inline-block;background-color:#fff;border:0 none;color:#000;border-radius:2px;font-size:12px;padding:6px 15px}.middle-content{position:relative}
        
    script.
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var
      f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-PFJ6B46');
    // Begin Inspectlet Embed Code
    script#inspectletjs(type='text/javascript').
      window.__insp = window.__insp || [];
      __insp.push(['wid', 1981685546]);
      (function() {
      function ldinsp(){if(typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };
      setTimeout(ldinsp, 500); document.readyState != "complete" ? (window.attachEvent ? window.attachEvent('onload', ldinsp) : window.addEventListener('load', ldinsp, false)) : ldinsp();
      })();
    // End Inspectlet Embed Code

    //manifest start
    link(rel="apple-touch-icon", sizes="57x57", href="/apple-icon-57x57.png")
    link(rel="apple-touch-icon", sizes="60x60", href="/apple-icon-60x60.png")
    link(rel="apple-touch-icon", sizes="72x72", href="/apple-icon-72x72.png")
    link(rel="apple-touch-icon", sizes="76x76", href="/apple-icon-76x76.png")
    
    link(rel="apple-touch-icon", sizes="114x114", href="/apple-icon-114x114.png")
    link(rel="apple-touch-icon", sizes="120x120", href="/apple-icon-120x120.png")
    link(rel="apple-touch-icon", sizes="144x144", href="/apple-icon-144x144.png")
    link(rel="apple-touch-icon", sizes="152x152", href="/apple-icon-152x152.png")
    link(rel="apple-touch-icon", sizes="180x180", href="/apple-icon-180x180.png")
    
    link(rel="preload", href="/mobile-service-worker.js")
    
    link(rel="preload", href="/android-icon-48x48.png", type="image/png", sizes="48x48")
    link(rel="preload", href="/android-icon-96x96.png", type="image/png", sizes="96x96")
    link(rel="preload", href="/android-icon-192x192.png", type="image/png", sizes="192x192")
    
    link(rel="icon", type="image/png", sizes="16x16", href="/favicon-16x16.png")
    link(rel="icon", type="image/png", sizes="32x32", href="/favicon-32x32.png")
    link(rel="icon", type="image/png", sizes="96x96", href="/favicon-96x96.png")
    
    link(rel='manifest', href="/manifest.json")
    meta(name="msapplication-TileColor", content="#272c31")
    meta(name="msapplication-TileImage", content="/ms-icon-144x144.png")
    meta(name='application-name', content='voot')
    meta(name='apple-mobile-web-app-capable', content='yes')
    meta(name='apple-mobile-web-app-status-bar-style', content='black')
    meta(name='apple-mobile-web-app-title', content='voot')
    meta(name='mobile-web-app-capable', content='yes')
    meta(name="theme-color", content="#000000")
    //manifest end

    | !{head.title.toString()}
    | !{head.meta.toString()}

    title= title
      
    meta(name='google-site-verification', content='IdBNNc6CcdTO47K1wd6oNuQ7OA-ChE0P3pRe1MXLPHA')
    meta(name='google-site-verification', content='zAy54ap5-tV-Y-lVKinouG2nOAFtdZE5ATMwXMfhtXQ')
    // MTV India
    meta(name='google-site-verification', content='hRzkR7zKeckPp8KNA4_jGgtiUcg5u2Z1LflbJAULjYo')
    // MTV Roadies
    meta(name='google-site-verification', content='-gGBI8j-3uUfZmKFVZHpmcfmhxnHZ-albzeOVUN86yU')
    // Coke Studio
    meta(name='google-site-verification', content='RXFJdzSQY8iY23lNQXFnhhczFteMJD0_u0pjKVYLHSk')
    // MTV Unplugged
    meta(name='google-site-verification', content='qBUfuR9RUOE1EJ5Z98qAYqSXJfxT2C2_odE78Rkuo1Q')
    // Colors Kannada
    meta(name='google-site-verification', content='md_FkfoGcIVzSoGpO_GHhcu4XXHVdjfp4X0zd6pMt38')
    // Colors Marathi
    meta(name='google-site-verification', content='nkHXLqzxDJqVEUNTFhB7WGaW215vLWr2m-CHem4BKCk')
    // Colors Gujarati
    meta(name='google-site-verification', content='d5sgzXT6W_IOfsucznGyTFuvTQIWvCmAgviD02KYlQQ')
    // Colors Bangla
    meta(name='google-site-verification', content='yWrehcXXYAHPSYfAfgb6z0clYxRUYE9h24bokyf-DKI')
    // Google Code
    meta(name='google-site-verification', content='qfYIyrA7av0U3A1nwHG6fgmMhk3tsdacjqGgk0x9LI0')
    meta(name='google-site-verification', content='W4CF1jqaNeiHbx-ft-WWnKrMjtpA_thGAQjyywx1O2I')

    link(rel='alternate', href='/favicon.ico', type="image/x-icon")
    link(rel='alternate', href='android-app://com.tv.v18.viola/http/www.voot.com/')
    link(rel='alternate', href='ios-app://1011777157/http/voot')
    
    
    
    //Appboy integration start
    script(type='text/javascript').
      +function(a,p,P,b,y) {
        appboy={};for(var s="destroy toggleAppboyLogging setLogger openSession changeUser requestImmediateDataFlush requestFeedRefresh subscribeToFeedUpdates logCardImpressions logCardClick logFeedDisplayed requestInAppMessageRefresh logInAppMessageImpression logInAppMessageClick logInAppMessageButtonClick subscribeToNewInAppMessages removeSubscription removeAllSubscriptions logCustomEvent logPurchase isPushSupported isPushBlocked isPushGranted isPushPermissionGranted registerAppboyPushMessages unregisterAppboyPushMessages submitFeedback ab ab.User ab.User.Genders ab.User.NotificationSubscriptionTypes ab.User.prototype.getUserId ab.User.prototype.setFirstName ab.User.prototype.setLastName ab.User.prototype.setEmail ab.User.prototype.setGender ab.User.prototype.setDateOfBirth ab.User.prototype.setCountry ab.User.prototype.setHomeCity ab.User.prototype.setEmailNotificationSubscriptionType ab.User.prototype.setPushNotificationSubscriptionType ab.User.prototype.setPhoneNumber ab.User.prototype.setAvatarImageUrl ab.User.prototype.setLastKnownLocation ab.User.prototype.setUserAttribute ab.User.prototype.setCustomUserAttribute ab.User.prototype.addToCustomAttributeArray ab.User.prototype.removeFromCustomAttributeArray ab.User.prototype.incrementCustomUserAttribute ab.InAppMessage ab.InAppMessage.SlideFrom ab.InAppMessage.ClickAction ab.InAppMessage.DismissType ab.InAppMessage.OpenTarget ab.InAppMessage.ImageStyle ab.InAppMessage.Orientation ab.InAppMessage.CropType ab.InAppMessage.prototype.subscribeToClickedEvent ab.InAppMessage.prototype.subscribeToDismissedEvent ab.InAppMessage.prototype.removeSubscription ab.InAppMessage.prototype.removeAllSubscriptions ab.InAppMessage.Button ab.InAppMessage.Button.prototype.subscribeToClickedEvent ab.InAppMessage.Button.prototype.removeSubscription ab.InAppMessage.Button.prototype.removeAllSubscriptions ab.SlideUpMessage ab.ModalMessage ab.FullScreenMessage ab.ControlMessage ab.Feed ab.Feed.prototype.getUnreadCardCount ab.Card ab.ClassicCard ab.CaptionedImage ab.Banner ab.WindowUtils display display.automaticallyShowNewInAppMessages display.showInAppMessage display.showFeed display.destroyFeed display.toggleFeed sharedLib".split(" "),i=0;i<s.length;i++){for(var k=appboy,l=s[i].split("."),j=0;j<l.length-1;j++)k=k[l[j]];k[l[j]]=function(){console&&console.error("The Appboy SDK has not yet been loaded.")}}appboy.initialize=function(){console&&console.error("Appboy cannot be loaded - this is usually due to strict corporate firewalls or ad blockers.")};appboy.getUser=function(){return new appboy.ab.User};appboy.getCachedFeed=function(){return new appboy.ab.Feed};
        (y = a.createElement(p)).type = 'text/javascript';
        y.src = '/appboy.min.js';
        (c = a.getElementsByTagName(p)[0]).parentNode.insertBefore(y, c);
        if (y.addEventListener) {
          y.addEventListener("load", b, false);
        } else if (y.readyState) {
          y.onreadystatechange = b;
        }
      }(document, 'script', 'link', function() {
          appboy.initialize('!{appConfig.appBoyInitializerKey}', {enableLogging: false, doNotLoadFontAwesome: true});
          appboy.openSession();
          var userInfo, Uid = '', email_ID = '', parts, value = "; " + document.cookie;
          parts = value.split("; user_id=");
          if (parts.length == 2){
            var user_id = decodeURIComponent(parts.pop().split(";").shift())
            userInfo = JSON.parse(user_id);
          }           
          if(userInfo && userInfo.Uid){
            Uid = userInfo.Uid;
          }
          if(userInfo && userInfo.emailid){
            email_ID = userInfo.emailid;
          }
          if(Uid != '') {
            appboy.changeUser(Uid);
          }
          appboy.getUser().setEmail(email_ID);
  
            function setCookie(cname, cvalue, exdays) {
                let d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                let expires = "expires="+d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            }
            function getCookie(cname) {
              let name = cname + "=";
              let ca = document.cookie.split(';');
              for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                  c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                  return c.substring(name.length, c.length);
                }
              }
              return "";
            }
            
            
            function deleteCache(){
                //deleted indexedDB
                window.indexedDB.webkitGetDatabaseNames().onsuccess = function(event) {
                    Array.prototype.forEach.call(event.target.result, indexedDB.deleteDatabase.bind(indexedDB));
                    console.log('[ServiceWorker] IndexDB Deleted');
                }
                //deleted caches
                caches.keys().then(function (cachesNames) {
                    return Promise.all(cachesNames.map(function (cacheName) {
                        return caches.delete(cacheName).then(function () {
                            console.log("Cache with name " + cacheName + " is deleted");
                        });
                    }));
                }).then(function () {
                    console.log("All " + document.defaultView.location.origin + " caches are deleted");
                });
            }
      
      
            // Need to Update sw_version_updated when 
            // 1- If There have any changes in mobile-service-worker.js
            // 2- If Need to show upadated Data
            
            var sw_version = getCookie('sw_version'),
                sw_version_updated = 'sw-version-005'; // Date:Build => 19-07-2017:005
           
            function setSWCookie() {
                setCookie('sw_version', sw_version_updated, 10);
                console.log('[ServiceWorker] successfully set Cookies');
            }
            
            function swRegistration() { 
                if(appboy.isPushSupported()){
                    appboy.registerAppboyPushMessages();
                    console.log('[ServiceWorker] successfully registered');
                } else {
                    navigator.serviceWorker.register('/mobile-service-worker.js')
                    .then(function(registration) {
                        console.log('[ServiceWorker] successfully registered');
                    })
                    .catch(function(error) {
                        console.log('[ServiceWorker] registration failed', error);
                    });
                }
            }
             
            if (!('serviceWorker' in navigator)) {
                console.log('[ServiceWorker] worker not supported');
                return;
            } else {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    if((sw_version === '' || (sw_version != '' && sw_version_updated != sw_version)) 
                        && registrations.length > 0){
                        for(let registration of registrations) {
                            registration.unregister().then(function() {
                                setSWCookie();
                                console.log('-------[ServiceWorker] successfully Unregister');
                                typeof window != 'undefined' && window.location.reload(true);
                            });
                        }
                    } else {
                        (sw_version === '' || sw_version != '') && registrations.length === 0 && setSWCookie();
                        console.log('-------[ServiceWorker] Register default');
                        swRegistration();
                    }
                });
            }
            
      });
    //Appboy integration end





    //User added to home-screen-icon or Not
    script(type='text/javascript', defer='defer').
      window.addEventListener('beforeinstallprompt', function (e) {
        // In appboy.min.js have:
        // 1- window.mixpanel.track('Allow Notifications',{'Value 1': 'Allow',});
        // 2- window.mixpanel.track('Allow Notifications',{'Value 1': 'Block',});
        // Don't delete it's event function for mixpanel tracing push notification at line-49 & line-51
        
        e.userChoice.then(function (choiceResult) {
            if(choiceResult.outcome == 'dismissed') {
                //console.log('User cancelled home screen install');
            } else {
                if(typeof window !== "undefined") {
                    //console.log('User added to home screen', choiceResult.outcome);
                    window.mixpanel.track('Added to Home Screen', {
                        'Value 1': 'Yes',
                    });
                }
            }
        });
      });


    script(type='text/javascript').
      var islrsharing = true;
      var islrsocialcounter = false;

    script(type='text/javascript').
      (function(){
        var a = document.createElement('script');
        a.type = 'text/javascript';
        a.async = true;
        a.src = ('https:'==document.location.protocol?'https://':'http://cdn.')+'chuknu.sokrati.com/17295/tracker.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(a,s);
      })();

    script(mw.setConfig('forceMobileHTML5', true);)
    script(type='text/javascript').
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '!{appConfig.fbPixelKey}'); // Insert your pixel ID here.
      fbq('track', 'PageView');

    noscript
      img(height='1', width='1', style='display:none', src='https://www.facebook.com/tr?id=521823934664910&ev=PageView&noscript=1')

    // start Mixpanel
    script(type='text/javascript').
       (function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
       0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
       for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match("^\/\/")?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);


  body
    noscript
      iframe(src='https://www.googletagmanager.com/ns.html?id=GTM-PFJ6B46', height='0', width='0', style='display:none;visibility:hidden')
    #app!= body 
    script(type='text/javascript').
      window.__INITIAL_STATE__=!{initialState}
      
    script(src=vendor,defer='defer')
    script(src=entry,defer='defer')
    
    div#remarketingData
      script(type='text/javascript').
        var google_tag_params = {
        "dynx_itemid": "!{remarketingData.dynx_itemid || ""}",
        "dynx_itemid2": "!{remarketingData.dynx_itemid2 || ""}",
        "dynx_pagetype": "!{remarketingData.dynx_pagetype || ""}",
        "dynx_totalvalue": 200
        }
    
    script(type='text/javascript').
      /* <![CDATA[ */
      var google_conversion_id = 935665395;
      var google_custom_params = window.google_tag_params;
      var google_remarketing_only = true;
      /* ]]> */
    script(type='text/javascript', src='//www.googleadservices.com/pagead/conversion.js',defer='defer')
    noscript
      div(style='display:inline;')
       img(height='1', width='1', style='border-style:none;', alt='', src='//googleads.g.doubleclick.net/pagead/viewthroughconversion/935665395/?value=0&guid=ON&script=0')
  // script(src='//share.loginradius.com/Content/js/LoginRadius.js',defer='defer',id='lrsharescript')
  // script(type='text/javascript', src='//cdn.loginradius.com/share/v1/LoginRadius.js',defer='defer')

  script(src='https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js', type='text/javascript',defer='defer')
  script(src='https://player-as.ott.kaltura.com/225/v2.58.1_viacom_v0.36_v0.5.0_viacom_proxy_v0.4.24/mwEmbed/mwEmbedLoader.php?protocol=https',defer='defer')
  script(src='//cdn.loginradius.com/hub/prod/js/CustomInterface.2.js', type='text/javascript',defer='defer')
  script#loginradiuscustom_tmpl(type='text/html').
      <div class="<%=Name%>">
      <a class="anchor_<%=Name%>" href="javascript:void()" onclick="return $LRIC.util.openWindow('<%=Endpoint%>&callback=<%=createCurrentRoute(window.location.href)%>');">
      <span class="icon-image-<%=Name%>" ></span>
      <span class="<%=Name%>-text">Continue with <%=Name%></span>
      </a>
      </div>
  // Change here for any design change in Login Radius
  script.
      function createCurrentRoute(loc) {
      loc = loc.replace("'","-")
      loc = loc.replace("'","-")
      // var callBackURL = location;
      // var currentURL = location;
      // callBackURL += "/"+encodeURIComponent(escape(currentURL));
      return loc;
      }
   
  script.
    (function(d, s) { var js, fjs = d.getElementsByTagName(s)[0], load = function(url, id) { if (d.getElementById(id)) {return;} js = d.createElement(s); js.src = url; js.id = id; fjs.parentNode.insertBefore(js, fjs); }; setTimeout(function(){load('//cdn.loginradius.com/share/v1/LoginRadius.js', 'lrshare');},0); }(document, 'script'));
  
  if stylesheet
    noscript#deferred-styles
      link(rel="stylesheet", href=stylesheet)
    script.
      var loadDeferredStyles = function() {
      var addStylesNode = document.getElementById("deferred-styles");
      var replacement = document.createElement("div");
      replacement.innerHTML = addStylesNode.textContent;
      document.body.appendChild(replacement)
      addStylesNode.parentElement.removeChild(addStylesNode);
      };
      var raf = requestAnimationFrame || mozRequestAnimationFrame ||
      webkitRequestAnimationFrame || msRequestAnimationFrame;
      if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
      else window.addEventListener('load', loadDeferredStyles);
`;



//  kaltura player api---- script(src='https://player-as.ott.kaltura.com/225/v2.50.4_viacom_v0.35_v0.5.0_viacom_proxy_v0.4.14/mwEmbed/mwEmbedLoader.php?protocol=https')
//    script(src='//player-as.ott.kaltura.com/viacom18/v2.45_viacom_v0.28_v0.4.1_viacom_proxy_v0.4.2/mwEmbed/mwEmbedLoader.php')
//      script(src='http://cdnapi.kaltura.com/p/1918321/sp/191832100/embedIframeJs/uiconf_id/32626752/partner_id/1918321')
//    "PLAYER_URL": "//player-as.ott.kaltura.com/viacom18/v2.45_viacom_v0.28_v0.4.1_viacom_proxy_v0.4.2/mwEmbed/mwEmbedLoader.php",
//    "FF_PLAYER_URL": "//player-as.ott.kaltura.com/225/v2.48.3_viacom_v0.31_v0.4.1_viacom_proxy_v0.4.5/mwEmbed/mwEmbedLoader.php",
//    mw.setConfig('forceMobileHTML5', true);

// partnerId=1918321
// ui_config= 29158152

// ui_config= 32626752
