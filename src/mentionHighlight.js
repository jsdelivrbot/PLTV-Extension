import { getOptions } from './main';

/**
 * Checks if a message contains mention and changes background to BTTV style background.
 * @param {node} node - Message node
 */
export default function MentionHighlight(node)
{
    const currentUser = $('#author #author-name').text().toLowerCase();
    const authorType = node.get(0).getAttribute('author-type');

    if (typeof currentUser === 'undefined') {
        return;
    }

    if (getOptions()['mentionHighlight'] && currentUser.length > 2 && !node.hasClass('yt-live-chat-legacy-paid-message-renderer-0')) { // Check it's not sponsor / superchat, also mentionHighlight enabled

        const uniqueid = node.get(0).getAttribute('id'); // Copy unique message id
        const message = (" " + node.find('#message').text().toLowerCase() + " ").replace(/[\u200B-\u200D\uFEFF]/g, '');

        if (uniqueid === null) {
            return;
        }

        if (uniqueid.length > 30 && (authorType === 'owner' || message.indexOf(' '+currentUser+' ') !== -1 || message.indexOf('@'+currentUser+' ') !== -1)) { // If your name is in the message, and it's not your message or the message is from the streamer
            node.get(0).style.backgroundColor = "rgba(255,0,0,0.40)";
            node.find('#author-name').get(0).style.color = "#ffffff";
        }
    }
};
