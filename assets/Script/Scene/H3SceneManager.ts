import { _decorator, Component, Node } from 'cc'
import { SceneEnum } from '../Enum'
import { SceneManager } from './SceneManager'
const { ccclass, property } = _decorator

@ccclass('H3SceneManager')
export class H3SceneManager extends SceneManager {
    type: SceneEnum = SceneEnum.H3
}
