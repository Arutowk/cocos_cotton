import { _decorator, Component, Node, Prefab, instantiate } from 'cc'
import { ItemStatusEnum, ItemTypeEnum } from '../Enum'
import DataManager from '../Runtime/DataManager'
import { SceneManager } from './SceneManager'
const { ccclass, property } = _decorator

@ccclass('H2SceneManager')
export class H2SceneManager extends SceneManager {
    @property(Prefab)
    keyPrefab: Prefab = null

    @property(Node)
    keyPlaceholder: Node = null

    render() {
        super.render()
        this.items.destroyAllChildren()
        const key = DataManager.Instance.items.find(i => (i.type = ItemTypeEnum.Key))
        if (key && key.status === ItemStatusEnum.Scene) {
            const keyNode = instantiate(this.keyPrefab)
            this.items.addChild(keyNode)
            //keyPlaceholder空节点在编辑器预先设计好了位置
            keyNode.setPosition(this.keyPlaceholder.position)
        }
    }
}
