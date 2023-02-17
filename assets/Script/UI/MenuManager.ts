import { _decorator, Component, Node, director } from 'cc'
import { SceneEnum } from '../Enum'
const { ccclass, property } = _decorator

@ccclass('MenuManager')
export class MenuManager extends Component {
    handleBackMenu() {
        director.loadScene(SceneEnum.Menu)
    }
}
