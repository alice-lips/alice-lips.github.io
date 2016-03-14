function start_blink() {
  var a = document.getElementsByClassName('navigate-right')[0];
  var b = document.getElementsByClassName('navigate-left')[0];
  if (a !== null && b !== null) {
    var doit = function() {
      if (a.className.indexOf(' enabled') > 0) {
        a.style.opacity = '1.0';
      } else if (b.className.indexOf(' enabled') > 0) {
        b.style.opacity = '1.0';
      }
      setTimeout(function() {
        a.style.opacity = '';
        b.style.opacity = '';
      }, 400);
    }
    setInterval(doit, 3000);
    setTimeout(doit, 700);
  }
}

window.addEventListener('load', start_blink, false);
