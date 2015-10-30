var extract = require('./src/parse');

/**
 * Run the function with arguments pullled from the dependency object.
 */
function run(depObj, func, args) {
  var tempArgs = [];
  args.forEach(function (name) {
    tempArgs.push(depObj[name])
  });
  return func.apply(null, tempArgs)
}

/**
 * Insert the function's result into the dependency object
 */
function insert(depObj, func, name, args) {
  var temp = run(depObj, func, args)
  depObj[name] = temp;
  return temp;
}

/**
 * Queue up the dependency name
 */
function queueUP(dep, queue, name) {
  if (dep.hasOwnProperty(name))return;
  queue.push(name);
}

/**
 * Return true if the function has all dependencies
 */
function allDepsLoaded(dependencyObj, args) {
  for (var i = 0; i < args.length; i++) {
    if (!(dependencyObj.hasOwnProperty(args[i])))return false
  }
  return true;
}


function loadDependencies(obj, theName, depObj, queue) {
  var func = obj[theName]
  var name = extract(func).name;
  var deps = extract(func).dependencies;

  if (deps.length == 0) {
    if (depObj.hasOwnProperty(name) == false) {
      insert(depObj, func, name, deps)
    }
  }
  if (allDepsLoaded(depObj, deps)) {
    if (depObj.hasOwnProperty(name) == false) {
      insert(depObj, func, name, deps)
    }
  }
  else {
    queueUP(depObj, queue, name)
  }

  deps.forEach(queueUP.bind(null, depObj, queue))
  if (queue.length > 0) {
    var temp = queue.pop()
    loadDependencies(obj, temp, depObj, queue)
  }
}

function runFunc(func, depObj) {
  var deps = extract(func).dependencies;
  if (allDepsLoaded(depObj, deps)) {
    return run(depObj, func, deps)
  }
  throw new Error("Make sure you load your dependencies before running!")
}


module.exports = function (_obj, _depObj) {
  var obj = _obj;
  var depObj = _depObj;
  var tempObj = {
    load: function (name) {
      var queue = [];
      loadDependencies(obj, name, depObj, queue)
      return tempObj
    },
    run: function (func) {
      return runFunc(func, depObj)
    }
  };
  return tempObj
};