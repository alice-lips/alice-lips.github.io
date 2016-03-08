function fail(h) {
  setInterval(function() {
    h.innerHTML = "Alice." + ["lips", "lisp", "fail"][(Math.random()*3) | 0];
  }, 20000);
}
function go() {
  var hs = document.getElementsByTagName('h1');
  var i;
  for ( i = 0; i < hs.length; ++i) {
    if (hs[i].innerHTML == 'Alice.lips') {
      fail(hs[i]);
      break;
    }
  }
}
window.addEventListener('load', go, false);
