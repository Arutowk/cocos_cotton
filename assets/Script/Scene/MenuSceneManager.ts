import { _decorator, Component, Node, director } from 'cc'
import { SceneEnum } from '../Enum'
import { SceneManager } from './SceneManager'
const { ccclass, property } = _decorator

@ccclass('MenuSceneManager')
export class MenuSceneManager extends SceneManager {
    type: SceneEnum = SceneEnum.Menu

    render() {}

    handleNewGmae() {
        director.loadScene(SceneEnum.H1)
    }

    handleContinueGame() {}
}
