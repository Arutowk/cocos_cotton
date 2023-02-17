import { _decorator, Component, Node, Prefab, instantiate } from 'cc'
import { ItemStatusEnum, ItemTypeEnum, SceneEnum } from '../Enum'
import DataManager from '../Runtime/DataManager'
import { SceneManager } from './SceneManager'
const { ccclass, property } = _decorator

@ccclass('H4SceneManager')
export class H4SceneManager extends SceneManager {
    @property(Prefab)
    mailPrefab: Prefab = null

    @property(Node)
    mailPlaceholder: Node = null

    type: SceneEnum = SceneEnum.H4

    render() {
        this.items.destroyAllChildren()
        super.render()
        const mail = DataManager.Instance.items.find(i => i.type === ItemTypeEnum.Mail)
        if (mail && mail.status === ItemStatusEnum.Scene) {
            const mailNode = instantiate(this.mailPrefab)
            this.items.addChild(mailNode)
            //mailPlaceholderr空节点在编辑器预先设计好了位置
            mailNode.setPosition(this.mailPlaceholder.position)
        }
    }
}
