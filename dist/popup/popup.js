$(function() {
	$('.popupchat').click(function() {
		window.open('https://gaming.youtube.com/live_chat?v=zMyzUf8wUvA&is_popout=1', 'PhantomL0rd Chat', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=500,height=800');
	});

	$('.openOptions').click(function() {
		chrome.runtime.openOptionsPage();
	});

    $('.open-schedule').click(function() {
        getSchedule();
	});

    $('.close-schedule').click(function() {
        window.location.reload();
	});
});

var getTableVal = function(val) {
    if (typeof val === 'undefined') {
        return '';
    }

    return val;
};

var getSchedule = function() {

	$.get('http://192.241.248.43/schedule', function(data) {

        var schedule = data['schedule'];

        $('.schedule-table').html('');

        for (var i = 0; i < schedule.length; i++) {

            $('.schedule-table').append(`
                <tr>
                    <td>${getTableVal(schedule[i][0])}</td>
                    <td>${getTableVal(schedule[i][1])}</td>
                    <td>${getTableVal(schedule[i][2])}</td>
                    <td>${getTableVal(schedule[i][3])}</td>
                </tr>
            `);
        };

        $('.tweet-container').hide();
        $('.schedule-container').show();

        $('.open-schedule').hide();
        $('.close-schedule').show();
    });
};

var liveCheck = function() {

	$.get('http://192.241.248.43/live', function(data) {
		if (data['status'] === true) {
			$('.stream-offline').addClass('hidden');
			$('.stream-online').removeClass('hidden');
		} else {
			$('.stream-online').addClass('hidden');
			$('.stream-offline').removeClass('hidden');
		}
	});
};

var getLatestTweet = function() {

	if (JSON.parse(localStorage.showRecentTweet) === false) {
		$('<style type="text/css">html{height: 125px;}</style>').appendTo('head');
		return;
	}

	$('.tweet-container').removeClass('hidden');
};

document.addEventListener('DOMContentLoaded', function () {
	liveCheck();
	getLatestTweet();
});
