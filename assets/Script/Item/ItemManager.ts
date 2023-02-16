import { _decorator, Component, Node, SpriteFrame, Sprite } from 'cc'
import { RenderManager } from '../Base/RenderManager'
import { ItemStatusEnum, ItemTypeEnum } from '../Enum'
import DataManager from '../Runtime/DataManager'
const { ccclass, property } = _decorator

@ccclass('ItemManager')
export class ItemManager extends RenderManager {
    label = '物品'
    type: ItemTypeEnum

    @property(SpriteFrame)
    sceneSf: SpriteFrame = null

    @property(SpriteFrame)
    inventorySf: SpriteFrame = null

    start() {
        super.start()
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this)
    }

    onDestroy() {
        super.onDestroy()
        this.node.off(Node.EventType.TOUCH_END, this.touchEnd, this)
    }

    render() {
        const status = DataManager.Instance.items.find(i => i.type === this.type)?.status
        const spriteComponent = this.getComponent(Sprite)
        switch (status) {
            case ItemStatusEnum.Scene:
                this.node.active = true
                spriteComponent.spriteFrame = this.sceneSf
                break
            case ItemStatusEnum.Inventory:
                this.node.active = true
                spriteComponent.spriteFrame = this.inventorySf
                break
            case ItemStatusEnum.Disable:
                //消失
                this.node.active = false
                break
            default:
                break
        }
    }

    touchEnd() {
        const item = DataManager.Instance.items.find(i => i.type === this.type)

        if (!item) return

        if (item.status === ItemStatusEnum.Scene) {
            item.status = ItemStatusEnum.Inventory
            DataManager.Instance.items = [...DataManager.Instance.items]
            // DataManager.Instance.curItemType = this.type
            // DataManager.Instance.items = [
            //     { status: ItemStatusEnum.Inventory, type: this.type },
            //     ...DataManager.Instance.items.filter(i => i.type === item.type),
            // ]
        }
    }
}
