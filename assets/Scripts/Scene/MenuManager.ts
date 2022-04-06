import {_decorator, Component, director} from 'cc';
import {EventEnum, SceneEnum} from "db://assets/Scripts/Enum";
import {SceneManager} from "db://assets/Scripts/Scene/SceneManager";
import DataManager from "db://assets/Scripts/Runtime/DataManager";

const {ccclass, property} = _decorator;

@ccclass('MenuManager')
export class MenuManager extends SceneManager {

    newGame() {
        DataManager.Instance.reset()
            director.loadScene(SceneEnum.H1)

    }

    continueGame() {
        this.scheduleOnce(function() {
            DataManager.Instance.restore()
            director.loadScene(DataManager.Instance.curScene)
        }, 0.1);

    }

    render() {
    }
}
