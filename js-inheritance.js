/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 * documentation: http://ejohn.org/blog/simple-javascript-inheritance/
 */
/* Updated and maintained by Abu Ali Muhammad Sharjeel
 * 
 */
 
// Inspired by base2 and Prototype
(function () {
    var initializing = false, fnTest = /xyz/.test(function () { xyz; }) ? /\bbase\b/ : /.*/;

    // The base Class implementation (does nothing)
    this.Class = function () { };

    // Create a new Class that inherits from this class
    Class.extend = function (prop) {
        if (typeof prop === "function") {

            return this.extend({ init: prop.prototype.constructor });
        }
        var base = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;
        prototype['overLoads'] = [];

        // Copy the properties over onto the new prototype
        for (var name in prop) {

            
            if (((typeof prop[name] == 'object' && prop[name]))) {
                var funcArray = prop[name].overLoads;
                if (funcArray != undefined) {
                    // Check if we're overwriting an existing function
                    prototype[name] = typeof funcArray[0] == "function" &&
                        typeof base[name] == "function" && fnTest.test(funcArray[0]) ?
                        (function(name, fn) {
                            return function() {
                                var tmp = this.base;

                                // Add a new .base() method that is the same method
                                // but on the super-class
                                this.base = base[name];

                                // The method only need to be bound temporarily, so we
                                // remove it when we're done executing
                                var ret = fn.apply(this, arguments);
                                this.base = tmp;

                                return ret;
                            };
                        })(name, funcArray[0]) :
                        funcArray[0];

                    
                    for (var i = 0; i < funcArray.length; i++)
                        prototype['overLoads'].push([name, funcArray[i]]);

                    continue;
                }
            }
            
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" &&
              typeof base[name] == "function" && fnTest.test(prop[name]) ?
              (function (name, fn) {
                  return function () {
                      var tmp = this.base;

                      // Add a new .base() method that is the same method
                      // but on the super-class
                      this.base = base[name];

                      // The method only need to be bound temporarily, so we
                      // remove it when we're done executing
                      var ret = fn.apply(this, arguments);
                      this.base = tmp;

                      return ret;
                  };
              })(name, prop[name]) :
              prop[name];
        }

        function addOverloadMethod(object, nam, fn) {
            var old = object[nam];
            object[nam] = function () {
                if (fn.length == arguments.length)
                    return fn.apply(this, arguments);
                else if (typeof old == 'function')
                    return old.apply(this, arguments);
            };
            return undefined;
        };

        // The dummy class constructor
        function Class() {
            // All construction is actually done in the init method
            if (!initializing && this.init)
                this.init.apply(this, arguments);

            if (this.overLoads.length > 0) {
                for (var i = 0; i < this.overLoads.length; i++)
                    addOverloadMethod(this, this.overLoads[i][0], this.overLoads[i][1]);
            }
                
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;


        return Class;
    };
})();