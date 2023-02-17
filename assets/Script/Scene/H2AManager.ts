import { _decorator } from 'cc'
import { SceneEnum } from '../Enum'
import { SceneManager } from './SceneManager'

const { ccclass, property } = _decorator

@ccclass('H2AManager')
export class H2AManager extends SceneManager {
    type: SceneEnum = SceneEnum.H2A
}
