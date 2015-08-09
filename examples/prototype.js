function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
}

// Note here that we are using Object.prototype.newMethod rather than 
// Object.prototype so as to avoid redefining the prototype object 

Car.prototype.toString = function () {
    return this.model + " has done " + this.miles + " miles";
};

var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);

console.log(civic.toString()); 


var vehiclePrototype = {
    init: function (carModel) {
        this.model = carModel;
    },
    getModel: function () {
        console.log('The model of this vehicle is..' + this.model);
    }
};

function vehicle(model) {
    function F() {};
    
    F.prototype = vehiclePrototype;
    
    var f = new F();
    
    f.init(model);
    
    return f;
}

var car = vehicle('Ford Escort');
car.getModel(); 



// No need for capitalization as it's not a constructor 
var someCar = {
    drive: function() {},
    name: 'Mazda 3' 
}; 

// Use Object.create to generate a new car 
var anotherCar = Object.create( someCar );
// Now you'll hopefully see that one is a prototype of the other
console.log(anotherCar.name);

//you're also able to initialize object properties using the second supplied argument
var vehicle = {
    getModel: function () {
        console.log('The model of this vehicle is..' + this.model);
    }
};
var car = Object.create(vehicle, {
    'id': {
        value: MY_GLOBAL.nextId(),
        enumerable: true // writable:false, configurable:false by default 
    },
    'model': {
        value: 'Ford',
        enumerable: true
    }
});  