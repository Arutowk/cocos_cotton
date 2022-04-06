import {_decorator} from 'cc';
import {EventEnum, ItemStatusEnum, ItemTypeEnum, TriggerStatusEnum, TriggerTypeEnum} from "db://assets/Scripts/Enum";
import {ItemManager} from "db://assets/Scripts/Item/ItemManager";

const {ccclass, property} = _decorator;

@ccclass('KeyItemManager')
export class KeyItemManager extends ItemManager {
    label = "信箱钥匙"
    type: ItemTypeEnum = ItemTypeEnum.Key
}
