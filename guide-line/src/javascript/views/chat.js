jQuery.inc("examples.chat");
jQuery.inc("examples.chat_model");
jQuery.inc("vendors.socket.io");

jQuery.clss("views.chat", {
	/* Constants */
	/* ======================================================== */
	uses: [],
    SERVER_URL: 'http://localhost:7205',
    
	/* Variables */
	/* ======================================================== */
    chat: null,
    
	/* Constructor */
	/* ======================================================== */
	_constructor: function() {
		$.views.chat.init();
	},

	init: function() {
        this.chat = new Chat({
            socket: io(this.SERVER_URL),
            onConnect: this.chatOnConnect.bind(this),
            onDisconnect: this.chatOnDisconnect.bind(this)
        });
            
		this._uses();
		this._bindData();
		this._bindEvents();
	},

	/* Private Methods */
	/* ======================================================== */
	_bindData: function() {
        
	},

	_bindEvents: function() {
	},

	_uses: function() {
		this.parent._uses(this.uses);
	},

	/* Public Methods */
	/* ======================================================== */

	/* Events */
	/* ======================================================== */
    chatOnConnect: function() {
        console.log("view.chat: onConnect!");
    },
    
    chatOnDisconnect: function() {
        console.log("view.chat: onDisconnect!");
    }

})();