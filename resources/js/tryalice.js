var version = "version 0.1.0";

/*
 *     _    _ _            _ _
 *    / \  | (_) ___ ___  | (_)_ __  ___
 *   / _ \ | | |/ __/ _ \ | | | '_ \/ __|
 *  / ___ \| | | (_|  __/_| | | |_) \__ \
 * /_/   \_\_|_|\___\___(_)_|_| .__/|___/
 *                              |_|
 */

function onHandle(line, report) {
  var result;
  var input = $.trim(line);
  try {
    result = alice_eval(input);
    return [{msg: result, className: "success"}];
  } catch(e) {
    return [{msg: e, className: "fail"}];
  }
}

var controller;
$(document).ready(function() {
  controller = $("#console").console({
    welcomeMessage: "Alice.lips " + version,
    promptLabel: '% ',
    commandValidate: function (input) {
      return input !== ''
    },
    commandHandle: onHandle,
    cols: 20,
    autofocus: true,
    animateScroll: true,
    promptHistory: true
  });

});
