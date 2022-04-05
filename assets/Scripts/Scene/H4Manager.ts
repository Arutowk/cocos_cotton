import {_decorator, Component, Node, SpriteFrame, Prefab, instantiate} from 'cc';
import EventManager from "db://assets/Scripts/Runtime/EventManager";
import {EventEnum, ItemStatusEnum, ItemTypeEnum, SceneEnum} from "db://assets/Scripts/Enum";
import {SceneManager} from "db://assets/Scripts/Scene/SceneManager";
import DataManager from "db://assets/Scripts/Runtime/DataManager";

const {ccclass, property} = _decorator;

@ccclass('H4Manager')
export class H4Manager extends SceneManager {
    @property(Prefab)
    mailPrefab: Prefab = null

    @property(Node)
    mailPlaceholder: Node = null

    protected type:SceneEnum = SceneEnum.H4

    render() {
        super.render()
        this.items.destroyAllChildren()
        const mailItem = DataManager.Instance.items.find(i => i.type === ItemTypeEnum.Mail)
        if (mailItem && mailItem.status === ItemStatusEnum.Scene) {
            const mailNode = instantiate(this.mailPrefab)
            this.items.addChild(mailNode)
            mailNode.setPosition(this.mailPlaceholder.position)
        }
    }

}
