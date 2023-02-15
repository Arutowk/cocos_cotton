import { _decorator, Component, Node } from 'cc'
import { ItemStatusEnum, ItemTypeEnum } from '../Enum'
import { ItemManager } from './ItemManager'
const { ccclass, property } = _decorator

@ccclass('KeyItemManager')
export class KeyItemManager extends ItemManager {
    label = '信箱钥匙'
    type: ItemTypeEnum = ItemTypeEnum.Key
}
