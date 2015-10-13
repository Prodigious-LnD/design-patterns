jQuery.inc("vendors.bootstrap");
jQuery.inc("vendors.highlight");

jQuery.clss("views.chat", {
	/* Constants */
	/* ======================================================== */
	uses: [],
    
    /* Variables */
	/* ======================================================== */
    
	/* Constructor */
	/* ======================================================== */
	_constructor: function() { 
		$.views.chat.init();
	},

	init: function() {
        this._uses();
		this._bindData();
		this._bindEvents();
	},

	/* Private Methods */
	/* ======================================================== */
	_bindData: function() {
        
	},

	_bindEvents: function() {
        hljs.initHighlightingOnLoad();
	},

	_uses: function() {
		this.parent._uses(this.uses);
	},

	/* Public Methods */
	/* ======================================================== */

	/* Events */
	/* ======================================================== */

})();