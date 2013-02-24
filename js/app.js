/**
 * Application namespace
 */
window.bootcal = {};
(function(ns) {

	// Widgets
	ns.monthselector    = null;
	ns.calendar         = null;
	ns.progress         = 0;
	ns.progressbar      = null;

})(bootcal);


/**
 * Application kick-off
 */
$(document).ready(function(){

	// Show progress bar
	bootcal.progressbar = $('#bc-progress').show();
	bootcal.progressbar.addClass('in')
		.find('.indicator').html('Initialising..')
		.next().find('.bar').css({"width": bootcal.progress + '%'})
	var _progress_timer = setInterval(function(){
		bootcal.progress += 10;
		if (bootcal.progress >= 100){bootcal.progress = 0;}
		bootcal.progressbar.find('.bar').css({"width": bootcal.progress + '%'});
	}, 50);

	// Initialise the month selector plugin
	bootcal.monthselector = $('#bc-month-selector').monthSelector({
		"afterChange": function(month){
			bootcal.calendar.bootCal('setDate', 2013, month.number, 1);
		},
		"label"     : $('#bc-month-selector .monthlabel')
	}).addClass('in');

	// Retrieve the events data
	$.get('data/get/events.json', function(data){

		// Initialise the calender plugin
		bootcal.calendar = $('#bc-calendar-widget').bootCal({
			"events": data
		}).addClass('in');

	});

	// Hide the progress bar
	clearInterval(_progress_timer); _progress_timer = null;
	bootcal.progress = 100;
	bootcal.progressbar.find('.bar').css({"width": bootcal.progress + '%'});
	setTimeout(function(){bootcal.progressbar.removeClass('in').hide();}, 800);

});
