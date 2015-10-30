var expect = require('chai').expect;
var parse = require('../src/parse');


describe('happy path,extract name and args from function', function () {
  it('no args', function () {

    function test() {

    }

    var result = parse(test)
    expect(result.name).to.equal("test")
    expect(result.dependencies).to.deep.equal([])
  });

  it('with space', function () {

    function test() {

    }

    var result = parse(test)
    expect(result.name).to.equal("test")
    expect(result.dependencies).to.deep.equal([])
  });

  it('with one args', function () {

    var test = function test123(abc) {

    };
    var result = parse(test)
    expect(result.name).to.equal("test123")
    expect(result.dependencies).to.deep.equal(["abc"])
  });


  it('multipe args', function () {

    var test = function test123(abc, def, ghi) {

    };
    var result = parse(test)
    expect(result.name).to.equal("test123")
    expect(result.dependencies).to.deep.equal(["abc", "def", "ghi"])
  })
});

