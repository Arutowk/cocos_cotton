import {director, _decorator, Component} from 'cc';
import {SceneEnum} from "db://assets/Scripts/Enum";

const {ccclass, property} = _decorator;

@ccclass('MenuUIManager')
export class MenuUIManager extends Component {
    changeScene() {
        director.loadScene(SceneEnum.Menu)
    }
}
