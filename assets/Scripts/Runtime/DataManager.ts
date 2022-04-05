import {sys} from "cc";
import Singleton from "db://assets/Scripts/Base/Singleton";
import {EventEnum, ItemStatusEnum, ItemTypeEnum, SceneEnum, TriggerStatusEnum} from "db://assets/Scripts/Enum";
import EventManager from "db://assets/Scripts/Runtime/EventManager";

const STOREAGE_KEY = 'STOREAGE_KEY'

interface IItem {
    type: ItemTypeEnum,
    status: ItemStatusEnum
}

type  IH2AData = (number | null)[]

export default class DataManager extends Singleton {
    static get Instance() {
        return super.GetInstance<DataManager>()
    }

    readonly H2AAnswer: IH2AData = [0, 1, 2, 3, 4, 5, null]
    readonly H2AInitData: IH2AData = [1, 0, 3, 2, 5, 4, null]
    private _H2AData: IH2AData = this.H2AInitData
    private _curItemType: ItemTypeEnum | null = null
    private _items: Array<IItem> = [
        {type: ItemTypeEnum.Key, status: ItemStatusEnum.Scene},
        {type: ItemTypeEnum.Mail, status: ItemStatusEnum.Disable}
    ]
    private _curScene: SceneEnum = SceneEnum.H1
    private _mailBoxStatus: TriggerStatusEnum = TriggerStatusEnum.Pending
    private _grandMoStatus: TriggerStatusEnum = TriggerStatusEnum.Pending
    private _doorStatus: TriggerStatusEnum = TriggerStatusEnum.Pending
    private _grandMoDialogIndex = -1
    private _isSelect = false

    get H2AData() {
        return this._H2AData
    }

    set H2AData(newData) {
        this._H2AData = newData
        this.saveAndRender()
    }

    get items() {
        return this._items
    }

    set items(newData) {
        this._items = newData
        this.saveAndRender()
    }


    get curItemType() {
        return this._curItemType
    }

    set curItemType(newData) {
        this._curItemType = newData
        this.saveAndRender()
    }

    get curScene() {
        return this._curScene
    }

    set curScene(newData) {
        this._curScene = newData
        this.saveAndRender()
    }


    get mailBoxStatus() {
        return this._mailBoxStatus
    }

    set mailBoxStatus(newData) {
        this._mailBoxStatus = newData
        this.saveAndRender()
    }


    get doorStatus() {
        return this._doorStatus
    }

    set doorStatus(newData) {
        this._doorStatus = newData
        this.saveAndRender()
    }


    get grandMoStatus() {
        return this._grandMoStatus
    }

    set grandMoStatus(newData) {
        this._grandMoStatus = newData
        this.saveAndRender()
    }


    get grandMoDialogIndex() {
        return this._grandMoDialogIndex
    }

    set grandMoDialogIndex(newData) {
        this._grandMoDialogIndex = newData
        this.saveAndRender()
    }

    get isSelect() {
        return this._isSelect
    }

    set isSelect(newData) {
        this._isSelect = newData
        this.saveAndRender()
    }


    saveAndRender() {
        EventManager.Instance.emit(EventEnum.Render)
        sys.localStorage.setItem(STOREAGE_KEY, JSON.stringify({
            H2AData: this.H2AData,
            items: this.items,
            curItemType: this.curItemType,
            curScene: this.curScene,
            mailBoxStatus: this.mailBoxStatus,
            doorStatus: this.doorStatus,
            grandMoStatus: this.grandMoStatus,
            grandMoDialogIndex: this.grandMoDialogIndex,
            isSelect: this.isSelect
        }))
    }

    reset() {
        this.H2AData = this.H2AInitData
        this.curItemType = null
        this.items = [
            {type: ItemTypeEnum.Key, status: ItemStatusEnum.Scene},
            {type: ItemTypeEnum.Mail, status: ItemStatusEnum.Disable}
        ]
        this.curScene = SceneEnum.H1
        this.mailBoxStatus = TriggerStatusEnum.Pending
        this.grandMoStatus = TriggerStatusEnum.Pending
        this.doorStatus = TriggerStatusEnum.Pending
        this.grandMoDialogIndex = -1
        this.isSelect = false
    }

    restore() {
        const _data = sys.localStorage.getItem(STOREAGE_KEY) as any
        try {
            const data = JSON.parse(_data)
            this.H2AData = data.H2AData
            this.curItemType = data.curItemType
            this.items = data.items
            this.curScene = data.curScene
            this.mailBoxStatus = data.mailBoxStatus
            this.grandMoStatus = data.grandMoStatus
            this.doorStatus = data.doorStatus
            this.grandMoDialogIndex = data.grandMoDialogIndex
            this.isSelect = data.isSelect
        } catch {
            this.reset()
        }

    }
}
