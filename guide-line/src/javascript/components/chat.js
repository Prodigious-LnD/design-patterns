function Chat(options) {
    this.socket = options.socket || null;
    this._connect = options.onConnect || function () {};
    this._disconnect = options.onDisconnect || function () {};

    if (this.socket) {
        this.init();
        this.model.init();
    }
}


Chat.prototype.init = function () {
    this._bindEvents();
}

/* Private Methods */
/* ======================================================== */
Chat.prototype._bindEvents = function () {
    this.socket.on('connect', this.socketOnConnet.bind(this));
    this.socket.on('disconnect', this.socketOnDisconnet.bind(this));
    this.socket.on('message', this.socketOnMessage.bind(this));
    this.socket.on('userConnected', this.socketOnUserConnected.bind(this));
    this.socket.on('userDisconnected', this.socketOnUserDisconnected.bind(this));
}

Chat.prototype._message = function (data) {
    this.model.addMessage(data);
}

Chat.prototype._userConnected = function (data) {
    this.model.addUser(data);
}

Chat.prototype._userDisconnected = function (data) {
    this.model.deleteUser(data);
}

/* Public Methods */
/* ======================================================== */
Chat.prototype.addUser = function (data, callback) {
    this.socket.emit('addUser', data, callback);
}

Chat.prototype.send = function (message, callback) {
    this.socket.emit('message', message, callback);
}

/* Events */
/* ======================================================== */
Chat.prototype.socketOnConnet = function () {
    this._connect();
}

Chat.prototype.socketOnDisconnet = function () {
    this._disconnect();
}

Chat.prototype.socketOnMessage = function (data) {
    this._message(data);
}

Chat.prototype.socketOnUserConnected = function (data) {
    this._userConnected(data);
}

Chat.prototype.socketOnUserDisconnected = function (data) {
    this._userDisconnected(data);
}