var version = "version 0.0.1";

function onValidate(input) {
  return (input != "");
}

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

/*
var keywords = [
  "all-apologies",
  "lifegame",
];

function onComplete(prefix) {
  document.title = ( keywords.filter(function (kw) { return kw.indexOf(prefix) === 0 }) );
  return keywords.filter(function (kw) { return kw.indexOf(prefix) === 0 });
};
*/

function makeLink() {
  var ds = document.getElementsByTagName('div');
  var reg = /@(http[\:\.\/a-zA-Z0-9]*)/
  function link(url){
    console.log(url);
    return "<a href=" + url + ">" + url + "</a>"
  }
  for (var i=0;i<ds.length; ++i) {
    var d = ds[i];
    var rs = d.innerHTML.match(reg);
    if (rs && rs[1]) {
      d.innerHTML = d.innerHTML.replace(rs[0], link(rs[1]));
    }
  }
  setTimeout(makeLink, 500);
}

var controller;
$(document).ready(function() {
  controller = $("#console").console({
    welcomeMessage:'Alice REPL, version ' + version,
    promptLabel: '> ',
    commandValidate: onValidate,
    commandHandle: onHandle,
    autofocus: true,
    animateScroll: true,
    promptHistory: true
  });

  makeLink();
});
