import { _decorator, Component, Node, Label, Button, Prefab, instantiate } from 'cc'
import { RenderManager } from '../Base/RenderManager'
import { ItemStatusEnum, ItemTypeEnum } from '../Enum'
import { ItemManager } from '../Item/ItemManager'
import DataManager from '../Runtime/DataManager'
const { ccclass, property } = _decorator

@ccclass('InventoryManager')
export class InventoryManager extends RenderManager {
    @property(Prefab)
    keyPrefab: Prefab = null

    @property(Prefab)
    mailPrefab: Prefab = null

    @property(Label)
    label: Label = null

    @property(Button)
    leftBtn: Button = null

    @property(Button)
    rightBtn: Button = null

    /** 放置在背包里的物品*/
    @property(Node)
    placeholder: Node = null

    @property(Node)
    hand: Node = null

    render() {
        this.placeholder.destroyAllChildren()
        const isInventoryItems = DataManager.Instance.items.filter(i => i.status === ItemStatusEnum.Inventory)
        this.node.active = isInventoryItems.length > 0
        if (isInventoryItems.length > 0) {
            if (DataManager.Instance.curItemType) {
                const item = DataManager.Instance.items.find(i => i.type === DataManager.Instance.curItemType)
                if (item && item?.status === ItemStatusEnum.Inventory) {
                    this.generateItem(DataManager.Instance.curItemType)
                } else {
                    const type = isInventoryItems[0].type
                    this.generateItem(type)
                    DataManager.Instance.curItemType = type
                }
            } else {
                const type = isInventoryItems[0].type
                this.generateItem(type)
                DataManager.Instance.curItemType = type
            }
        }

        //如果背包里有当前物品并且被选择，那么显示手
        this.hand.active = Boolean(DataManager.Instance.curItemType) && DataManager.Instance.isSelected
        //重新调整按钮状态
        this.changeBtnInteractable()
    }

    generateItem(type: ItemTypeEnum) {
        switch (type) {
            case ItemTypeEnum.Key:
                //从 Prefab 实例化出新节点使用instantiate方法
                const keyNode = instantiate(this.keyPrefab)
                this.placeholder.destroyAllChildren()
                this.placeholder.addChild(keyNode)
                this.label.string = keyNode.getComponent(ItemManager).label
                break
            case ItemTypeEnum.Mail:
                const mailNode = instantiate(this.mailPrefab)
                this.placeholder.destroyAllChildren()
                this.placeholder.addChild(mailNode)
                this.label.string = mailNode.getComponent(ItemManager).label
                break
            default:
                break
        }
    }

    handleSelect() {
        DataManager.Instance.isSelected = !DataManager.Instance.isSelected
    }

    handleLeftBtn() {
        if (DataManager.Instance.curItemType === null) return
        const isInventoryItems = DataManager.Instance.items.filter(i => i.status === ItemStatusEnum.Inventory)
        const index = isInventoryItems.findIndex(i => i.type === DataManager.Instance.curItemType)
        if (index > 0) {
            DataManager.Instance.isSelected = false
            DataManager.Instance.curItemType = isInventoryItems[index - 1].type
        }
    }

    handleRightBtn() {
        if (DataManager.Instance.curItemType === null) return
        const isInventoryItems = DataManager.Instance.items.filter(i => i.status === ItemStatusEnum.Inventory)
        const index = isInventoryItems.findIndex(i => i.type === DataManager.Instance.curItemType)
        if (index < isInventoryItems.length - 1) {
            DataManager.Instance.isSelected = false
            DataManager.Instance.curItemType = isInventoryItems[index + 1].type
        }
    }

    changeBtnInteractable() {
        if (DataManager.Instance.curItemType === null) {
            //按钮的禁止状态由属性interactable控制
            this.leftBtn.interactable = false
            this.rightBtn.interactable = false
            return
        }
        const isInventoryItems = DataManager.Instance.items.filter(i => i.status === ItemStatusEnum.Inventory)
        const index = isInventoryItems.findIndex(i => i.type === DataManager.Instance.curItemType)
        this.leftBtn.interactable = index > 0
        this.rightBtn.interactable = index < isInventoryItems.length - 1
    }
}
