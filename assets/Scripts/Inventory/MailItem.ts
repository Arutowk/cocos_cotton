import {_decorator, Component, Node, Touch, SpriteFrame, Sprite} from 'cc';
import {
    ItemStatusEnum,
    ItemTypeEnum,
    TriggerStatusEnum,
    TriggerTypeEnum
} from "db://assets/Scripts/Enum";
import {Item} from "db://assets/Scripts/Inventory/Item";
import DataManager from "db://assets/Scripts/Runtime/DataManager";
import {TriggerManager} from "db://assets/Scripts/Trigger/TriggerManager";

const {ccclass, property} = _decorator;

@ccclass('MailItem')
export class MailItem extends Item {
    label = "船票"
    type: ItemTypeEnum = ItemTypeEnum.Mail
}
