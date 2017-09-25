/**
 * Checks if user is behind in livestream and warns them.
 */
export default function checkIfWatchingLive() {

    let liveCheckInterval = null;

    liveCheckInterval = setInterval(function() {

        const $liveButton = $('.ytp-live-badge.ytp-button');

        if ($liveButton.is(':enabled') && $liveButton.is(':visible') && $('.iptv-live-warning').length < 1) {
            $('#player-container').append(`
                <div class="iptv-live-warning">
                    <div class="iptv-live-warning-text">
                        You\'re watching old footage, click the LIVE button in the bottom left corner to watch live.
                    </div>
                    <div class="iptv-live-warning-dismiss">
                        <a href="javascript:void(0)" class="iptv-live-warning-close">✕</a>
                    </div>
                </div>
            `);
        }
    }, 15 * 1000);

    $(document).on('click', '.iptv-live-warning-close', function() {
        $('.iptv-live-warning').remove();
        clearInterval(liveCheckInterval);
    });

    $(document).on('mousedown', '.ytp-live-badge', function() {
        $('.iptv-live-warning').remove();
    });
};
