import { _decorator, Component, Node, SpriteFrame } from 'cc'
import { ItemStatusEnum, ItemTypeEnum } from '../Enum'
const { ccclass, property } = _decorator

@ccclass('ItemManager')
export class ItemManager extends Component {
    status: ItemStatusEnum
    type: ItemTypeEnum

    @property(SpriteFrame)
    sceneSf: SpriteFrame | null = null

    @property(SpriteFrame)
    inventorySf: SpriteFrame | null = null

    start() {
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this)
    }

    touchEnd() {
        if (this.status === ItemStatusEnum.Scene) {
            this.status = ItemStatusEnum.Inventory
        }
    }
}
