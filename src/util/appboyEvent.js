import { isset } from './common';
import {getPlayerData} from '../util/filters';

let appBoyEvent = {
    isAuthenticated: function (email, UID) {
        if (isset(email) && isset(UID)) {
            window && window.appboy && window.appboy.changeUser(UID);
            window && window.appboy && window.appboy.getUser().setEmail(email);
        }
    },
    isLogin: function (checker) {
        window && window.appboy && window.appboy.logCustomEvent('Login', {'is-logged-in': checker});
    },
    isSignUp: function (checker) {
        window && window.appboy && window.appboy.logCustomEvent('Sign-Up-Completed', {'is-completed': checker});
    },
    isSignOut: function () {
        window && window.appboy && window.appboy.getUser().setEmail('');
    },
    isVootKids: function (checker) {
        window && window.appboy && window.appboy.logCustomEvent('Voot-Kids', {'on-kids-page': checker});
    },
    isMakeShoutOnMedia: function (Uid, shoutName, mediaName) {
        if (isset(Uid)) {
            if (isset(shoutName)) {
                window && window.appboy && window.appboy.getUser().addToCustomAttributeArray('Last Shout Name', shoutName);
            }
            if (isset(mediaName)) {
                window && window.appboy && window.appboy.getUser().addToCustomAttributeArray('Last Shouted Content', mediaName);
            }
        }
        window && window.appboy && window.appboy.logCustomEvent('Shout', {'Show-Name': mediaName, 'Shout-Name': shoutName});
    },
    isFollow: function (follow, showFavorited, Uid) {
        if (follow === true) {
            window && window.appboy && window.appboy.logCustomEvent('Show-Followed', {'Show-Name': showFavorited});
        }
        if (isset(Uid)) {
            if (isset(showFavorited)) {
                window && window.appboy && window.appboy.getUser().addToCustomAttributeArray('Last Show Follow', showFavorited);
            }
        }
    },
    isFirstPlay: function (contentObject, appBoyLogin) {
        let returnObject = getPlayerData(contentObject),
            mediaid = returnObject.mediaid,
            seriesTitle = returnObject.seriesTitle,
            sbu = returnObject.sbu,
            genre = returnObject.genre,
            language = returnObject.language,
            movieTitle = (returnObject && returnObject.movieTitle) || '',
            contentName = returnObject.contentName,
            Uid = appBoyLogin && appBoyLogin.data && appBoyLogin.data.Uid,
            percentagePlayVideo = 1;

        if (isset(mediaid) && isset(seriesTitle)) {
            window && window.appboy && window.appboy.getUser().addToCustomAttributeArray('Last Episodes Watched', mediaid);
        }
        if (isset(sbu)) {
            window && window.appboy && window.appboy.getUser().addToCustomAttributeArray('Last SBU watched', sbu);
        }
        if (isset(seriesTitle)) {
            window && window.appboy && window.appboy.getUser().addToCustomAttributeArray('Last Show Watched', seriesTitle);
        }
        if (isset(genre[0])) {
            window && window.appboy && window.appboy.getUser().addToCustomAttributeArray('Last Genres Watched', genre[0]);
        }
        if (isset(language)) {
            window && window.appboy && window.appboy.getUser().addToCustomAttributeArray('Last Languages of Content Viewed', language);
        }
        if (isset(mediaid) && isset(movieTitle)) {
            window && window.appboy && window.appboy.getUser().addToCustomAttributeArray('Last Movies Watched', mediaid);
        }

        if (isset(genre[0]) && genre[0] != 'Kids') {
            if (movieTitle != '') {
                window && window.appboy && window.appboy.logCustomEvent('Video-Watched', {
                    'Video Completed': percentagePlayVideo,
                    'Genre': genre[0],
                    'Language': language,
                    'Movie-Name': movieTitle,
                    'SBU': sbu,
                });
            } else {
                window && window.appboy && window.appboy.logCustomEvent('Video-Watched', {
                    'Video Completed': percentagePlayVideo,
                    'Episode-Name': contentName,
                    'Genre': genre[0],
                    'Language': language,
                    'SBU': sbu,
                    'Show-Name': seriesTitle,
                });
            }
        }

        if (isset(genre[0]) && genre[0] == 'Kids') {
            window && window.appboy && window.appboy.logCustomEvent('Kids Video Watched', {
                'Video Completed': percentagePlayVideo,
                'Episode-Name': contentName,
                'Genre': genre[0],
                'SBU': sbu,
                'Show-Name': seriesTitle,
            });
        }
    },
    isBingShow: function (seriesTitle) {
        window && window.appboy && window.appboy.getUser().addToCustomAttributeArray('Binge Show', seriesTitle);
    }
};

export default appBoyEvent;
