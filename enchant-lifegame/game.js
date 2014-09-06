// Generated by CoffeeScript 1.7.1
(function() {
  var display, field, hidden, main, update;

  field = {};

  display = function(i, j) {
    return field[[i, j]].kuma.width = 32;
  };

  hidden = function(i, j) {
    return field[[i, j]].kuma.width = 0;
  };

  main = function(game) {
    var i, j, kuma, _i, _j;
    for (i = _i = 0; _i < 10; i = ++_i) {
      for (j = _j = 0; _j < 10; j = ++_j) {
        kuma = new Sprite(32, 32);
        kuma.image = game.assets['chara0.png'];
        kuma.x = i * 32;
        kuma.y = j * 32;
        kuma.frame = Math.random() * 100 | 0;
        field[[i, j]] = {
          kuma: kuma,
          live: Math.random() < .2
        };
        if (field[[i, j]].live) {
          display(i, j);
        } else {
          hidden(i, j);
        }
        game.rootScene.addChild(kuma);
      }
    }
    return setInterval(update, 500);
  };

  update = function() {
    var around, field2, find_live, i, j, n, _i, _j, _k, _results;
    field2 = {};
    around = function(i, j) {
      var cx, i2, j2, _i, _j, _ref, _ref1, _ref2, _ref3, _ref4;
      cx = 0;
      for (i2 = _i = _ref = i - 1, _ref1 = i + 1; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; i2 = _ref <= _ref1 ? ++_i : --_i) {
        for (j2 = _j = _ref2 = j - 1, _ref3 = j + 1; _ref2 <= _ref3 ? _j <= _ref3 : _j >= _ref3; j2 = _ref2 <= _ref3 ? ++_j : --_j) {
          if (i === i2 && j === j2) {
            continue;
          }
          if ((_ref4 = field[[i2, j2]]) != null ? _ref4.live : void 0) {
            ++cx;
          }
        }
      }
      return cx;
    };
    find_live = function(i, j) {
      var i2, j2, _i, _j, _ref, _ref1, _ref2, _ref3, _ref4;
      for (i2 = _i = _ref = i - 1, _ref1 = i + 1; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; i2 = _ref <= _ref1 ? ++_i : --_i) {
        for (j2 = _j = _ref2 = j - 1, _ref3 = j + 1; _ref2 <= _ref3 ? _j <= _ref3 : _j >= _ref3; j2 = _ref2 <= _ref3 ? ++_j : --_j) {
          if (i === i2 && j === j2) {
            continue;
          }
          if ((_ref4 = field[[i2, j2]]) != null ? _ref4.live : void 0) {
            return [i2, j2];
          }
        }
      }
      return [i, j];
    };
    for (i = _i = 0; _i < 10; i = ++_i) {
      for (j = _j = 0; _j < 10; j = ++_j) {
        n = around(i, j);
        if (field[[i, j]].live) {
          field2[[i, j]] = n === 2 || n === 3;
        } else {
          field2[[i, j]] = n === 3;
          field[[i, j]].kuma.frame = field[find_live(i, j)].kuma.frame;
        }
      }
    }
    _results = [];
    for (i = _k = 0; _k < 10; i = ++_k) {
      _results.push((function() {
        var _l, _results1;
        _results1 = [];
        for (j = _l = 0; _l < 10; j = ++_l) {
          field[[i, j]].live = field2[[i, j]];
          _results1.push((field[[i, j]].live ? display : hidden)(i, j));
        }
        return _results1;
      })());
    }
    return _results;
  };

  window.main = main;

}).call(this);