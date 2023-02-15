import { _decorator, Component, Node } from 'cc'
import { ItemStatusEnum, ItemTypeEnum } from '../Enum'
import { ItemManager } from './ItemManager'
const { ccclass, property } = _decorator

@ccclass('KeyItemManager')
export class KeyItemManager extends ItemManager {
    status: ItemStatusEnum
    type: ItemTypeEnum = ItemTypeEnum.Key
}
