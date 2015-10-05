function Chat(options) {
    this.socket = options.socket || null;
    this._connect = options.onConnect || function(){};
    this._disconnect = options.onDisconnect || function(){};
    
    if(this.socket) {
        this.init();
    }
}

Chat.prototype = {
    init: function() {
        this._bindEvents();
	},
    
    /* Private Methods */
	/* ======================================================== */
	_bindEvents: function() {
        this.socket.on('connect', this.socketOnConnet.bind(this));
        this.socket.on('disconnect', this.socketOnDisconnet.bind(this));
        this.socket.on('message', this.socketOnMessage.bind(this));
        this.socket.on('userConnected', this.socketOnUserConnected.bind(this));
        this.socket.on('userDisconnected', this.socketOnUserDisconnected.bind(this));
	},
    
    _message: function(data) {
        this.model.addMessage(data);
    },
    
    _userConnected: function(data) {
        this.model.addUser(data);
    },
    
    _userDisconnected: function(data) {
        this.model.deleteUser(data);
    },

	/* Public Methods */
	/* ======================================================== */
    addUser: function(data, callback) {
        this.socket.emit('addUser', data, callback);
    },
    
    send: function(message, callback) { 
        this.socket.emit('message', message, callback);
    },
    
	/* Events */
	/* ======================================================== */
    socketOnConnet: function() {
        this._connect();
    },
    
    socketOnDisconnet: function() {
        this._disconnect();
    },
    
    socketOnMessage: function(data) {
        this._message(data);
    },
    
    socketOnUserConnected: function(data) {
        this._userConnected(data);
    },
    
    socketOnUserDisconnected: function(data) {
        this._userDisconnected(data);
    },
}