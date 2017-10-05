import { getOptions } from './main';

const randomChatColors = {
    '-A': '#47d288',
    '-B': '#b94ff1',
    '-C': '#3cdc36',
    '-D': '#df44dc',
    '-E': '#6bd432',
    '-F': '#8c69f1',
    '-G': '#a3d12d',
    '-H': '#b35dd5',
    '-I': '#5edb62',
    '-J': '#ca46bb',
    '-K': '#3daa27',
    '-L': '#ef67d5',
    '-M': '#83cc3f',
    '-N': '#d978eb',
    '-O': '#97bd12',
    '-P': '#5c7af1',
    '-Q': '#dfc71b',
    '-R': '#4c8ae7',
    '-S': '#f02f14',
    '-T': '#2dd3ad',
    '-U': '#ee3034',
    '-V': '#44c357',
    '-W': '#ab76dc',
    '-X': '#c5bf30',
    '-Y': '#6d7ddb',
    '-Z': '#eca821',
    '-0': '#cc6a35',
    '-1': '#858b23',
    '-2': '#f09464',
    '-3': '#bca527',
    '-4': '#e7964d',
    '-5': '#ac850f',
    '-6': '#e1b655',
    '-7': '#bb7722',
    '-8': '#aa852e',
    '-9': '#de9b36',
    '--': '#e57e20',
    '-_': '#46ad68'
};

export default function chatColors(node, profileId)
{
	if (typeof node === 'undefined' || typeof profileId === 'undefined') {
		return false;
	}
	
	const msgParent = $(node).parents('.yt-live-chat-text-message-renderer-0');
	const msgParentPopout = $(node).parents('.yt-live-chat-item-list-renderer');
	const authorName = $(msgParent).find('#author-name');
	const authorNamePopout = $(msgParentPopout).find('#author-name');
	
	const firstTwo = profileId.substring(0, 2);
	
	if (authorName.length > 0) {
		$(authorName).css('color', randomChatColors[firstTwo.toUpperCase()]);
	}
	
	if (authorNamePopout.length > 0) {
		$(authorNamePopout).css('color', randomChatColors[firstTwo.toUpperCase()]);
	}
};
