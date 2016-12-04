function showResult(text){

    $('#results').append("<div>" + text + "</div>");
    console.log(text);
}

var Person = Class.extend({
    init: function(name, isDancing){
        this.name = name;
        this.dancing = isDancing;
    },
    dance: function(){
        showResult(this.name + " can dance: "+  this.dancing);
    }
});

var Ninja = Person.extend({
    init: function(){
        this.base("Ninja",  false );
    },
    dance: function(){
    // Call the inherited version of dance()
        return this.base();
    },
    swingSword: function(){
        showResult(this.name + " can swing sword: true");
    }
});

var Officer = Person.extend(function(name, designation, department){
    this.base(name, false);

    this.designation = designation;
    var dept = department;

    this.getDepartment = function(){
        showResult(this.name + " works in " + dept + " department");
    }

    this.drive = {
        overLoads: [
            function () {
                this.drive(this.name + " drive personal vehicle");
            },
            function (message) {
                showResult(message);
            }]
    };

});

var Worker = Person.extend({
    init: function(){
        this.base("Worker", false);
    },
    drive : {
        overLoads: [
            function () {
                showResult(this.name + " drive personal vehicle");
            },
            function (message) {
                showResult(message);
            }]
    }
});

$(function(){ 
    var p = new Person("Jameel", true);
    p.dance(); // => true

    var n = new Ninja();
    n.dance(); // => false
    n.swingSword(); // => true

    var o = new Officer("Ahmed", "Manager", "Finance");
    o.dance(); // => false
    o.getDepartment(); // => Finance
    //o.drive(); // => "Personal vehicle"
    //o.drive("Drive office vehicle"); // => "Office car

    w = new Worker();
    w.dance(); // => false
    w.drvie();

});
