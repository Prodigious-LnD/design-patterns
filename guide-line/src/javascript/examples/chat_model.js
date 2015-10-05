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
		this.viewModel.getAvatar = this._getAvatar.bind(this);
        this.viewModel.loadAvatar = this._loadAvatar.bind(this);
	},
	
	/* Private Methods */
	/* ======================================================== */
    _loadAvatar: function (file, data) {
        this.viewModel.user_info.avatar(data);
	},
    
    _getAvatar: function (username) {
        var chat_users = this.viewModel.chat_users();
        var avatar = "";
        
        $.each(chat_users, function(){
            if(this.username == username) {
                avatar = this.avatar;
            }
        });
        
        return avatar;
	},
	
	/* Public Methods */
	/* ======================================================== */
	addMessage: function(data) {
        this.viewModel.chat_history.unshift(data);
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