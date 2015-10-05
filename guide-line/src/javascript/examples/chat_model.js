Chat.prototype.model = {
    /* Variables */
	/* ======================================================== */
    viewModel: { 
        user_info: ko.mapping.fromJS({
            username: "",
            fullname: "",
            birthday: "",
            email: "",
            avatar: '',
            type: 'user'
        }),
        chat_history: ko.observableArray([]),
		chat_users: ko.observableArray([])
	},
    
	/* Private Methods */
	/* ======================================================== */
	init: function () {
		this.viewModel.loadAvatar = this._loadAvatar.bind(this);
        this.viewModel.getAvatar = this._getAvatar.bind(this);
        this.viewModel.isMe = this._isMe.bind(this);
	},
	
	/* Private Methods */
	/* ======================================================== */
    _loadAvatar: function (file, data) {
        this.viewModel.user_info.avatar(data);
	},
    
    _getAvatar: function (username) {
        var chat_users = this.viewModel.chat_users();
        var avatar = "";
        
        if(username == this.viewModel.user_info.username()) {
            avatar = this.viewModel.user_info.avatar();
        }
        
        $.each(chat_users, function(){
            if(this.username == username) {
                avatar = this.avatar;
            }
        });
        
        return avatar;
	},
    
    _isMe: function(message) {
        if(message.nodeType != 3) {
            var element = $(message);
            var popover = $(".popover", message);
            var username = element.data('user');
            
            console.log(username);
            
            if(username == this.viewModel.user_info.username()) {
                popover.removeClass("right").addClass("left");
            }
        }
    },
	
	/* Public Methods */
	/* ======================================================== */
	addMessage: function(data) {
        this.viewModel.chat_history.push(data);
    },
    
    addUser: function(data) {
        this.viewModel.chat_users.push(data);
    },
    
    deleteUser: function(data) {
        this.viewModel.chat_users.remove(function(user) {
            return user.username == data.username;
        });
    },
    
    getUser: function() {
        return ko.mapping.toJS(this.viewModel.user_info);
    }
	
}