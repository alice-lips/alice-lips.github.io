# newGame makes DOM
window.newGame = (W, H, cont) ->

  game = {}

  game._element = document.getElementById 'stage'

  game._element.style.width  = W + 'px'
  game._element.style.height = H + 'px'

  # canvas
  game.canvas = document.createElement 'canvas'
  game.canvas.innerHTML = 'canvas element require more modern browser (Chrome, Firefox)'
  game.ctx = game.canvas.getContext '2d'
  game.canvas.width = W
  game.canvas.height= H

  # draw the `loading`
  game.ctx.fillText 'loading', 300, 200
  game.ctx.beginPath()
  game.ctx.rect 250, 210, 140, 10
  game.ctx.stroke()
  game.ctx.beginPath()
  game.ctx.rect 252, 212, 40, 6
  game.ctx.fill()

  # text box
  game.box = document.createElement 'div'
  game.box.className = 'box'
  game.box.style.width = (W - 10) + 'px'
  game.box.style.minWidth = (W - 10) + 'px' # fuck the css
  game.box.style.maxWidth = (W - 10) + 'px'

  game._element.appendChild game.canvas
  game._element.appendChild game.box

  # next button
  game.nextButton = document.createElement 'code'
  game.nextButton.innerHTML = '↲'
  game.nextButton.style.position = 'absolute'
  game.nextButton.style.right = '10px'
  game.nextButton.style.bottom = '3px'
  ###
  game.nextButtonTime = 0
  setInterval ->
    game.nextButtonTime++
    game.nextButton.style.bottom = "#{3 + 3 * Math.sin game.nextButtonTime / 30}px"
  , 20
  ###
  game._element.appendChild game.nextButton


  # load and save
  game.loadButton = document.createElement 'code'
  game.loadButton.innerHTML = '[ LOAD ]'
  game.loadButton.style.position = 'absolute'
  game.loadButton.style.right = '0px'
  game.loadButton.style.top = '0px'
  game.loadButton.style.height = '60px'

  game.saveButton = document.createElement 'code'
  game.saveButton.innerHTML = '[ SAVE ]'
  game.saveButton.style.position = 'absolute'
  game.saveButton.style.right = '60px'
  game.saveButton.style.top = '0px'
  game.saveButton.style.height = '60px'

  game._element.appendChild game.loadButton
  game._element.appendChild game.saveButton

  cont game
