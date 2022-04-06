import {_decorator, Component, director, Event, instantiate, Node, Prefab, UITransform} from 'cc';
import {CircleManager} from "db://assets/Scripts/H2AGame/CircleManager";
import {EventEnum, SceneEnum, TriggerStatusEnum} from "db://assets/Scripts/Enum";
import DataManager from "db://assets/Scripts/Runtime/DataManager";
import {RenderManager} from "db://assets/Scripts/Base/RenderManager";

const {ccclass, property} = _decorator;

const CIRCLE_RADIUS = 80

@ccclass('H2AGameManager')
export class H2AGameManager extends RenderManager {
    @property([CircleManager])
    circles: CircleManager[] = []

    @property(Node)
    lines: Node = null

    @property(Prefab)
    linePrefab: Prefab = null

    @property([Prefab])
    contentPrefab: Prefab[] = []

    private circlesMap: Map<CircleManager, CircleManager[]> = new Map()

    start() {
        this.generateMap()
        this.generateLines()
        super.start()
        this.checkSuccess()
    }

    handleCircleTouch(e: Event, _index: string) {
        //成功之后，禁止所有操作
        if (DataManager.Instance.doorStatus === TriggerStatusEnum.Resolve) {
            return
        }

        const index = parseInt(_index)
        const curCircle = this.circles[index]
        const curCircleContentIndex = DataManager.Instance.H2AData[index]

        if (curCircleContentIndex === null) {
            return
        }
        const circles = this.circlesMap.get(curCircle)
        for (let i = 0; i < circles.length; i++) {
            const circle = circles[i];
            //找一下谁是null
            const nullIndex = DataManager.Instance.H2AData.findIndex(i => i === null)
            //目前匹配的这个circle的index
            const circleIndex = this.circles.findIndex(i => i === circle)

            if (nullIndex === circleIndex) {
                DataManager.Instance.H2AData[circle.index] = curCircleContentIndex
                DataManager.Instance.H2AData[index] = null
                DataManager.Instance.H2AData = [...DataManager.Instance.H2AData]
                break;
            }
        }

        this.checkSuccess()
    }

    handleReset() {
        DataManager.Instance.H2AData = [...DataManager.Instance.H2AInitData]
    }

    render() {
        for (let i = 0; i < DataManager.Instance.H2AData.length; i++) {
            //清空
            const circle = this.circles[i]
            circle.node.destroyAllChildren()

            //渲染
            const contentIndex = DataManager.Instance.H2AData[i];
            if (contentIndex !== null && this.contentPrefab[contentIndex]) {
                const content = instantiate(this.contentPrefab[contentIndex])
                circle.node.addChild(content)
            }
        }
    }

    checkSuccess() {
        if (DataManager.Instance.H2AData.every((e, i) => e === DataManager.Instance.H2AAnswer[i])) {
            DataManager.Instance.doorStatus = TriggerStatusEnum.Resolve
            DataManager.Instance.curScene = SceneEnum.H2
        }
    }

    generateMap() {
        this.circlesMap.clear()
        //设置通道
        this.circlesMap.set(this.circles[0], [this.circles[1], this.circles[4], this.circles[6]])
        this.circlesMap.set(this.circles[1], [this.circles[0], this.circles[5], this.circles[6]])
        this.circlesMap.set(this.circles[2], [this.circles[4], this.circles[6]])
        this.circlesMap.set(this.circles[3], [this.circles[5], this.circles[6]])
        this.circlesMap.set(this.circles[4], [this.circles[0], this.circles[2], this.circles[5], this.circles[6]])
        this.circlesMap.set(this.circles[5], [this.circles[1], this.circles[3], this.circles[4], this.circles[6]])
        this.circlesMap.set(this.circles[6], [this.circles[0], this.circles[1], this.circles[2], this.circles[3], this.circles[4], this.circles[5]])

        //设置索引值
        for (let i = 0; i < this.circles.length; i++) {
            const circle = this.circles[i];
            circle.index = i
        }
    }

    generateLines() {
        for (const [curCircle, circles] of this.circlesMap) {
            for (const nextCircle of circles) {
                const curIndex = this.circles.findIndex(n => n === curCircle)
                const nextIndex = this.circles.findIndex(n => n === nextCircle)
                if (curIndex < nextIndex) {
                    this.generateLine(curCircle, nextCircle)
                }
            }
        }
    }

    generateLine(curCircle: CircleManager, nextCircle: CircleManager) {
        const line = instantiate(this.linePrefab)
        const {x: x1, y: y1} = curCircle.node.position
        const {x: x2, y: y2} = nextCircle.node.position

        //计算中点
        const x = (x1 + x2) / 2
        const y = (y1 + y2) / 2

        //设置位置
        line.setPosition(x, y)

        //三角形三边
        const side1 = Math.abs(x2 - x1)
        const side2 = Math.abs(y2 - y1)
        const side3 = Math.sqrt(side1 * side1 + side2 * side2)

        const UITfComponent = line.getComponent(UITransform)
        //设置长度
        UITfComponent.setContentSize(side3 - CIRCLE_RADIUS * 2, UITfComponent.contentSize.height)

        //设置旋转
        const rad = Math.atan(side2 / side1)
        const angle = rad / Math.PI * 180
        //计算符号
        const sign = (x1 > x2 && y1 > y2) || (x1 < x2 && y1 < y2) ? 1 : -1
        line.setRotationFromEuler(0, 0, sign * angle)

        this.lines.addChild(line)
    }
}
