
import { _decorator, Component, director } from 'cc';
import EventManager from "db://assets/Scripts/Runtime/EventManager";
import {EventEnum, SceneEnum} from "db://assets/Scripts/Enum";
import {SceneManager} from "db://assets/Scripts/Scene/SceneManager";
const { ccclass, property } = _decorator;

@ccclass('H3Manager')
export class H3Manager extends SceneManager {
    protected type:SceneEnum = SceneEnum.H3
}
