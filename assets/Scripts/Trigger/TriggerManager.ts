import {
    _decorator,
} from 'cc';
import {EventEnum, SceneEnum, TriggerStatusEnum, TriggerTypeEnum} from "db://assets/Scripts/Enum";
import {RenderManager} from "db://assets/Scripts/Base/RenderManager";

const {ccclass, property} = _decorator;

@ccclass('TriggerManager')
export abstract class TriggerManager extends RenderManager {
    public type: TriggerTypeEnum

    abstract handleTrigger(): void
}
