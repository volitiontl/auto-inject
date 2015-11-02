var expect = require('chai').expect;
var main = require('../index');


describe('auto-inject main usage', function () {
  it('load function should load all dependencies', function () {
    var dependencies = {};

    var m = {};

    m.a = function a(b) {
      return {
        test: b.a
      }
    };
    m.b = function b(c, d) {
      return {
        a: c.a + d.a
      }
    };
    m.c = function c(d) {
      return {a: 1 + d.a}
    };
    m.d = function d() {
      return {a: 1}
    };

    var temp = main(m, dependencies);
    temp.load("a");

    console.log(temp.run(function (a) {
      return a.test
    }))


  });

  it('run function should execute the function without adding it to the dependency object', function () {
    var m = {};
    m.a = function a() {
      return {a: 1}
    };


    function test(a) {
      console.log(a.a + 20)
      return a.a
    }

    var temp=main(m, {});
      temp.load("a");
      expect(temp.run(test)).to.equal(1)

  })

  it('example in readme',function(){

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
    };
    var result={};

    var someTemp = main(bag, result);
    someTemp.load("c");

    function test(c){
      console.log(c.someApi());
    }
    someTemp.run(test)

  });


  it('auto load from directory',function(){
    var bag={};
    var temp=main(bag,{});
    var path=require('path');
    temp.loadDir(path.resolve("test/deps"));
    var result=temp.load("depc");
    expect(result).to.equal("hello world")
  })

});