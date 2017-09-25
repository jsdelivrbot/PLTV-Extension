import Emote from './emote';
import donateButton from './overlay/donateButton';
import checkIfWatchingLive from './overlay/checkIfWatchingLive';
import AlwaysScrollDown from './overlay/alwaysScrollDown';

export default class PageCheck
{
    /**
     * Checks if user is watching from wrong livestream page and warns them.
     * @static
     */
    static youtubeGaming()
    {
        // Run checks in steps so we're not calling methods unnecessarily
        const url = document.location.href;
        
        if(!url.includes('gaming.youtube')){
            const iframe = document.getElementById('live-chat-iframe');
            
            if(iframe){
                const $textWrapper = $('.yt-user-info');
                const text = $textWrapper.find('a').text();
                
                if(text === 'PhantomL0rd'){
                    const redirectConfirm = confirm('[PhantomL0rd TV] Go to the official PhantomL0rd livestream page?');

                    if (redirectConfirm === true) {
                        window.location = 'https://gaming.youtube.com/JVPhantomLord/live';
                    }
                }
            }
        }
    };

    /**
     * Checks if user is watching a livestream on Youtube gaming.
     * @static
     */
    static livestreamPage()
    {
        // Run checks in steps so we're not calling methods unnecessarily
        const url = document.location.href;
        const target = document.getElementById('owner');
        const text = $(target).find('span').text();
        
        if(!url.includes('live_chat') && !url.includes('is_popout=1')){
            const chat = document.getElementById('chat');
            
            if(!target || !chat){
                PageCheck.streampageChecks++;

                if (PageCheck.streampageChecks < 5)
                    setTimeout(PageCheck.livestreamPage, 1000);

                return false;
            }
        }
		
        if(text === 'PhantomL0rd') {
            donateButton();
        }

        Emote.loadEmotes();
        AlwaysScrollDown.init();
        checkIfWatchingLive();

        PageCheck.streampageChecks = 0;
    };

    /**
     * Check if user is watching a livestream.
     * @static
     */
    static isLivestream() {
        const liveButton = document.querySelector('.ytp-live-badge.ytp-button');
        const chatApp    = document.querySelector('yt-live-chat-app');
        const chatiFrame = document.querySelector('#live-chat-iframe');
        const chatHeader = document.querySelector('.yt-live-chat-header-renderer');

        const liveButtonCheck = (document.body.contains(liveButton) && !liveButton.getAttribute('disabled'));
        const chatCheck = (document.body.contains(chatApp) || document.body.contains(chatiFrame) || document.body.contains(chatHeader));

        return !!(liveButtonCheck || chatCheck);
    }

    /**
     * Check if user is watching a PhantomL0rd livestream.
     * @static
     */
    static isCorrectStream() {

        const url = (window.location !== window.parent.location)
            ? document.referrer
            : document.location.href;
        const YTGchannel = $('ytg-owner-badges').parent().attr('href');
        const YTchannel  = $('a.ytd-video-owner-renderer').attr('href');

        const whitelistedChannels = [
            '/channel/UCaDJ_DTz3kbneMWiV31YiFA', // andries_dev
            '/channel/UCTmrHQEEFDYPy51mUg0JpjA', // xByt3z
            '/channel/UC1EzZOW1tVEK2vjmbSo137A', // xByt3z Test
            '/channel/UCGeHk-_K6Lee4CcVN2SKI2A'  // PhantomL0rd
        ];

        const urlCheck = (url.indexOf('live_chat') > -1);
        const channelCheck = (whitelistedChannels.indexOf(YTGchannel) > -1 || whitelistedChannels.indexOf(YTchannel) > -1);

        return urlCheck || channelCheck;
    }
};

PageCheck.streampageChecks = 0;
