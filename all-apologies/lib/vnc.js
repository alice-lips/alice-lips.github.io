// Generated by CoffeeScript 1.7.1

/*
 * define Colos
 */

(function() {
  var cache, draw_load, load_img, main, makeDOM, random_color;

  random_color = function() {
    var list;
    list = ['#702020', 'black', '#007070', 'blue', 'green'];
    return list[list.length * Math.random() | 0];
  };

  draw_load = function(ctx, p) {
    var height, label, metrix, padding, width;
    width = 140;
    height = 10;
    padding = 2;
    label = 'loading';
    metrix = ctx.measureText(label);
    ctx.fillText(label, W / 2 - metrix.width / 2, H / 2 - 10);
    ctx.beginPath();
    ctx.rect(W / 2 - width / 2, H / 2 - height / 2, width, height);
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(W / 2 - width / 2 + padding, H / 2 - height / 2 + padding, (width - padding * 2) * p, height - padding * 2);
    return ctx.fill();
  };

  makeDOM = function(W, H) {
    var game;
    game = {};
    game._element = document.getElementById('stage');
    game._element.style.width = W + 'px';
    game._element.style.height = H + 'px';
    game.canvas = document.createElement('canvas');
    game.canvas.innerHTML = 'canvas element require more modern browser (Chrome, Firefox)';
    game.ctx = game.canvas.getContext('2d');
    game.canvas.width = W;
    game.canvas.height = H;
    draw_load(game.ctx, 0);
    game.box = document.createElement('div');
    game.box.className = 'box';
    game.box.style.width = (W - 10) + 'px';
    game.box.style.minWidth = (W - 10) + 'px';
    game.box.style.maxWidth = (W - 10) + 'px';
    game._element.appendChild(game.canvas);
    game._element.appendChild(game.box);
    game.nextButton = document.createElement('code');
    game.nextButton.innerHTML = '↲';
    game.nextButton.style.position = 'absolute';
    game.nextButton.style.right = '10px';
    game.nextButton.style.bottom = '3px';

    /*
    game.nextButtonTime = 0
    setInterval ->
      game.nextButtonTime++
      game.nextButton.style.bottom = "#{3 + 3 * Math.sin game.nextButtonTime / 30}px"
    , 20
     */
    game._element.appendChild(game.nextButton);
    game.loadButton = document.createElement('code');
    game.loadButton.innerHTML = '[ LOAD ]';
    game.loadButton.style.position = 'absolute';
    game.loadButton.style.right = '1px';
    game.loadButton.style.top = '1px';
    game.loadButton.style.height = '60px';
    game.saveButton = document.createElement('code');
    game.saveButton.innerHTML = '[ SAVE ]';
    game.saveButton.style.position = 'absolute';
    game.saveButton.style.right = '62px';
    game.saveButton.style.top = '1px';
    game.saveButton.style.height = '60px';
    game._element.appendChild(game.loadButton);
    game._element.appendChild(game.saveButton);
    return game;
  };


  /*
   * load images
   */

  cache = [];

  load_img = function(ctx, imgs, cont) {
    var N, cx, i, img, rec, _i, _len;
    N = imgs.length;
    cx = 0;
    for (_i = 0, _len = imgs.length; _i < _len; _i++) {
      img = imgs[_i];
      i = new Image;
      i.onload = function() {
        return ++cx;
      };
      i.src = img;
      cache[img] = i;
    }
    rec = function() {
      if (N === cx) {
        return cont();
      } else {
        draw_load(ctx, cx / N);
        return setTimeout(rec, 50);
      }
    };
    return rec();
  };


  /*
   * main って名前ダサいけど
   * ページ送るとかそういうメイン
   */

  main = function(game, pages) {
    var I, idx, next, page;
    I = pages.length;
    idx = location.search ? +(location.search.split('?'))[1] : 0;
    next = function() {
      ++idx;
      return page();
    };
    page = function() {
      var p;
      idx = Math.max(idx, 0);
      idx = Math.min(idx, I - 1);
      p = pages[idx];
      if (p.text != null) {
        game.box.innerHTML = p.text;
        game.box.style.color = random_color();
        game.box.style.display = 'block';
      }
      if (p.bg != null) {
        return game.ctx.drawImage(cache[p.bg], 0, 0, W, H);
      }
    };
    page();
    return game._element.addEventListener('click', function(e) {
      var x, y;
      x = e.clientX;
      y = e.clientY;
      if ((typeof console !== "undefined" && console !== null ? console.log : void 0) != null) {
        console.log("" + e.clientX + ", " + e.clientY);
      }
      if (y > 35) {
        return next();
      }
    });
  };

  window.newGame = function(W, H, images, musics, pages) {
    var game;
    game = makeDOM(W, H);
    return load_img(game.ctx, images, function() {
      game.ctx.clearRect(0, 0, W, H);
      return main(game, pages);
    });
  };

}).call(this);