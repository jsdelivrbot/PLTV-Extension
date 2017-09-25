import Emote from './emote';
import MentionHighlight from './mentionHighlight';

/**
 * Binds chat mutation observer and listen for new chat messages.
 */
export default function chatObserver()
{
    const target = document.querySelector('.style-scope .yt-live-chat-item-list-renderer');

    if (!target) {
        setTimeout(chatObserver, 250);
        return;
    }

    const observer = new MutationObserver(function (mutations) {

        mutations.forEach(function (mutation) {

            const newNodes = mutation.addedNodes;

            if (newNodes !== null) {

                const $nodes = $(newNodes);

                $nodes.each(function () {

                    const $node = $(this);

                    if (!$node.hasClass('yt-live-chat-item-list-renderer')) {
                        return;
                    }

                    MentionHighlight($node);
                    Emote.emoteCheck($node);
                });
            }
        });
    });

    const options = {
        characterData: false,
        attributes: false,
        childList: true,
        subtree: true
    };

    observer.observe(target, options);
};
