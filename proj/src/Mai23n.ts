// // import Matter from 'matter-js'
// // import { WinStart } from './winStart'
// // Matter Modules
// // const Engine = Matter.Engine
// // const Render = Matter.Render
// // const World = Matter.World
// // const Body = Matter.Body
// // const Bodies = Matter.Bodies
// // const Mouse = Matter.Mouse
// // const MouseConstraint = Matter.MouseConstraint
// export class Main extends PIXI.Application {
//   // private loadingView: LoadingView;
//   // private engine = Engine.create()
//   private contentlayer: fgui.GComponent
//   private stats: { update: () => void; dom: HTMLElement }

//   public constructor() {
//     super({
//       view: document.querySelector(
//         '#canvasContainer canvas',
//       ) as HTMLCanvasElement,
//       backgroundColor: 0xb5b5b5,
//       antialias: true,
//       resolution: window.devicePixelRatio || 1,
//     })

//     // this.stats = new window['Stats']()
//     // document.body.appendChild(this.stats.dom)
//     /**global settings */

//     fgui.UIConfig.verticalScrollBar = 'ui://test/ScrollBar_VT'
//     fgui.UIConfig.horizontalScrollBar = 'ui://test/ScrollBar_HZ'
//     fgui.UIConfig.popupMenu = 'ui://test/PopupMenu'
//     fgui.UIConfig.globalModalWaiting = 'ui://test/GlobalModalWaiting'
//     fgui.UIConfig.windowModalWaiting = 'ui://test/WindowModalWaiting'

//     fgui.GRoot.inst.attachTo(this, {
//       designWidth: 800,
//       designHeight: 600,
//       scaleMode: fgui.StageScaleMode.FIXED_WIDTH,
//       orientation: fgui.StageOrientation.LANDSCAPE,
//       alignV: fgui.StageAlign.TOP,
//       alignH: fgui.StageAlign.LEFT,
//     })

//     this.contentlayer = new fgui.GComponent()
//     this.stage.interactive = true
//     fgui.GRoot.inst.attachTo(this, {
//       designWidth: 800,
//       designHeight: 600,
//       scaleMode: fgui.StageScaleMode.FIXED_WIDTH,
//       orientation: fgui.StageOrientation.LANDSCAPE,
//       alignV: fgui.StageAlign.TOP,
//       alignH: fgui.StageAlign.LEFT,
//       //alignV: fgui.StageAlign.CENTER,
//       //alignH: fgui.StageAlign.CENTER
//     })
//     fgui.GRoot.inst.addChild(this.contentlayer)

//     // this.contentlayer.addChild(this.loadingView = new LoadingView());
//     // this.loadingView.setSize(fgui.GRoot.inst.width, fgui.GRoot.inst.height);
//     // this.loadingView.addRelation(fgui.GRoot.inst, fgui.RelationType.Size);

//     //test.jpg actually is a binary file but just ends with fake postfix.
//     let loader = new fgui.utils.AssetLoader()
//     loader
//       .add('Package1', 'images/Package1.jpg', {
//         loadType: PIXI.LoaderResource.LOAD_TYPE.XHR,
//         xhrType: PIXI.LoaderResource.XHR_RESPONSE_TYPE.BUFFER,
//       })
//       .add('Package1@atlas0', 'images/Package1@atlas0.png')
//       .add('Package1@atlas0_1', 'images/Package1@atlas0_1.png')
//     // loader.onProgress.add(this.loadProgress, this)
//     loader.onComplete.add(this.resLoaded, this)
//     loader.load()
//     // const n8= this.contentlayer.getChild('n8')
//     // n8.click(()=>{
//     //   console.log('sdfsdfsdf')
//     // })
//     // Add Matter walls to the world. This will keep the bodies within certain parameters.

//     // this.update()
//   }
//   // private physicObj: Array<any> = []
//   // private loadProgress(loader: PIXI.Loader): void {
//   //   let p = loader.progress
//   // this.loadingView.setProgress(p);
//   // if (p >= 100) {
//   //   loader.onProgress.detachAll()
//   // this.loadingView.dispose();
//   // this.loadingView = null;
//   // }
//   // }

//   // private t0x = Date.now() / 1000

//   // private flag: boolean = false
//   private update(): void {
//     // requestAnimationFrame(this.update.bind(this))
//     // const currentTime = Date.now() / 1000
//     // const t = currentTime - this.t0x
//     // // console.log()
//     // if (t > 4 && this.flag == false) {
//     //   // Body.applyForce(this.physicObj[3].obj, this.physicObj[3].obj.position, {
//     //   //   x: 0.03,
//     //   //   y: -0.03,
//     //   // })
//     //   this.flag = true
//     // }
//     // this.physicObj.forEach(object => {
//     //   // console.log(object)
//     //   object.image.x = object.obj?.position.x
//     //   object.image.y = object.obj?.position.y
//     //   object.image.rotation = (object.obj.angle / Math.PI) * 180
//     // })
//   }
//   private resLoaded(loader: PIXI.Loader): void {
//     loader.destroy()
//     fgui.UIPackage.addPackage('Package1')
//     let ins = fgui.UIPackage.createObject(
//       'Package1',
//       'Component1',
//     ) as fgui.GComponent
//     ins.setSize(fgui.GRoot.inst.width, fgui.GRoot.inst.height)
//     ins.addRelation(fgui.GRoot.inst, fgui.RelationType.Size)

//     this.createPhysicObj(ins.getChild('n3') as fgui.GImage)
//     this.createPhysicObj(ins.getChild('n4') as fgui.GImage)
//     this.createPhysicObj(ins.getChild('n5') as fgui.GImage)
//     this.createPhysicObj(ins.getChild('n6') as fgui.GImage)
//     this.contentlayer.addChild(ins)
//     let n8 = ins.getChild('n8')
//     console.log(n8.focused)

//     console.log(n8)
//     n8.click(() => {
//       console.log('sdfdfsdfs df sdf d')
//     })
//     this.initClicks(ins)
//     // const wallTop = Bodies.rectangle(
//     //   this.mainIns.height / 2,
//     //   0,
//     //   this.mainIns.width,
//     //   10,
//     //   {
//     //     isStatic: true,
//     //   },
//     // )
//     // const wallBottom = Bodies.rectangle(
//     //   this.mainIns.width / 2,
//     //   this.mainIns.height,
//     //   this.mainIns.width,
//     //   10,
//     //   {
//     //     isStatic: true,
//     //   },
//     // )
//     // console.log(this.mainIns)
//     // const wallRight = Bodies.rectangle(
//     //   this.mainIns.width,
//     //   this.mainIns.height / 2,
//     //   10,
//     //   this.mainIns.height,
//     //   {
//     //     isStatic: true,
//     //   },
//     // )
//     // const wallLeft = Bodies.rectangle(
//     //   0,
//     //   this.mainIns.height / 2,
//     //   10,
//     //   this.mainIns.height,
//     //   {
//     //     isStatic: true,
//     //   },
//     // )
//     // const mouseConstraint = MouseConstraint.create(this.engine, {
//     //   mouse: Mouse.create(document.querySelector('.canvasContainer canvas')),
//     // })

//     // let projectile = Bodies.rectangle(50, 50, 30, 30, {
//     //   frictionAir: 0,
//     //   restitution: 0.999,
//     //   speed: 0.5,
//     // })

//     // console.log('this.projectile', projectile)
//     // World.add(this.engine.world, [wallBottom, wallTop, wallLeft, wallRight])
//     // World.add(this.engine.world, mouseConstraint)
//     // Engine.run(this.engine)
//     // World.clear(this.engine.world,false)
//     // this.showStartScreen()
//     // }
//     // private createPhysicObj(
//     //   image: fgui.GImage,
//     //   opt?: Matter.IChamferableBodyDefinition,
//     // ) {
//     // let obj = Bodies.rectangle(image.x, image.y, image.width, image.height, {
//     //   restitution: 0.95,
//     //   frictionAir: 0.01,
//     // })
//     // World.add(this.engine.world, obj)
//     // this.physicObj.push({ image, obj })
//   }
//   // private winStart: WinStart
//   // private showStartScreen() {
//   // if (this.winStart == null) {
//   //   this.winStart = new WinStart(this)r
//   //   this.winStart.show()
//   // }
//   // }

//   private mainIns: fgui.GComponent

//   private initClicks(ins: fgui.GComponent): void {
//     this.mainIns = ins
//     ins.setSize(fgui.GRoot.inst.width, fgui.GRoot.inst.height)
//     // ins.addRelation(fgui.GRoot.inst, fgui.RelationType.Size)
//   }
// }

// //entry
// new Main()
