import { _decorator, Component, Node, Sprite, director } from 'cc'
import { ItemStatusEnum, ItemTypeEnum, SceneEnum, TriggerStatusEnum, TriggerTypeEnum } from '../Enum'
import DataManager from '../Runtime/DataManager'
import { TriggerManager } from './TriggerManager'
const { ccclass, property } = _decorator

@ccclass('DoorTriggerManager')
export class DoorTriggerManager extends TriggerManager {
    type: TriggerTypeEnum = TriggerTypeEnum.Door

    render() {
        this.getComponent(Sprite).enabled = DataManager.Instance.doorStatus === TriggerStatusEnum.Pending
        if (DataManager.Instance.doorStatus === TriggerStatusEnum.Pending) {
        }
    }

    handleTrigger() {
        if (DataManager.Instance.doorStatus === TriggerStatusEnum.Pending) {
            director.loadScene(SceneEnum.H2A)
        } else {
            director.loadScene(SceneEnum.H3)
        }
    }
}
