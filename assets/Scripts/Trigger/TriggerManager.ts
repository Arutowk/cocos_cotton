import {_decorator, Component, Node, Collider2D, IPhysics2DContact, BoxCollider, director, Contact2DType, SpriteFrame, Sprite} from 'cc';
import {EventEnum, SceneEnum, TriggerStatusEnum, TriggerTypeEnum} from "db://assets/Scripts/Enum";
import {RenderManager} from "db://assets/Scripts/Base/RenderManager";

const {ccclass, property} = _decorator;

@ccclass('TriggerManager')
export class TriggerManager extends RenderManager {
    public type: TriggerTypeEnum

    handleTrigger(){}
}
