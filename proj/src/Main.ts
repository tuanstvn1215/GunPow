import Matter, { Pair, Runner } from 'matter-js'
import { WinStart } from './winStart'
const Engine = Matter.Engine
const Render = Matter.Render
const World = Matter.World
const Body = Matter.Body
const Bodies = Matter.Bodies
const Mouse = Matter.Mouse
const Events = Matter.Events
const Query = Matter.Query
const Bounds = Matter.Bounds
const MouseConstraint = Matter.MouseConstraint
export class Main extends PIXI.Application {
  private bullet = null
  private angle = 60
  private designWidth = 1000
  private designHeight = 600
  private engine = Engine.create()
  private contentlayer: fgui.GComponent
  private mainIns: fgui.GComponent
  private physicObj = []
  private launchSpeed = 0.15
  private launchSpeedMultiply = 0
  private slingshotPos = { x: 100, y: 500 }
  private bulletImg: fgui.GImage
  private isDrawBulletPath = false
  private slingshot: fgui.GImage
  private processBar: fgui.GImage
  private pointerCurrentPos: { x: number; y: number }
  private pointerDownPos: { x: number; y: number }
  private pointerUpPos: { x: number; y: number }
  private deadMonsterImage: PIXI.Texture

  public constructor() {
    super({
      view: document.querySelector(
        '#canvasContainer canvas',
      ) as HTMLCanvasElement,
      backgroundColor: 0xb5b5b5,
      antialias: true,
      resolution: 1,
    })
    // this.force = { x: 0, y: 0 }
    this.contentlayer = new fgui.GComponent()
    fgui.GRoot.inst.addChild(this.contentlayer)
    this.stage.interactive = true
    this.stage.on('pointermove', e => {
      this.pointerCurrentPos = e.data.global
    })
    fgui.GRoot.inst.attachTo(this, {
      designWidth: this.designWidth,
      designHeight: this.designHeight,
      scaleMode: fgui.StageScaleMode.FIXED_HEIGHT,
      orientation: fgui.StageOrientation.LANDSCAPE,
      alignV: fgui.StageAlign.TOP,
      alignH: fgui.StageAlign.LEFT,
    })
    fgui.UIConfig.defaultFont = 'Roboto'
    this.load()
    requestAnimationFrame(this.gameLoop.bind(this))
  }
  private updateUIObjFromMatter(object) {
    if (object?.image && object.obj?.position) {
      object.image.x = object.obj?.position.x
      object.image.y = object.obj?.position.y
      object.image.rotation = (object.obj.angle / Math.PI) * 180
    }
  }

  private gameLoop(time): void {
    requestAnimationFrame(this.gameLoop.bind(this))

    this.updateUIObjFromMatter(this.bullet)
    this.monsters.forEach(element => {
      this.updateUIObjFromMatter(element)
      if (this.bullet?.obj && element.obj)
      if (Matter.Collision.collides(this.bullet.obj, element.obj, null))
      World.remove(this.engine.world, element.obj)
      this.stage.removeChild
    })
  }
  // private calculateBulletPath(
  //   pos: { x: number; y: number },
  //   engine: Matter.Engine,
  // ) {
  //   engine.
  // }
  private bulletLine: PIXI.Graphics
  private drawBulletPath(path: Array<{ x: number; y: number }>) {
    this.stage.removeChild(this.bulletLine)
    this.bulletLine = new PIXI.Graphics()
    this.bulletLine.clear()
    this.bulletLine.lineStyle(3, 0xffffff, 1)
    this.bulletLine.moveTo(path[0].x, path[0].y)

    for (let i = 0; i < path.length; i += 1) {
      this.bulletLine.lineTo(path[i].x, path[i].y)
    }

    this.stage.addChild(this.bulletLine)
  }
  private load() {
    let loader = new fgui.utils.AssetLoader()
    loader
      .add('Package1', 'images/Package1.jpg', {
        loadType: PIXI.LoaderResource.LOAD_TYPE.XHR,
        xhrType: PIXI.LoaderResource.XHR_RESPONSE_TYPE.BUFFER,
      })
      .add('Package1@atlas0', 'images/Package1@atlas0.png')
      .add('Package1@atlas0_1', 'images/Package1@atlas0_1.png')
      .add('Package1@atlas0_2', 'images/Package1@atlas0_2.png')
    // loader.onProgress.add(this.loadProgress, this)
    loader.onComplete.add(this.resLoaded, this)
    loader.load()

    Engine.run(this.engine)
  }
  private resLoaded(loader: PIXI.Loader): void {
    console.log()

    loader.destroy()
    fgui.UIPackage.addPackage('Package1')
    let ins = fgui.UIPackage.createObject(
      'Package1',
      'Component1',
    ) as fgui.GComponent
    console.log(fgui.GLoader)
    this.mainIns = ins
    this.contentlayer.addChild(ins)
    let n8 = ins.getChild('n8')
    this.bulletImg = this.mainIns.getChild('n3') as fgui.GImage
    let monster1 = this.mainIns.getChild('n13') as fgui.GImage
    let monster2 = this.mainIns.getChild('n14') as fgui.GImage
    let monster3 = this.mainIns.getChild('n20') as fgui.GImage
    this.deadMonsterImage = monster3.texture
    this.createBullet(this.slingshotPos.x, this.slingshotPos.y, this.bulletImg)
    this.createMonster(monster1)
    this.createMonster(monster2)
    this.drawWall()
    const monsters: any[] = this.monsters
    const bullet = this.bullet
    let that = this
    Events.on(this.engine, 'collisionStart', function (event: any) {
      // Iterate over all pairs of bodies that have collided
      event.pairs.forEach(function (pair: Pair) {
        that.monsters.forEach(element => {
          if (
            (pair.bodyA === that.bullet.obj && pair.bodyB === element?.obj) ||
            (pair.bodyA === element.obj && pair.bodyB === that.bullet?.obj)
          ) {
            typeof that.deadMonsterImage
            element.image.texture = that.deadMonsterImage
          }
          //   }
        })
      })
    })
  }
  private processBarprops: {
    x: number
    y: number
    width: number
    height: number
    process: number
  }
  private updateProcess() {
    requestAnimationFrame(this.updateProcess)
    this.processBarprops.width += 0.1
    this.processBarprops.y += 0.1
  }
  private testEG = Engine.create()
  private bulletSimulator
  private drawWall() {
    const wallTop = Bodies.rectangle(
      this.mainIns.height / 2,
      0,
      this.mainIns.width,
      10,
      {
        isStatic: true,
      },
    )
    const wallBottom = Bodies.rectangle(
      this.mainIns.width / 2,
      this.mainIns.height,
      this.mainIns.width,
      10,
      {
        isStatic: true,
      },
    )
    const wallRight = Bodies.rectangle(
      this.mainIns.width,
      this.mainIns.height / 2,
      10,
      this.mainIns.height,
      {
        isStatic: true,
      },
    )
    const wallLeft = Bodies.rectangle(
      0,
      this.mainIns.height / 2,
      10,
      this.mainIns.height,
      {
        isStatic: true,
      },
    )

    this.bulletSimulator = Matter.Bodies.rectangle(
      this.slingshotPos.x,
      this.slingshotPos.y,
      50,
      50,
    )
    this.slingshot = this.mainIns.getChild('n18') as fgui.GImage
    this.slingshotPos = { x: this.slingshot.x, y: this.slingshot.y }
    this.processBar = this.mainIns.getChild('n16') as fgui.GImage
    this.launchSpeedMultiply = 1
    World.add(this.engine.world, [wallBottom, wallTop, wallLeft, wallRight])
    let t0_Multiply = Date.now() / 1000
    let isTouchEnd = true

    const updateSpeedMultiply = time => {
      let x = this.pointerCurrentPos?.x - this.pointerDownPos?.x
      let y = this.pointerCurrentPos?.y - this.pointerDownPos?.y

      let multi = Math.sqrt(x * x + y * y) / 35 || 0
      if (multi >= 1) {
        multi = 1
      }

      this.launchSpeedMultiply = multi
      this.processBar.scaleX = multi
      let theta = 180 + 360 - (Math.atan2(y, x) / Math.PI) * 180

      this.angle = theta
      Matter.World.remove(this.testEG.world, this.bulletSimulator)

      this.bulletSimulator = Bodies.rectangle(
        this.slingshot.x,
        this.slingshot.y,
        50,
        50,
        {},
      )
      World.add(this.testEG.world, this.bulletSimulator)
      const realSpeed = this.launchSpeed * this.launchSpeedMultiply
      Body.applyForce(this.bulletSimulator, this.bulletSimulator.position, {
        x: realSpeed * Math.cos((this.angle * Math.PI) / 180),
        y: -realSpeed * Math.sin((this.angle * Math.PI) / 180),
      })
      if (!isTouchEnd) {
        let path = []
        for (let i = 0; i < 50; i++) {
          path.push({
            x: this.bulletSimulator.position.x,
            y: this.bulletSimulator.position.y,
          })
          // Update the Matter.js engine
          Matter.Engine.update(this.testEG, 1000 / 60) // 60 frames per second
        }
        this.drawBulletPath(path)
        requestAnimationFrame(updateSpeedMultiply.bind(this))
      }
    }
    this.mainIns.getChild('n8').on(
      'touchstart',
      e => {
        this.pointerDownPos = { ...e.data.global }

        isTouchEnd = false
        // t0_Multiply = Date.now() / 1000
        requestAnimationFrame(updateSpeedMultiply.bind(this))
      },
      this,
    )

    this.mainIns.getChild('n8').on(
      'touchend',
      e => {
        isTouchEnd = true
        if (this.pointerDownPos.x && this.pointerDownPos.y) {
          Matter.World.remove(this.testEG.world, this.bulletSimulator)

          this.createBullet(
            this.slingshotPos.x,
            this.slingshotPos.y,
            this.bulletImg,
          )
          this.bullet.obj.position = { ...this.slingshotPos }
          const realSpeed = this.launchSpeed * this.launchSpeedMultiply
          Body.applyForce(
            this.bullet.obj,
            {
              x: this.bullet.obj.position.x + 10,
              y: this.bullet.obj.position.y,
            },
            {
              x: realSpeed * Math.cos((this.angle * Math.PI) / 180),
              y: -realSpeed * Math.sin((this.angle * Math.PI) / 180),
            },
          )
          Body.applyForce(this.bulletSimulator, this.bulletSimulator.position, {
            x: realSpeed * Math.cos((this.angle * Math.PI) / 180),
            y: -realSpeed * Math.sin((this.angle * Math.PI) / 180),
          })
          let path = []
          for (let i = 0; i < 100; i++) {
            path.push({
              x: this.bulletSimulator.position.x,
              y: this.bulletSimulator.position.y,
            })
            // Update the Matter.js engine
            Matter.Engine.update(this.testEG, 1000 / 60) // 60 frames per second
          }
          this.drawBulletPath(path)
          // this.angle = Math.random() * 90
          // this.drawBulletPath(path)
        }
      },
      this,
    )
  }
  private monsters = []
  private createMonster(image: any) {
    let obj = Bodies.rectangle(image.x, image.y, image.height, image.width, {})
    this.monsters.push({ image, obj })
    World.add(this.engine.world, obj)
  }
  private createBullet(x: number, y: number, image: any) {
    if (this.engine?.world && this.bullet?.obj)
      World.remove(this.engine.world, this.bullet?.obj)
    let obj = Bodies.rectangle(x, y, image.height, image.width, {})
    this.bullet = { image, obj }

    World.add(this.engine.world, this.bullet.obj)
  }
}
new Main()
