import { Main } from './Main'

export class WinStart extends fgui.Window {
  public constructor(private main: Main) {
    super()
    this.setSize(fgui.GRoot.inst.width, fgui.GRoot.inst.height)
  }

  protected onInit(): void {
    this.contentPane = fgui.UIPackage.createObject(
      'Package1',
      'startGame',
    ) as fgui.GComponent
    console.log('startGame', this.contentPane)
    this.contentPane.setSize(fgui.GRoot.inst.width, fgui.GRoot.inst.height)

    // let bg = this.contentPane.getChild('bg') as fgui.GComponent
    // this.setChildIndex(bg, 10)

  }
  protected onShown(): void {
    let startBtn = this.contentPane.getChild('n8') as fgui.GButton
    
    startBtn.click(e => {

      console.log('sdfsdfd')
    }, this)
    console.log(startBtn)
  }
}
