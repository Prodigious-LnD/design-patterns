jQuery.inc("vendors.bootstrap");

jQuery.clss("views.session3", {
	/* Constants */
	/* ======================================================== */
	uses: ['Users'],
    
	/* Variables */
	/* ======================================================== */
    demoContainer: $(".demo-container"),
    userForm: $("#userForm"),
	
    /* Constructor */
	/* ======================================================== */
	_constructor: function() {
		$.views.session3.init();
	},

	init: function() {
		this._uses();
		this._bindData();
		this._bindEvents();
	},

	/* Private Methods */
	/* ======================================================== */
	_bindData: function() {
        ko.applyBindings($.models.users.viewModel, this.demoContainer.get(0));
	},

	_bindEvents: function() {
        var _this = this;
        
        this.userForm.on('submit', function(e) { _this.userFormOnSubmit(e); });
	},

	_uses: function() {
		this.parent._uses(this.uses);
	},

	/* Public Methods */
	/* ======================================================== */

	/* Events */
	/* ======================================================== */
    userFormOnSubmit: function(e) {
        e.preventDefault();
        
        $.models.users.addUser($.models.users.getUser());
        
        return false;
    },

})();