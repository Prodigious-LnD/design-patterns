jQuery.clss("models.users", {
    /* Constants */
	/* ======================================================== */
	
	/* Variables */
	/* ======================================================== */
    
    viewModel: { 
        users   :   ko.observableArray(),
        user    :   ko.mapping.fromJS({
            username: '',
            type: 'user'
        })
	},

	/* Private Methods */
	/* ======================================================== */
	_constructor: function() {
		$.models.users.init();
	},
	
	init: function() {
		
	},
	
	/* Private Methods */
	/* ======================================================== */
    _isUser: function(data) {
        var user_exist = false;
        
        $.each(this.viewModel.users(), function() {
            if(this.username == data.username) {
                user_exist = true;
            }
        });
        
        return user_exist;
    },
    
    _resetUser: function() {
        this.viewModel.user.username("");
    },
    
	/* Public Methods */
	/* ======================================================== */
	addUser: function(data) {
        if(!this._isUser(data)) {
            this.viewModel.users.push(data);
            
            this._resetUser();
        }
    },
    
    deleteUser: function(data) {
        this.viewModel.users.remove(function(user) {
            return user.username == data.username;
        });
    },
    
    getUser: function() {
        return ko.mapping.toJS(this.viewModel.user);
    }
    
	/* Events */
	/* ======================================================== */
	
})();