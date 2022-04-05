
import { _decorator, Component, director } from 'cc';
import {EventEnum, SceneEnum} from "db://assets/Scripts/Enum";
import {SceneManager} from "db://assets/Scripts/Scene/SceneManager";
const { ccclass, property } = _decorator;

@ccclass('H1Manager')
export class H1Manager extends SceneManager {
    protected type:SceneEnum = SceneEnum.H1
}
