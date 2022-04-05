import {instantiate, Prefab, _decorator, Node} from 'cc';
import {ItemStatusEnum, ItemTypeEnum, SceneEnum} from "db://assets/Scripts/Enum";
import {SceneManager} from "db://assets/Scripts/Scene/SceneManager";
import DataManager from "db://assets/Scripts/Runtime/DataManager";
import EventManager from "db://assets/Scripts/Runtime/EventManager";

const {ccclass, property} = _decorator;

@ccclass('H2Manager')
export class H2Manager extends SceneManager {
    @property(Prefab)
    keyPrefab: Prefab = null

    @property(Node)
    keyPlaceholder: Node = null

    protected type:SceneEnum = SceneEnum.H2

    render() {
        super.render()
        this.items.destroyAllChildren()
        const keyItem = DataManager.Instance.items.find(i => i.type === ItemTypeEnum.Key)
        if (keyItem && keyItem.status === ItemStatusEnum.Scene) {
            const keyNode = instantiate(this.keyPrefab)
            this.items.addChild(keyNode)
            keyNode.setPosition(this.keyPlaceholder.position)
        }
    }

}
