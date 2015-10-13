jQuery.clss('app', {
	/* Constants */
	/* ======================================================== */

	/* Variables */
	/* ======================================================== */
	
	/* Constructor */
	/* ======================================================== */
	_constructor: function() {
		$.app.init();
	},

	init: function() {
		this._bindEvents();
	},

	/* Private Methods */
	/* ======================================================== */
	_bindEvents: function() {
		$(document).ready(this.documentOnReady);
	},

	/* Public Methods */
	/* ======================================================== */
	load: function() {
		var functionName = "load";
		var page = $('.main');

		try {
			if (page.length > 0) {
				$.inc("views." + page.attr('id'));
			} 
		} catch (e) {
			console.log("Error: " + e.message + " on " + functionName);
		}
	},

	uses: function(uses) {
		var functionName = "uses";

		try {
			if ($.isArray(uses)) {
				$.each(uses, function(index) {
                    var modelName = uses[index];
                    
					$.inc("models." + modelName.toLowerCase(), function() {
                        $[modelName] = $.models[modelName.toLowerCase()];
                    });
				});
			}
		} catch (e) {
			console.log(e + " in " + functionName);
		}
	},

	/* Events */
	/* ======================================================== */
	documentOnReady: function() {
		$.inc("models.AppModel");
		$.inc("views.AppView");

		$.app.load();
	}
})();