var mySingleton = { 
    property1: "something", 
    property2: "something else", 
    method1: function () { 
       console.log('hello world'); 
    }
}; 

var mySingleton = function () {
    // here are our private methods and variables 
    var privateVariable = 'something private'; 
    
    function showPrivate() { 
        console.log(privateVariable); 
    } 
    
    // public variables and methods (which can access // private variables and methods )
    return { 
        publicVar: 'the public can see this!',
        publicMethod: function () { 
            showPrivate();
        }
    };
};

var single = mySingleton();

single.publicMethod(); // logs 'something private' 
console.log(single.publicVar); // logs 'the public can see this!' 



var Singleton = (function () {
    var instantiated;

    function init() {
        // singleton here 
        return {
            publicMethod: function () {
                console.log('hello world');
            },
            publicProperty: 'test'
        };
    }
    return {
        getInstance: function () {
            if (!instantiated) {
                instantiated = init();
            }
            return instantiated;
        }
    };
})();

// calling public methods is then as easy as: 
Singleton.getInstance().publicMethod(); 


var SingletonTester = (function () { 
    // options: an object containing configuration options for the singleton 
    // e.g var options = { name: 'test', pointX: 5};
    function Singleton(options) { 
        // set options to the options supplied or an empty object if none provided. 
        options = options || {};
        //set the name parameter
        this.name = 'SingletonTester'; 
        //set the value of pointX 
        this.pointX = args.pointX || 6; 
        //set the value of pointY 
        this.pointY = args.pointY || 10; 
    } 

    // this is our instance holder 
    var instance;
    // this is an emulation of static variables and methods 
    var _static = {
        name: 'SingletonTester', 
        // This is a method for getting an instance
        // It returns a singleton instance of a singleton object getInstance: 
        function (options) { 
            if (instance === undefined) { 
                instance = new Singleton(options); 
            } 
            return instance; 
        } 
    }; 
    
    return _static; 
})(); 

var singletonTest = SingletonTester.getInstance({ 
    pointX: 5 
});

console.log(singletonTest.pointX); // outputs 5  