// going to have to use canvas for black display
// create a main white object that I can move with up and down left and right arrows
// create different shaped white objects that come from all over randomly
// when the random objects colide with the main object you loose screen pops up
// after you loose, screen pops up that says you loose and to click up arrow to restart
// when click up arrow it restarts game
// how do i use constructor
// how do i use keyboarder

class Game {
  constructor () {
    const canvas = document.querySelector('#run')
    const screen = canvas.getContext('2d')
    const gameSize = { x: canvas.width, y: canvas.height }
    this.bodies = []
    this.bodies = this.bodies.concat(createEnemy(this))
    this.bodies = this.bodies.concat(new Player(this, gameSize))
    // this.player = new Player(this, gameSize)
    // this.enemy = new Enemy(this, center)

    const tick = () => {
      this.update()
      this.draw(screen, gameSize)
      requestAnimationFrame(tick)
    }
    tick()
  }

  update () {
    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].update()
    }
  }

  draw (screen, gameSize) {
    screen.clearRect(0, 0, gameSize.x, gameSize.y)
    for (let i = 0; i < this.bodies.length; i++) {
      drawRect(screen, this.bodies[i])
    }
  }

  addBody (body) {
    this.bodies.push(body)
  }
}

class Player {
  constructor (game, gameSize) {
    this.game = game
    this.size = { x: 12, y: 12 }
    this.center = {
      x: gameSize.x / 2,
      y: gameSize.y -
    this.size.y * 2
    }
    this.keyboarder = Keyboarder
  }

  update () {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.center.x -= 2
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += 2
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
      this.center.y -= 2
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
      this.center.y += 2
    }
    console.log('keyboarder')
  }
}

class Enemy {
  constructor (game, center) {
    this.game = game
    this.center = center
    this.size = { x: 20, y: 20 }
    this.patrolX = 0
    this.speedX = 0.1
  }

  update () {
    if (this.patrolX < 0 || this.patrolX > 30) {
      this.speedX = -this.speedX
    }
  }
}

function createEnemy (game) {
  const enemy = []
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * 280
    const y = Math.random() * 280
    enemy.push(new Enemy(game, { x: x, y: y }))
  }
  return enemy
}

function drawRect (screen, body) {
  screen.fillRect(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2,
    body.size.x, body.size.y)
}
window.addEventListener('load', function () {
  new Game()
})
// style rect
