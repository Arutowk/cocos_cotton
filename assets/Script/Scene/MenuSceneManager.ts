import { _decorator, Component, Node, director } from 'cc'
import { SceneEnum } from '../Enum'
import DataManager from '../Runtime/DataManager'
import { SceneManager } from './SceneManager'
const { ccclass, property } = _decorator

@ccclass('MenuSceneManager')
export class MenuSceneManager extends SceneManager {
    type: SceneEnum = SceneEnum.Menu

    render() {}

    handleNewGmae() {
        DataManager.Instance.reset()
        director.loadScene(SceneEnum.H1)
    }

    handleContinueGame() {
        DataManager.Instance.restore()
        director.loadScene(DataManager.Instance.curScene)
    }
}
