import { _decorator, Component, Node } from 'cc'
import { EventEnum } from '../Enum'
import EventManager from '../Runtime/EventManager'
const { ccclass, property } = _decorator

@ccclass('RenderManager')
export abstract class RenderManager extends Component {
    onLoad() {
        EventManager.Instance.on(EventEnum.Render, this.render, this)
    }

    onDestroy() {
        EventManager.Instance.off(EventEnum.Render, this.render)
    }

    start() {
        this.render()
    }

    abstract render(): void
}
