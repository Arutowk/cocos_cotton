import {
    _decorator,
    Component,
} from 'cc';
import EventManager from "db://assets/Scripts/Runtime/EventManager";
import {EventEnum, SceneEnum, TriggerStatusEnum, TriggerTypeEnum} from "db://assets/Scripts/Enum";

const {ccclass, property} = _decorator;

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
