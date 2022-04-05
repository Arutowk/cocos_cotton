import {Component, _decorator} from "cc";
import {ContentManager} from "db://assets/Scripts/H2AGame/ContentManager";

const {ccclass, property} = _decorator;

@ccclass('CircleManager')
export class CircleManager extends Component {
    index: number
}
