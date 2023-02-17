import { sys } from 'cc'
import Singleton from '../Base/Singleton'
import { EventEnum, ItemStatusEnum, ItemTypeEnum, SceneEnum, TriggerStatusEnum } from '../Enum'
import EventManager from './EventManager'

const STOREAGE_KEY = 'STOREAGE_KEY'

interface IItem {
    status: ItemStatusEnum
    type: ItemTypeEnum
}

export default class DataManager extends Singleton {
    static get Instance() {
        return super.GetInstance<DataManager>()
    }

    readonly H2AAnswer = [0, 1, 2, 3, 4, 5, null]
    readonly H2AInitData = [1, 0, 3, 2, 5, 4, null]

    /* 当前选择物品 */
    private _curItemType: ItemTypeEnum | null = null
    /* 场景里所有物品的状态 */
    private _items: Array<IItem> = [
        { type: ItemTypeEnum.Key, status: ItemStatusEnum.Scene },
        { type: ItemTypeEnum.Mail, status: ItemStatusEnum.Disable },
    ]
    private _isSelected = false
    private _mailboxStatus: TriggerStatusEnum = TriggerStatusEnum.Pending
    private _grandmaStatus: TriggerStatusEnum = TriggerStatusEnum.Pending
    private _grandmaDialogIndex: number = -1
    private _H2AData = [...this.H2AInitData]
    private _doorStatus: TriggerStatusEnum = TriggerStatusEnum.Pending
    private _curScene: SceneEnum = SceneEnum.H1

    get curItemType() {
        return this._curItemType
    }

    set curItemType(newData) {
        this._curItemType = newData
        this.renderAndSave()
    }

    get items() {
        return this._items
    }

    set items(newData: Array<IItem>) {
        this._items = newData
        //触发渲染
        this.renderAndSave()
    }

    get isSelected() {
        return this._isSelected
    }

    set isSelected(newData) {
        this._isSelected = newData
        this.renderAndSave()
    }

    get mailboxStatus() {
        return this._mailboxStatus
    }

    set mailboxStatus(newData) {
        this._mailboxStatus = newData
        this.renderAndSave()
    }

    get grandmaStatus() {
        return this._grandmaStatus
    }

    set grandmaStatus(newData) {
        this._grandmaStatus = newData
        this.renderAndSave()
    }

    get grandmaDialogIndex() {
        return this._grandmaDialogIndex
    }

    set grandmaDialogIndex(newData) {
        this._grandmaDialogIndex = newData
        this.renderAndSave()
    }

    get H2AData() {
        return this._H2AData
    }

    set H2AData(newData) {
        this._H2AData = newData
        this.renderAndSave()
    }

    get doorStatus() {
        return this._doorStatus
    }

    set doorStatus(newData) {
        this._doorStatus = newData
        this.renderAndSave()
    }

    get curScene() {
        return this._curScene
    }

    set curScene(newData) {
        this._curScene = newData
        this.renderAndSave()
    }

    renderAndSave() {
        EventManager.Instance.emit(EventEnum.Render)

        sys.localStorage.setItem(
            STOREAGE_KEY,
            JSON.stringify({
                H2AData: this.H2AData,
                items: this.items,
                curItemType: this.curItemType,
                curScene: this.curScene,
                mailboxStatus: this.mailboxStatus,
                doorStatus: this.doorStatus,
                grandmaStatus: this.grandmaStatus,
                grandmaDialogIndex: this.grandmaDialogIndex,
                isSelected: this.isSelected,
            }),
        )
    }

    reset() {
        this.H2AData = [...this.H2AInitData]
        this.curItemType = null
        this.items = [
            { type: ItemTypeEnum.Key, status: ItemStatusEnum.Scene },
            { type: ItemTypeEnum.Mail, status: ItemStatusEnum.Disable },
        ]
        this.curScene = SceneEnum.H1
        this.mailboxStatus = TriggerStatusEnum.Pending
        this.grandmaStatus = TriggerStatusEnum.Pending
        this.doorStatus = TriggerStatusEnum.Pending
        this.grandmaDialogIndex = -1
        this.isSelected = false
    }

    restore() {
        const _data = sys.localStorage.getItem(STOREAGE_KEY) as any
        try {
            const data = JSON.parse(_data)
            this.H2AData = data.H2AData
            this.curItemType = data.curItemType
            this.items = data.items
            this.curScene = data.curScene
            this.mailboxStatus = data.mailboxStatus
            this.grandmaStatus = data.grandmaStatus
            this.doorStatus = data.doorStatus
            this.grandmaDialogIndex = data.grandmaDialogIndex
            this.isSelected = data.isSelect
        } catch {
            this.reset()
        }
    }
}
