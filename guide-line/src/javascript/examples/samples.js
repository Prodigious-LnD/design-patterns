function Samples(){}

Samples.prototype.session1 = {
    getElements: function(cls) {
        //Init
        var elements, results = [], curClass;  

        //Get all children of the scope node
        elements = document.getElementsByTagName('*');
        
        for( var i=0; i < elements.length; i++ ){
            curClass = elements[i].getAttribute('class');
            if(curClass != null){
                curClass = curClass.split(" ");
                for( var j=0; j < curClass.length; j++){
                    if(curClass[j] === cls){
                        results.push( elements[i] );
                        break;
                    }
                }
            }
        }

        return results;
    },
    
    querySelectorAll: function(cls) {
        return document.querySelectorAll(cls);
    },
    
    getElementsByClassName: function(cls) {
        return document.getElementsByClassName(cls);
    }
}

Samples.prototype.session2 = {
    basic: function() {
        function Car(model, year, miles) { 
            this.model = model; 
            this.year = year; this.miles = miles; 
            this.toString = function () {
                return this.model + " has done " + this.miles + " miles"; 
            };
        },

        var civic = new Car("Honda Civic", 2009, 20000); 
        var mondeo = new Car("Ford Mondeo", 2010, 5000); 

        console.log(civic.toString());
        console.log(mondeo.toString());
    },
    
    prototype: function() {
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
    }
}