import { _decorator, Component, Node, Prefab, instantiate, UITransform } from 'cc'
import { RenderManager } from '../Base/RenderManager'
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

    private circlesMap: Map<CircleManager, CircleManager[]> = new Map()

    start() {
        this.generateCirclesMap()
        this.generateLines()
        super.start()
    }

    render() {}

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
