import { SCROLL_ENABLED_URL, SCROLL_DISABLED_URL } from './../main';

export default class AlwaysScrollDown
{
    /**
     * Creates 'Always scroll down' overlay and binds the necessary listeners.
     * @constructor
     */
    static init()
    {
        const scrolldownWrapper = $('.iptv-scrolldown-wrapper');

        if (scrolldownWrapper.length) {
            scrolldownWrapper.remove();
        }

        const scrollWrapper = document.createElement('div');

        scrollWrapper.setAttribute('aria-label', 'Always scroll down (Enabled)');
        scrollWrapper.classList.add('hint--top', 'iptv-scrolldown-wrapper');

        $(scrollWrapper).css({
            'position': 'absolute',
            'right': '113px',
            'bottom': '18px'
        });

        $(scrollWrapper).html(`
            <a href="javascript:void(0)" class="iptv-scrolldown-toggle" style="outline: 0;">
                <img src="${SCROLL_ENABLED_URL}" alt="Always scroll down" height="11" width="11" class="iptv-scrolldown-toggle-icon">
            </a>
        `);

        document.body.appendChild(scrollWrapper);

        $(document).on('click', '.iptv-scrolldown-toggle', function() {
            AlwaysScrollDown.toggleScrollDown();
        });

        clearInterval(AlwaysScrollDown.interval);

        AlwaysScrollDown.interval = setInterval(function () {
            if (AlwaysScrollDown.scrollDown === true) {
                $('#item-scroller').scrollTop(999999999);
            }
        }, 100);

        AlwaysScrollDown.hideScrollOnCinema(scrollWrapper);
        AlwaysScrollDown.hideScrollOnSponsorMenu(scrollWrapper);
        AlwaysScrollDown.bindScrollListener();
        AlwaysScrollDown.bindScrollDownListener();
    };

    /**
     * Hides the 'Always scroll down' overlay when cinema mode is open
     * @static
     * @param {node} scrollWrapper
     */
    static hideScrollOnCinema(scrollWrapper)
    {
        const watchPage = 'ytg-watch-page';

        const observer = new MutationObserver(function(mutations) {
            mutations.forEach((m) => {
                $(m.target).is('[sidebar-collapsed]') ? $(scrollWrapper).hide() : $(scrollWrapper).show();
            });
        });

        const observerOpts = {
            childList: false,
            attributes: true,
            characterData: false,
            subtree: false,
            attributeFilter: ['sidebar-collapsed']
        };

        const addObserver = setInterval(() => {
            if ($(watchPage).length) {
                observer.observe($(watchPage)[0], observerOpts);
                clearInterval(addObserver);
            }
        }, 250);
    };

    /**
     * Hides the 'Always scroll down' overlay when sponsor menu is open.
     * @static
     * @param {node} scrollWrapper
     */
    static hideScrollOnSponsorMenu(scrollWrapper)
    {
        const chatInputRenderer = 'yt-live-chat-message-input-renderer';

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach((m) => {
                $(m.target).attr('creator-open') ? $(scrollWrapper).hide() : $(scrollWrapper).show();
            });
        });

        const observerOpts = {
            childList: false,
            attributes: true,
            characterData: false,
            subtree: false,
            attributeFilter: ['creator-open']
        };

        const sponsorClick = setInterval(() => {
            if ($(chatInputRenderer).length) {
                observer.observe($(chatInputRenderer)[0], observerOpts);
                clearInterval(sponsorClick);
            }
        }, 250);
    };

    /**
     * Disables 'Always scroll down' functionality when scrolling manually.
     * @static
     */
    static bindScrollListener()
    {
        const target = document.getElementById('item-scroller');

        if (!target) {
            setTimeout(() => { AlwaysScrollDown.bindScrollListener() }, 250);
            return;
        }

        $('#item-scroller').on('mousewheel DOMMouseScroll', function () {
            AlwaysScrollDown.toggleScrollDown(false);
        });

        $('#item-scroller').on('mousedown', function (event) {
            if(event.target === this) {
                AlwaysScrollDown.toggleScrollDown(false);
            }
        });
    };

    /**
     * Enables 'Always scroll down' functionality when blue jump down button is clicked.
     * @static
     */
    static bindScrollDownListener()
    {
        const target = document.getElementById('show-more');

        if (!target) {
            window.setTimeout(() => { AlwaysScrollDown.bindScrollDownListener() }, 250);
            return;
        }

        target.onmousedown = function () {
            AlwaysScrollDown.toggleScrollDown(true);
            return true;
        };
    };

    /**
     * Toggle scrollDown state and adjust overlay accordingly.
     * @static
     */
    static toggleScrollDown(state)
    {
        if (typeof state === 'undefined') {
            AlwaysScrollDown.scrollDown = !AlwaysScrollDown.scrollDown;
        } else {
            AlwaysScrollDown.scrollDown = state;
        }

        $('.iptv-scrolldown-wrapper').attr('aria-label', AlwaysScrollDown.scrollDown ? 'Always scroll down (Enabled)' : 'Always scroll down (Disabled)');
        $('.iptv-scrolldown-toggle-icon').attr('src', AlwaysScrollDown.scrollDown ? SCROLL_ENABLED_URL : SCROLL_DISABLED_URL);
    };
};

AlwaysScrollDown.scrollDown = true;
AlwaysScrollDown.interval = null;
