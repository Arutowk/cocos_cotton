import { _decorator, Component, Node, SpriteFrame, Sprite, Label } from 'cc'
import { RenderManager } from '../Base/RenderManager'
import { ItemStatusEnum, ItemTypeEnum, TriggerStatusEnum, TriggerTypeEnum } from '../Enum'
import DataManager from '../Runtime/DataManager'
import { TriggerManager } from './TriggerManager'
const { ccclass, property } = _decorator

@ccclass('GrandmaTriggerManager')
export class GrandmaTriggerManager extends TriggerManager {
    type: TriggerTypeEnum = TriggerTypeEnum.Grandma

    @property(Node)
    dialogNode: Node = null

    @property(Label)
    label: Label = null

    private readonly pendingDialogList = [
        '我年纪大了，很多事情想不起来了。',
        '你是谁？算了，我也不在乎你是谁。你能帮我找到信箱的钥匙吗？',
        '老头子说最近会给我寄船票过来，叫我和他一起出去看看。虽然我没有什么兴趣...',
        '他折腾了一辈子，不是躲在楼上捣鼓什么时间机器，就是出海找点什么东西。',
        '这些古怪的电视节目真没有什么意思。',
        '老头子说这个岛上有很多秘密，其实我知道，不过是岛上的日子太孤独，他找点事情做罢了。',
        '人嘛，谁没有年轻过。年轻的时候...算了，不说这些往事了。',
        '老了才明白，万物静默如迷。',
    ]

    private readonly resolvedDialogList = ['没想到老头子的船票寄过来了，谢谢你。']

    render() {
        if (DataManager.Instance.grandmaDialogIndex === -1) {
            this.dialogNode.active = false
            return
        }
        this.dialogNode.active = true
        if (DataManager.Instance.grandmaStatus === TriggerStatusEnum.Pending) {
            this.label.string = this.pendingDialogList[DataManager.Instance.grandmaDialogIndex]
        } else if (DataManager.Instance.grandmaStatus === TriggerStatusEnum.Resolved) {
            this.label.string = this.resolvedDialogList[DataManager.Instance.grandmaDialogIndex]
        }
    }

    handleTrigger() {
        if (DataManager.Instance.grandmaStatus === TriggerStatusEnum.Pending) {
            if (DataManager.Instance.curItemType === ItemTypeEnum.Mail && DataManager.Instance.isSelected) {
                DataManager.Instance.curItemType = null
                DataManager.Instance.items.find(i => i.type === ItemTypeEnum.Mail).status = ItemStatusEnum.Disable
                DataManager.Instance.items = [...DataManager.Instance.items]
                DataManager.Instance.grandmaStatus = TriggerStatusEnum.Resolved
                DataManager.Instance.grandmaDialogIndex = 0
            } else {
                if (DataManager.Instance.grandmaDialogIndex >= this.pendingDialogList.length - 1) {
                    DataManager.Instance.grandmaDialogIndex = -1
                } else {
                    DataManager.Instance.grandmaDialogIndex++
                }
            }
        } else {
            if (DataManager.Instance.grandmaDialogIndex >= this.resolvedDialogList.length - 1) {
                DataManager.Instance.grandmaDialogIndex = -1
            } else {
                DataManager.Instance.grandmaDialogIndex++
            }
        }
    }
}
