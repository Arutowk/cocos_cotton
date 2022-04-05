import {
    _decorator,
    Node,
    Touch,
    SpriteFrame,
    Sprite,
    Collider2D,
    game,
    Contact2DType
} from 'cc';
import {EventEnum, ItemStatusEnum, ItemTypeEnum, SceneEnum} from "db://assets/Scripts/Enum";
import DataManager from "db://assets/Scripts/Runtime/DataManager";
import {TriggerManager} from "db://assets/Scripts/Trigger/TriggerManager";
import {RenderManager} from "db://assets/Scripts/Base/RenderManager";
import EventManager from "db://assets/Scripts/Runtime/EventManager";

const {ccclass, property} = _decorator;


@ccclass('Item')
export class Item extends RenderManager {
    label = "物品"

    @property(SpriteFrame)
    sceneSf: SpriteFrame = null

    @property(SpriteFrame)
    inventorySf: SpriteFrame = null

    protected type: ItemTypeEnum

    private spriteComponent: Sprite = null

    start() {
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this)
        this.node.on(Node.EventType.TOUCH_CANCEL, this.touchEnd, this)
        super.start()
    }

    render() {
        this.spriteComponent = this.getComponent(Sprite)
        const status = DataManager.Instance.items.find(i => i.type === this.type)?.status
        switch (status) {
            case ItemStatusEnum.Scene:
                this.spriteComponent.spriteFrame = this.sceneSf
                break;
            case ItemStatusEnum.Inventory:
                this.spriteComponent.spriteFrame = this.inventorySf
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

        if (item.status === ItemStatusEnum.Inventory) {
            // DataManager
        } else if (item.status === ItemStatusEnum.Scene) {
            const index = DataManager.Instance.items.findIndex(i => i.type === this.type)
            const list = [...DataManager.Instance.items]
            list.push(...list.splice(index, 1))
            item.status = ItemStatusEnum.Inventory
            DataManager.Instance.items = list
        }
    }
}
