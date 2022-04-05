import {Component, Sprite, SpriteFrame, _decorator,CCInteger} from "cc";
import {RenderManager} from "db://assets/Scripts/Base/RenderManager";
import DataManager from "db://assets/Scripts/Runtime/DataManager";

const {ccclass, property} = _decorator;

@ccclass('ContentManager')
export class ContentManager extends RenderManager {
    @property(SpriteFrame)
    normalSf: SpriteFrame = null

    @property(SpriteFrame)
    successSf: SpriteFrame = null

    @property(CCInteger)
    index: number = 0

    render() {
        //我在答案里的index
        const answerIndex = DataManager.Instance.H2AAnswer.findIndex(i => i === this.index)
        //我在数据的的index
        const curIndex = DataManager.Instance.H2AData.findIndex(i => i === this.index)

        this.getComponent(Sprite).spriteFrame = answerIndex === curIndex ? this.successSf : this.normalSf
    }
}
