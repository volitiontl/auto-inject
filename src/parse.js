//finite state machine for parsing the arguments and name.
//regex didn't really work out too well.
function parse(letter) {
  if (this.state == "capture args" && letter == ")") {
    this.state = "done";
    return false
  }
  if (this.state == "capture args" && letter !== ")") {
    this.args += letter
  }
  if (this.state == "capture name" && letter == "(") {
    this.state = "capture args"
  }
  if (this.state == "capture name" && letter !== "(") {
    this.name += letter;
  }
  if (letter == " " && this.state == "begin") {
    this.state = "capture name"
  }
  return true;
}

function parser(func) {
  var temp = func.toString();

  var state = {
    state: "begin",
    name: "",
    args: ""
  };

  for (var i = 0; i < temp.length; i++) {
    var letter = temp[i]
    if (parse.call(state, letter) == false) break;
  }

  var args = [];

  state.args.split(",")
    .forEach(function (v) {
      var tempArg = v.trim();
      if (tempArg.length > 0) {
        args.push(tempArg)
      }
    });

  return {
    name: state.name,
    dependencies: args
  }
}

module.exports = parser;