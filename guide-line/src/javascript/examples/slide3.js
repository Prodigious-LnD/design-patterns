function Samples(){}

Samples.prototype.section1 = {
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