var version = "version 0.2.0";
/*
 *     _    _ _            _ _
 *    / \  | (_) ___ ___  | (_)_ __  ___
 *   / _ \ | | |/ __/ _ \ | | | '_ \/ __|
 *  / ___ \| | | (_|  __/_| | | |_) \__ \
 * /_/   \_\_|_|\___\___(_)_|_| .__/|___/
 *                              |_|
 */

/*
 * Entry to jquery-console
 */

var $;
var alice_eval;

function onHandle(line, report) {
  var result;
  var input = $.trim(line);
  try {
    result = alice_eval(input, report);
    return [{msg: result, className: "success"}];
  } catch (e) {
    return [{msg: e, className: "fail"}];
  }
}

var pwd = '/';

var controller;
$(document).ready(function () {
  controller = $("#console").console({
    welcomeMessage: "Alice.lips " + version,
    promptLabel: function () { return pwd + '<span style="color:red">%</span> '; },
    commandValidate: function (input) {
      return input !== '';
    },
    commandHandle: onHandle,
    cols: 20,
    autofocus: true,
    animateScroll: true,
    promptHistory: true
  });
});


/*
 * My own hack
 */

var dirs, files;
var pwd;

var root = {};
(function () {
  var i, path;
  function put(dom, path) {
    if (path.length === 1) {
      dom[path[0]] = { name: path[0], content: false };
    } else {
      if (!dom.hasOwnProperty(path[0])) {
        dom[path[0]] = {};
      }
      put(dom[path[0]], path.slice(1));
    }
  }
  for (i = 0; i < files.length; ++i) {
    path = files[i].split('/');
    put(root, path);
  }
}());

function stat(filename) {
  var i;
  for (i = 0; i < files.length; ++i) {
    if (files[i].name === filename) {
      return files[i];
    }
  }
  throw new Error(filename + ': No such file or directory');
}

function path_norm(pwd, path) {
  if (path[0] === '/') {
    return path;
  }
  if (path.slice(0, 2) === './') {
    path = path.slice(2);
  }
  function not_null_string(str) {
    return str !== '';
  }
  path = pwd.split('/').filter(not_null_string).concat(path.split('/').filter(not_null_string));
  var i;
  var next = [];
  for (i = 0; i < path.length; ++i) {
    if (path[i] === '..') {
      next.pop();
    } else {
      next.push(path[i]);
    }
  }
  return '/' + next.join('/');
}

var utils = {};

utils.cd = function (dest) {
  if (!dest || dest === '') {
    pwd = '/';
    return;
  }
  function dig(dom, path) {
    if (path.length === 0) {
      return dom;
    }
    if (path[0] === '') {
      return dig(dom, path.slice(1));
    }
    if (!dom.hasOwnProperty(path[0])) {
      throw new Error('cd: cannot access ' + dest + ': No such directory');
    }
    return dig(dom[path[0]], path.slice(1));
  }
  var next_pwd = path_norm(pwd, dest);
  dig(root, next_pwd.split('/'));
  pwd = next_pwd;
};

utils.less = function (file) {
  if (file === '') {
    return '';
  }
  /*
  var report = this.report;
  $.ajax({
    url: '.' + path_norm(pwd, file),
    type: 'GET',
    dataType: 'text',
    success: function (content) {
      report(content);
    },
    error: function () {
      report('ls: cannot access ' + file + ': No such file or directory');
    }
  });
  */
  var cat = document.createElement('iframe');
  cat.src = '.' + path_norm(pwd, file);
  cat.style.border = '0';
  cat.style.width = '100%';
  cat.style.height = '60px';
  cat.style.padding = '0';
  cat.style.margin = '0';
  $('.jquery-console-inner').append(cat);
};

utils.type = utils.less;
utils.more = utils.less;
utils.cat = utils.less;
utils.vi = utils.less;
utils.vim = utils.less;

utils.date = function () {
  return (new Date()).toString();
};

utils.ls = utils.dir = function (opt, dest) {
  if (!opt) {
    opt = '';
    dest = '';
  } else if (!dest) {
    dest = opt;
    opt = '';
  }

  function dig(dom, path) {
    if (path.length === 0) {
      return dom;
    }
    if (path[0] === '') {
      return dig(dom, path.slice(1));
    }
    if (!dom.hasOwnProperty(path[0])) {
      throw new Error('no such file or directory');
    }
    return dig(dom[path[0]], path.slice(1));
  }
  var d = dig(root, path_norm(pwd, dest).split('/'));

  var list = [], x;
  if (d.name) {
    return d.name;
  }
  for (x in d) {
    if (d[x].name) {
      if (d[x].name[0] !== '.' || opt === '-a') {
        list.push(d[x].name);
      }
    } else {
      if (x[0] !== '.' || opt === '-a') {
        list.push(x + '/');
      }
    }

  }
  return list.join(' ');
};

utils.pwd = function () {
  return pwd;
};

function alice_eval(input, report) {
  input = input.replace(/ +/g, ' ');
  var argv = input.split(' ');
  if (utils.hasOwnProperty(argv[0])) {
    return utils[argv[0]].apply({report: report}, argv.slice(1));
  }
  throw new Error('command not found: ' + argv[0]);
}


