if (typeof $.debug === "undefined") { $.debug = { log: function(){} } }

(function($) {
    $.extend({
		/* Constants */
		/* ======================================================== */
        JS_PATH: 'javascript/',
        JS_EXTENSION: '.js',

		/* Variables */
		/* ======================================================== */
        _debug: true,
		_loadedFiles: [],

		/* Properties */
		/* ======================================================== */
		loadedFiles: function(filePath) {
			if (typeof filePath !== "undefined") {
				this._loadedFiles.push(filePath);
                
                $.debug.log("Loaded: " + filePath + $.JS_EXTENSION);
			}

			return this._loadedFiles;
		},

		/* Private Methods */
		/* ======================================================== */
        _getScript: function(filePath, callback) {
            if( typeof callback == "undefined"){ callback = function(){} }
            
            $.ajax({
                url: $.JS_PATH + filePath + $.JS_EXTENSION,
                dataType: 'script',
                async: false,
                success: function(data) {
                    $.loadedFiles(filePath);
                    
                    callback();
                },
                error: function(error) {
                    console.log("Error: " + error.statusText + " loading " + filePath);
                }
            });
        },
        
		_wasLoaded: function(filePath) {
			return $.inArray(filePath, this._loadedFiles) >= 0;
		},

		/* Public Methods */
		/* ======================================================== */
		clss: function(className, codeBase) {
			var jq = $;
			var cn = className.split(".");

			$.each(cn, function() {
				if (!jq[this]) {
					jq[this] = {
                        _constructor: function() {},
                        namespace: className, 
						parent: jq
					};
				}

				jq = jq[this];
			});

			$.extend(jq, codeBase);

			return jq['_constructor'];
		},

		inc: function(namespace, callback) {
            var filePath = namespace.replace(/\./g, "/");
			
            if (!this._wasLoaded(filePath)) {
                this._getScript(filePath, callback);
            }
		}
	});
})(jQuery);