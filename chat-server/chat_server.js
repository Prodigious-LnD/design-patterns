var io = require('socket.io')(7205);

var Chat_Server = function (socket) {
    this.socket = socket;
    this.users = {};
    this.init();
}

Chat_Server.prototype.init = function () {
    this.bindEvents();
}

Chat_Server.prototype.bindEvents = function () {
    var self = this;

    this.socket.on('addUser', function (data, callback) {
        self.socketOnAddUser(data, callback);
    });
    this.socket.on('disconnect', function () {
        self.socketOnDisconnect();
    });
    this.socket.on('message', function (message, callback) {
        self.socketOnMessage(message, callback);
    });
}

Chat_Server.prototype.addUser = function (data, callback) {
    this.socket.username = data.username;
    this.users[data.username] = data;

    if (data.type == 'user') {
        this.socket.broadcast.emit('userConnected', data);
    } else {
        if (Object.keys(this.users).length > 0) {
            this.socket.emit('usersOnLine', this.users);
        }
    }

    callback();
}

Chat_Server.prototype.disconnect = function () {
    if (Object.keys(this.users).length > 0) {
        this.socket.broadcast.emit('userDisconnected', this.users[this.socket.username]);
        delete this.users[this.socket.username];
    }
}

Chat_Server.prototype.message = function (message, callback) {
    this.socket.broadcast.emit('message', {
        username: this.socket.username,
        message: message
    });

    callback();
}

Chat_Server.prototype.socketOnAddUser = function (data, callback) {
    this.addUser(data, callback);
}

Chat_Server.prototype.socketOnDisconnect = function (data) {
    this.disconnect(data);
}

Chat_Server.prototype.socketOnMessage = function (message, callback) {
    this.message(message, callback);
}

io.on('connection', function (socket) {
    new Chat_Server(socket);
});