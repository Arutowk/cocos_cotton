import {_decorator} from 'cc';
import {
    ItemTypeEnum,
} from "db://assets/Scripts/Enum";
import {KeyItemManager} from "db://assets/Scripts/Inventory/KeyItemManager";

const {ccclass, property} = _decorator;

@ccclass('MailItemManager')
export class MailItemManager extends KeyItemManager {
    label = "船票"
    type: ItemTypeEnum = ItemTypeEnum.Mail
}
