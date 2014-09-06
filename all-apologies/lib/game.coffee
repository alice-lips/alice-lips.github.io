window.main = (game) ->

  # wait for image loading
  rec = ->
    if window.image_count.loaded * 2 >= window.image_count.total
      main game
    else
      setTimeout rec, 100
  do rec

main = (game) ->

  idx = 0
  idx = if location.search then +(location.search.split '?')[1] else 0

  next = ->
    ++idx
    do page

  page = ->

    I = pages.length
    idx = Math.max idx, 0
    idx = Math.min idx, I - 1

    t = pages[idx]

    if t.image?
      console.log t.image if console?.log
      game.ctx.drawImage t.image, 0, 0, W, H
      game.box.style.display = 'none'
      do next

    else if (do t.trim) is ''
      game.box.style.display = 'none'

    else
      game.box.innerHTML = t
      game.box.style.color = do random_color
      game.box.style.display = 'block'

    idx + 1

  # entry
  game.ctx.clearRect 0, 0, W, H
  do page
  game._element.addEventListener 'click', (e) ->
    x = e.clientX
    y = e.clientY
    document.title = "#{e.clientX}, #{e.clientY}" # TODO remove this line

    do next if y > 35


window.main = main
