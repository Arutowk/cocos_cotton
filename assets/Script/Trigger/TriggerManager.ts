import { _decorator, Component, Node, SpriteFrame, Sprite } from 'cc'
import { RenderManager } from '../Base/RenderManager'
import { TriggerTypeEnum } from '../Enum'
import DataManager from '../Runtime/DataManager'
const { ccclass, property } = _decorator

@ccclass('TriggerManager')
export abstract class TriggerManager extends RenderManager {
    type: TriggerTypeEnum

    abstract handleTrigger(): void
}
