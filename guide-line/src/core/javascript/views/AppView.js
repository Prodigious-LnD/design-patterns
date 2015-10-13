jQuery.inc("plugins.jquery.validate");
jQuery.inc("vendors.knockout");

jQuery.clss("views", {
	/* Constants */
	/* ======================================================== */
    
	/* Variables */
	/* ======================================================== */
    validateDefaults: {
        errorClass: "has-error has-feedback",
        errorElement: "span",
        errorPlacement: function (error, element) {
            element.parent().find('#' + error.attr('id')).remove();

            error.empty();
            error.removeClass("has-error has-feedback");
            error.addClass("glyphicon glyphicon-remove form-control-feedback");
            error.insertAfter(element);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parent().removeClass(validClass);
            $(element).parent().addClass(errorClass);
        },
        success: function (label) {
            label.removeClass('glyphicon-remove');
            label.addClass("glyphicon-ok");
        },
        unhighlight: function (element, errorClass, validClass ) {
            $(element).parent().removeClass(errorClass);
            $(element).parent().addClass(validClass);
        },
        validClass: "has-success has-feedback"
    },
    
    /* Constructor */
	/* ======================================================== */
	_constructor: function() {
		$.views.init();
	},

	init: function() {
		this._bindEvents();
        this._validate();
	},

	/* Private Methods */
	/* ======================================================== */
	_bindEvents: function() {
		
	},
    
	_uses: function(uses) {
		$.app.uses(uses);
	},
    
    _validate: function() {
        jQuery.validator.setDefaults(this.validateDefaults);
    },

	/* Public Methods */
	/* ======================================================== */
	
	/* Events */
	/* ======================================================== */
})();