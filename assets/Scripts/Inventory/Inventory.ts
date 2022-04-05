import {_decorator, Button, instantiate, Node, Prefab, Label} from 'cc';
import DataManager from "db://assets/Scripts/Runtime/DataManager";
import {EventEnum, ItemStatusEnum, ItemTypeEnum} from "db://assets/Scripts/Enum";
import {RenderManager} from "db://assets/Scripts/Base/RenderManager";
import EventManager from "db://assets/Scripts/Runtime/EventManager";
import {Item} from "db://assets/Scripts/Inventory/Item";

const {ccclass, property} = _decorator;

@ccclass('Inventory')
export class Inventory extends RenderManager {
    @property(Node)
    placeholder: Node = null

    @property(Prefab)
    keyPrefab: Prefab = null

    @property(Prefab)
    mailPrefab: Prefab = null

    @property(Button)
    leftBtn: Button = null

    @property(Button)
    rightBtn: Button = null

    @property(Label)
    label: Label = null

    @property(Node)
    hand: Node = null

    start() {
        super.start()
        this.changeBtnInteractable()
    }

    render() {
        this.placeholder.destroyAllChildren()

        const isInventoryItems = DataManager.Instance.items.filter(item => item.status === ItemStatusEnum.Inventory)
        this.node.active = isInventoryItems.length > 0
        //没有item属于背包
        if (isInventoryItems.length > 0) {
            //有当前显示的item
            if (DataManager.Instance.curItemType) {
                const curItem = isInventoryItems.find(i => i.type === DataManager.Instance.curItemType)
                //当前的item存在背包item里，例如读档
                if (curItem && curItem.status === ItemStatusEnum.Inventory) {
                    this.generateItem(curItem.type)
                } else {
                    //当前item不存在背包里，例如刚使用了当前item的功能，他已经变成disable了
                    const newType = isInventoryItems[0].type
                    this.generateItem(newType)
                    DataManager.Instance.curItemType = newType
                }
            } else {
                //没有当前显示的item，例如第一次获得道具
                const newType = isInventoryItems[0].type
                this.generateItem(newType)
                DataManager.Instance.curItemType = newType
            }
        }

        this.hand.active = DataManager.Instance.isSelect && Boolean(DataManager.Instance.curItemType)

        this.changeBtnInteractable()
    }

    generateItem(curItemType: ItemTypeEnum) {
        switch (curItemType) {
            case ItemTypeEnum.Key:
                const keyNode = instantiate(this.keyPrefab)
                this.placeholder.destroyAllChildren()
                this.placeholder.addChild(keyNode)
                this.label.string = keyNode.getComponent(Item).label
                break;
            case ItemTypeEnum.Mail:
                const mailNode = instantiate(this.mailPrefab)
                this.placeholder.destroyAllChildren()
                this.placeholder.addChild(mailNode)
                this.label.string = mailNode.getComponent(Item).label
                break;
            default:
                break

        }
    }

    handleSelect() {
        DataManager.Instance.isSelect = !DataManager.Instance.isSelect
    }

    handleLeft() {
        if (DataManager.Instance.curItemType === null) {
            return
        }
        const isInventoryItems = DataManager.Instance.items.filter(item => item.status === ItemStatusEnum.Inventory)
        const index = isInventoryItems.findIndex(item => item.type === DataManager.Instance.curItemType)
        if (index > 0) {
            DataManager.Instance.curItemType = isInventoryItems[index - 1].type
        }

        this.changeBtnInteractable()
    }

    handleRight() {
        if (DataManager.Instance.curItemType === null) {
            return
        }

        const isInventoryItems = DataManager.Instance.items.filter(item => item.status === ItemStatusEnum.Inventory)
        const index = isInventoryItems.findIndex(item => item.type === DataManager.Instance.curItemType)
        if (index < isInventoryItems.length - 1) {
            DataManager.Instance.curItemType = isInventoryItems[index + 1].type
        }

        this.changeBtnInteractable()
    }

    changeBtnInteractable() {
        if (DataManager.Instance.curItemType === null) {
            this.leftBtn.interactable = false
            this.rightBtn.interactable = false
            return
        }

        const isInventoryItems = DataManager.Instance.items.filter(item => item.status === ItemStatusEnum.Inventory)
        const index = isInventoryItems.findIndex(item => item.type === DataManager.Instance.curItemType)

        this.leftBtn.interactable = index > 0
        this.rightBtn.interactable = index < isInventoryItems.length - 1
    }

}
