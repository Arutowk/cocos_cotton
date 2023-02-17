import { _decorator, Component, Node, SpriteFrame, Sprite } from 'cc'
import { RenderManager } from '../Base/RenderManager'
import { ItemStatusEnum, ItemTypeEnum, TriggerStatusEnum, TriggerTypeEnum } from '../Enum'
import DataManager from '../Runtime/DataManager'
import { TriggerManager } from './TriggerManager'
const { ccclass, property } = _decorator

@ccclass('MailboxTriggerManager')
export class MailboxTriggerManager extends TriggerManager {
    type: TriggerTypeEnum = TriggerTypeEnum.MailBox

    @property(Node)
    closeNode: Node = null

    @property(Node)
    openNode: Node = null

    render() {
        const open = DataManager.Instance.mailboxStatus === TriggerStatusEnum.Resolved
        this.closeNode.active = !open
        this.openNode.active = open
    }

    handleTrigger() {
        if (DataManager.Instance.curItemType === ItemTypeEnum.Key && DataManager.Instance.isSelected) {
            DataManager.Instance.curItemType = null
            DataManager.Instance.items.find(i => i.type === ItemTypeEnum.Key).status = ItemStatusEnum.Disable
            DataManager.Instance.items.find(i => i.type === ItemTypeEnum.Mail).status = ItemStatusEnum.Scene
            DataManager.Instance.items = [...DataManager.Instance.items]
            DataManager.Instance.mailboxStatus = TriggerStatusEnum.Resolved
            DataManager.Instance.isSelected = false
        }
    }
}
