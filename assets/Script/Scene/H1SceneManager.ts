import { _decorator, Component, Node } from 'cc'
import { SceneEnum } from '../Enum'
import { SceneManager } from './SceneManager'
const { ccclass, property } = _decorator

@ccclass('H1SceneManager')
export class H1SceneManager extends SceneManager {
    type: SceneEnum = SceneEnum.H1
}
