jQuery.inc("vendors.knockout");
jQuery.inc("vendors.knockout.files");
jQuery.inc("vendors.knockout.mapping");

jQuery.clss("models", {
	/* Constants */
	/* ======================================================== */
	
	uses:[],
	
	/* Variables */
	/* ======================================================== */	
	viewModel: {},
	
	/* Constructor */
	/* ======================================================== */
	_constructor: function () {
		$.models.init();
	},
	
	init: function () {
		this._uses( this.uses );
	},
	
	/* Properties */
	/* ======================================================== */
	
	/* Private Methods */
	/* ======================================================== */
	
	_uses: function (uses) {
		$.app.uses(uses);
	},
	
	/* Public Methods */
	/* ======================================================== */
	
})();