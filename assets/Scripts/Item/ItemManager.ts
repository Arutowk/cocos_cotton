import {
    _decorator,
    Node,
    SpriteFrame,
    Sprite,
} from 'cc';
import {ItemStatusEnum, ItemTypeEnum} from "db://assets/Scripts/Enum";
import DataManager from "db://assets/Scripts/Runtime/DataManager";
import {RenderManager} from "db://assets/Scripts/Base/RenderManager";

const {ccclass, property} = _decorator;


@ccclass('ItemManager')
export class ItemManager extends RenderManager {
    label = "物品"

    @property(SpriteFrame)
    sceneSf: SpriteFrame = null

    @property(SpriteFrame)
    inventorySf: SpriteFrame = null

    protected type: ItemTypeEnum

    start() {
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this)
        this.node.on(Node.EventType.TOUCH_CANCEL, this.touchEnd, this)
        super.start()
    }

    onDestroy() {
        super.onDestroy();
        this.node.off(Node.EventType.TOUCH_END, this.touchEnd)
        this.node.off(Node.EventType.TOUCH_CANCEL, this.touchEnd)
    }

    render() {
        const spriteComponent = this.getComponent(Sprite)
        const status = DataManager.Instance.items.find(i => i.type === this.type)?.status
        switch (status) {
            case ItemStatusEnum.Scene:
                spriteComponent.spriteFrame = this.sceneSf
                break;
            case ItemStatusEnum.Inventory:
                spriteComponent.spriteFrame = this.inventorySf
                break;
            case  ItemStatusEnum.Disable:
                this.node.active = false
                break;
            default:
                break;
        }
    }

    touchEnd() {
        const item = DataManager.Instance.items.find(i => i.type === this.type)

        if (!item) {
            return
        }

        if (item.status === ItemStatusEnum.Scene) {
            const index = DataManager.Instance.items.findIndex(i => i.type === this.type)
            DataManager.Instance.items.push(...DataManager.Instance.items.splice(index, 1))
            item.status = ItemStatusEnum.Inventory
            DataManager.Instance.items = [...DataManager.Instance.items]
        }
    }
}
