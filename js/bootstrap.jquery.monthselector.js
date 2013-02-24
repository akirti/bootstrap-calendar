/**
 * jQuery plugin. Bootstrap month selector widget.
 *
 * @requires twitter.bootstrap
 * @author Barry Jones <barry@onalldevices.com>
 */
(function($) {

	// Plugin default settings
	var _settings = {
		'afterChange'   : null,
		'label'         : null
	};

	// Array of months
	var _months = new Array(
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	);

	// Sub nodes
	var _list       = null;
	var _label      = null;
	var _selected   = null;

	// Methods
	var _methods = {
		init: function(options){
			var $self = this;
			return this.each(function(){

				var $this = $(this);

				// Merge in options
				var _settings = $.extend(_settings, options);

				// Grab node references
				if (_settings.label){_label = _settings.label;}
				if ($this.find('ul')){
					_list = $this.find('ul:eq(0)');
				}

				// Create month list items
				for (var i = 0; i < _months.length; i++){
					_list.append($('<li/>').append(
						$('<a/>', {"href": '#', "data-idx": i})
							.html(_months[i])
					));
				}
				_selected = 1;

				// Set default
				$this.monthSelector('updateLabel');
				_list.find('li').eq(_selected - 1).addClass('active');

				// Attach change handler afterChange
				_list.find('> li > a').on('click', function(e){
					e.preventDefault();
					var $node = $(this);

					// Update our month
					_selected = parseInt($node.attr('data-idx')) + 1;
					$this.monthSelector('updateLabel');
					_list.find('> li').removeClass('active');
					$node.parent().addClass('active');

					// Close list
					$this.removeClass('open');

					// Fire after change event
					if (_settings['afterChange']){
						_settings.afterChange.call(
							this,
							$this.monthSelector('getMonth')
						);
					}
					return false;
				});

			});
		},
		getMonth: function() {
			return {
				"number"    : _selected,
				"label"     : _months[_selected - 1]
			}
		},
		updateLabel: function(){
			_label.html(_months[_selected - 1]);
		}
	};

	jQuery.fn.monthSelector = function(method) {

		// Run method?
		if (method && _methods[method]){
			return _methods[ method ].apply(
				this,
				Array.prototype.slice.call(arguments, 1)
			);
		} else if (typeof method === 'object' || !method ) {
			return _methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.monthSelector' );
		}

	};
})(jQuery);