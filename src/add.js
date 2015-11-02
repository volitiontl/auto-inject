var fs = require('fs');

/**
 *  requires every single file in a directory and save the constructor to the object.
 * @param obj
 * @param thePath
 */
function add(obj, thePath) {
  var temp = fs.readdirSync(thePath);
  temp.forEach(function (value) {
    var name = value.slice(0, value.length - 3);
    if (name == "index") return;
    obj[name] = require( thePath + "/" + name)
  })
}

module.exports = add;