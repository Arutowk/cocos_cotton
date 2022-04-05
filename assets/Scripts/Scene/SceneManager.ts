import {_decorator, director, instantiate, Node, Prefab} from 'cc';
import {SceneEnum} from "db://assets/Scripts/Enum";
import DataManager from "db://assets/Scripts/Runtime/DataManager";
import {RenderManager} from "db://assets/Scripts/Base/RenderManager";

const {ccclass, property} = _decorator;

@ccclass('SceneManager')
export class SceneManager extends RenderManager {

    @property(Prefab)
    menuUI: Prefab = null

    @property(Prefab)
    inventory: Prefab = null

    @property(Node)
    items: Node = null

    protected type: SceneEnum

    changeScene(event: Event, scene: string) {
        DataManager.Instance.curScene = scene as SceneEnum
    }

    start() {
        super.start()

        director.preloadScene(SceneEnum.H1)
        director.preloadScene(SceneEnum.H2)
        director.preloadScene(SceneEnum.H3)
        director.preloadScene(SceneEnum.H4)
        director.preloadScene(SceneEnum.H2A)

        if (this.inventory) {
            const inventory = instantiate(this.inventory)
            this.node.addChild(inventory)
        }

        if (this.menuUI) {
            const menuUI = instantiate(this.menuUI)
            this.node.addChild(menuUI)
        }
    }

    render() {
        if (DataManager.Instance.curScene === this.type) {
            return
        }

        director.loadScene(DataManager.Instance.curScene)
    }
}
