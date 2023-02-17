import { _decorator, Component, Node, Prefab, instantiate, UITransform, director } from 'cc'
import { RenderManager } from '../Base/RenderManager'
import { SceneEnum, TriggerStatusEnum } from '../Enum'
import DataManager from '../Runtime/DataManager'
import { CircleManager } from './CircleManager'
const { ccclass, property } = _decorator

const CIRCLE_RADIUS = 80

@ccclass('H2AGameManager')
export class H2AGameManager extends RenderManager {
    @property([CircleManager])
    circles: CircleManager[] = []

    @property(Node)
    lines: Node = null

    @property(Prefab)
    line: Prefab = null

    @property([Prefab])
    contentPrefab: Prefab[] = []

    private circlesMap: Map<CircleManager, CircleManager[]> = new Map()

    start() {
        this.generateCirclesMap()
        this.generateLines()
        super.start()
        this.checkSuccess()
    }

    render() {
        //动态实例化生成棋子
        for (let i = 0; i < this.circles.length; i++) {
            const circle = this.circles[i]
            circle.node.destroyAllChildren()
            const contentIndex = DataManager.Instance.H2AData[i]
            if (contentIndex !== null && this.contentPrefab[contentIndex]) {
                const content = instantiate(this.contentPrefab[contentIndex])
                circle.node.addChild(content)
            }
        }
    }

    handleCircleTouch(e: Event, _index: string) {
        if (DataManager.Instance.doorStatus === TriggerStatusEnum.Resolved) return
        const index = parseInt(_index)
        const curCircleContentIndex = DataManager.Instance.H2AData[index]
        if (curCircleContentIndex === null) return
        const curCircle = this.circles[index]
        const circles = this.circlesMap.get(curCircle)
        for (let i = 0; i < circles.length; i++) {
            const circle = circles[i]
            //找一下谁是null
            const nullIndex = DataManager.Instance.H2AData.findIndex(item => item === null)
            //目前匹配的这个circle的index
            const circleIndex = this.circles.findIndex(i => i === circle)

            if (nullIndex === circleIndex) {
                DataManager.Instance.H2AData[circle.index] = curCircleContentIndex
                DataManager.Instance.H2AData[index] = null
                DataManager.Instance.H2AData = [...DataManager.Instance.H2AData]
                break
            }
        }
        this.checkSuccess()
    }

    checkSuccess() {
        if (DataManager.Instance.H2AData.every((item, index) => DataManager.Instance.H2AAnswer[index] === item)) {
            DataManager.Instance.doorStatus = TriggerStatusEnum.Resolved
            DataManager.Instance.curScene = SceneEnum.H2
        }
    }

    resetContent() {
        DataManager.Instance.H2AData = [...DataManager.Instance.H2AInitData]
    }

    generateCirclesMap() {
        //设置通道
        this.circlesMap.set(this.circles[0], [this.circles[1], this.circles[4], this.circles[6]])
        this.circlesMap.set(this.circles[1], [this.circles[0], this.circles[5], this.circles[6]])
        this.circlesMap.set(this.circles[2], [this.circles[4], this.circles[6]])
        this.circlesMap.set(this.circles[3], [this.circles[5], this.circles[6]])
        this.circlesMap.set(this.circles[4], [this.circles[0], this.circles[2], this.circles[5], this.circles[6]])
        this.circlesMap.set(this.circles[5], [this.circles[1], this.circles[3], this.circles[4], this.circles[6]])
        this.circlesMap.set(this.circles[6], [
            this.circles[0],
            this.circles[1],
            this.circles[2],
            this.circles[3],
            this.circles[4],
            this.circles[5],
        ])

        //设置索引值
        for (let i = 0; i < this.circles.length; i++) {
            const circle = this.circles[i]
            circle.index = i
        }
    }

    generateLines() {
        for (const [curCircle, circles] of this.circlesMap) {
            for (const nextCircle of circles) {
                const curIndex = this.circles.findIndex(i => i === curCircle)
                const nextIndex = this.circles.findIndex(i => i === nextCircle)
                if (curIndex < nextIndex) {
                    this.drawLine(curCircle, nextCircle)
                }
            }
        }
    }

    drawLine(curCircle: CircleManager, nextCircle: CircleManager) {
        const line = instantiate(this.line)
        const { x: x1, y: y1 } = curCircle.node.position
        const { x: x2, y: y2 } = nextCircle.node.position

        //计算中点
        const x = (x1 + x2) / 2
        const y = (y1 + y2) / 2

        //三角形三边
        const side1 = Math.abs(x1 - x2)
        const side2 = Math.abs(y1 - y2)
        const side3 = Math.sqrt(side1 ** 2 + side2 ** 2)
        line.setPosition(x, y)
        const uiTransform = line.getComponent(UITransform)

        //设置长度
        uiTransform.setContentSize(side3 - CIRCLE_RADIUS * 2, uiTransform.contentSize.height)
        //设置旋转
        const rad = Math.atan(side2 / side1)
        const angle = (rad / Math.PI) * 180
        //计算顺逆时针方向
        const sign = (x1 > x2 && y1 > y2) || (x1 < x2 && y1 < y2) ? 1 : -1
        line.setRotationFromEuler(0, 0, sign * angle)

        this.lines.addChild(line)
    }
}
