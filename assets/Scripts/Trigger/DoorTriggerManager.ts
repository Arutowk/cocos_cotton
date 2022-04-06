import {_decorator, Node, director, Sprite} from 'cc';
import {EventEnum, SceneEnum, TriggerStatusEnum, TriggerTypeEnum} from "db://assets/Scripts/Enum";
import DataManager from "db://assets/Scripts/Runtime/DataManager";
import {RenderManager} from "db://assets/Scripts/Base/RenderManager";
import {TriggerManager} from "db://assets/Scripts/Trigger/TriggerManager";

const {ccclass, property} = _decorator;

@ccclass('DoorTriggerManager')
export class DoorTriggerManager extends TriggerManager {
    public type: TriggerTypeEnum = TriggerTypeEnum.Door

    render() {
        this.getComponent(Sprite).enabled = DataManager.Instance.doorStatus === TriggerStatusEnum.Pending
    }

    handleTrigger() {
        if (DataManager.Instance.doorStatus === TriggerStatusEnum.Pending) {
            DataManager.Instance.curScene = SceneEnum.H2A
        } else {
            DataManager.Instance.curScene = SceneEnum.H3
        }
    }
}
