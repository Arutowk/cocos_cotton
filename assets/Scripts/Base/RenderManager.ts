import {_decorator, Component, Node, Collider2D, IPhysics2DContact, BoxCollider, director, Contact2DType, SpriteFrame, Sprite} from 'cc';
import EventManager from "db://assets/Scripts/Runtime/EventManager";
import {EventEnum, SceneEnum, TriggerStatusEnum, TriggerTypeEnum} from "db://assets/Scripts/Enum";

const {ccclass, property} = _decorator;

@ccclass('RenderManager')
export class RenderManager extends Component {
    onLoad() {
        EventManager.Instance.on(EventEnum.Render, this.render, this)
    }

    onDestroy() {
        EventManager.Instance.off(EventEnum.Render, this.render)
    }

    start(){
        this.render()
    }

    render(){

    }
}
