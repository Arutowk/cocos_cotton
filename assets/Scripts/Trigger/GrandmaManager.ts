import {_decorator, Label, Node} from 'cc';
import {EventEnum, ItemStatusEnum, ItemTypeEnum, TriggerStatusEnum, TriggerTypeEnum} from "db://assets/Scripts/Enum";
import DataManager from "db://assets/Scripts/Runtime/DataManager";
import {TriggerManager} from "db://assets/Scripts/Trigger/TriggerManager";
import EventManager from "db://assets/Scripts/Runtime/EventManager";

const {ccclass, property} = _decorator;

@ccclass('GrandmaManager')
export class GrandmaManager extends TriggerManager {
    @property(Node)
    dialogNode: Node = null

    @property(Label)
    label: Label = null

    public type: TriggerTypeEnum = TriggerTypeEnum.Grandma

    private readonly pendingDialogList = [
        "我年纪大了，很多事情想不起来了。",
        "你是谁？算了，我也不在乎你是谁。你能帮我找到信箱的钥匙吗？",
        "老头子说最近会给我寄船票过来，叫我和他一起出去看看。虽然我没有什么兴趣...",
        "他折腾了一辈子，不是躲在楼上捣鼓什么时间机器，就是出海找点什么东西",
        "这些古怪的电视节目真没有什么意思。",
        "老头子说这个岛上有很多秘密，其实我知道，不过是岛上的日子太孤独，他找点事情做罢了。",
        "人嘛，谁没有年轻过。年轻的时候...算了，不说这些往事了。",
        "老了才明白，万物静默如迷。",
    ]

    private readonly resolveDialogList = [
        "没想到老头子的船票寄过来了，谢谢你。"
    ]

    render() {
        if (DataManager.Instance.grandMoDialogIndex === -1) {
            this.dialogNode.active = false
            return
        }

        this.dialogNode.active = true
        if (DataManager.Instance.grandMoStatus === TriggerStatusEnum.Pending) {
            this.label.string = this.pendingDialogList[DataManager.Instance.grandMoDialogIndex]
        } else if (DataManager.Instance.grandMoStatus === TriggerStatusEnum.Resolve) {
            this.label.string = this.resolveDialogList[DataManager.Instance.grandMoDialogIndex]
        }
    }

    handleTrigger() {
        if (DataManager.Instance.grandMoStatus === TriggerStatusEnum.Pending) {
            if (DataManager.Instance.isSelect && DataManager.Instance.curItemType === ItemTypeEnum.Mail) {
                DataManager.Instance.curItemType = null
                const list = [...DataManager.Instance.items]
                list.find(i => i.type === ItemTypeEnum.Mail).status = ItemStatusEnum.Disable
                DataManager.Instance.items = list
                DataManager.Instance.grandMoStatus = TriggerStatusEnum.Resolve
                DataManager.Instance.grandMoDialogIndex = 0
                DataManager.Instance.isSelect = false
            } else {
                if (DataManager.Instance.grandMoDialogIndex >= this.pendingDialogList.length - 1) {
                    DataManager.Instance.grandMoDialogIndex = -1
                } else {
                    DataManager.Instance.grandMoDialogIndex++
                }
            }

        }
    }
}
