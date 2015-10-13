jQuery.inc("examples.chat");
jQuery.inc("examples.chat_model");
jQuery.inc("vendors.bootstrap.jasny");
jQuery.inc("vendors.socket.io");
jQuery.inc("vendors.tweenmax");

jQuery.clss("views.chat", {
	/* Constants */
	/* ======================================================== */
    SERVER_URL: '192.168.1.3:7205',//'http://10.66.28.246:7205',
    uses: [],
    validateOptions: {
        loginForm: {
            rules: {
                avatar: {
                    required: true,
                    accept: "image/jpeg, image/pjpeg"
                },
                username: "required"
            }
        }
    },
    
	/* Variables */
	/* ======================================================== */
    chat: null,
    
    loginForm: $("#loginForm"),
    loginContainer: $("#login"),
    messages: $("#messages"),
    tweetForm: $("#tweetForm"),
    textaForm: $("#tweetForm textarea"),
    
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
        
        TweenMax.set('#tweets', {y:'+=100%'});
        TweenMax.set('#login', {y:"-=200%"});
            
		this._uses();
        this._validate();
		this._bindData();
		this._bindEvents();
	},

	/* Private Methods */
	/* ======================================================== */
	_bindData: function() {
        ko.applyBindings(this.chat.model.viewModel, this.loginContainer.get(0));
        ko.applyBindings(this.chat.model.viewModel, this.messages.get(0));
	},

	_bindEvents: function() {
        this.loginForm.on('submit', this.loginFormOnSubmit.bind(this));
        this.tweetForm.on('submit', this.tweetFormOnSubmit.bind(this));
        this.textaForm.on('keydown', this.textaFormOnKeyDown.bind(this));
	},

	_uses: function() {
		this.parent._uses(this.uses);
	},
    
    _validate: function() {
        this.loginForm.validate(this.validateOptions['loginForm']);
    },

	/* Public Methods */
	/* ======================================================== */
    addUser: function(data, callback){
        this.chat.addUser(data, callback);
    },
    
    message: function(message) {
        this.chat.send(message, function(){
            console.log("Enviado");
        });
        
        this.chat.model.addMessage({
            username: this.chat.model.getUser().username,
            message: message
        });
    },

	/* Events */
	/* ======================================================== */
    chatOnConnect: function() {
        console.log("view.chat: onConnect!");
        TweenMax.to('#login', 2, {y:"+=150%", ease: Elastic.easeOut.config(1, 0.75)});
    },
    
    chatOnDisconnect: function() {
        console.log("view.chat: onDisconnect!");
    },
    
    loginFormOnSubmit: function(e) {
        e.preventDefault();
        
        if(this.loginForm.valid()) {
            this.addUser(this.chat.model.getUser(), function(){
                TweenMax.to('#login', 2, {y:"-=200%", ease: Elastic.easeInOut.config(1, 0.75)});
                TweenMax.to('#tweets', 1, {y:"-=100%", delay: 2}); 
            });
        }
        
        return false;
    },
    
    tweetFormOnSubmit: function(e) {
        var message = $( e.target ).serializeArray()[0].value;
        
        e.preventDefault();
        
        if(message) { this.message(message); }
        
        e.target.reset();
        
        return false;
    },
    
    textaFormOnKeyDown: function(e) {
        e = e || event;
        if(e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();
            this.tweetForm.submit();
            return false;
        }
    }
})();