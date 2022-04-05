import {_decorator} from 'cc';
import {EventEnum, ItemStatusEnum, ItemTypeEnum, TriggerStatusEnum, TriggerTypeEnum} from "db://assets/Scripts/Enum";
import {Item} from "db://assets/Scripts/Inventory/Item";
import {TriggerManager} from "db://assets/Scripts/Trigger/TriggerManager";
import DataManager from "db://assets/Scripts/Runtime/DataManager";

const {ccclass, property} = _decorator;

@ccclass('KeyItem')
export class KeyItem extends Item {
    label = "信箱钥匙"
    type: ItemTypeEnum = ItemTypeEnum.Key
}
