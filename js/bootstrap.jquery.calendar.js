/**
 * jQuery plugin. Bootstrap calendar widget.
 *
 * @requires twitter.bootstrap
 * @author Barry Jones <barry@onalldevices.com>
 */
(function($) {

	// Plugin default settings
	var _settings = {
		"onDayClick": null
	};

	// Date bits
	var _year       = 2013;
	var _month      = 1;
	var _day        = 1;

	// Array of months
	var _months = new Array(
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	);

	// Days in months
	var _daysinmonths = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	var _getDaysInMonth = function(month_no){
		if ((_year % 4 == 0 && _year % 100 != 0) || _year % 400 == 0){
			return 29;
		} else {
			return _daysinmonths[month_no - 1];
		}
	}
	var _getDaysEvents = function(day){
		if (day){
			var events = new Array();
			$.each(_events, function(i, evt){
				if (
					(evt.year == _year) &&
					(evt.month == _month) &&
					(evt.day == day)
				){
					events.push(evt);
				}
			});
			return events;
		}
	}

	// Stuff
	var _selected   = null;
	var _events     = null;
	var _dialog     = null;

	// Methods
	var _methods = {
		init: function(options){
			return this.each(function(){

				var $this = $(this);

				// Merge in options
				var _settings = $.extend(_settings, options);

				// Set default date
				var _startdate = options['start_date'];
				if (!_startdate){
					var d = new Date();
					_startdate = {
						"year"  : d.getFullYear(),
						"month" : d.getMonth(),
						"day"   : d.getDay()
					}
				}
				_year   = (isNaN(_startdate.year) || _startdate.year == null) ? _year : _startdate.year;
				_month  = (isNaN(_startdate.month) || _startdate.month == null) ? _month : _startdate.month;
				_day    = (isNaN(_startdate.day) || _startdate.day == null) ? _day : _startdate.day;

				// Load event data
				if (options['events']){
					_events = options.events;
				}

				// Load dialog view
				$.get('views/dialog-events.html', function(markup){

					// Prepare the dialog
					_dialog = $(markup);
					_dialog.attr('id', '_' + new Date().getTime());
					$('body').append(_dialog);

					// Render the initial calendar view
					$this.bootCal('render');

				});

			});
		},

		// View render function
		render: function(){
			return this.each(function(){

				var $this = $(this);

				// Hide/clear calendar
				$this.removeClass('in');
				$this.find('ul.thumbnails').remove();

				// Get the number of days in the month
				var _days_to_build = _getDaysInMonth(_month);

				// Build a thumbnail list per week
				var _rows = Math.ceil(_days_to_build / 5);
				var _counter = 1;
				for (var i = 0; i < _rows; i++){

					// Create the list
					var $ul = $('<ul/>').addClass('thumbnails').appendTo($this);

					// Build the days
					for (var j = 0; j < 5; j++){

						// Create thumbnail markup
						var $li = $('<li/>').addClass((i == 0 ? 'offset1 ' : '') + 'span2').appendTo($ul);
						var $a = $('<a/>', {
							"href": '#', "data-day": _counter
						}).addClass('thumbnail').appendTo($li);
						var $day = $('<span/>').addClass('day label label-info').html(_counter).appendTo($a);

						// Create events list
						var _evts = 0;
						if (_events){
							$.each(_events, function(i, evt){
								if (
									(evt.year == _year) &&
									(evt.month == _month) &&
									(evt.day == _counter)
								){
									$a.append($('<div/>').addClass('event').html(evt.title));
									_evts++;
								}
							});
						}

						// Create an event counter for small screens
						if (_evts > 0){
							$a.append($('<span/>').addClass('counter badge badge-success').html('x ' + _evts));
						}

						// Onwards
						_counter++;
						if (_counter > _days_to_build){break;}
					}
					if (_counter > _days_to_build){break;}

				}

				// Add event handler
				$this.find('a.thumbnail').on('click', function(e){
					e.preventDefault();

					// Find the events for this day
					var day = $(this).attr('data-day');
					var events = _getDaysEvents(day);

					// Display the event details
					$this.bootCal('showEvents', events);

					return false;
				});

				// Show calendar
				$this.addClass('in');

			});
		},

		// Show an events list for a given array of events
		showEvents: function(events){
			return this.each(function(){

				var $this = $(this);

				// Ceate the view
				if (events.length == 0){
					var $view = $('<div/>').addClass('well well-large').html('No appointments found');
				} else {

					// Build the event list
					var $view = $('<table/>').addClass('eventlist table');
					$view.html('<thead></thead><tbody></tbody>');
					var $tbody = $view.find('tbody');
					var $tr = $('<tr/>').appendTo($view.find('thead'));
					$tr.append($('<th/>').html('Event Title'));
					$tr.append($('<th/>').html('Time of Appointment'));
					$.each(events, function(i, evt){
						var $tr = $('<tr/>').appendTo($tbody);
						$tr.append($('<td/>').html(evt.title));
						$tr.append($('<td/>').html(evt.time));
					});

				}


				// Reset the dialog view, and present..
				var $body = _dialog.find('.modal-body');
				$body.html('').append($view);
				_dialog.modal('show');

			});
		},

		// Set the date
		setDate: function(year, month, day){
			return this.each(function(){

				var $this = $(this);

				// Set locals
				_year   = (isNaN(year) || year == null) ? _year : year;
				_month  = (isNaN(month) || month == null) ? _month : month;
				_day    = (isNaN(day) || day == null) ? _day : day;

				// Re-render the view
				$this.bootCal('render');

			});
		}
	};

	jQuery.fn.bootCal = function(method) {

		// Run method?
		if (method && _methods[method]){
			return _methods[ method ].apply(
				this,
				Array.prototype.slice.call(arguments, 1)
			);
		} else if (typeof method === 'object' || !method ) {
			return _methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.bootCal' );
		}

	};
})(jQuery);