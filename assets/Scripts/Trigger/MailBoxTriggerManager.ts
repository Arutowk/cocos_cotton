import {_decorator, Node} from 'cc';
import {ItemStatusEnum, ItemTypeEnum, TriggerStatusEnum, TriggerTypeEnum} from "db://assets/Scripts/Enum";
import {TriggerManager} from "db://assets/Scripts/Trigger/TriggerManager";
import DataManager from "db://assets/Scripts/Runtime/DataManager";

const {ccclass, property} = _decorator;

@ccclass('MailBoxTriggerManager')
export class MailBoxTriggerManager extends TriggerManager {
    @property(Node)
    closeNode: Node = null

    @property(Node)
    openNode: Node = null

    public type: TriggerTypeEnum = TriggerTypeEnum.MailBox

    render() {
        const open = DataManager.Instance.mailBoxStatus === TriggerStatusEnum.Resolve
        this.closeNode.active = !open
        this.openNode.active = open
    }

    handleTrigger() {
        if (DataManager.Instance.isSelect && DataManager.Instance.curItemType === ItemTypeEnum.Key) {
            DataManager.Instance.curItemType = null
            DataManager.Instance.items.find(i => i.type === ItemTypeEnum.Key).status = ItemStatusEnum.Disable
            DataManager.Instance.items.find(i => i.type === ItemTypeEnum.Mail).status = ItemStatusEnum.Scene
            DataManager.Instance.items = [...DataManager.Instance.items]
            DataManager.Instance.mailBoxStatus = TriggerStatusEnum.Resolve
            DataManager.Instance.isSelect = false
        }
    }
}
