jQuery.inc("vendors.knockout");

jQuery.clss("views", {
	/* Constants */
	/* ======================================================== */

	/* Variables */
	/* ======================================================== */
    
    /* Constructor */
	/* ======================================================== */
	_constructor: function() {
		$.views.init();
	},

	init: function() {
		var functionName = "init";

		try {
            this._bindEvents();
		} catch (e) {
			console.error(e + " in " + functionName);
		}
	},

	/* Private Methods */
	/* ======================================================== */
	_bindEvents: function() {
		var functionName = "bindEvents";

		try {

		} catch (e) {
			console.log(functionName);
		}
	},
    
	_uses: function(uses) {
		$.app.uses(uses);
	},

	/* Public Methods */
	/* ======================================================== */
	
	/* Events */
	/* ======================================================== */
})();