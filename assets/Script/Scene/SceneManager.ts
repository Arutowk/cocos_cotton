import { _decorator, Component, Node, Event, director, Prefab, instantiate } from 'cc'
import { RenderManager } from '../Base/RenderManager'
import { SceneEnum } from '../Enum'
const { ccclass, property } = _decorator

@ccclass('SceneManager')
export class SceneManager extends RenderManager {
    //储存背包里有的物品
    @property(Node)
    items: Node = null

    //背包的预制体，编辑器上挂载了 inventory prefab 的场景则显示背包
    @property(Prefab)
    inventory: Prefab = null

    start() {
        super.start()
        // director.preloadScene(SceneEnum.H1)
        // director.preloadScene(SceneEnum.H2)
        // director.preloadScene(SceneEnum.H3)
        // director.preloadScene(SceneEnum.H4)

        if (this.inventory) {
            const inventory = instantiate(this.inventory)
            this.node.addChild(inventory)
        }
    }

    render() {}

    changeScene(e: Event, scene: string) {
        director.loadScene(scene as SceneEnum)
    }
}
