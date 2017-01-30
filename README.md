# JSInheritance
Enhanced version of John Rasig Class type explained in [Simple JavaScript Inheritance](http://ejohn.org/blog/simple-javascript-inheritance/) article.
### What's New?
- Class.extend function also accept `function` as parameter
- function overloading support is added
- In function overriding `this._super` is renamed with `this.base`

*** Internal variables are only supported while extending Class with function ***

## Using js-inheritance
Create a Human type using Class.extend
```Javascript
var Human = Class.extend({
    drink: function(drink){
    	console.log("Drinking " + drink);
    }
    eat: function(food){
        console.log("Eating " + food);
    }
});

//Using Human type
var h = new Human();
h.eat("Burger");
h.drink("Water");
```

Create a Person type with constructor, using Class.extend (here `init` function will become the constructor of Person type)
```Javascript
var Person = Class.extend({
    init: function(name, isDancing){
        this.name = name;
        this.dancing = isDancing;
    },
    dance: function(){
        console.log(this.name + " can dance: "+  this.dancing);
    }
});

//Using Person type
var p = new Person("Jameel", true);
p.dance();
```
Inherit Person type in Ninja and overrides constructor and `dance` function
```Javascript
// Extending Person type and also overriding constructor
var Ninja = Person.extend({
    init: function(){
        this.base("Ninja",  true );
    },
    dance: function(){
    // Call the inherited version of dance()
        return this.base();
    },
    swingSword: function(){
        console.log(this.name + " can swing sword: true");
    }
});

//Using Ninja type
var n = new Ninja();
n.dance();
n.swingSword();
```
Inherit Person type and overloads functions
```Javascript
var Worker = Person.extend({
    init: function(){
        this.base("Worker", false);
    },
    drive : {
        overLoads: [
            function () {
                this.drive(this.name + " drive personal vehicle");
            },
            function (message) {
                console.log(message);
            }]
    }
});

// Using Worker type
w = new Worker();
w.dance();
w.drive();
w.drive("Drive any vehicle");
```
Inherit Person type and create a new type using function instead of object, declaring internal variables and writing overload functions
```Javascript
// While extending a type with function, the construtor of the new type will automatically assign the function constructor to init function in the definition of new type
var Officer = Person.extend(function(name, designation, department){
    this.base(name, false);
    this.designation = designation;

    // declareing an internal variable for deparment
    var dept = department;

	// exposing the internal dept variable
    this.getDepartment = function(){
        console.log(this.name + " works in " + dept + " department");
    }

	// Creating overload functions
	this.drive = {
        overLoads: [
            function () {
                this.drive(this.name + " drive personal vehicle");
            },
            function (message) {
                console.log(message);
            }
        ]
    };
});
// Using Officer type
var o = new Officer("Ahmed", "Manager", "Finance");
o.dance();
o.getDepartment();
o.drive();
o.drive("Drive office vehicle");
```
