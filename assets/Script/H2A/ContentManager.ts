import { _decorator, Component, Node, SpriteFrame, CCInteger, Prefab, Sprite } from 'cc'
import { RenderManager } from '../Base/RenderManager'
import DataManager from '../Runtime/DataManager'
const { ccclass, property } = _decorator

@ccclass('ContentManager')
export class ContentManager extends RenderManager {
    @property(SpriteFrame)
    normalSf: SpriteFrame = null

    @property(SpriteFrame)
    successSf: SpriteFrame = null

    @property(CCInteger)
    index: number = 0

    render() {
        const curIndex = DataManager.Instance.H2AData.findIndex(i => i === this.index)
        const answerIndex = DataManager.Instance.H2AAnswer.findIndex(i => i === this.index)
        this.getComponent(Sprite).spriteFrame = curIndex === answerIndex ? this.successSf : this.normalSf
    }
}
