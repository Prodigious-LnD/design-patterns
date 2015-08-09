/* IE Fix */
/* ======================================================== */

if (typeof console === "undefined") {
	console = {};
}
if (typeof console.log === "undefined") {
	console.log = function(msg) {};
}
if (typeof console.debug === "undefined") {
	console.debug = function(msg) {};
}
if (typeof console.error === "undefined") {
	console.error = function(msg) {};
}

/* ======================================================== */

jQuery.clss('debug', {
    /* Constants */
	/* ======================================================== */

	/* Variables */
	/* ======================================================== */
    
    /* Constructor */
	/* ======================================================== */
    _constructor: function(){},
    
    /* Private Methods */
	/* ======================================================== */
    
    /* Public Methods */
	/* ======================================================== */
    log: function(){ 
        var i = -1, l = arguments.length, args = [], fn = 'console.log(args)';
        while(++i<l){
            args.push('args['+i+']');
        };
        fn = new Function('args',fn.replace(/args/,args.join(',')));
        fn(arguments);
    }
});