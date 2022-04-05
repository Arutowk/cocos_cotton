import {_decorator, Component, Node, SpriteFrame, Event, Prefab, instantiate, UITransform} from 'cc';
import {EventEnum, SceneEnum} from "db://assets/Scripts/Enum";
import {SceneManager} from "db://assets/Scripts/Scene/SceneManager";

const {ccclass, property} = _decorator;

@ccclass('H2AManager')
export class H2AManager extends SceneManager {
    protected type:SceneEnum = SceneEnum.H2A
}
