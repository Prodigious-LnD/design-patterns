jQuery.inc("vendors.bootstrap");
jQuery.inc("vendors.highlight");

jQuery.clss("views.index", {
	/* Constants */
	/* ======================================================== */
	uses: [],
    
	/* Variables */
	/* ======================================================== */
    $body: $('body'),
	
	/* Constructor */
	/* ======================================================== */
	_constructor: function() {
		$.views.index.init();
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
        this.$body.scrollspy({ target: '#affixSpy' });
	},

	_uses: function() {
		this.parent._uses(this.uses);
	}

	/* Public Methods */
	/* ======================================================== */

	/* Events */
	/* ======================================================== */

})();