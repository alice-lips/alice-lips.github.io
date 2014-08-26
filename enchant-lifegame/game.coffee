field = {}

display = (i, j) ->
  field[[i,j]].kuma.width = 32

hidden = (i, j) ->
  field[[i,j]].kuma.width = 0

main = (game) ->

  for i in [0 ... 10]
    for j in [0 ... 10]
      kuma = new Sprite 32, 32
      kuma.image = game.assets['chara0.png']
      kuma.x = i * 32
      kuma.y = j * 32
      kuma.frame = Math.random() * 100 | 0
      field[[i,j]] =
        kuma: kuma
        live: Math.random() < .2
      if field[[i,j]].live
        display i, j
      else
        hidden i, j
      game.rootScene.addChild kuma

  setInterval update, 500

update = ->
  field2 = {}
  around = (i, j) ->
    cx = 0
    for i2 in [i-1 .. i+1]
      for j2 in [j-1 .. j+1]
        continue if i is i2 and j is j2
        ++cx if field[[i2, j2]]?.live
    cx

  find_live = (i, j) ->
    for i2 in [i-1 .. i+1]
      for j2 in [j-1 .. j+1]
        continue if i is i2 and j is j2
        return [i2, j2] if field[[i2, j2]]?.live
    [i, j]


  for i in [0 ... 10]
    for j in [0 ... 10]
      n = around i, j
      if field[[i,j]].live
        field2[[i,j]] = n is 2 or n is 3
      else
        field2[[i,j]] = n is 3
        field[[i,j]].kuma.frame = field[find_live i, j].kuma.frame

  # deep copy
  for i in [0 ... 10]
    for j in [0 ... 10]
      field[[i,j]].live = field2[[i,j]]
      (if field[[i,j]].live then display else hidden) i, j

# export
window.main = main
