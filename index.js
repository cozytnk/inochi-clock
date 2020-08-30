

class Cell {
  constructor (params={
    id: null,
    x: null, y: null,
    hasEye: true,
  }) {
    this.id = params.id
    this.hasEye = params.hasEye
    this.cell = {
      x: params.x, y: params.y,
      rx: params.rx, ry: params.ry,
    }
    this.eye = {
      rx: null, ry: null,
      x: null, y: null,
      r: 10, theta: 90,
      rate: 0.5, margin: 0
    }
    this.pupil = {
      rx: null, ry: null,
      x: null, y: null,
      r: 8, theta: 90,
      rate: 0.5,
      oneRoundTime: '',
    }
  }
  tick () {
    this.eye.rx = this.cell.rx * this.eye.rate
    this.eye.ry = this.cell.ry * this.eye.rate
    this.eye.x = (this.eye.r) * cos(this.eye.theta)
    this.eye.y = this.eye.r * sin(this.eye.theta)

    // this.pupil.theta = 2 * PI / 60 * second()
    let phy
    switch (this.pupil.oneRoundTime) {
      case 'second':
        phy = 2 * PI / 1000 * millis()
        break
      case 'minute':
        phy = 2 * PI / 60 * second()
        break
      case 'hour':
        phy = 2 * PI / 60 * minute()
        break
      default:
        phy = 0
        break
    }
    this.pupil.rx = min(this.eye.rx * this.pupil.rate, this.eye.ry * this.pupil.rate)
    this.pupil.ry = this.pupil.rx
    this.pupil.x = this.pupil.r * cos(this.pupil.theta + phy)
    this.pupil.y = this.pupil.r * sin(this.pupil.theta + phy)
  }
  draw () {
    this.tick()
    push()
    // strokeWeight(0)
    noStroke()
    // stroke(51)

    fill(210, 0, 0)
    ellipse(this.cell.x, this.cell.y, this.cell.rx, this.cell.ry)

    if (this.hasEye) {

      translate(this.cell.x, this.cell.y)
      fill(255)
      ellipse(this.eye.x, this.eye.y, this.eye.rx, this.eye.ry)

      translate(this.eye.x, this.eye.y)
      fill(40, 90, 205)
      ellipse(this.pupil.x, this.pupil.y, this.pupil.rx, this.pupil.ry)
    }
    pop()

    if (0) {
      // DEBUG:
      textSize(12)
      textAlign(CENTER)
      fill(0, 0, 0)
      text(`${this.id}`, this.cell.x, this.cell.y)
    }
  }
}

// let c = new Cell()
let cells = [
  new Cell({ id:  0, x: -15, y: -120, rx: 55, ry: 55 }),
  new Cell({ id:  1, x: -50, y:  -95, rx: 50, ry: 50 }),
  new Cell({ id:  2, x: -55, y:  -50, rx: 50, ry: 50 }),
  new Cell({ id:  3, x: -87, y:  -65, rx: 60, ry: 60, hasEye: true }),
  new Cell({ id:  4, x: -80, y:   -5, rx: 70, ry: 70, hasEye: true }),
  new Cell({ id:  5, x: -55, y:   40, rx: 40, ry: 65 }),
  new Cell({ id:  6, x: -30, y:   75, rx: 50, ry: 50 }),
  new Cell({ id:  7, x:  15, y:   80, rx: 70, ry: 70, hasEye: true }),
  new Cell({ id:  8, x:  65, y:   40, rx: 85, ry: 75, hasEye: true }),
  new Cell({ id:  9, x:  70, y:  -20, rx: 55, ry: 65 }),
  new Cell({ id: 10, x:  70, y:  -65, rx: 90, ry: 45 }),
  new Cell({ id: 11, x:  45, y: -115, rx: 80, ry: 80, hasEye: true }),
]

function setup() {
  // createCanvas(240, 480)
  createCanvas(320, 480)
  frameRate(10)

  cells[ 3].eye.theta   = -160 * PI / 180
  cells[ 3].pupil.theta = cells[ 3].eye.theta
  // cells[ 3].pupil.oneRoundTime = 'hour'
  cells[ 3].pupil.oneRoundTime = 'minute'
  cells[ 4].eye.theta   =   40 * PI / 180
  cells[ 4].pupil.theta = -100 * PI / 180
  cells[ 4].eye.rate    = 0.45
  cells[ 4].pupil.rate  = 0.5
  cells[ 4].pupil.oneRoundTime = 'minute'
  cells[ 7].eye.theta   =  100 * PI / 180
  cells[ 7].pupil.theta =   90 * PI / 180
  cells[ 7].eye.rate    = 0.35
  cells[ 7].pupil.rate  = 0.45
  // cells[ 7].pupil.oneRoundTime = 'second'
  cells[ 7].pupil.oneRoundTime = 'minute'
  cells[ 8].eye.theta   =    0 * PI / 180
  cells[ 8].pupil.theta =  -10 * PI / 180
  cells[ 8].pupil.oneRoundTime = 'minute'
  cells[11].eye.theta   =  -60 * PI / 180
  cells[11].pupil.theta = cells[11].eye.theta
  cells[11].eye.rate    = 0.43
  // cells[11].pupil.oneRoundTime = 'hour'
  cells[11].pupil.oneRoundTime = 'minute'
}

function draw() {
  background(245)
  translate(width/2, height/2)

  // c.draw()
  // cells.forEach(c => c.draw())
  // [0,1,2,5,6,9,10].forEach(i => cells[i].draw())
  _ = [0,1,2,5,6,9,10].forEach(i => cells[i].draw())
  _ = [3,4,7,8,11].forEach(i => cells[i].draw())

  textSize(30)
  textAlign(CENTER)
  // fill('#fff')
  fill('#bbb')
  // fill(40, 90, 205)
  stroke('#bbb')
  // stroke(40, 90, 205)
  strokeWeight(0)
  stroke
  let padi02 = (i) => str(i).padStart(2, '0')
  text(`${padi02(hour())}:${padi02(minute())}:${padi02(second())}`, 0, -20)

  textSize(20)
  text('いのちの輝き時計', 0, 170)
}


function keyPressed() {
  // if (key == 's'){
  //   saveCanvas(`img${str(second()).padStart(2, '0')}`, 'png')
  //   //gd.timestamp()
  // }
}