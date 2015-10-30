#####Simple auto dependency injection.

Create a bag of functions.

    var bag={};
    bag.a=function a(){
        return "hello "
    };
    bag.b=function b(){
        return "world"
    };
    bag.c=function c(a,b){
        return {
            someApi:function(){
                return a+b
            }
        }
    }
    

Create a bag of results.

    var result={};
    
Call auto-inject
    
    var someTemp=autoInject(bag,result).load("c");
    // functions a,b,c has all been called and stored in result
        
Calling run doesn't store anything to results.

    function test(c){
        console.log(c.someApi());
    }
    someTemp.run(test)


Don't minify code for now, it relies on toString to parse the names and args.
Don't use it in production unless you really want to.
Minified version, Bower support coming soon.